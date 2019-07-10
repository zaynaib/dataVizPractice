// @TODO: YOUR CODE HERE!

console.log("hello!");

d3.csv("data/data.csv", function(error, healthData) {
    if (error) return console.warn(error);

    console.log(healthData)

});
