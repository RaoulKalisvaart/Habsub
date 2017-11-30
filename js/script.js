function HabitCatalog() {
	this.array = [];
}

HabitCatalog.prototype.addHabit = function(habit) { this.array.push(habit) };
HabitCatalog.prototype.deleteHabit = function(id) { this.array.splice(id, 1); };

function Habit(name, description, days, mood) {
	this.name = name;
	this.description = description;
	this.days = days;
	this.mood = mood;
}

Habit.prototype.setName = function(name) { this.name = name };
Habit.prototype.setDescription = function(description) { this.description = description }
Habit.prototype.setDays = function(days) { this.days = days };
Habit.prototype.setMood=function(mood) {this.mood = mood};

var MainModule = ( function () {

    var habitCatalog = new HabitCatalog();

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
            var tempArray = habitCatalog.array;
            //console.log(tempArray);
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
                var il = document.createElement('li');
                il.innerHTML = output;
                ul.appendChild(il);
            }
        },

        editHabit: function (form) {

        	habit = habitCatalog.array[toEdit];

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
		}
	}

})();

window.onload = function(){
    //document.getElementById("habitNew").onclick = MainModule.addElement;
    //document.getElementById("habitDelete").onclick = deleteElement;
}