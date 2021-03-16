beeswarm = async () =>{
    //Access data
  const dataset = await d3.csv('./hiphop2.csv');

//  console.log(dataset)

  const xAccessor = d => +d.words;

  //console.log(xAccessor(dataset[0]));

  const dimensions = {
    width:1500,
    height:800
  }


  const xScale = d3.scaleLinear()
  .domain(d3.extent(dataset,xAccessor))
  .range([0,dimensions.width])
  .nice();

 // console.log(xScale(500))
  const wrapper = d3.select("#wrapper").append("svg")
                    .attr("width",dimensions.width)
                    .attr("height",dimensions.height)
  
// Define the div for the tooltip
var div = d3.select("body").append("div")	
.attr("class", "tooltip")				
.style("opacity", 0)
//review css positioning
.style("position","absolute")
  
   //after circles are created lets create defs
 var defs = d3.select('svg').append("defs");

   defs.selectAll(".artist-pattern")
      .data(dataset)
      .join("pattern")
      .attr("class","artist-pattern")
      .attr("id",d => d.id)
      .attr("height","100%")
      .attr("width","100%")
      .attr("patternContentUnits","objectBoundingBox")
      .append("image")
      .attr("height",1)
      .attr("width",1)
      .attr("preserveAspectRatio","none")
      .attr("xmlns:xlink","http://www.w3.org/1999/xlink")
      .attr("xlink:href",d => d.images)


  // draw a circle for each datapoint
  let c = wrapper.selectAll("cirlce")
          .data(dataset)
          .join("circle")
          .attr("r",15)
          .attr("fill", function(d){
            //console.log(d.id)
            return "url(#" + d.id + ")"
          })
      

  let simulation = d3.forceSimulation() //create a simulation
      .force('charge',d3.forceManyBody().strength(3)) //attach the forces to the simulation, charge
      .force("x", d3.forceX().x(d=> xScale(+d.words)).strength(0.05)) 
      .force("y", d3.forceY(dimensions.height/2).strength(0.05))
      .force("collide", d3.forceCollide(25)) //how close the circles are to one another


  simulation.nodes(dataset) //send the nodes array to simulation so it knows what to calculate with
            .on("tick",ticked) //at each tick, have it run the ticked function

//each time the simulation ticks, update their position based on the newly
//calculated position by the simulation
  function ticked(){
    try{
      c
      .attr("cx",d => d.x)
      .attr("cy", d => d.y +50)


    

      .on("mouseover", function(d) {		
        div.transition()		
            .duration(200)		
            .style("opacity", .9)
            .style("background-color","teal")
        div.html(d.rapper)		
            .style("left", d3.select(this).attr("cx") + "px")		
            .style("top", d3.select(this).attr("cy") + "px");	
        })	

        console.log('working')

      }
      catch(err){
        console.log(`this is your ${err}`)
      }
  }

     
}

beeswarm();