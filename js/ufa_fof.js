
width = 775, 
height =  500;

function calcSum(m){
  var s = 0
  for (i = 0; i < m.length; i ++){
    for (j = 0; j < m[i].length; j++){
      s += m[i][j]
    }
  }
  return s;
}

var svg = d3.select("#chartcol #chart").append("svg")
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 500 500")
.attr("width", width)
.attr("height", height);

var g = svg.append("g")
.attr("transform", "translate(" + width / 2.25 + "," + height / 1.85 + ")")
.append("g")

outerRadius = Math.min(width, height) * 0.35,
innerRadius = outerRadius - 20,
halfPI = Math.PI /2;

var chord = d3.chord2()
.arcGroups(sectors)
.chordSum(calcSum(m2))
.padAngle(0.25)

var lastMatrix;

var arc = d3.arc()
.innerRadius(innerRadius)
.outerRadius(outerRadius);

var arc2  = d3.arc()
.innerRadius(outerRadius)
.outerRadius(outerRadius + 20);

var ribbon = d3.ribbon() 
.radius(innerRadius);

var arrow = d3.chordArrow()
.radius(innerRadius)
.target(function(d, i){
  if (d.source.index % 2 == 0) return d.target;
  if (d.target.index % 2 == 0) return d.source;
  return 0
})

var connect = {
  end: "arrow",
  type: "curve",
  curve: d3.curveNatural
}

var ann = [
  {
    connector: connect,
    x: 180,
    y: 190,
    dy: -70,
    dx: -180
  },
  {
    connector: connect,
    x: 200,
    y: 160,
    dy: -40,
    dx: -200
  }
]

var annTotal = [
  {
    connector: {
      end: "arrow",
      type: "curve",
      curve: d3.curveNatural,
      points: [[-70, 20]]
      //points: [[-50, 30], [-25, 45]]
    },
    x: 140,
    y: 240,
    dy: -25,
    dx: -210
  }
]

var annChord = [
  {
    connector: {
      end: "arrow",
      type: "curve",
      curve: d3.curveNatural,
      points: [[-70, 20]]
      //points: [[-50, 30], [-25, 45]]
    },
    x: 215,
    y: 300,
    dy: -5,
    dx: -215
  }
]

var annotateGroup = d3.annotation()
.type(d3.annotationLabel)
.annotations(ann)

var annotateTotal = d3.annotation()
.type(d3.annotationLabel)
.annotations(annTotal)


var annotateChord = d3.annotation()
.type(d3.annotationLabel)
.annotations(annChord)

if (window.innerWidth > 1070){
  d3.select("svg")
  .append("g")
  .attr("class", "annotation-group")
  .call(annotateGroup)
  .style("opacity", 0)
  
  d3.select("svg")
  .append("g")
  .attr("class", "annotation-total")
  .call(annotateTotal)
  .style("opacity", 0)
  
  d3.select("svg")
  .append("g")
  .attr("class", "annotation-chord")
  .call(annotateChord)
  .style("opacity", 0)
}

function drawChords(matrix){
  
  //group arcs - assets and liabilities
  var group = g.selectAll("g.group")
  .data(chord(matrix).groups, function(d){return d.index}) 
  
  group.exit().remove()
  
  var groupEnter = group.enter().append("g")
  .attr("class", "group");
  
  groupEnter.append("path") 
  
  group
  .merge(groupEnter)
  .select("path")
  .style("fill", function(d, i){
    return i % 2 == 0 ? "#00AACC" : "#FDAF18"
  })
  .attr("id", function (d) {return "group" + d.index; })
  .attr("d", arc)
  .transition()
  .duration(1000)
  .attrTween("d", arcTween(lastMatrix))
  
  //group position - net creditor / net debtor
  var groupPos = g.selectAll("g.groupPos")
  .data(calcPos(matrix))
  
  groupPos.exit().remove()
  var groupPosEnter = groupPos.enter().append("g")
  .attr("class", "groupPos");
  
  groupPosEnter.append("path")
  
  groupPos
  .merge(groupPosEnter)
  .select("path")
  .style("fill", function(d){
    return  d.value > 0 ? "#00AACC": "#FDAF18"
  })
  .attr("id", function (d) {return "groupPos" + d.index; })
  .attr("d", arc)
  .transition().duration(1000)
  .attrTween("d", arcTween2(lastMatrix));
  
  //group labels
  groupEnter.append("text")
  group
  .merge(groupEnter)
  .select('text')
  .each(function(d, i) { 
    d.angle = (d.startAngle + d.endAngle) / 2; 
    if (i % 2 == 0){
      var s = chord(matrix).groups[i].startAngle;
      var e = chord(matrix).groups[i+1].endAngle;
      d.angle = (s + e) / 2;
    }
  })
  .attr('opacity', 1)
  .attr("text-anchor", function(d, i){
    if (i == 2 || i == 8) return "start"
    return "middle"
  })
  .transition().duration(1500)
  .attr("x", function(d, i){
    var b = 50
    if (i == 2) b = 20
    if (i == 8)  b = 140
    var x = Math.cos(d.angle - halfPI) * (outerRadius + b);
    return x;
  })
  .attr("y", function(d, i){
    var y = Math.sin(d.angle - halfPI) * (outerRadius + 50);
    return  y;
  })
  .text(function(d,i) { 
    return i  % 2 == 0 ? labels[i / 2] : null
  })
  .attr("class", "titles")
  
  //group chord ribbons
  var groupChords = g
  .selectAll("path.chords")
  .data(chord(matrix), chordKey)
  
  var groupChordsEnter = groupChords.enter()
  .append("path")
  .attr("class", "chords")
  
  groupChords.exit().remove()
  
  groupChords
  .merge(groupChordsEnter)
  .attr("id", function(d, i){return "chord" + i})
  .attr("d", ribbon)
  .transition().duration(1000)
  .attrTween("d", chordTween(lastMatrix));
  
  //group arrows
  var groupArrows = g
  .selectAll("path.arrows")
  .data(chord(matrix), chordKey)
  
  var groupArrowsEnter = groupArrows.enter()
  .append("path")
  .attr("class", "arrows")
  
  groupArrows.exit().remove()
  
  groupArrows
  .merge(groupArrowsEnter)
  .attr("id", function(d, i){return "arrow" + i})
  .attr("d", arrow)
  .transition().duration(1000)
  .attrTween("d", arrowTween(lastMatrix));
  
  //store last matrix for interpolations
  lastMatrix = matrix
}

//from SO post - add the link
function chordKey(data) {
  return (data.source.index < data.target.index) ?
  data.source.index  + "-" + data.target.index:
  data.target.index  + "-" + data.source.index;
}

function arrowTween(last){
  return function(d, i){     
    if (!last){
      var ssi = d3.interpolate(d.source.startAngle, d.source.startAngle)
      var sei = d3.interpolate(d.source.startAngle, d.source.endAngle)
      var tsi = d3.interpolate(d.target.startAngle, d.target.startAngle)
      var tei = d3.interpolate(d.target.startAngle, d.target.endAngle)
    } 
    else {
      var l = chord(last);
      var ssi = d3.interpolate(l[i].source.startAngle, d.source.startAngle)
      var sei = d3.interpolate(l[i].source.endAngle, d.source.endAngle)
      var tsi = d3.interpolate(l[i].target.startAngle, d.target.startAngle)
      var tei = d3.interpolate(l[i].target.endAngle, d.target.endAngle)
    }
    return function (t) {
      d.source.startAngle = ssi(t)
      d.source.endAngle = sei(t)
      d.target.startAngle = tsi(t)
      d.target.endAngle = tei(t)
      return arrow(d);
    };
  }
}


function chordTween(last){
  return function(d, i){     
    if (!last){
      var ssi = d3.interpolate(d.source.startAngle, d.source.startAngle)
      var sei = d3.interpolate(d.source.startAngle, d.source.endAngle)
      var tsi = d3.interpolate(d.target.startAngle, d.target.startAngle)
      var tei = d3.interpolate(d.target.startAngle, d.target.endAngle)
    } 
    else {
      var l = chord(last);
      var ssi = d3.interpolate(l[i].source.startAngle, d.source.startAngle)
      var sei = d3.interpolate(l[i].source.endAngle, d.source.endAngle)
      var tsi = d3.interpolate(l[i].target.startAngle, d.target.startAngle)
      var tei = d3.interpolate(l[i].target.endAngle, d.target.endAngle)
    }
    return function (t) {
      d.source.startAngle = ssi(t)
      d.source.endAngle = sei(t)
      d.target.startAngle = tsi(t)
      d.target.endAngle = tei(t)
      return ribbon(d);
    };
  }
}


function arcTween(last){
  return function(d){
    if (!last){
      var si = d3.interpolate(d.startAngle, d.startAngle)
      var ei = d3.interpolate(d.startAngle, d.endAngle)
    }
    else{
      var l = chord(last).groups
      var si = d3.interpolate(l[d.index].startAngle, d.startAngle)
      var ei = d3.interpolate(l[d.index].endAngle, d.endAngle)
    }
    return function(t){
      d.startAngle = si(t)
      d.endAngle = ei(t);
      return arc(d)
    }
  }
}

function arcTween2(last){
  return function(d, i){
    if (!last){
      var si = d3.interpolate(d.startAngle, d.startAngle)
      var ei = d3.interpolate(d.startAngle, d.endAngle)
    }
    else{
      var l = calcPos(last)
      var si = d3.interpolate(l[i].startAngle, d.startAngle)
      var ei = d3.interpolate(l[i].endAngle, d.endAngle)
    }
    return function(t){
      d.startAngle = si(t)
      d.endAngle = ei(t);
      return arc2(d)
    }
  }
}

function arcTween1(last){
  return function(d, i){
    if (last){
      var lg = last.groups
      console.log(lg[d.index].startAngle, d.startAngle)
      console.log(lg[d.index].endAngle, d.endAngle)
      var si = d3.interpolate(lg[d.index].startAngle, d.startAngle)
      var ei = d3.interpolate(lg[d.index].endAngle, d.endAngle)
    } 
    else {
      var si = d3.interpolate(d.startAngle, d.startAngle)
      var ei = d3.interpolate(d.startAngle, d.endAngle)
    }
    return function(t){
      d.startAngle = si(t)
      d.endAngle = ei(t);
      return arc(d)
    }
  }
}

function calcPos(matrix){
  var d = chord(matrix)
  var totals = [];
  for (i = 0; i < d.groups.length; i += 2) { 
    span_a = d.groups[i].endAngle - d.groups[i].startAngle
    span_l = d.groups[i+1].endAngle - d.groups[i+1].startAngle
    var j = i;
    if (span_l > span_a) {
      j = i + 1
    }
    var netPosition = {
      index: i,
      startAngle: d.groups[j].startAngle,
      endAngle: d.groups[j].startAngle + Math.abs(span_l - span_a),
      value: d.groups[i].value - d.groups[i+1].value
    }
    totals.push(netPosition)
  }
  return totals
}



