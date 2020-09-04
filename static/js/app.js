// Step 1 - read in .json file and create DD
var select = d3.select("#selDataset");
d3.json("samples.json").then(data =>{
    var dd_names = data.names;
    select.selectAll("option").data(dd_names).enter().append("option").text(function (ddown) {
        return ddown;
    });
    
})

//  Step 2 - The code below will create my .on event 
select.on("change",handle);

//  Step 3 -The code below will create the handler for my events
function handle () {
    d3.json("samples.json").then(data =>{
        var target = select.property("value");
        for (var b = 0;b<data.names.length;b++) {
                if (target === data.names[b]) {
                    bubblePlt();
                    gaugeChart();
                    addDemoinfo();
                    barChart();  
                }
            }
    })
};

//  Step 3 - The code below will create my bubble plot
function bubblePlt () {
    d3.json("samples.json").then(data =>{
        var target = select.property("value");
        for (var b = 0;b<data.names.length;b++) {
                if (target === data.names[b]) {
                    var data_ids = data.samples[b].otu_ids;
                    var sample_data_values = data.samples[b].sample_values;
                    var data_lables = data.samples[b].otu_labels;

                    var id_list2 = [];
                    var labels_list2 = [];
                    var smpl_list2 = [];
                   
                    
                    for (var d = 0; d<data.samples[b].sample_values.length; d++) {

                        id_list2.push(data_ids[d]);
                        smpl_list2.push(sample_data_values[d]);
                        labels_list2.push(data_lables[d]);
                
                    };

                    console.log(id_list2);

                    var trace_a = {
                    mode: "markers",
                    x: id_list2,
                    y: smpl_list2,
                    text: labels_list2,
                    marker:{
                        color: id_list2,
                        size: smpl_list2,
                        sizemode: "area"
                            }
                    };
                    
                    var layout_a = {
                        title:"Data Values based on ID",
                    };

                    var bubblePlt = [trace_a];
                    Plotly.newPlot("bubble",bubblePlt,layout_a);
                }
            }
    })
};

//  Step 3 - The code below will create my bubble chart
function addDemoinfo() {
    d3.json("samples.json").then(data =>{
        var target = select.property("value");
        for (var b = 0;b<data.names.length;b++) {
            if (target === data.names[b]) {
                d3.select("#sample-metadata").html(
                `<ul>
                <li>ID: ${data.metadata[b].id} </li>
                <li>Ethnicity: ${data.metadata[b].ethnicity} </li>
                <li>Gender: ${data.metadata[b].gender} </li>
                <li>Age: ${data.metadata[b].age} </li>
                <li>Location: ${data.metadata[b].location} </li>
                <li>BBType: ${data.metadata[b].bbtype} </li>
                <li> Wfreq: ${data.metadata[b].wfreq} </li>
                </ul>`
                );
            }
        };      
    })
};

// The code below will create my Bar chart
function barChart() {
    d3.json("samples.json").then(data =>{
        var target = select.property("value");
        for (var b = 0;b<data.names.length;b++) {
                if (target === data.names[b]) {

                    var data_ids = data.samples[b].otu_ids;
                    var sample_data_values = data.samples[b].sample_values;
                    var data_lables = data.samples[b].otu_labels;

                    var id_list = [];
                    var smpl_list = [];
                    var labels_list = [];

                    for (var i = 0; i<10; i++) {
                        id_list.push("OTU ID"+data_ids[i]);
                        labels_list.push(data_lables[i]);
                        smpl_list.push(sample_data_values[i]);

                    var trace_b = {
                        type: "bar",
                        x: smpl_list,
                        y: id_list,
                        text: labels_list,
                        orientation: "h",
                        };
                    
                        var barChart = [trace_b];
                    
                        var layout_b = {
                            title:"Data Values based on ID",
                            // colorway = c('#3d3b72'),
                        };
                    
                        Plotly.newPlot("bar",barChart,layout_b);

                    };
                }
            }
    })
};

//The code below will create my gauge chart
function gaugeChart () {
    d3.json("samples.json").then(data =>{
        var target = select.property("value");
        for (var b = 0;b<data.names.length;b++) {
            if (target === data.names[b]) {

            var trace_3 = {
                value: data.metadata[b].wfreq,
                title: { text: "W-Frequency" },
                mode: "gauge+number",
                type: "indicator",
                gauge: {
                    axis: { range: [null, 9], tickwidth: 1, tickcolor: "red" },
                    bar: { color: "yellow" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "grey",
                    steps: [
                      { range: [0, 1], color: "limegreen" },
                      { range: [1, 2], color: "green" },
                      { range: [2, 3], color: "teal" },
                      { range: [3, 4], color: "cyan" },
                      { range: [4, 5], color: "blue" },
                      { range: [5, 6], color: "indigo" },
                      { range: [6, 7], color: "purple" },
                      { range: [7, 8], color: "magenta" },
                      { range: [8, 9], color: "red" }
                    ],
                }
            };
            
            var gaugeChart = [trace_3];
            Plotly.newPlot("gauge",gaugeChart);
            }
        }
    })
};
