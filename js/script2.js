
function HabitCatalog() {
	this.array = [];
}

HabitCatalog.prototype.addHabit = function(habit) { array.push(habit) };

function Habit(name, description, days, mood) {
	this.name = name;
	this.description = description;
	this.days = days;
	this.mood = mood;
}

Habit.prototype.setName = function(name) { this.name = name };
Habit.prototype.setDescription = function(description) { this.description = description }
Habit.prototype.setDays = function(days) { this.days = days };


window.onload = function(){
    document.getElementById("habitNew").onclick = addElement;
    //document.getElementById("habitDelete").onclick = deleteElement;
}

function addElement(){
    var ul = document.getElementById('habitList');
    var il = document.createElement('li');
    var deleteButton = document.createElement('button');
    var userInput = document.getElementById('userInputHabit').value
    il.innerHTML = userInput;
    
   //deleteButton.innerHTML = 'Delete';
   //deleteButton.id = "habitDelete";
    ul.appendChild(il); 
   //ul.appendChild(deleteButton);
}
