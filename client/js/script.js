
class HabitCatalog {

	constructor() {
		var tmpArray = [];

		$.get("/habits", function (data) {
			for (var i = 0; i < data.length; i++) {
				tmpArray.push(new Habit(data[i].name, data[i].description, data[i].days.split(","), data[i].mood));
			}
		});

		this.array = tmpArray;

	}

	addHabit(habit) {
		this.array.push(habit);
	}

	deleteHabit(id) {
		this.array.splice(id, 1);
	}

	getHabits() {
		return this.array;
	}

	getHabitByID(id) {
		return this.array[id];
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

	_findDate(date){
		for (var i = 0; i < this._progress.length; i++) {
			if(Math.round((this._progress[i]-date)/(1000*24*60*60)) == 0){
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

// $(document).on("click", ".progress", function() {
// 	var attr = $(this).attr('style');
// 	if (typeof attr !== typeof undefined && attr !== false) {
// 		$(this).removeAttr("style");
// 	} else {
// 		$(this).css("background-color", "green");
// 	}
// })

var MainModule = ( function () {

	var habitCatalog = new HabitCatalog();
    var toEdit;

	return {
        addElement: function(form){

            var userInput = document.getElementById('userInputHabit').value
            var userDescription = document.getElementById('userInputDesc').value;

            temp = []
			for (var i = 0; i < form.DaysOfWeek.length; i++) {
				if(form.DaysOfWeek[i].checked === true){
					temp.push(form.DaysOfWeek[i].value);
				}
            }
            
            var newMood = form.Mood.value;
            
            var newHabit = new Habit(userInput, userDescription, temp, newMood);

            $.get("/addhabit?name=" + newHabit.name + "&description=" + newHabit.description + "&days=" + newHabit.days + "&mood=" + newHabit.mood);

            habitCatalog.addHabit(newHabit);
            MainModule.showElements();
        },
    
        showElements: function(){
            var tempArray = habitCatalog.getHabits();
            var ul = document.getElementById('habitList');

            while (ul.firstChild) {
				ul.removeChild(ul.firstChild);
			}

            for(var i = 0, max = tempArray.length; i < max; i += 1){
                var output;
                output = "Habit: " + tempArray[i].name + "; Description: " + tempArray[i].description + "; Days:";
                for(var j = 0; j < tempArray[i].days.length; j++)
                {
                    output = output + tempArray[i].days[j] + " ";
                }
                output += "Mood: " + tempArray[i].mood +"\n";
                output += "<button onclick=\"MainModule.deleteHabit(" + i + ")\">delete</button>\n";
                output += "<button onclick=\"MainModule.setToEdit(" + i + ")\">edit</button>\n";

                var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                var day = new Date().getDay() + 1;
                for (var j = 0; j < days.length; j++) {
                	output += "<label><input type=\"checkbox\" class=\"progress\" name=\"Check\" value=\"" + i + " " + (6-j) + "\" ";

                	var date = new Date();
					date.setDate(date.getDate() - (6-j));

                	if(tempArray[i].isMarked(date)) {
                		output += "checked"
                	}

                	output += ">" + days[day] + "</label>";
                	day++;
                	if(day == 7) { day = 0 }
                }

                var il = document.createElement('li');
                il.innerHTML = output;
                ul.appendChild(il);
            }
        },

        editHabit: function (form) {

        	var habit = habitCatalog.getHabitByID(toEdit);

			if(form.Name.value !== "") { habit.name = form.Name.value; }
			if(form.Description.value !== "") { habit.description = form.Description.value; }

			days = []
			for (var i = 0; i < form.DaysOfWeek.length; i++) {
				if(form.DaysOfWeek[i].checked === true){
					days.push(form.DaysOfWeek[i].value);
				}
			}
            habit.days = days;
            habit.mood = form.Mood.value;
			MainModule.showElements();
			
		},

        deleteHabit: function (id) {
			habitCatalog.deleteHabit(id);
			MainModule.showElements();
		},

		setToEdit: function (id) {
			toEdit = id;
		},

		changeProgress: function (e) {

			var values = e.val().split(" ");

			habit = habitCatalog.getHabitByID(values[0]);
			var date = new Date();
			date.setDate(date.getDate() - values[1]);

			if(e.is(":checked")) {
				habit.markDone(date);
			} else {
				habit.markUndone(date);
			}

		}
	}

})();

$(document).ready(function(){
	MainModule.showElements();
    $(document).on('change', 'input.progress', function() {
    	MainModule.changeProgress($(this))
    });
});
