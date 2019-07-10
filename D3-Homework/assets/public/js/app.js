// @TODO: YOUR CODE HERE!

console.log("hello!");


// Store the dimensions of the SVG container
const svgWidth = 800;
const svgHeight = 600;

// Define the margins of the chart
const margin = { top: 50, right: 50, bottom: 50, left: 150 };

// Calculate the dimensions of the chart by subtracting the margin on either side from the width and height of the SVG container
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var chart = svg.append("g");


//upload data from csv file
d3.csv("data/data.csv", function(error, healthData) {
    if (error) return console.warn(error);

    //change strings from csv format to number format
    healthData.forEach(data => {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // Create scale functions
  var yLinearScale = d3.scaleLinear()
  .range([height, 0]);

    var xLinearScale = d3.scaleLinear()
    .range([0, width]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Scale the domain
    xLinearScale.domain([20, d3.max(healthData, function(data) {
    return +data.poverty;
    })]);
    yLinearScale.domain([0, d3.max(healthData, function(data) {
    return +data.healthcare * 1.2;
    })]);

    chart.selectAll("circle")
    .data(healthData)
    .enter().append("circle")
      .attr("cx", function(data, index) {
        console.log(data.poverty);
        return xLinearScale(data.poverty);
      })
      .attr("cy", function(data, index) {
        return yLinearScale(data.healthcare);
      })
      .attr("r", "15")
      .attr("fill", "pink")

      chart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chart.append("g")
    .call(leftAxis);
  


   // console.log(healthData)

});
