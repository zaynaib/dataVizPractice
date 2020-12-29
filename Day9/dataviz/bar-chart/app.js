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
                  .domain(["Arm", "Eye", "Head", "Hand","Leg","Other"])
                  .range([0,dimensions.boundedWidth])
                  .padding(0.2)




  const yScale = d3.scaleLinear()
                 .domain(d3.extent(dataset,yAccessor))
                  .range([dimensions.boundedHeight,0])
                  .nice()

//   //we are looping through an object so we need to use object entries



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
      .attr("height", d=> dimensions.boundedHeight- yScale(+d.Total))
      .attr("fill","teal")
      
      const xAxisGenerator = d3.axisBottom()
                            .scale(xScale);
      
    const xAxis = wrapper.append("g")
    .call(xAxisGenerator)
      .style("transform", `translateY(${dimensions.boundedHeight}px)`)

      barRect.on("click",function(d,i){
         console.log(d)
         console.log(i)
         d3.select(this)
         .attr('fill','yellow')
        
        })

        // barRect.on("mouseenter", function(event, d) {
        //   const e = barRect.nodes();
        //   const i = e.indexOf(this);
        //   console.log(d, i, e);
        // })

        //selection.nodes - returns an array of all selected elements.
         
      barRect.on("click",function(e,d){
        console.log("you clicked",d)
        d3.select(this).attr('fill','yellow')
       
       })



        barRect.on("mouseenter",function(e,d){
          const i = barRect.nodes().indexOf(this)
          console.log(e)
          console.log(d)
          console.log(i)
          d3.select(this).attr('fill','yellow')

        })

        barRect.on('mouseover', function(e,i) {
          //d3.select('#tooltip').style('opacity', 1).text(i.BodyRegion)'
          //console.log(e)
          d3.select('#tooltip').transition().duration(200).style('opacity', 1).text(i.BodyRegion)

        })
        .on('mouseout', function(e,i) {
          d3.select('#tooltip').style('opacity', 0)
          d3.select(this).attr('fill','teal')


        })
        .on('mousemove', function(e,i) {
         // console.log(e.pageX +10)
          d3.select('#tooltip')
        .style('left', e.pageX+10 + 'px')
          .style('top', e.pageY+10 + 'px')
        })
 
      
      // barRect.on("mouseenter", function(datum, index, nodes) {
      //   console.log(datum)
      //   console.log(index)
      //   console.log(nodes)
      //   })

     
      

      wrapper.append("g").selectAll("text")
      .data(dataset)
      .join("text")
      .attr("x", d=>xScale(d.BodyRegion))
      .attr("y", d => yScale(+d.Total))
      .text(d => +d.Total)
      .attr('fill','purple')

      
//   //7. set up interactions
  
}

drawBarChart()

