drawBarChart = async () =>{

  //1. Access the data
  const dataset = await d3.csv('./bodypart-injury-clean.csv');
  console.log(dataset);

  // xAccessor

  
    //accessor functions
    const xAccessor = d => d.BodyRegion;

    console.log(dataset[2].BodyRegion)
    console.log(xAccessor(dataset[0]))

    //parses a string into a date object

    const yAccessor = d => +d.Total;
    console.log(yAccessor(dataset[2]));

 
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
  };

  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  //3. draw canvas

  const wrapper = d3.select("#wrapper")
                  .append("svg")
                  .attr("width",dimensions.width)
                  .attr("height",dimensions.height)
                  .append("g")
                  .style("transform",`translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)




//   //each type of pokemong
//   //the number for each type

  //4. create scales


  const xScale = d3.scaleBand()
                 //.domain(d3.extent(dataset,xAccessor))
                 .domain(["Arm", "Eye", "Head", "Hand","Leg","Other"])
                // .domain(d3.extent(["Arm", "Eye", "Head", "Hand","Leg","Other"]))
                  .range([0,dimensions.boundedWidth])
                  .padding(0.2)


  dataset.forEach(ele => {
   console.log(ele.BodyRegion);

  });              

  console.log(xScale('Leg'))


  const yScale = d3.scaleLinear()
                 .domain(d3.extent(dataset,yAccessor))
                  .range([dimensions.boundedHeight,0])
                  .nice()

//   //we are looping through an object so we need to use object entries


  console.log(yScale(1000))

  //5. draw data


  
  
 const barRect = wrapper.append("g")
      .selectAll('rect')
      .data(dataset)
      .join('rect')
      // xScale takes the type, returns the left/right location
      .attr("x", d => xScale(d.BodyRegion))

       // yScale gets the count from the object
      .attr("y", d => yScale(+d.Total))

      .attr("width", xScale.bandwidth())

      // height has to be the distance from bar top to chart bottom
      .attr("height", d=> dimensions.boundedHeight-5)
      .attr("fill","teal")



      wrapper.append("g").selectAll("text")
      .data(dataset)
      .join("text")
      .attr("x", d=>xScale(d.BodyRegion))
      .attr("y", d => yScale(+d.Total))
      .text(d => +d.Total)
      .attr('fill','purple')

      

  
  //6. draw peripherals
//   const xAxisGenerator = d3.axisBottom()
//                           .scale(xScale)
//   const barAxis = wrapper.append("g")
//           .call(xAxisGenerator)
//           .style("transform", `translateY(${dimensions.boundedHeight}px)`)
//           .append('text')
//           .attr("x", d => dimensions.boundedWidth/2 )
//           .attr("y", d => dimensions.margin.bottom-20);

//   // bar text

//   console.log(byType)
      
//   //7. set up interactions
  
}

drawBarChart()