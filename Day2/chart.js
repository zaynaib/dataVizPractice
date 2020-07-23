//function that cleans dollar signs
//use regex 

async function drawLineChart(){
    const dataset = await d3.csv("./clean_car_value.csv");
    console.log(dataset);

    console.log(dataset[0]["Value"])

    //create a formatter for dollar values
    //create our accessor functions
    const yAccessor = d => parseInt(d.Value)
    
    const dateParser = d3.timeParse("%Y");
    const xAccessor = d => dateParser(d.Year)

    console.log(xAccessor(dataset[0]));

    let dimensions = {
        width: window.innerWidth * 0.9,
        height:400,
        margin:{
            top:15,
            right:15,
            bottom:40,
            left:60,
        },
    }


    dimensions.boundedWidth = dimensions.width - dimensions.margin.left
    dimensions.boundedHeight= dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    const wrapper = d3.select("#wrapper").append("svg")
                .attr("width",dimensions.width)
                .attr("height", dimensions.height)

    //this is where all my elements are going to be. Inside the bounds of the wrapper
    const bounds = wrapper.append("g")
                    .style("transform", `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`)


    //set up your scales
             
    //y-scale
    const yScale = d3.scaleLinear()
                    .domain(d3.extent(dataset,yAccessor))
                    .range([dimensions.boundedHeight,0])

    // console.log(yScale(32))


    //x-scale

    const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])

    //line generator
    const lineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))

    //draw the line
    const line = bounds.append("path")
    .attr("d", lineGenerator(dataset))
    .attr("fill", "none")
    .attr("stroke", "#395D33")
    .attr("stroke-width", 2)

    const yAxisGenerator = d3.axisLeft()
    .scale(yScale)

  const yAxis = bounds.append("g")
    .call(yAxisGenerator)

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
      .style("transform", `translateY(${
        dimensions.boundedHeight
      }px)`)



}

drawLineChart()