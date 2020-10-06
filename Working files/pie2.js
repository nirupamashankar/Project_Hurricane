<html>
<head>
<script>
window.onload = function() {

var dataPoints = [];

var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    title: {
            text: "Incidents Types by State, 1953-2020"
    },
    data: [{
        type: "pie",
        startAngle: 0, 
        yValueFormatString: "### Reports",
        indexLabel: "{incident_type} {y}",
        dataPoints: dataPoints
    }]
});

function addData(data) {
    for (var i = 0, i < data.length, i++) {
        dataPoints.push(
            y: 
        )
    }
    chart.render():
}

$.getJSON("../Project_NaturalDisasters/Data Files/us_disaster_declarations.json", addData);

}

</script>
</head>
<body>
<div id="chartContainer" style="height: 370px; width: 100%;"></div>
<script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
<script src="https://canvasjs.com/assets/script/canvasjs.min.js">

</script>
</body>
</html>
