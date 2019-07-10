d3.select("body").append("svg")

d3.select("svg")
    .append("line")
    .attr("x1",20)
    .attr("y1",20)
    .attr("x2",400)
    .attr("y2",400)
    .style("stroke","black")
    .style("stroke-width","2px")

d3.select("svg")
    .append("text")
    .attr("x",20)
    .attr("y",20)
    .text("HELLO");

 d3.select("svg")
    .append("circle")
    .attr("r",20)
    .attr("cx",20)
    .attr("cy",20)
    .style("fill","red");

    d3.select("svg")
    .append("circle")
    .attr("r",50)
    .attr("cx",130)
    .attr("cy",100)
    .style("fill","lightblue");

d3.select("svg")
    .append("text")
    .attr("x",130)
    .attr("y",100)
    .text("WORLD")
    .style("opacity",0.3)
    .text("Uh,...hi")