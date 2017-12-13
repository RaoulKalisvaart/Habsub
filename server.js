var express = require("express");
var url = require("url");
var http = require("http");

var port = 3000;
var app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);

var id = 2;
var habits = [];
var h1 = {
    id: 0,
    name: "Voetballen",
    description: "Met je voet tegen een bal trappen",
    days: "Monday, Sunday",
    mood: "positive"
};

var h2 = {
    id: 1,
    name: "Werken",
    description: "Bij de Jumbo",
    days: "Saturday",
    mood: "positive"
};

habits.push(h1);
habits.push(h2);

app.get("/habits", function (req, res) {
    console.log("Displaying habits");
    res.json(habits);
});

app.get("/addhabit", function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    if (query["name"] !== undefined) {

        var newObj = {
            id: id++,
            name: query["name"],
            description: query["description"],
            days: query["days"],
            mood: query["mood"]
        };

        habits.push(newObj);
        console.log("Added ");
        res.end(newObj.id.toString());

    } else {
        res.status(400);
        res.end("Error: wrong input");
    }
});

app.get("/edithabit", function (req, res) {
    var query = url.parse(req.url, true).query;

    if (query["id"] !== undefined) {

        var index = habits.findIndex(function (e) {
            return e.id == query["id"];
        });

        if (query["name"]) {
            habits[index].name = query["name"];
        }

        if (query["description"]) {
            habits[index].description = query["description"];
        }

        if (query["days"]) {
            habits[index].days = query["days"];
        }

        if (query["mood"]) {
            habits[index].mood = query["mood"];
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

        habits = habits.filter(function (el) {
            return el.id != query["id"];
        });
        res.end("Habit deleted succesfully");

    } else {
        res.status(400);
        res.end("Error: wrong input");
    }
})