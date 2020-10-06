<html>
<head>
<script>
window.onload = function() {

var dataPoints = [];

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title: {
        text: "Frequency of Natural Disasters by Year, 1953-2020"
    },
    axisY: {
		title: "Frequency",
		titleFontSize: 24,
        includeZero: true
    },
    data: [{
            type: "line",
            indexLabelFontSize: 16, 
            dataPoints: dataPoints
    }]
}];

function addData(data) {
    for (var (i = 0; i < data.length; i++) {
        dataPoints.push({
            x: data[i].fy_declared
            y: data[i].incident_type

        });
    }
    chart.render();

}

$.getJSON("../Project_NaturalDisasters/Data Files/us_disaster_declarations.json", addData);

}
</script>
</head>
<body>
<div id="chartContainer" style="height: 370px; width: 100%;"></div>
<script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</body>
</html>
