
function HabitCatalog() {
	this.array = [];
}

HabitCatalog.prototype.addHabit = function(habit) { this.array.push(habit) };

function Habit(name, description, days, mood) {
	this.name = name;
	this.description = description;
	this.days = days;
	this.mood = mood;
}

Habit.prototype.setName = function(name) { this.name = name };
Habit.prototype.setDescription = function(description) { this.description = description }
Habit.prototype.setDays = function(days) { this.days = days };

var MainModule = ( function () {
    var habitCatalog = new HabitCatalog();

	return {
        addElement: function(){
            var ul = document.getElementById('habitList');
            var il = document.createElement('li');
            var userInput = document.getElementById('userInputHabit').value
            var userDescription = document.getElementById('userInputDesc').value;
            var habitDays = [];

            //var inputs = document.getElementsByTagName('input').getElementsByTagName("input")

           /* for(var i = 0, max = inputs.length; i < max; i+= 1){
                if(inputs[i].type === "checkbox" && inputs[i].checked) {
                    habitDays.push(inputs[i].value);
                 }
        }*/
            var newHabit = new Habit(userInput, userDescription, null, null);
            habitCatalog.addHabit(newHabit);
            MainModule.showElements();
            //console.log(habitCatalog);
        },
    
        showElements: function(){
            var tempArray = habitCatalog.array;
            for(var i = 0, max = tempArray.length; i < max; i += 1){
                var output;
                output = "Habit: " + tempArray[i].name + "; Description: " + tempArray[i].description + " ";
                var ul = document.getElementById('habitList');
                var il = document.createElement('li');
                il.innerHTML = output;
                ul.appendChild(il);
            }
        },

        editHabit: function (form, habit) {

        	// FOR DEBUGGING ONLY
        	if(habit == null) { habit = new Habit("test", "test description"); }

			if(form.Name.value !== "") { habit.setName(form.Name.value); }
			if(form.Description.value !== "") { habit.setDescription(form.Description.value); }

			days = []
			for (var i = 0; i < form.DaysOfWeek.length; i++) {
				if(form.DaysOfWeek[i].checked === true){
					days.push(form.DaysOfWeek[i].value);
				}
			}
			habit.setDays(days);

			// FOR DEBUGGING ONLY
			console.log(habit);
		},
	}

})();

window.onload = function(){
    document.getElementById("habitNew").onclick = MainModule.addElement;
    //document.getElementById("habitDelete").onclick = deleteElement;
}
