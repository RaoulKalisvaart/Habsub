function addContent(argument) {

	// var bodyDelete = document.getElementById("body");

	// while (bodyDelete.firstChild) {
	// 	bodyDelete.removeChild(bodyDelete.firstChild);
	// }

	// for (var i = 1; i <= 15; i++) {
	// 	(function(i) {
	// 		var title = document.createElement("h2");
	// 		title.appendChild(document.createTextNode("These are the results of query " + i + ": "));

	// 		var list = document.createElement("ul");

	// 		$.getJSON("/query" + i, function(data) {
	// 			for (var j = 0; j < data.length; j++) {
	// 				console.log(list);
	// 				var toAppend = document.createElement("li");
	// 				toAppend.appendChild(document.createTextNode(JSON.stringify(data[j])));
	// 				list.appendChild(toAppend);
					
	// 			}
	// 		})

	// 		var body = document.getElementById("body");

	// 		body.appendChild(title);
	// 		body.appendChild(list);
	// 	})(i);
	// }

	function buildHtmlTable(selector, array) {
		var columns = addAllColumnHeaders(array, selector);

		for (var i = 0; i < array.length; i++) {
			var row$ = $('<tr/>');
			for (var colIndex = 0; colIndex < columns.length; colIndex++) {
				var cellValue = array[i][columns[colIndex]];
				if (cellValue == null) cellValue = "";
				row$.append($('<td/>').html(cellValue));
			}
			$(selector).append(row$);
		}
	}

	function addAllColumnHeaders(array, selector) {
		var columnSet = [];
		var headerTr$ = $('<tr/>');

		for (var i = 0; i < array.length; i++) {
			var rowHash = array[i];
			for (var key in rowHash) {
				if ($.inArray(key, columnSet) == -1) {
					columnSet.push(key);
					headerTr$.append($('<th/>').html(key));
				}
			}
		}
		$(selector).append(headerTr$);

		return columnSet;
	}

	function clearHtmlTable(selector) {
		var table = document.getElementById(selector);
		while (table.firstChild) {
			table.removeChild(table.firstChild);
		}
	}

	$.getJSON("/queries", function(data) {
		Object.entries(data).forEach(([name, query]) => {
			clearHtmlTable(name);
			buildHtmlTable("#" + name, query);
		});
	})
}

$(document).ready(function() {
	addContent();
	window.setInterval(function(){
		addContent();
	}, 5000);
});
