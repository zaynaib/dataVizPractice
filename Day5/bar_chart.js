drawBarChart = async () =>{

    //1. Access the data
    const dataset = await d3.csv('./pokemon.csv');
    console.log(dataset);

    // pokemon = d3.group(dataset, d=>d.type1)
    // console.log(pokemon)

    const metricAccesor = d => d.type1; 
    pokemonByTypes = d3.group(dataset,metricAccesor)
    console.log(pokemonByTypes)




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

    // const bandScale = d3.scaleBand()
    //                  .domain(dataset,metricAccesor)
    //                  .range([0,dimensions.boundedWidth])
    //                  .padding(0.1)

            

    const xScale = d3.scaleBand()
                    .domain(dataset,metricAccesor)
                    .range([0,dimensions.boundedWidth])
                    .padding(0.1)

    console.log(xScale.bandwidth())

    const yAccessor = d => d.length;



    // const yScale = d3.scaleLinear()
    //                 .range([dimensions.boundedHeight,0])
    //                 .domain(xScale.domain())

    //we are looping through an object so we need to use object entries
    /*
    
    Object.entries(d).forEach(([key,value]) =>{

    })

    */

     
    //what is a map iterator?
    console.log(pokemonByTypes.keys())
    console.log(pokemonByTypes.values())
    
    wrapper.append("g")
        .selectAll('rect')
        .data(pokemonByTypes)
        .enter()
        .append('rect')
        .attr('y',d => xScale(d.keys()))
        .attr('height', xScale.bandwidth())
        .attr('width', d => d.values());
    
    


    //4. create scales

    //5. draw data

    //6. draw peripherals

    //7. set up interactions
    
}

drawBarChart()