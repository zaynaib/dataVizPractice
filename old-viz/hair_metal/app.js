var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 100 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chart = svg.append("g");

// Append a div to the body to create tooltips, assign it a class
d3.select(".chart")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

d3.csv("hairData.csv", function(err, hairData) {
  if (err) throw err;


  hairData.forEach(function(data) {
    data.hair_length = +data.hair_length;
    data.num_hits = +data.num_hits;
  });

  // Step 1: Create scale functions
  //= =============================
  // Set the domain, and declare x
  var yLinearScale = d3.scaleLinear()
                        .range([height,0]);
  var xLinearScale = d3.scaleLinear()
                        .range([0,width]);

  // Step 2: Create axis functions
  //= ============================
  // Declare these variables
  var bottomAxis = d3.axisBottom()
                      .scale(xLinearScale);
  var leftAxis = d3.axisLeft()
                  .scale(yLinearScale);

  // Step 3: Scale the domain
  //= =======================
  // x.domain([ ...
  // y.domain([ ...
  
  xLinearScale.domain([20,d3.max(hairData, data => +data.hair_length)])
  yLinearScale.domain([0,d3.max(hairData, data => +data.num_hits*1.2)])
  // Step 4: Initialize tooltips
  //= ==========================
  var toolTip = d3.tip()
     .attr("class", "tooltip")
     .offset([80,-60])
    .html(function(d) {
      var bandName = d.rockband;
      var hairLength = d.hair_length;
      var numHits = +d.num_hits
      return (`${{bandName}} <br> Hair length: ${hairLength} <br> Hits: ${numHits}`)
    });

  // Step 5: call toolTip (this has been done for you)
  //= ===============================================
  chart.call(toolTip);

  chart.selectAll("circle")
    .data(hairData)
    .enter().append("circle")
      .attr("cx", function(data, index) {
        console.log(data.hair_length);
        return xLinearScale(data.hair_length);
      })
      .attr("cy", function(data, index) {
        return yLinearScale(data.num_hits);
      })
      .attr("r", "15")
      .attr("fill", "pink")
      // Step 6: Use the event listener to create onclick and onmouseout events
      //= =====================================================================
      .on("click", function(data) {
        toolTip.show(data);
      })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

  chart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chart.append("g")
    .call(leftAxis);

  chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Number of Billboard 100 Hits");

// Append x-axis labels
  chart.append("text")
    .attr("transform",
          "translate(" + (width / 2) + " ," +
                         (height + margin.top + 30) + ")")
    .attr("class", "axisText")
    .text("Hair Metal Band Hair Length (inches)");
});


