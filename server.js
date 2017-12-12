var express = require("express");
var url = require("url");
var http = require("http");


var port = 3000;
var app = express();
app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(port);

var habits = [];
var h1 =
{
    name : "Voetballen",
    description : "Met je voet tegen een bal trappen",
    days : "Monday, Sunday",
    mood : "positive"
};

var h2 = 
{
    name : "Werken",
    description : "Bij de Jumbo",
    days : "Saturday",
    mood : "positive"
};

habits.push(h1);
habits.push(h2);

app.get("/habits", function(req, res){
    console.log("Habits added");
    res.json(habits);
});

app.get("/addhabit", function(req, res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    if(query["name"]!==undefined){
        var newObj = {name: query["name"],
        description: query["description"],
        days: query["days"],
        mood: query["mood"]
    };
    habits.push(newObj);
    console.log("Added ");
    res.end("Habit added succesfully ");
    }
    else{
        res.end("Error: wrong input");
    }
});

app.get("/update", function(req, res){
    if(query["name"]!==undefined){
        
        if(query["newName"]!==undefined){
            
        }
    }
});