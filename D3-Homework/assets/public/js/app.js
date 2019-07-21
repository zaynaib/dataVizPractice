// @TODO: YOUR CODE HERE!

console.log("hello!");

//SET UP for svg wrapper
let svgWidth = 960;
let svgHeight = 600;

const margin = {top:50, right:50,bottom:50,left:50};

let chartWidth = svgWidth - margin.right - margin.left;
let chartHeight = svgHeight - margin.top - margin.bottom;

//create a svg wrapper to hold the chart and shift graph for margins

let svg = d3.select(".chart")
            .append("svg")
            .attr("width",svgWidth)
            .attr("height",svgHeight)
            .append("g")
            .attr("transform",`translate(${margin.left},${margin.top})`)

let chart = svg.append("g");

//upload data from csv file
d3.csv("data/data.csv",  healthData=> {
  //if (err) throw err;
  healthData.forEach((data) =>{
    data.poverty = Number(data.poverty);
    data.healthcare = +data.healthcare;
  })

  //scale functions for axis
  let yLinearScale = d3.scaleLinear()
                        .range([chartHeight,0]) //how big your outputs are
                        .domain([0, d3.max(healthData,data => +data.healthcare) * 1.2])
  
  let xLinearScale = d3.scaleLinear()
                      .range([0,chartWidth])
                      .domain([d3.min(healthData, data => +data.poverty) - 1, d3.max(healthData, data => +data.poverty) + 1]);


  let bottomAxis = d3.axisBottom()
                      .scale(xLinearScale);
  
  let leftAxis = d3.axisLeft()
                    .scale(yLinearScale);
  



//append the dots to the graph
chart.selectAll("circle")
      .data(healthData)
      .enter().append("circle")
      .attr("cx",(data,index)=>xLinearScale(data.poverty))
      .attr("cy",(data,index)=>yLinearScale(data.healthcare))
      .attr("r",15)
      .attr("fill","pink")


//append the axis

chart.append("g")
    .attr('transform',`translate(0,${chartHeight})`)
    .call(bottomAxis)
  chart.append("g")
  //leftAxis(g);
        .call(leftAxis)

  chart.selectAll("circle").call(function(selection) {
    console.log(selection);
  });

  //set up the scales
 //console.log(healthData);


});


