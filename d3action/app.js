d3.csv("data/cities.csv", data =>{
    console.log(data)
    dataViz(data)
  
})

function dataViz(incomingData){
    d3.select('body')
       .data(incomingData)
       .enter()
       .append("div")
       .attr("class","cities")
       .html(d => d.label)
}
