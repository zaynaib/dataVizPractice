drawBarChart = async () =>{

    //1. Access the data
    const dataset = await d3.csv('./pokemon.csv');
    console.log(dataset);

    var byType = {};

    //Maps are harder to work with

    dataset.forEach(function(row) {
        if (!byType[row.type1]){
            byType[row.type1] = [];
        }
            byType[row.type1].push(row);
      });

      console.log(byType)

  // we can use Object.keys to get all the types from the grouped object
    const types = Object.keys(byType);
    console.log("TYPES", types);

    //get another way to get the types into an array
    var arrayTypes = [...new Set(dataset.map(d=>d.type1))]
    console.log(arrayTypes)

   
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

    //3. draw canvas

    const wrapper = d3.select("#wrapper")
                    .append("svg")
                    .attr("width",dimensions.width)
                    .attr("height",dimensions.height)
                    .append("g")
                    .style("transform",`translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)




    //each type of pokemong
    //the number for each type

    //4. create scales


    const xScale = d3.scaleBand()
                    .domain(types)
                    .range([0,dimensions.boundedWidth])
                    .padding(0.2)

    console.log(xScale('water'))

  // let's get the counts by type to create our max
  // - Object.values() gets the values from the object
  // - [...Object.values()] turns that into an array
  // - map(v => v.length) takes the value arrays and converts to counts

    var counts = [...Object.values(byType)].map(v=>v.length);
    console.log(counts)

    const yScale = d3.scaleLinear()
                    .domain([0,d3.max(counts)])
                    .range([dimensions.boundedHeight,0])
                    .nice()

    //we are looping through an object so we need to use object entries


    console.log(yScale(78))
    console.log(xScale('water'))

    //5. draw data

    
   const barRect = wrapper.append("g")
        .selectAll('rect')
        .data(types)
        .join('rect')
        // xScale takes the type, returns the left/right location
        .attr("x", d => xScale(d))

         // yScale gets the count from the object
        .attr("y", d => yScale(byType[d].length))

        .attr("width", xScale.bandwidth())

        // height has to be the distance from bar top to chart bottom
        .attr("height", d=> dimensions.boundedHeight - yScale(byType[d].length))
        .attr("fill","teal")
    //     .append("text")
    //     .attr("x", d => xScale(d))

    //     // yScale gets the count from the object
    //    .attr("y", d => yScale(byType[d].length-5))
    //    .text("hello")


        wrapper.append("g").selectAll("text")
        .data(types)
        .join("text")
        .attr("x", d=>xScale(d))
        .attr("y", d => yScale(byType[d].length))
        .text(d => byType[d].length)
        .attr('fill','purple')

        

    
    //6. draw peripherals
    const xAxisGenerator = d3.axisBottom()
                            .scale(xScale)
    const barAxis = wrapper.append("g")
            .call(xAxisGenerator)
            .style("transform", `translateY(${dimensions.boundedHeight}px)`)
            .append('text')
            .attr("x", d => dimensions.boundedWidth/2 )
            .attr("y", d => dimensions.margin.bottom-20);

    // bar text

    console.log(byType)
        
    //7. set up interactions
    
}

drawBarChart()