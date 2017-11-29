
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




var MainModule = ( function () {

	var habitCatalog = new HabitCatalog();

	return {

	}

})();
