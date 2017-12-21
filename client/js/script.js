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

	function findDate(date){
		for (var i = 0; i < progress.length; i++) {
			if(Math.round((progress[i]-date)/(1000*24*60*60)) == 0){
				return i;
			}
		}
		return -1;
	}

	function markDone(date) {
		progress.push(date);
	}

	function markUndone(date) {
		var id = findDate(date);
		progress.splice(id, 1);
	}

	function isMarked(date) {
		return findDate(date) != -1;
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

            if(!$(form).hasClass("hidden")) {
				$(form).addClass("hidden");
			}

        },
    
        showElements: function(){
			var tempArray = habitCatalog.getHabits();
			var table = document.getElementById("habits");
			var nRows = table.rows.length;
			//for(var i = 1; i < nRows; i += 1){
				//table.deleteRow(i);
			//}

			while(table.rows.length > 1)
			{
				table.deleteRow(1);
			}

			for(var i = 0, max = tempArray.length; i < max; i += 1){
				
				var row = table.insertRow(1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				var cell7 = row.insertCell(6);
				var cell8 = row.insertCell(7);

				cell1.innerHTML = tempArray[i].getName();
				if(tempArray[i].getDays().indexOf("Monday") !== -1){
					var output = ""
					output += "X" + "<button class=\"deleteButton\" onclick=\"MainModule.deleteHabit(" + i + ")\">delete</button>\n";
					output += "<button class=\"editButton\" onclick=\"MainModule.setToEdit(" + i + ")\">edit</button>\n";
					output += "<button class=\"doneButton\" onclick=\"MainModule.setDone(" + i + ")\">done!</button>\n";
					cell2.innerHTML = output;
				}
				if(tempArray[i].getDays().indexOf("Tuesday") !== -1){
					var output = ""
					output += "X" + "<button class=\"deleteButton\" onclick=\"MainModule.deleteHabit(" + i + ")\">delete</button>\n";
					output += "<button class=\"editButton\" onclick=\"MainModule.setToEdit(" + i + ")\">edit</button>\n";
					output += "<button class=\"doneButton\" onclick=\"MainModule.setDone(" + i + ")\">done!</button>\n";
					cell3.innerHTML = output;
				}
				if(tempArray[i].getDays().indexOf("Wednesday") !== -1){
					var output = ""
					output += "X" + "<button class=\"deleteButton\" onclick=\"MainModule.deleteHabit(" + i + ")\">delete</button>\n";
					output += "<button class=\"editButton\" onclick=\"MainModule.setToEdit(" + i + ")\">edit</button>\n";
					output += "<button class=\"doneButton\" onclick=\"MainModule.setDone(" + i + ")\">done!</button>\n";
					cell4.innerHTML = output;
				}
				if(tempArray[i].getDays().indexOf("Thursday") !== -1){
					var output = ""
					output += "X" + "<button class=\"deleteButton\" onclick=\"MainModule.deleteHabit(" + i + ")\">delete</button>\n";
					output += "<button class=\"editButton\" onclick=\"MainModule.setToEdit(" + i + ")\">edit</button>\n";
					output += "<button class=\"doneButton\" onclick=\"MainModule.setDone(" + i + ")\">done!</button>\n";
					cell5.innerHTML = output;
				}
				if(tempArray[i].getDays().indexOf("Friday") !== -1){
					var output = ""
					output += "X" + "<button class=\"deleteButton\" onclick=\"MainModule.deleteHabit(" + i + ")\">delete</button>\n";
					output += "<button class=\"editButton\" onclick=\"MainModule.setToEdit(" + i + ")\">edit</button>\n";
					output += "<button class=\"doneButton\" onclick=\"MainModule.setDone(" + i + ")\">done!</button>\n";
					cell6.innerHTML = output;
				}
				if(tempArray[i].getDays().indexOf("Saturday") !== -1){
					var output = ""
					output += "X" + "<button class=\"deleteButton\" onclick=\"MainModule.deleteHabit(" + i + ")\">delete</button>\n";
					output += "<button class=\"editButton\" onclick=\"MainModule.setToEdit(" + i + ")\">edit</button>\n";
					output += "<button class=\"doneButton\" onclick=\"MainModule.setDone(" + i + ")\">done!</button>\n";
					cell7.innerHTML = output;
				}
				if(tempArray[i].getDays().indexOf("Sunday") !== -1){
					var output = ""
					output += "X" + "<button class=\"deleteButton\" onclick=\"MainModule.deleteHabit(" + i + ")\">delete</button>\n";
					output += "<button class=\"editButton\" onclick=\"MainModule.setToEdit(" + i + ")\">edit</button>\n";
					output += "<button class=\"doneButton\" onclick=\"MainModule.setDone(" + i + ")\">done!</button>\n";
					cell8.innerHTML = output;
				}

				if(tempArray[i].getMood() == "Positive"){
					row.style.backgroundColor = "LightGreen";
				}
				if(tempArray[i].getMood() == "Negative"){
					row.style.backgroundColor = "LightCoral";
				}
			}
			
			/*
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
                output += "<button class=\"editButton\" onclick=\"MainModule.setToEdit(" + i + ")\">edit</button>\n";

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
            }*/
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

			if(!$(form).hasClass("hidden")) {
				$(form).addClass("hidden");
			}
			
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
    $(document).on('click', 'button.editButton', function() {
    	if($("form#edit-habit").hasClass("hidden")) {
			$("form#edit-habit").removeClass("hidden");
		}
    })
    $(document).on('click', 'button#addHabit', function() {
    	if($("form#inputForm").hasClass("hidden")) {
			$("form#inputForm").removeClass("hidden");
		}
    })
});