drawBarChart = async () =>{

    //1. Access the data
    const dataset = await d3.csv('./pokemon.csv');
    console.log(dataset);

    // pokemon = d3.group(dataset, d=>d.type1)
    // console.log(pokemon)

    const metricAccesor = d => d.type1; 
    pokemonByTypes = d3.group(dataset,metricAccesor)
    console.log(pokemonByTypes)

    console.log(pokemonByTypes.get('water'))

    Array.from(pokemonByTypes,([key,values]) => {
        console.log(key);
    });

    const types = Array.from(pokemonByTypes,([key,values]) => {
        return key;
    });



    Array.from(pokemonByTypes,([key,values]) => {
        console.log(values.map(d =>d.name));
    });

    
    const pokemonTypeCount = Array.from(pokemonByTypes,([key,values]) => {
       return values.length
    });

    console.log(pokemonTypeCount)

    // Array.from(athletesBySport, ([key, values]) 

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

    //each type of pokemong
    //the number for each type

            

    const xScale = d3.scaleBand()
                    .domain(types)
                    .range([0,dimensions.boundedWidth])
                    .padding(0.1)

    console.log(xScale.bandwidth())

    console.log(xScale('water'))


    const yScale = d3.scaleLinear()
                    .domain([0,d3.max(pokemonTypeCount)])
                    .range([dimensions.boundedHeight,0])
                    .nice()

    //we are looping through an object so we need to use object entries


    console.log(yScale(78))
    console.log(xScale('water'))
    // console.log(pokemonByTypes.values())
    
    wrapper.append("g")
        .selectAll('rect')
        .data(pokemonByTypes)
        .join('rect')
        .attr("x", function(d) { return xScale(types); })
        .attr("y", function(d) { return yScale(pokemonTypeCount); })
        .attr("width", xScale.bandwidth())
        .attr("height", d=> dimensions.boundedHeight - yScale(40))
        // .attr("height", function(d) { return height - y(d.sales); });
  
        // .attr('y',d => xScale(types))
        // .attr('height', xScale.bandwidth())
        // .attr('width', d => d.values());
    
    


    //4. create scales

    //5. draw data

    //6. draw peripherals

    //7. set up interactions
    
}

drawBarChart()