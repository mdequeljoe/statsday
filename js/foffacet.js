
var facetWidth = 180,
facetHeight = 140,
outerRadius2 = Math.min(facetWidth, facetHeight) * .2
innerRadius2 = Math.min(facetWidth, facetHeight) * .18

var facetDiv = d3.select("#chartcol #timeline")
.selectAll("div")
.data([m1, m2, m3 ,m4])
.enter()
.append("div")
.attr("id", function(d, i){ return "m" + (i + 1)})
.style("display", "inline-block")
.style("width", facetWidth + "px")
.style("height", facetHeight + "px")

var facetSvg = facetDiv.append("svg")
 .style("width", facetWidth)
 .style("height", facetHeight) 

var facetG = facetSvg
.append("g")
.attr("transform", "translate(" + facetWidth / 2 + "," + facetHeight / 1.5 + ")")

var barColors = ["#d7d9dd", "#a0a2a5"]
facetSvg.selectAll("rect")
.data([facetWidth, 0])
.enter()
.append('rect')
.attr("class", "progressBar")
.attr("id", function(d, i){ return "bar" + (i + 1)})
.attr("x", 0)
.attr("y", facetHeight - 10)
.attr("width", function(d) { return d*.99;})
.attr("height", 5)
.attr("fill", function(d, i){return barColors[i];})


var chord = d3.chord2()
.padAngle(0.25)
.arcGroups(sectors)
.chordSum(calcSum(m2));


var facetArc = d3.arc()
.innerRadius(innerRadius2)
.outerRadius(outerRadius2);

var facetArc2  = d3.arc()
.innerRadius(outerRadius2)
.outerRadius(outerRadius2 + (outerRadius2 - innerRadius2));

var facetRibbon = d3.ribbon() 
.radius(innerRadius2);

var color = d3.scaleOrdinal()
.domain(d3.range(2))
.range(["#4F81BD", "#929292"]);

facetG.each(function(m, i){
  
  d3.select(this).append("text")
  .attr("y", -outerRadius2*1.5)
  .attr("text-anchor", "middle")
  .text(function(){return titles[i]})
  
  d3.select(this).selectAll(".chord")
  .data(chord(m))
  .enter()
  .append('path')
  .attr("class", "chords")
  .attr("d", facetRibbon)

  const g = d3.select(this).selectAll('.group')
  .data(chord(m).groups)
  .enter().append('g')
  .attr('class', 'group')
  
  g.append("path")
  .attr("class", function(d, i){
    return  i % 2 == 0 ? "asset": "liability"
  })
  .style("stroke-width", 0)
  .style("fill", function(d, i){
    return i % 2 == 0 ? "#00AACC" : "#FDAF18"
  })
  .attr('d', facetArc)

  
  var groupPos = d3.select(this)
  .selectAll("g").append("g")
  .data(calcPos(m))
  
  groupPos.append("path")
  .attr("class", function(d, i){
    return  d.value > 0 ? "asset": "liability"
  })
  .style("stroke-width", 0)
  .style("fill", function(d, i){
    return d.value > 0 ? "#00AACC" : "#FDAF18"
  })
  .attr("d", facetArc2)
  
})