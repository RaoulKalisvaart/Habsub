// function HabitCatalog() {
// 	this.array = [];
// }

// HabitCatalog.prototype.addHabit = function(habit) { this.array.push(habit) };
// HabitCatalog.prototype.deleteHabit = function(id) { this.array.splice(id, 1); };

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

// function Habit(name, description, days, mood) {
// 	this.name = name;
// 	this.description = description;
// 	this.days = days;
// 	this.mood = mood;
// }

// Habit.prototype.setName = function(name) { this.name = name };
// Habit.prototype.setDescription = function(description) { this.description = description }
// Habit.prototype.setDays = function(days) { this.days = days };
// Habit.prototype.setMood=function(mood) {this.mood = mood};

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

            // var ul = document.getElementById('habitList');
            // var il = document.createElement('li');
            var userInput = document.getElementById('userInputHabit').value
            var userDescription = document.getElementById('userInputDesc').value;
            // var habitDays = [];

            //var inputs = document.getElementsByTagName('input').getElementsByTagName("input")

           /* for(var i = 0, max = inputs.length; i < max; i+= 1){
                if(inputs[i].type === "checkbox" && inputs[i].checked) {
                    habitDays.push(inputs[i].value);
                 }
        	}*/

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
            console.log(habitCatalog);
        },
    
        showElements: function(){
            var tempArray = habitCatalog.getHabits();
            // FOR DEBUGGING ONLY
            //console.log(tempArray);
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

			// FOR DEBUGGING ONLY
			//console.log(habit);
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
