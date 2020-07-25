async function drawBarPlot(){
    dataset =  await d3.json("./weather_data.json");
    console.log(dataset)

    const metricAccessor = d => d.humidity;

    const width = 600;

    let dimensions ={
        width:width,
        height: width *0.6,
        margin:{
            top:30,
            right:10,
            bottom:50,
            left:50,
        },
    }

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

    const wrapper = d3.select("#wrapper")
                    .append("svg")
                    .attr("width", dimensions.width)
                    .attr("height", dimensions.height)

    

    const bounds = wrapper.append("g")
                    .style("transform",`translate(${dimensions.margin.left},${dimensions.margin.top})`)

    const xScale = d3.scaleLinear()
                    .domain(d3.extent(dataset,metricAccessor))
                    .range([0, dimensions.boundedWidth])
                    .nice()

    const binsGenerator = d3.histogram()
                            .domain(xScale.domain())
                            .value(metricAccessor)
                            .thresholds(12)
    
    const bins = binsGenerator(dataset)
    console.log(bins)

    const yAccessor = d => d.length;

    const yScale = d3.scaleLinear()
                   .domain([0, d3.max(bins,yAccessor)])
                   .range([dimensions.boundedHeight,0])
                   .nice()

    const barPadding = 1;

    const binsGroup = bounds.append("g")
                      .selectAll("rect")
                      .data(bins)
                      .join("rect")
                      .attr("x", d => xScale(d.x0) + barPadding/2)
                      .attr("y", d=> yScale(yAccessor(d)))
                      .attr("width", d => d3.max([
                        0,
                        xScale(d.x1) - xScale(d.x0) - barPadding
                      ]))
                      .attr("height", d => dimensions.boundedHeight
                        - yScale(yAccessor(d))
                      )
                      .attr("fill", "cornflowerblue")


                      const barText = binsGroup.filter(yAccessor)
                                   
                                    .append("text")
                                    .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
                                    .attr("y", d => yScale(yAccessor(d)) - 5)
                                    .text(yAccessor)
                                    
                                  

                      const xAxisGenerator = d3.axisBottom()
                      .scale(xScale)
                  
                    const xAxis = bounds.append("g")
                      .call(xAxisGenerator)
                        .style("transform", `translateY(${dimensions.boundedHeight}px)`)
                  
                    const xAxisLabel = xAxis.append("text")
                        .attr("x", dimensions.boundedWidth / 2)
                        .attr("y", dimensions.margin.bottom - 20)
                        .attr("fill", "black")
                        .style("font-size", "1.4em")
                        .text("Humidity")
                        .style("text-transform", "capitalize")
    






}

drawBarPlot()