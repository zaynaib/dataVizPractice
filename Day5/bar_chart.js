drawBarChart = async () =>{

    //1. Access the data
    const dataset = await d3.csv('./pokemon.csv');
    console.log(dataset);


    const metricAccesor = d => d.type1;    

    //2. create the dimensions
    const width = 600;

    let dimensions ={
        width:width,
        height: width * 0.6,
        margin:{
            top:30,
            right:10,
            bottom:50,
            left:50
        },
    }

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    const wrapper = d3.select("#wrapper")
                    .append("svg")
                    .attr("width",dimensions.width)
                    .attr("height",dimensions.height)
                    .append("g")
                    .style("transform",`translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)



    //3. draw canvas

    const xScale = d3.scaleBand()
                    .domain(dataset,metricAccesor)
                    .range([0,dimensions.boundedWidth])
                    .padding(0.1)

    console.log(xScale.bandwidth())

    // const yScale = d3.scaleLinear()
    //                 .range([dimensions.boundedHeight,0])
    //                 .domain(xScale.domain())

    const binsGenerator = d3.histogram()
                          .domain(xScale.domain())
                          .value(metricAccesor)
                          .thresholds(12)
    const bins = binsGenerator(dataset)
    console.log(bins)


    //4. create scales

    //5. draw data

    //6. draw peripherals

    //7. set up interactions
    
}

drawBarChart()