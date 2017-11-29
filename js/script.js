
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

	var habit = new Habit("test", "test description");

	return {

		editHabit: function (form) {
			if(form.Title.value !== "") { habit.setName(form.Title.value); }
			if(form.Description.value !== "") { habit.setDescription(form.Description.value); }

			days = []
			for (var i = 0; i < form.DaysOfWeek.length; i++) {
				if(form.DaysOfWeek[i].checked === true){
					days.push(form.DaysOfWeek[i].value);
				}
			}
			habit.setDays(days)


		}

	}

})();
