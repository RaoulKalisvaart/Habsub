var mysql = require("mysql");
var config = require("./config.js");

var connection = mysql.createConnection(config.connection);
 
connection.connect();

function addHabit(query, callback) {
	var queryString = "insert into habit (id, title, description, days, mood) values (null, \"" + query["name"] + "\", \"" + query["description"] + "\", \"" + query["days"] + "\", \"" + query["mood"] + "\")";
	console.log(queryString);

	connection.query(queryString, function(error, results){})
	console.log("Added ");

	connection.query("SELECT LAST_INSERT_ID()", function(error, results) {
	    callback(results.toString());
	});
}

function fetchHabits(callback) {
	connection.query("select id, title as name, description, days, mood from habit", function(error, results){
        callback(results);
    });
}

function editHabit(query) {
	console.log('saving edit');
	var queryString = "update habit set ";

    if (query["name"]) {
        // habits[index].name = query["name"];
        queryString += "title = \"" + query["name"] + "\", ";
    }

    if (query["description"]) {
        // habits[index].description = query["description"];
        queryString += "description = \"" + query["description"] + "\", ";
    }

    if (query["days"]) {
        // habits[index].days = query["days"];
        queryString += "days = \"" + query["days"] + "\", ";
    }

    if (query["mood"]) {
        // habits[index].mood = query["mood"];
        queryString += "mood = \"" + query["mood"] + "\", ";
    }

    queryString = queryString.slice(0, -2);
    queryString += " where id = " + query["id"];

    console.log(queryString)

    connection.query(queryString, function(error, results){
    	if(error !== undefined){
    		console.log(error);
    	}
    });
}

function deleteHabit(id) {
	connection.query("delete from habit where id = " + id);
}

function queries(callback) {
	var response = {}
	connection.query("Select * from habit_list where owner = 1", function(error, results) {
        response.query1 = results;
        connection.query("Select * from habit where habit_list_id = 1", function(error, results) {
	        response.query2 = results;
	        connection.query("Select * from habit where habit_list_id = 1 limit 1, 500", function(error, results) {
		        response.query3 = results;
		        connection.query("Select * from habit where frequency_id = 1", function(error, results) {
			        response.query4 = results;
			        connection.query("Select * from habit, habit_list where habit.habit_list_id = habit_list.id and habit_list.isPublic = 1", function(error, results) {
				        response.query5 = results;
				        connection.query("Select habit_id from habit, habit_done where habit_id = habit_done.habit_id and habit_done.timestamp between '2017-10-26 00:00:00' AND '2017-11-26 23:59:59'", function(error, results) {
					        response.query6 = results;
					        connection.query("Select * from habit, habit_list where habit_list.owner = 1 and habit_list_id = habit.habit_list_id", function(error, results) {
						        response.query7 = results;
						        connection.query("Select distinct name from day_of_week, habit_day_of_week, habit where day_of_week.id = habit_day_of_week.day_of_week_id and habit_id = habit_day_of_week.habit_id and habit_id = 3", function(error, results) {
							        response.query8 = results;
							        connection.query("Select * from habit_list, habit, habit_day_of_week, day_of_week where  day_of_week.id = habit_day_of_week.day_of_week_id and habit_day_of_week.habit_id = habit.id and habit.habit_list_id = habit_list.id and day_of_week.name = 'MONDAY'", function(error, results) {
								        response.query9 = results;
								        connection.query("Select ( Select count(distinct habit.id) from habit_done, habit, habit_day_of_week, day_of_week where habit_done.habit_id = habit.id and habit.id = habit_day_of_week.habit_id and habit_day_of_week.day_of_week_id = day_of_week.id and day_of_week.name = 'MONDAY' ) as done, ( Select count(distinct habit.id) from habit_done, habit, habit_day_of_week, day_of_week where habit.id not in (select habit_done.habit_id from habit_done) and habit.id = habit_day_of_week.habit_id and habit_day_of_week.day_of_week_id = day_of_week.id and day_of_week.name = 'MONDAY' )as notDone", function(error, results) {
									        response.query10 = results;
									        connection.query("Select count(habit.id) from habit_done, habit where habit.id = habit_done.habit_id and habit_done.timestamp between '2017-01-01 00:00:00' AND '2017-12-31 23:59:59' and habit.id = 1", function(error, results) {
										        response.query11 = results;
										        connection.query("Select  datediff(max(habit_done.timestamp), min(habit_done.timestamp)) as diff from habit, habit_done group by habit.id having diff >= 14 or diff <= -14 order by diff desc limit 5", function(error, results) {
											        response.query12 = results;
											        connection.query("select distinct  w1.day_of_week_id as w1, w2.day_of_week_id as w2 from habit_day_of_week as w1, habit_day_of_week as w2 where w1.habit_id = w2.habit_id and w1.day_of_week_id != w2.day_of_week_id", function(error, results) {
												        response.query13 = results;
												        connection.query("Select avg(habitCount) from ( Select count(habit_done.habit_id) as habitCount from habit_done, habit, habit_list where habit_list.id = habit.habit_list_id and habit_done.habit_id = habit.id and habit_list.id = 4 group by habit.id) as test", function(error, results) {
													        response.query14 = results;
													        callback(response);
													    });
												    });
											    });
										    });
									    });
								    });
							    });
						    });
					    });
				    });
			    });
		    });
	    });
    });
}

module.exports = {
	addHabit: addHabit,
	fetchHabits: fetchHabits,
	editHabit: editHabit,
	deleteHabit: deleteHabit,
	analytics: queries
}
