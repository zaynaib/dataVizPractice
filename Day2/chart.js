//function that cleans dollar signs
//use regex 

async function drawLineChart(){
    const dataset = await d3.csv("./clean_car_value.csv");
    console.log(dataset);

    //create a formatter for dollar values
    //create our accessor functions
    const yAccessor = d => parseInt(d.Value)
    
    const dateParser = d3.timeParse("%Y");
    const xAccessor = d => dateParser(d.Year)

    // console.log(xAccessor(dataset[0]))



}

drawLineChart()