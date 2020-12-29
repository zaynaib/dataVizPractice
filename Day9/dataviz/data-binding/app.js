const dataset = [10,14,86,90]


    d3.selectAll("p")
      .data(dataset)
      .join("p")
      .text(d=>d)

    
    /*

    selection.data - bind elements to data.
selection.join - enter, update or exit elements based on data.


    */

console.log(d3.select("#viz").selectAll("p").nodes())

console.log(d3.select("#viz").selectAll("p").data(dataset).join("p").nodes())

