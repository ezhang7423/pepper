
// axios.get('api/tensorflow.json')
//   .then(response => JSON.stringify(response))
//   .then(json => pipe(json))


function pipe(rawData){
    rawData = JSON.parse(rawData)
    out = filterLastYr(rawData)
    out = numbersOnly(out)
    drawHistogram(out)
}


function filterLastYr(obj){
    rawData = obj.data;
    oneYrData = {};
    rKeys = Object.keys(obj.data)
    for (i = 0; i < rKeys.length; i++){
        iKeys = Object.keys(rawData[rKeys[i]])
        lastYr = iKeys[iKeys.length-1]
        oneYrData[rKeys[i]] = {};
        oneYrData[rKeys[i]] = rawData[rKeys[i]][lastYr]
    }
    return oneYrData
}
function numbersOnly(obj){
    numbersOnly = [];
    rKeys = Object.keys(obj)
    for (i = 0; i < rKeys.length; i++){
        numbersOnly.push(oneYrData[rKeys[i]])
    }
    return numbersOnly
}
function drawHistogram(o) {
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 860 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    var svg = d3.select("#demoHistogram")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleLinear()
        .domain([0,  d3.max(o, function(d) { return +d })]) 
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));


    var histogram = d3.histogram()
        .value(function(d) { return d; })   
        .domain(x.domain()) 
        .thresholds(x.ticks(70)); 
    var bins = histogram(o);


    var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);   
    svg.append("g")
        .call(d3.axisLeft(y));
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("font-size", 15)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("amt of people")
        .style("fill", "white")      
    svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("amt of commits")
        .style("fill", "white") 
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "white")

    };