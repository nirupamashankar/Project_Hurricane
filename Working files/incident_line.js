<div>
<div id = "line"></div>
</div> 

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#incidents").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly() {

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("userSelincident");

    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  
    // Select the input value from the form
    var state = d3.select("#userSelincident").property("value");
    console.log(incident);

    // clear the input value
    d3.select("#userSelincident").property("value","");

    // Build the plot with the new stock
    buildPlot(incident);
}
function buildPlot(state) {
    var apiKey = " "
  
    var url = "mongodb://localhost:27017/disasters"
  
    d3.json(url).then(function(data) {

    // Grab values from the response json object to build the plots
    var year = data.dataset.fy_declared;
    var incident = data.dataset.incident_type;

    var trace = {
        type: "line",
        x: year,
        y: incident
    }

    var data = [trace];

    var layout = {
    title: "Incident type by year 1953-2020"

    }

    Plotly.newPlot("plot", data, layout);
    });
}