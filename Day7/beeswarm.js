beeswarm = async () =>{
    //Access data
  const dataset = await d3.csv('./hiphop.csv');

  console.log(dataset)

  const xAccessor = d => +d.words;

  console.log(xAccessor(dataset[0]));

  const dimensions = {
    width:500,
    height:500
  }


  const xScale = d3.scaleLinear()
  .domain(d3.extent(dataset,xAccessor))
  .range([0,dimensions.width])
  .nice();

  console.log(xScale(500))
  const wrapper = d3.select("#wrapper").append("svg")
                    .attr("width",dimensions.width)
                    .attr("height",dimensions.height)


  
  let c =wrapper.selectAll("cirlce")
          .data(dataset)
          .join("circle")
          .attr("r",5)
          .attr("fill","lightblue")

  console.log(c)

  let simulation = d3.forceSimulation()
      .force('charge',d3.forceManyBody().strength(3))
      .force("x", d3.forceX().x(d=> xScale(+d.words)).strength(0.05))
      .force("y", d3.forceY(dimensions.height/2).strength(0.05))
      .force("collide", d3.forceCollide(5))


  simulation.nodes(dataset)
            .on("tick",ticked)


  function ticked(){
      c
      .attr("cx",d => d.x)
      .attr("cy", d => d.y)
  }
  // let circles = wrapper.selectAll("circle")
  //                   .data(dataset)
  //                   .join(
  //                     enter => enter.append("cirlce")
  //                     .attr("r",10)

                      
  //                   )
            

     
}

beeswarm();