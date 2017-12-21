function addContent(argument) {

	var bodyDelete = document.getElementById("body");

	while (bodyDelete.firstChild) {
		bodyDelete.removeChild(bodyDelete.firstChild);
	}

	for (var i = 1; i <= 15; i++) {
		(function(i) {
			var title = document.createElement("h2");
			title.appendChild(document.createTextNode("These are the results of query " + i + ": "));

			var list = document.createElement("ul");

			$.getJSON("/query" + i, function(data) {
				for (var j = 0; j < data.length; j++) {
					console.log(list);
					var toAppend = document.createElement("li");
					toAppend.appendChild(document.createTextNode(JSON.stringify(data[j])));
					list.appendChild(toAppend);
					
				}
			})

			var body = document.getElementById("body");

			body.appendChild(title);
			body.appendChild(list);
		})(i);
	}
}

$(document).ready(function() {
	addContent();
	window.setInterval(function(){
	  addContent();
	}, 5000);
});

var myNode = document.getElementById("foo");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}