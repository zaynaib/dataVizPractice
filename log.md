# 30 Days Of Data Viz - Log

## Table of Contents

- [30 Days Of Data Viz - Log](#30-days-of-data-viz---log)
  - [Table of Contents](#table-of-contents)
  - [Day 0: July 18, 2020](#day-0-july-18-2020)
  - [Day 1: July 19, 2020, Sunday](#day-1-july-19-2020-sunday)
  - [Day 2: July 20, Monday](#day-2-july-20-monday)
  - [Day 3: July 21, Tuesday](#day-3-july-21-tuesday)
  - [Day 4: July 22, Wednesday](#day-4-july-22-wednesday)
  - [Day 5: July 23, Thursday](#day-5-july-23-thursday)
  - [Day 6: July 24, Friday](#day-6-july-24-friday)
  - [Day 7-9: July 25-July 27, Saturday- Monday](#day-7-9-july-25-july-27-saturday--monday)
  - [Day 10-11: July 28-27, Tuesday - Wednesday](#day-10-11-july-28-27-tuesday---wednesday)


 


## Day 0: July 18, 2020 


**Today's Progress**: I revamped my dataVizPractice repo for my 30 days of D3.js challenge.

**Emotion:** 

![](https://media.giphy.com/media/Jqzc0G6oQihOkzyCOf/giphy.gif)


## Day 1: July 19, 2020, Sunday

**Today's Progress**: 
1.  Made my first d3 data visualization for this 30 day challenge. It was a line graph of weather day for the year of 2018.
2.   Finished half of chapter 1 of Amelia's book. 

**Emotion:**

![](https://media.giphy.com/media/8UF0EXzsc0Ckg/giphy.gif)

**Photo of what I made**

![](images/weather_data2018.PNG)

**What I Learned Today**: 

[Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

What does Async and await do?

Async/await makes your code look synchronous, and in a way it makes it behave more synchronously. The await keyword blocks execution of all the code that follows until the promise fulfills, exactly as it would with a synchronous operation.

**CORS Error**

CORS is short for Cross-Origin Resource Sharing, a mechanism used to restrict
requests to another domain

[Accessor Functions](https://stackoverflow.com/questions/26330927/what-is-accessor-function)

Also known as mutator methods.

An accessor property is one that is defined in terms of getters and setters, not as a stored value that might be written to. The "pair of accessor functions" denotes the getter and the setter function.

Margin Conventions:
https://observablehq.com/@d3/margin-convention

*Key Concepts to D3.js*

Think of D3.js similar to The Grammar of Graphics.
Hadley Wickham wrote a great paper about this book. 
https://vita.had.co.nz/papers/layered-grammar.html

Essentially think of a graph like a photo in photoshop.
Photoshop uses layers in order to create a beautiful image.
Its a similar to D3.js. 

1. Access the Data
2. Set up your getters and setter functions /Accessors for your data
3. Set the dimensions of your chart(Check out Margin Conventions)
4. Draw the canvas - add SVG to HTML
5. set up your scales
6. Draw the graph
7. Draw the axis


**Link(s) to work**: [First Graph](./Day1)

**To Do**:
Practice creating a basic line chart from a basic dataset.

**Resources**

Basic Datasets : 

http://veekaybee.github.io/2018/07/23/small-datasets/

https://vincentarelbundock.github.io/Rdatasets/datasets.html

https://www.kaggle.com/rtatman/fun-beginner-friendly-datasets




## Day 2: July 20, Monday

**Today's Progress**: Decided to apply what I learned on a data set that was not given from the book. I found a website that teaches basic math skills to childern 
https://www.mathgoodies.com/lessons/graphs/line .

 Lets see how this goes.

**Emotion**
![](https://media.giphy.com/media/26BGt3EbvrWbiZpUQ/giphy.gif)

**Thoughts** I've been procrastinating a lot today. 😭



## Day 3: July 21, Tuesday

**Today's Progress**: I spent today finishing up the data visualization that I had in mind for Day 2.  I'm glad I choose a simple dataset from that children's website. It took me awhile to do some data munging. Most definitely need practice with python regex, reading and writing files. After I got the data cleaning part down everything else fell into place.

**Photo of What I did**
![](images/day2.PNG)

**Emotion**

![](https://media.giphy.com/media/3orif6xGivJOlo74KA/giphy.gif)

**Thoughts** :
Making sure that I work on this challenge earlier in the day makes it easier to actually do the thing. 

For the rest of this challenge I'm going to try to take it slow and break each part into a concepts. So, my game plan moving forward is to time block my studying of D3.js into two hours.

1 hour will be for studying concepts. The 2nd hour will be for executing those concepts into practice.


**Link(s) to work**
[Second Graph](./Day2)



## Day 4: July 22, Wednesday

**Today's Progress**: I did not do anything today. 

**Photo of What I did today**
Nothing to see here

**Emotion**

![](https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif)


**Today I Learned (TIL)**:

I reviewed the Margin Convention in D3.js. It still confuses me. But basically the Margin Convention is a way to add room for axis labels and ticks for our data visualization. 

Logic flow of creating Margins:

//Setup the height and width of the entire graph. This will include axes.

width = 941
height = 500

//set up room for your axes through margins using css properties.

margin = ({top: 20, right: 30, bottom: 30, left: 40})


//then subtract the margins from the width and height of your chart.

xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))


**Thoughts** :

I played myself today. If I wait until the end of the day I will have no motivation to create a data viz.


**Link(s) to work**


**Resources**:

[The D3.js Margin Convention Curran Kelleher](https://www.youtube.com/watch?v=M3YsZZidQXQ)

[Tyler Wolf 25 days of D3.js](https://observablehq.com/@thetylerwolf/25-days-of-d3)

[Mike Bostock Margin Convention](https://observablehq.com/@d3/margin-convention)


## Day 5: July 23, Thursday

**Today's Progress**: I made a scatter plot today.

**Photo of What I did today**

![](./images/day3.PNG)


created a scatter plot

**Emotion**
![](https://media.giphy.com/media/Jsi6i3QIxN14DuUhkX/giphy.gif)


**Today I Learned (TIL)**:

what is d3.extent?

Is a d3 helper function that finds the minmum and maximum values of a dataset. The parameters it takes is a dataset and an accessor function.

how does css transform work?

what is the join function?
The join function complete negates the need for the enter,exit update pattern for creating a deleting svg shapes when the data changes in a d3 graph. I'm glad because that whole update pattern was confusing.

what is a call?

The call function in d3 makes it easier to create x and y axes on to the graph. The call function does not break up the chaining of functions.

Here is a stackOverflow post about it:
https://stackoverflow.com/questions/12805309/javascript-library-d3-call-function


**Thoughts** :

I played myself today. If I wait until the end of the day I will have no motivation to create a data viz.


**Link(s) to work**
[Scatter Plot](./Day3)

**Resources**:

[David Walsh Blog 5 Cruical Concepts to know when working with D3.js](https://davidwalsh.name/learning-d3)

[Mike Bostock Data Join](https://observablehq.com/@d3/selection-join)

[Tyler Wolf 25 days of d3.js](https://observablehq.com/@thetylerwolf/day-3-controlling-the-flow-of-data?collection=@thetylerwolf/25-days-of-d3)


## Day 6: July 24, Friday

**Today's Progress**: I made a bar chart today.

**Photo of What I did today**

![](./images/day4.PNG)


**Emotion**

![](https://media.giphy.com/media/l1KVagaHkUqNvlQPK/giphy.gif)


**Today I Learned (TIL)**:
Yeah... I did not understand what was going on. Bar graphs in d3.js are not as straight forwad as a line or scatter plot.

Histogram workflow

- call d3 function histogram
  d3.histogram

- pass a domain to tell the histogram function the range of values you want. This case its usually the scale of the metric you want to find the frequency of.
  
- pass in values - pass in the values of the metric you are trying to plot.


- then use thresholds to tell d3 how many bins you want 



**Thoughts** : I'm glad that this was the first thing that I did in the morning. I would not have any motivation to do it in the middle of the day. I had to read this bar chart chart multiple times.


**Link(s) to work**

[Bar Plot](./Day4)

**Resources**:

[D3 graph gallery](https://www.d3-graph-gallery.com/graph/histogram_basic.html)

[Histogram Observable](https://observablehq.com/@d3/histogram)

## Day 7-9: July 25-July 27, Saturday- Monday

**Today's Progress**: 

I made a bar chart of distribution of different pokemon types

**Photo of What I did today**

![](./images/day5.PNG)


**Emotion**

![](https://media.giphy.com/media/eKmpAC4gUZY5MRuU0I/giphy.gif)

**Today I Learned (TIL)**:


scaleOrdinal maps discrete values (specified by an array) to discrete values (also specified by an array)

scaleBand:
When creating bar charts scaleBand helps to determine the geometry of the bars, taking into account padding between each bar. The domain is specified as an array of values (one value for each band) and the range as the minimum and maximum extents of the bands (e.g. the total width of the bar chart).

scaleBand is used to calculate the width for each bar in a histogram plot that use discrete values.

I'm more familar with d3.group function. But I need to learn more about javascript data structures.

What's the difference between

- Map
- array 
- objects
- set
- spread
- deconstructor


And how do you iterate through these functions to get the data that I want.


**Thoughts** :

When in doubt always as for help. It took me three days but I was finally able to create a simple bar chart using pokemon data that I download from Kaggle. I felt confused and frustrated this entire weeked. I'm wondering what I got myself into. I have 20 more days until this challenge is complete. Hoping that it gets easier as the days go by.

I'm glad that I had a network of people to ask for help when it comes to my D3.js questions.

**Link(s) to work**


**Resources**:

[Kaggle Pokemon DataSet](https://www.kaggle.com/rounakbanik/pokemon)

[D3 Group tutorial](https://observablehq.com/@d3/d3-group)

[Stack Overflow question d3 group is not a function](https://stackoverflow.com/questions/63096249/uncaught-in-promise-typeerror-d3-group-is-not-a-function/63096566#63096566)

[d3 in depth scales](https://www.d3indepth.com/scales/)



## Day 10-11: July 28-27, Tuesday - Wednesday

**Today's Progress**:  I added a x-axis and number labels to my bar chart.

**Photo of What I did today**

![](./images/day6.PNG)

**Emotion**

![](https://media.giphy.com/media/tIeCLkB8geYtW/giphy.gif)


**Today I Learned (TIL)**:

I learn that you cannot append text onto an svg shape.
SVG shapes can have certain attributes and content and text is not one of them.

In order to add text or axes onto a d3.js graph you have to add it to the svg wrapper. The SVG element can have content such as svg shapes like rect, circle and text. That why we append a svg group onto our svg wrapper whenever we want to append an element.

It is because of the svg specification.
See rect in
SVG 1.1 

**Thoughts** :


**Link(s) to work**
[](./Day5)


**Resources**:

[SVG 1.1 Rect](https://www.w3.org/TR/SVG11/shapes.html)    rect described in section 9.2

[SVG 2.0 Rect](https://www.w3.org/TR/SVG2/shapes.html )     rect described in section 10.2

[SVG Element Attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg)

[Pokemon Hex Colors](https://www.epidemicjohto.com/t882-type-colors-hex-colors)



