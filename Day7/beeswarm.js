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
        top:15,
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
const xScale = d3.scaleLinear()
                 .domain(d3.extent(dataset,xAcessor))
                 .range([0,dimensions.boundedWidth])

console.log(xScale(2998))

const circle = bounds.append("g").selectAll('circle')
              .data(dataset)
              .join("circle")
              .attr("cx",d=>xScale(xAcessor(d)))
              .attr("cy", 35)
              .attr("r",5)
              .attr("fill","blue")

}

beeswarm();