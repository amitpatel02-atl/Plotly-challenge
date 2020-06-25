// Create a variable and make it a list
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
  console.log(dropValue)
  
  // Add the charts and the panel to the init function
  // so when the ID number changes the demographic panel and the charts update as well
  demographic_panel(dropValue);
  create_charts(dropValue);
  
}

function demographic_panel(dropValue){

  //   Read JSON file
  d3.json("samples.json").then((data)=>{

  // Read data
  metadata=data.metadata;

  // Create a variable to filter the sample object ID  
  var array= metadata.filter(sample_object => sample_object.id == dropValue);
  var results= array[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");
  
    // Use `.html("") to clear any existing metadata
    panel.html("");
  
    // Use `Object.entries` to add each key & value to the panel
    Object.entries(results).forEach(([key, value]) => {
      panel.append("h5").text(`${key}:${value}`);
    });
  });
  
  
}

function create_charts(sample){

  //   Read JSON file
  d3.json("samples.json").then((data)=>{

    // Read data
    samples=data.samples;
  
    // We filtered the samples from the samples.json as well as the results
    var array= samples.filter(sample_object => sample_object.id == sample);
    var results= array[0];
    var otu_ids= results.otu_ids;
    var sample_values= results.sample_values;
    var otu_labels=results.otu_labels;

    // Create bubble chart
    var bubble = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: `markers`,
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    };

    // Title the buble chart and display
    var data = [bubble];
    var layout = {
      title: "Belly Button Bacteria",
      xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot("bubble", data, layout);
  
    // Create a bar graph and display it
    var bar = [{
    x: sample_values.slice(0,10).reverse(),
    y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    type: "bar",
    orientation: "h",

  }];
  Plotly.newPlot("bar", bar);
});
};

// Create function to update bar charts and panel when the OTU ID number is changed
function optionChanged (sample) {
demographic_panel(sample);
create_charts(sample);
}
