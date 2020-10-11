//declare array to populate with unique disaster values
var distinct_disaster=[];
// use d3 to call API to get unique disasters
d3.request("http://127.0.0.1:5000/listdisasters").get(response => {
    distinct_disaster=JSON.parse(response.response);
//call function to populate drop down with values
    populatedisasters();
})
//define function to populate drop down with values
function populatedisasters()
{
     distinct_disaster.forEach( function(item) { 
    let optionObj = document.createElement("option");
    optionObj.textContent = item;
    document.getElementById("Disasters_id").appendChild(optionObj);
 });
};

//create function for handling event user selects state
function statechange(state_id)
{
        
// define query to call API and include unique user entry
   var querystring1 = "http://127.0.0.1:5000/filter/state/"+state_id;
// create array to store response
   var datastate=[];

// use d3 to get response from the API
   d3.request(querystring1).get(response => {
    datastate = JSON.parse(response.response);
    PlotPienow(datastate, state_id)
   });
}
// set function for pie chart plotting
function PlotPienow(datastate, state_id){
arr = datastate;
//console.log(datastate);

//
const out = arr.map((obj) => {
  return {
    incident_type: obj.incident_type,
    state: obj.state,
    type:"pie"
  };
})
// create object to store relevant data for plotting
var occurrences = {};

// Object iteration to get count of each occurence in that state

for (var i = 0, j = out.length; i < j; i++) {
	 occurrences[out[i].incident_type] = (occurrences[out[i].incident_type] || 0) + 1;
}
// create variables for label and values (incident:count)
label = (Object.keys(occurrences))
values = (Object.values(occurrences))

//define data to plot
var data1 = [{
  values: values,
  labels: label,
  type: 'pie', 
  opacity: 0.6,
  }];

//set layout options
var layout = {
paper_bgcolor: 'transparent',
height: 500,
width: 800,
title: {
  text: 'Disasters in ' + state_id  + ' between 1953 and 2020',
  font: {
    family: 'Verdana',
    color: 'white',
    size: 20
  },
}, 
legend: {
  bgcolor: 'black', 
  bordercolor: 'white',
  borderwidth: '5px'
},
  font: {
    family: 'Verdana',
    size: 12,
    color: 'white',
  }
};

//plot the pie chart 
Plotly.newPlot('Visualization', data1, layout);
};

//create function for handling event user selects date (from and to dates)
function dateFilter(datesent, inputelement)
{
  
  event.preventDefault();
// Getting a reference to the input element on the page with the id property set to "datetime"
  var inputfield = d3.select("#datetime");

// Set the input element and get the HTML node
  var inputelement = inputfield.property("value");

// define query to call API and include unique user entry
  var querystring2 = "http://127.0.0.1:5000/filter/date/"+inputelement +"/"+datesent;

// use d3 to get response from the API
  d3.request(querystring2).get(response => {
  datedisasters = JSON.parse(response.response);
  buildbar(datedisasters,datesent,inputelement);
  });
}
// set function for line chart plotting
function buildbar(datedisasters,datesent,inputelement)
{

  arr22=datedisasters;
  const out = arr22.map((obj) => {
    return {
      incident_type: obj.incident_type,
      state: obj.state,
    };
  })
  if (out.length==0) { 
      alert('No data available for this date range');
      resetdata();
      return;
  }
  console.log(out)
  
// create object to store relevant data for plotting
  var occurrences1 = {};

// Object iteration to get count of states in which any incident occured (in given date range), and the total
  for (var i = 0, j = out.length; i < j; i++) {
     occurrences1[out[i].state] = (occurrences1[out[i].state] || 0) + 1;
    }
  
  list_of_states = (Object.keys(occurrences1))
   
//console.log(list_of_states.length)
  var all_traces=[]
  
   for(var i = 0, k = list_of_states.length; i < k; i++) {
    state = list_of_states[i]
     var newArray = arr22.filter(function (el) {
    return el.state ==state
  });
   
  var occurrences = {};
//console.log(newArray)

// Object iteration to get count of any incident that occured (in given date range), and the total
      for (var m = 0, n = newArray.length; m < n; m++) {
       occurrences[newArray[m].incident_type] = (occurrences[newArray[m].incident_type] || 0) + 1;
   }
//create trace
     var trace={
       x :Object.keys(occurrences),
       y : Object.values(occurrences1),
       name:state,
       type:'bar', 
       opacity: 0.6
  };
      all_traces.push(trace)
       }
  
//console.log(all_traces)

//set layout options
var layout = {
    barmode: 'stack',
    height: 600,
    width: 900,
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    legend: {
      bgcolor: 'black'
    },
      font: {
      color: 'white', 
      size: 12
    },
    title:'Disasters between '+inputelement+' & '+datesent,
    font: {
      color: 'white',
    },
    yaxis: {
      title: "Cumulative number", 
      color: 'white',
      size: 20,
      gridcolor: 'black',
      gridwidth: '3px'
    },
    xaxis: {
      title: "Incidents/Disasters", 
      size: 20,
      color: 'white',
      tickcolor: 'white'
      }
    };
  
//plot the pie chart 
  
  Plotly.newPlot('Visualization', all_traces, layout);
 }
//create function for handling event user selects disaster
function disasterchange(disaster_id)
 {

// The"/" in two fields were interefering with the API route, so changed to "~"
  disaster_id=disaster_id.replace("/","~");
    
    
// define query to call API and include unique user entry
   var querystring = "http://127.0.0.1:5000/filter/incident/"+disaster_id;

// create array to store response
    var disasterdata=[];

// use d3 to get response from the API
   d3.request(querystring ).get(response => {
    disasterdata=JSON.parse(response.response);
    console.log(disasterdata);
    buildlinechart(disasterdata, disaster_id);
       });
      
 }
 // set function for line chart plotting
 function buildlinechart(disasterdata, disaster_id) {
 
     arr1 = disasterdata;
     
     const out = arr1.map((obj) => {    
     return {
         incident_type: obj.incident_type,
         fy_declared: obj.fy_declared,     

     };
    });
// create object to store relevant data for plotting
     var occurrences = {};

// Object iteration to get count of each occurence in that state
     for (var i = 0, j = out.length; i < j; i++) {
      occurrences[out[i].fy_declared] = (occurrences[out[i].fy_declared] || 0) + 1;
     }

// create variables for label and values (Year:count)
 label = (Object.keys(occurrences))
 values = (Object.values(occurrences))
 
//create plot trace
 var trace = {
    x: label,
    y: values,
    mode: 'lines+markers',
    name:'Scatter+Lines',
    line: {
        color: 'black', 
        width: 3
    }
  };
 //set layout options 
  var layout = {
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      height: 500,
      width: 800,
           
      title:{ 
      text: disaster_id + " trends from 1953 to 2020",
      font: {
        color: 'black',
        size: 20
      },
      },
      xaxis: {
      title: "Year", 
      size: 20,
      color: 'black'
      },
      yaxis: {
      title: "Number of reported occurences", 
      color: 'black',
      size: 20
      },
  };
  var data2=[trace];
//plot the line chart 

  Plotly.newPlot('Visualization', data2, layout);

 }
//Create a function for resetting the table 
 
function resetdata() {
    Plotly.purge('Visualization');
}