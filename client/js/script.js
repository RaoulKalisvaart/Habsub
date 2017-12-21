class HabitCatalog {

	constructor() {
		var tmpArray = [];

		$.get("/habits", function (data) {
			for (var i = 0; i < data.length; i++) {
				var toAdd = new Habit(data[i].name, data[i].description, data[i].days.split(","), data[i].mood);
				toAdd.id = data[i].id;
				tmpArray.push(toAdd);
			}
		});
		this.array = tmpArray;
	}

	addHabit(habit) {
		var that = this;
		$.get(("/addhabit?name=" + habit.name + "&description=" + habit.description + "&days=" + habit.days + "&mood=" + habit.mood), function (data) {
			habit.id = data;
			console.log(habit.id);
			that.array.push(habit);
			UI.showElements(that.array);
		});
	}

	deleteHabit(id) {
		this.array = this.array.filter(function (el) {
			return el.id != id;
		});
		UI.showElements(this.array);

		$.get("/deletehabit?id=" + id);
	}

	getHabits() {
		return this.array;
	}

	getHabitByID(id) {
		return this.array[this.array.findIndex(function (e) {
			return e.id == id;
		})];
	}

}

class Habit {
	constructor(name, description, days, mood) {
		this.name = name;
		this.description = description;
		this.days = days;
		this.mood = mood;
		this._progress = [];
	}

	_findDate(date) {
		for (var i = 0; i < this._progress.length; i++) {
			if (Math.round((this._progress[i] - date) / (1000 * 24 * 60 * 60)) == 0) {
				return i;
			}
		}
		return -1;
	}

	markDone(date) {
		this._progress.push(date);
	}

	markUndone(date) {
		var id = this._findDate(date);
		this._progress.splice(id, 1);
	}

	isMarked(date) {
		return this._findDate(date) != -1;
	}

}

class UI {
	static showElements(habits) {
		var ul = document.getElementById('habitList');

		while (ul.firstChild) {
			ul.removeChild(ul.firstChild);
		}

		for (var i = 0, max = habits.length; i < max; i += 1) {
			var il = document.createElement('li');
			il.innerHTML = this._generateListHTML(habits, i);
			ul.appendChild(il);
		}
	}

	static _generateListHTML(tempArray, i) {
		var output;

		output = "Habit: " + tempArray[i].name + "; Description: " + tempArray[i].description + "; Days:";
		for (var j = 0; j < tempArray[i].days.length; j++) {
			output = output + tempArray[i].days[j] + " ";
		}
		output += "Mood: " + tempArray[i].mood + "\n";

		output += "<button onclick=\"MainModule.deleteHabit(" + tempArray[i].id + ")\">delete</button>\n";
		output += "<button onclick=\"MainModule.setToEdit(" + tempArray[i].id + ")\">edit</button>\n";

		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		var day = new Date().getDay() + 1;
		for (var j = 0; j < days.length; j++) {
			output += "<label><input type=\"checkbox\" class=\"progress\" name=\"Check\" value=\"" + tempArray[i].id + " " + (6 - j) + "\" ";

			var date = new Date();
			date.setDate(date.getDate() - (6 - j));

			if (tempArray[i].isMarked(date)) {
				output += "checked"
			}

			output += ">" + days[day] + "</label>";
			day++;
			if (day == 7) {
				day = 0
			}
		}

		return output;
	}

}

var MainModule = (function () {
	var habitCatalog = new HabitCatalog();
	var toEdit;

	return {
		addElement: function (form) {

			var userInput = document.getElementById('userInputHabit').value
			var userDescription = document.getElementById('userInputDesc').value;

			temp = []
			for (var i = 0; i < form.DaysOfWeek.length; i++) {
				if (form.DaysOfWeek[i].checked === true) {
					temp.push(form.DaysOfWeek[i].value);
				}
			}

			var newMood = form.Mood.value;

			var newHabit = new Habit(userInput, userDescription, temp, newMood);

			habitCatalog.addHabit(newHabit);
		},

		editHabit: function (form) {

			var habit = habitCatalog.getHabitByID(toEdit);

			if (form.Name.value !== "") {
				habit.name = form.Name.value;
			}
			if (form.Description.value !== "") {
				habit.description = form.Description.value;
			}

			days = []
			for (var i = 0; i < form.DaysOfWeek.length; i++) {
				if (form.DaysOfWeek[i].checked === true) {
					days.push(form.DaysOfWeek[i].value);
				}
			}
      
			habit.days = days;
			habit.mood = form.Mood.value;

			$.get("/edithabit?name=" + habit.name +
				"&description=" + habit.description +
				"&days=" + habit.days +
				"&mood=" + habit.mood +
				"&id=" + habit.id
			);
			UI.showElements(habitCatalog.getHabits());
		},

		deleteHabit: function (id) {
			habitCatalog.deleteHabit(id);
		},

		setToEdit: function (id) {
			var editForm = document.getElementById("edit-habit");
			var editHabit = habitCatalog.getHabitByID(id);

			editForm.elements["Name"].value = editHabit.name;
			editForm.elements["Description"].value = editHabit.description;

			var checkboxes = editForm.elements["DaysOfWeek"];
			for (i = 0; i < checkboxes.length; i++) {
				if (editHabit.days.indexOf(checkboxes[i].value) !== -1) {
					checkboxes[i].checked = true;
				} else {
					checkboxes[i].checked = false;
				}
			}

			var moods = editForm.elements["Mood"];
			if (editHabit.mood == "Positive") {
				moods[0].checked = true;
			} else {
				moods[1].checked = true;
			}

			toEdit = id;
		},

		changeProgress: function (e) {

			var values = e.val().split(" ");

			habit = habitCatalog.getHabitByID(values[0]);
			var date = new Date();
			date.setDate(date.getDate() - values[1]);

			if (e.is(":checked")) {
				habit.markDone(date);
			} else {
				habit.markUndone(date);
			}

		},

		initialShow: function () {
			UI.showElements(habitCatalog.getHabits());
		}
	}

})();

$(document).ready(function () {
	MainModule.initialShow();
	$(document).on('change', 'input.progress', function () {
		MainModule.changeProgress($(this))
	});
});
