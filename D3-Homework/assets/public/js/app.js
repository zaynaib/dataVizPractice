// @TODO: YOUR CODE HERE!

console.log("hello!");

d3.select("body")

//upload data from csv file
d3.csv("data/data.csv",  healthData=> {

  //add svg
  
  d3.select(".chart")
    .append("svg")
    .attr("height",900)
    .attr("width","100%")

  d3.select("svg")
    .selectAll("rect")
    .data(healthData)
    .enter()
    .append("rect")
    .attr("width",50)
    .attr("height", d => d.poverty*10)
    .attr("x", d=> d.poverty+20)
    .attr("y",10)
    .attr("fill","blue")


  //bind the data to the chart


  //set up the svg width/height/margins


  //format the data

  //set up the scales
 console.log(healthData);


  


});


