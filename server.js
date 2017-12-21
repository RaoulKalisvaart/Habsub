var express = require("express");
var url = require("url");
var http = require("http");
var mysql = require("mysql");

var port = 3000;
var app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Password',
  database : 'Habits'
});
 
connection.connect();

// var id = 2;
// var habits = [];
// var h1 = {
//     id: 0,
//     name: "Voetballen",
//     description: "Met je voet tegen een bal trappen",
//     days: "Monday, Sunday",
//     mood: "Positive"
// };

// var h2 = {
//     id: 1,
//     name: "Werken",
//     description: "Bij de Jumbo",
//     days: "Saturday",
//     mood: "Positive"
// };

// habits.push(h1);
// habits.push(h2);

app.get("/habits", function (req, res) {
    console.log("Displaying habits");
    connection.query("select id, title as name, description, days, mood from habit", function(error, results){
        res.json(results);
    });
});

app.get("/addhabit", function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    if (query["name"] !== undefined) {

        // var newObj = {
        //     id: id++,
        //     name: query["name"],
        //     description: query["description"],
        //     days: query["days"],
        //     mood: query["mood"]
        // };
        var queryString = "insert into habit (id, title, description, days, mood) values (null, \"" + query["name"] + "\", \"" + query["description"] + "\", \"" + query["days"] + "\", \"" + query["mood"] + "\")";
        console.log(queryString);

        connection.query(queryString, function(error, results){

        })
        console.log("Added ");

        connection.query("SELECT LAST_INSERT_ID()", function(error, results) {
            res.end(results.toString());
        })

    } else {
        res.status(400);
        res.end("Error: wrong input");
    }
});

app.get("/edithabit", function (req, res) {
    var query = url.parse(req.url, true).query;

    if (query["id"] !== undefined) {

        // var index = habits.findIndex(function (e) {
        //     return e.id == query["id"];
        // });

        if (query["name"]) {
            // habits[index].name = query["name"];
            connection.query("update habit set title = \"" + query["name"] + "\" where id = " + query["id"])
        }

        if (query["description"]) {
            // habits[index].description = query["description"];
            connection.query("update habit set description = \"" + query["description"] + "\" where id = " + query["id"])
        }

        if (query["days"]) {
            // habits[index].days = query["days"];
            connection.query("update habit set days = \"" + query["days"] + "\" where id = " + query["id"])
        }

        if (query["mood"]) {
            // habits[index].mood = query["mood"];
            connection.query("update habit set mood = \"" + query["mood"] + "\" where id = " + query["id"])
        }

        res.end("Habit edited succesfully");

    } else {
        res.status(400);
        res.end("Error: wrong input");
    }
});

app.get("/deletehabit", function (req, res) {
    var query = url.parse(req.url, true).query;

    console.log("Trying to delete habit with id: " + query["id"]);

    if (query["id"] !== undefined) {

        connection.query("delete from habit where id = " + query["id"]);
        res.end("Habit deleted succesfully");

    } else {
        res.status(400);
        res.end("Error: wrong input");
    }
})

app.get("/query1", function (req, res) {
    connection.query("Select * from habit_list where owner = 1", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query2", function (req, res) {
    connection.query("Select * from habit where habit_list_id = 1", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query3", function (req, res) {
    connection.query("Select * from habit where habit_list_id = 1 limit 1, 500", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query4", function (req, res) {
    connection.query("Select * from habit where frequency_id = 1", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query5", function (req, res) {
    connection.query("Select * from habit, habit_list where habit.habit_list_id = habit_list.id and habit_list.isPublic = 1", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query6", function (req, res) {
    connection.query("Select habit_id from habit, habit_done where habit_id = habit_done.habit_id and habit_done.timestamp between '2017-10-26 00:00:00' AND '2017-11-26 23:59:59'", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query7", function (req, res) {
    connection.query("Select * from habit, habit_list where habit_list.owner = 1 and habit_list_id = habit.habit_list_id", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query8", function (req, res) {
    connection.query("Select distinct name from day_of_week, habit_day_of_week, habit where day_of_week.id = habit_day_of_week.day_of_week_id and habit_id = habit_day_of_week.habit_id and habit_id = 3", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query9", function (req, res) {
    connection.query("Select * from habit_list, habit, habit_day_of_week, day_of_week where  day_of_week.id = habit_day_of_week.day_of_week_id and habit_day_of_week.habit_id = habit.id and habit.habit_list_id = habit_list.id and day_of_week.name = 'MONDAY'", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query10", function (req, res) {
    connection.query("Select ( Select count(distinct habit.id) from habit_done, habit, habit_day_of_week, day_of_week where habit_done.habit_id = habit.id and habit.id = habit_day_of_week.habit_id and habit_day_of_week.day_of_week_id = day_of_week.id and day_of_week.name = 'MONDAY' ) as done, ( Select count(distinct habit.id) from habit_done, habit, habit_day_of_week, day_of_week where habit.id not in (select habit_done.habit_id from habit_done) and habit.id = habit_day_of_week.habit_id and habit_day_of_week.day_of_week_id = day_of_week.id and day_of_week.name = 'MONDAY' )as notDone", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query11", function (req, res) {
    connection.query("Select count(habit.id) from habit_done, habit where habit.id = habit_done.habit_id and habit_done.timestamp between '2017-01-01 00:00:00' AND '2017-12-31 23:59:59' and habit.id = 1", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query12", function (req, res) {
    connection.query("Select  datediff(max(habit_done.timestamp), min(habit_done.timestamp)) as diff from habit, habit_done group by habit.id having diff >= 14 or diff <= -14 order by diff desc limit 5", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query13", function (req, res) {
    connection.query("select distinct  w1.day_of_week_id as w1, w2.day_of_week_id as w2 from habit_day_of_week as w1, habit_day_of_week as w2 where w1.habit_id = w2.habit_id and w1.day_of_week_id != w2.day_of_week_id", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query14", function (req, res) {
    connection.query("Select avg(habitCount) from ( Select count(habit_done.habit_id) as habitCount from habit_done, habit, habit_list where habit_list.id = habit.habit_list_id and habit_done.habit_id = habit.id and habit_list.id = 4 group by habit.id) as test", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

app.get("/query15", function (req, res) {
    connection.query("", function(error, results) {
        res.end(JSON.stringify(results));
    })
})

