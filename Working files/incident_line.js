<div>
<div id = "line"></div>
</div> 

// This function is called when a dropdown menu item is selected
function updatePlotly() {
    
    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#incidents").on("change", updatePlotly);

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("userSelincident");

    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  
    // Select the input value from the form
    var state = d3.select("#userSelincident").property("value");
    console.log("incident_type", i);
    console.log("fy_declared", y);

    // clear the input value
    d3.select("#userSelincident").property("value","");

    // Build the plot with the new incident
    buildPlot(incident);
}
function buildPlot(state) {
    var apiKey = " "
  
    var url = "http://127.0.0.1:5000/alldisasters"
  
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