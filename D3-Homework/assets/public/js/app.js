//Data Utility
const parseNA = string => (string == 'NA' ? undefined : string);

//Create function to convert data types in json
function dataTypes(d){
  return{

  abbr: parseNA(d.abbr),
  age: +d.age,
  ageMoe: +d.ageMoe,
  healthcare: +d.healthcare,
  healthcareHigh: +d.healthcareHigh,
  healthcareLow: +d.healthcareLow,
  id: +d.id,
  income: +d.income,
  incomeMoe: +d.incomeMoe,
  obesity: +d.obesity,
  obesityHigh: +d.obesityHigh,
  obesityLow: +d.obesityLow,
  poverty: +d.poverty,
  povertyMoe: +d.povertyMoe,
  smokes: +d.smokes,
  smokesHigh: +d.smokesHigh,
  smokesLow: +d.smokesLow,
  state: parseNA(d.state)
  };
}


function ready(govData){
  // Data Prep
  const cleanData = dataTypes(govData)

  //Chart margin pattern
  const svgWidth = 960;
  const svgHeight = 600;
  
  const margin = {top:50, right:50,bottom:50,left:50};
  
  let chartWidth = svgWidth - margin.right - margin.left;
  let chartHeight = svgHeight - margin.top - margin.bottom;

  //chart scales
  let xScale = d3.scaleLinear()
            .domain([d3.min(govData, data => +data.poverty) - 1, d3.max(govData, data => +data.poverty) + 1])
            .range([0,chartWidth]);

  let yScale = d3.scaleLinear()
           .domain([0 , d3.max(govData, data => +data.healthcare) *1.2 ])
            .range([chartHeight,0]);



//Draw base

//TODO Read about margin pattern
const svg = d3.select('.chart')
    .append('svg')
    .attr('height',chartHeight)
    .attr('width',chartWidth)
    .append('g')
    .attr('transform',`translate(${margin.left},${margin.top})`);

// draw visual elements
  svg
    .append('g')
    .attr('class','scatter-points')
    .selectAll('circle')
    .data(govData)
    .enter()
    .append("circle")
    .attr("cx", (data) => xScale(data.poverty))
    .attr("cy", (data) => yScale(data.healthcare))
    .attr("r",15)

//axes
const bottomAxis  = d3.axisBottom(xScale);
const leftAxis  = d3.axisLeft(yScale);

// ! fix position of axes

console.log(chartHeight);
svg.append('g')
    .attr('class','x-axis')
    .attr("transform", `translate(0,430)`)
    .call(bottomAxis);

  svg.append("g")
     .call(leftAxis);


  // * Add tooltips

  const tip = d3.selectAll('.tooltip');

  function mouseover(){
        tip
        .style('left', `${d3.event.clientX}px`)
        .style('top', `${d3.eventclientY}px` )
        .style('opacity', 0.98)
        .html('Hello tip!')
        //debugger;
        console.log('it works')
        console.log(d3.event.clientX, d3.event.clientY)


  }

  
  function mousemove(){
    tip
    .style('left', `${d3.event.clientX}px`)
    .style('top', `${d3.eventclientY}px` )
 


}


function mouseout(){
  //reset

  tip
    .style('opacity',0)
 


}

  d3.select('.scatter-points')
        .on('mouseover',mouseover)
        //.on('mousemove',mousemove)
        //.on('mouseout',mouseout)

}

//Load Data
d3.csv('data/data.csv',dataTypes).then(response =>
    //console.log(response)
    ready(response)
  );




