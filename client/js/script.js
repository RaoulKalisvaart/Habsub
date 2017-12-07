var habitCatalog = ( function () {
	
	var array = [];

	function addHabit(habit) {
		array.push(habit);
	}

	function deleteHabit(id) {
		array.splice(id, 1);
	}

	function getHabits() {
		return array;
	}

	function getHabitByID(id) {
		return array[id];
	}

	return {
		addHabit: addHabit,
		deleteHabit: deleteHabit,
		getHabits: getHabits,
		getHabitByID: getHabitByID
	}

})();

var Habit = ( function (name, description, days, mood) {
	
	var progress = []

	function getName() {
		return name;
	}

	function setName(newName) {
		name = newName;
	}

	function getDescription() {
		return description;
	}

	function setDescription(newDesc) {
		description = newDesc;
	}

	function getDays() {
		return days;
	}

	function setDays(newDays) {
		days = newDays;
	}

	function getMood() {
		return mood;
	}

	function setMood(newMood) {
		mood = newMood;
	}

	function markDone(date) {
		progress.push(date);
	}

	function markUndone(date) {
		var id = progress.map(Number).indexOf(+date);
		progress.splice(id, 1);
	}

	function isMarked(date) {
		return progress.map(Number).indexOf(+date) != -1;
	}

	return {
		getName: getName,
		setName: setName,
		getDescription: getDescription,
		setDescription: setDescription,
		getDays: getDays,
		setDays: setDays,
		getMood: getMood,
		setMood: setMood,
		markDone: markDone,
		markUndone: markUndone,
		isMarked: isMarked
	}

});

$(document).on("click", ".progress", function() {
	var attr = $(this).attr('style');
	if (typeof attr !== typeof undefined && attr !== false) {
		$(this).removeAttr("style");
	} else {
		$(this).css("background-color", "green");
	}
})

var MainModule = ( function () {

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
                output = "Habit: " + tempArray[i].getName() + "; Description: " + tempArray[i].getDescription() + "; Days:";
                for(var j = 0; j < tempArray[i].getDays().length; j++)
                {
                    output = output + tempArray[i].getDays()[j] + " ";
                }
                output += "Mood: " + tempArray[i].getMood() +"\n";
                output += "<button onclick=\"MainModule.deleteHabit(" + i + ")\">delete</button>\n";
                output += "<button onclick=\"MainModule.setToEdit(" + i + ")\">edit</button>\n";

                var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                var day = new Date().getDay() + 1;
                for (var j = 0; j < days.length; j++) {
                	output += "<label><input type=\"checkbox\" class=\"progress\" name=\"Check\" value=\"" + i + " " + (6-j) + "\">" + days[day] + "</label>"
                	day++
                	if(day == 7) { day = 0 }
                }

                var il = document.createElement('li');
                il.innerHTML = output;
                ul.appendChild(il);
            }
        },

        editHabit: function (form) {

        	var habit = habitCatalog.getHabitByID(toEdit);

			if(form.Name.value !== "") { habit.setName(form.Name.value); }
			if(form.Description.value !== "") { habit.setDescription(form.Description.value); }

			days = []
			for (var i = 0; i < form.DaysOfWeek.length; i++) {
				if(form.DaysOfWeek[i].checked === true){
					days.push(form.DaysOfWeek[i].value);
				}
			}
            habit.setDays(days);
            habit.setMood(form.Mood.value);
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
    $(document).on('change', 'input.progress', function() {
    	MainModule.changeProgress($(this))
    });
});
