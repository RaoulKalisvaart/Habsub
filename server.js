var express = require("express");
var url = require("url");
var http = require("http");
var mysql = require("mysql");
var ejs = require('ejs');
var config = require("./config.js");
var db = require("./database.js");

var port = config.port;
var app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);

var connection = mysql.createConnection(config.connection);
 
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

app.set('view engine', 'ejs');

app.get(/\/hab{1,2}[ie][dt]{1,2}s?$/i, function (req, res) {
    console.log("Displaying habits");
    connection.query("select id, title as name, description, days, mood from habit", function(error, results){
        res.json(results);
    });
});

app.get(/\/tr[ea][ck]{1,2}[ea]r$/i, function (req, res) {
    console.log("Displaying habits");
    connection.query("select id, title as name, description, days, mood from habit", function(error, results){
        //res.json(results);
        res.render('tracker', {
            data: results
        });
        // var habits = [];
        // for(var i = 0; i < results.length; i++) {
        //     var name = results[i].name;
        //     habits.push
        // }
    });
});

app.get(/\/([ae]dd?|voeg)hab{1,2}[ie][dt]{1,2}([td]?oe)?$/i, function (req, res) {
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
        // var queryString = "insert into habit (id, title, description, days, mood) values (null, \"" + query["name"] + "\", \"" + query["description"] + "\", \"" + query["days"] + "\", \"" + query["mood"] + "\")";
        // console.log(queryString);

        // connection.query(queryString, function(error, results){})
        // console.log("Added ");

        // connection.query("SELECT LAST_INSERT_ID()", function(error, results) {
        //     res.end(results.toString());
        // });

        db.addHabit(query, function(result){
            res.end(result);
        });

    } else {
        res.status(400);
        res.end("Error: wrong input");
    }
});

//DONE!
app.get(/\/[ea]dd?[ei][dt]hab{1,2}[ie][dt]{1,2}$/i, function (req, res) {
    console.log("edithabit requested");
    var query = url.parse(req.url, true).query;

    if (query["id"] !== undefined) {

        // var index = habits.findIndex(function (e) {
        //     return e.id == query["id"];
        // });

        // var queryString = "update habit set ";

        // if (query["name"]) {
        //     // habits[index].name = query["name"];
        //     queryString += "title = \"" + query["name"] + "\" ";
        // }

        // if (query["description"]) {
        //     // habits[index].description = query["description"];
        //     queryString += "description = \"" + query["description"] + "\" ";
        // }

        // if (query["days"]) {
        //     // habits[index].days = query["days"];
        //     queryString += "days = \"" + query["days"] + "\" ";
        // }

        // if (query["mood"]) {
        //     // habits[index].mood = query["mood"];
        //     queryString += "update habit set mood = \"" + query["mood"] + "\" ";
        // }

        // queryString += "where id = " + query["id"];

        db.editHabit(query);

        res.end("Habit edited succesfully");

    } else {
        res.status(400);
        res.end("Error: wrong input");
    }
});

//DONE!
app.get(/\/del[eai]e?[td]e?hab{1,2}[ie][dt]{1,2}\/(\d+)$/i, function (req, res) {
    console.log("Trying to delete habit with id: " + req.params[0]);
    if (req.params[0] !== undefined) {

        db.deleteHabit(req.params[0]);
        res.end("Habit deleted succesfully");

    } else {
        res.status(400);
        res.end("Error: wrong input");
    }
})

//DONE!
app.get(/\/[qk][uw]?[ea]rr?(y|ie)s?$/i, function(req, res) {
    db.analytics(function(result) {
        res.json(result);
    });
})
