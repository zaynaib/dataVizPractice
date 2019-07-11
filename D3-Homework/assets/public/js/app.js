// @TODO: YOUR CODE HERE!

console.log("hello!");



//upload data from csv file
d3.csv("data/data.csv",  healthData=> {
  console.log(healthData)

    dataViz(healthData)

  


});

function dataViz(IncomingData){
  d3.select('body')
    .select("div.healthcare")
    .data(IncomingData)
    .enter()
    .append("div")
    .attr("class","healthcare")
    .html(d=>d.label)
    
}
