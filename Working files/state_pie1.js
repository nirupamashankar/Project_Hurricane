<div>
<div id = "pie"></div>
</div> 

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#states").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly() {

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("userSelState");

    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  
    // Select the input value from the form
    var state = d3.select("#userSelState").property("value");
    console.log(state);

    // clear the input value
    d3.select("#userSelState").property("value","");

    // Build the plot with the new stock
    buildPlot(state);
}
function buildPlot(state) {
    var apiKey = " "
  
    var url = "mongodb://localhost:27017/disasters"
  
    d3.json(url).then(function(data) {
  
    // Grab values from the response json object to build the plots
    var state = data.dataset.state;
    var incident = data.dataset.incident_type;

    var trace = {
        type: "pie",
        labels: incident_type,
        values: incident
    }

    var data = [trace];

    var layout = {
    title: "Incident type in ${[state]} 1953-2020"

    }

    Plotly.newPlot("plot", data, layout);
    });
}