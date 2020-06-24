
var names = [];
var metadata = [];
var samples = [];


//   Read JSON file
d3.json("samples.json").then((data)=>{

    //Read data
    names=data.names;
    metadata=data.metadata;
    samples=data.samples;

    console.log(names);

    init();
});

function init() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("select");
  
  //  Placing all the ID's in drop down menu
  names.forEach((sample)=>{
  dropdownMenu.append("option").text(sample).property("value",sample)});

  // Assign the value of the dropdown menu option to a variable
  var dropValue = dropdownMenu.property("value");
  
  demographic_panel(dropValue);
  
}




// This function is called when a dropdown menu item is selected
function updatePlotly() {
  

}


function demographic_panel(dropValue){
  
    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");
  
    // Use `.html("") to clear any existing metadata
    panel.html("");
  
    // Use `Object.entries` to add each key & value to the panel
    Object.entries(data).forEach(([key, value]) => {
      panel.append("h5").text(`${key}:${value}`);
    });
    });
  console.log(sample)
}
  metadata(sample);

// function create_bubble_chart(sample){
  
//   // Use `d3.json` to fetch the sample data for the plots
//   var plotData = `/samples/${sample}`;

//   // Build a Bubble Chart using the sample data
//   d3.json(plotData).then(function(data){
//     var x_axis = data.otu_ids;
//     var y_axis = data.sample_values;
//     var size = data.sample_values;
//     var color = data.otu_ids;
//     var texts = data.otu_labels;
  
//     var bubble = {
//       x: x_axis,
//       y: y_axis,
//       text: texts,
//       mode: `markers`,
//       marker: {
//         size: size,
//         color: color
//       }
//     };

//     var data = [bubble];
//     var layout = {
//       title: "Belly Button Bacteria",
//       xaxis: {title: "OTU ID"}
//     };
//     Plotly.newPlot("bubble", data, layout);
  
// create_bubble_chart(sample);
// });
// };

function optionChanged (sample) {

}
