beeswarm = async () =>{
    //Access data
  const dataset = await d3.csv('./hiphop.csv')
  console.log(dataset)

  let xAcessor = d => +d.words;

  console.log(xAcessor(dataset[0]))


  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin:{
        top:25,
        right:15,
        bottom:40,
        left:60,
    },
}

//compute size or bounds based on the dimensions object

dimensions.boundedWidth = dimensions.width - dimensions.margin.left
dimensions.boundedHeight= dimensions.height - dimensions.margin.top - dimensions.margin.bottom

const wrapper = d3.select("#wrapper").append("svg")
            .attr("width",dimensions.width)
            .attr("height", dimensions.height)

//this is where all my elements are going to be. Inside the bounds of the wrapper
const bounds = wrapper.append("g")
                .style("transform", `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`)

//make my scales
//
const nodes = dataset.map(function(d, i) {
  return {
    value: +d.recalc,
    name: d.rapper_clean,
    radius: 5
  }
});

var defs = d3.select('svg').append("defs");

defs.append("pattern")
    .attr("id","jon-snow")
    .attr("height","100%")
    .attr("width", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("height",1)
    .attr("width",1)
    .attr("preserveAspectRatio","none")
    .attr("x.ink:href","pikachu.jpg")

/*
index - the node’s zero-based index into nodes
x - the node’s current x-position
y - the node’s current y-position
vx - the node’s current x-velocity
vy - the node’s current y-velocity

*/

// Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0)
    //review css positioning
    .style("position","absolute")

console.log(nodes)
const xScale = d3.scaleLinear()
                 .domain(d3.extent(dataset,xAcessor))
                 .range([0,dimensions.boundedWidth])
                 .nice()
                 
                 var simulation = d3.forceSimulation(nodes)
                 .force('charge', d3.forceManyBody().strength(5))
                 .force('x', d3.forceX().x(function(d) {
                   return xScale(d.value);
                 }))
                 .force('y', d3.forceY().y(function(d) {
                   return 0;
                 }))
                 .force('collision', d3.forceCollide().radius(function(d) {
                   return d.radius;
                 }))
                .on('tick', ticked);



                //  function ticked() {
                //   var u = d3.select('svg g')
                //     .selectAll('circle')
                //     .data(nodes)
                //     .join('circle')
                //     .attr('r', function(d) {
                //       return d.radius;
                //     })
                //     .style('fill', function(d) {
                //       return "blue";
                //     })

                //     .attr('cx', function(d) {
                //       return d.x;
                //     })
                //     .attr('cy', function(d) {
                //       return d.y + 50;
                //     })
                
               // }


               function ticked() {
                var u = d3.select('svg')
                  .selectAll('circle')
                  .data(nodes)
              
                u.enter()
                  .append('circle')
                  .attr('r', (d) =>d.radius)
                  .merge(u)
                  .attr('cx', function(d) {
                    return d.x
                  })
                  .attr('cy', function(d) {
                    return d.y +50
                  })
                  .attr("fill","lightblue")
                  
                  
                  .on("mouseover", function(d) {		
                    div.transition()		
                        .duration(200)		
                        .style("opacity", .9)
                    div.html(d.name)		
                        .style("left", d3.select(this).attr("cx") + "px")		
                        .style("top", d3.select(this).attr("cy") + "px");	
                       // console.log(d3.event.pageX)
                    })	
                  .on("mousemove", function(){return div.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                .on("mouseout", function(d) {		
                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                });
        
              
                u.exit().remove()
              }

        
             d3.select('svg')
              .selectAll('circle')
              .on('click', (d) => console.log("you clicked me"))

     
}

beeswarm();