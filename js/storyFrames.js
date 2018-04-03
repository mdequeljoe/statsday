
//intro frame events
function intro_f1(){
    drawChords(m1);
    progressBar("m1", 85 * 1000)
    clearText();
    setText("#label", story.intro.label, 400);
    setText("p#hi", story.intro.step1, 750, 1000);
    setText("p#mid", story.intro.step2, 4000, 1000);
    setText("p#low", story.intro1.step1, 9000, 1000)   
}

function intro_f2(){
    clearText();
    setText("#hi", story.intro1.step2, 1050)
    showGroup("path#group8", 1950)
    showGroup("path#group9", 1950)
    show_ann("g.annotation-group", 1950);
}

function intro_f2_addText(){
    setText("#mid", story.intro1.step3, 2900)
    show_ann("g.annotation-total", 3700);
    showGroup("path#groupPos8", 3700)
    setText("#low", story.intro1.step4, 7000)
    show_ann("g.annotation-chord", 7700);
    showChord("path#chord6.chords", 7700)
}

function intro_reset(){
    resetAll(5000);
}

//m1 frame events
function m1_f1(){
    
    clearText();
    setText("#label", story.frame1.label, 400);
    setText("#hi", story.frame1.step1, 750)
    
    setText("#mid", story.frame1.step2, 5000)
    showChord("path#chord6.chords", 5200)
    
    setText("#low", story.frame1.step3, 10000)
    showChord("path#chord1.chords", 10700) 
    
    resetAll(17000)
}

function m1_f2(){
    clearText();
    setText("#hi", story.frame1_2.step1, 500)
    setText("#mid", story.frame1_2.step2, 3700)
    showGroup("path#group0", 4250)
    showGroup("path#group2", 4350)
    showGroup("path#group4", 4450)
    showGroup("path#group6", 4550)
    setText("#low", story.frame1_2.step3, 8000)
    
    showGroup("path#group8", 8250)
    showChord("path#chord6.chords", 8350)
    showChord("path#chord8.chords", 8450)
    resetAll(17000)
}

function m2_f1(){
    progressBar("m2", 32 * 1000)
    drawChords(m2)
    clearText();
    setText("#label", story.frame2.label, 250)
    setText("#hi", story.frame2.step1, 500)
    setText("#mid", story.frame2.step2, 5050)
    
    showGroup("path#group1", 6000)
    showGroup("path#group3", 6200)
    showGroup("path#group5", 6400)
    showGroup("path#group7", 6600)
    
    setText("#low", story.frame2.step3, 13000)
    showChord("path#chord4.chords", 14000)
    
    setText("#end", story.frame2.step4, 17000)
    showChord("path#chord1.chords", 18000)
    
    resetAll(29000);
}

function m3_f1(){
    progressBar("m3", 32 * 1000)
    drawChords(m3)
    clearText();
    setText("#label", story.frame3.label, 250)
    setText("#hi", story.frame3.step1, 500)
    
    setText("#mid", story.frame3.step2, 7050)
    showChord("path#chord8.chords", 7700)
    
    setText("#low", story.frame3.step3, 15000)
    showChord("path#chord6.chords", 15700)
    showGroup("path#group4", 15800)
    
    resetAll(29000);
}

function m4_f1(){
    progressBar("m4", 32 * 1000)
    drawChords(m4)
    clearText();
    setText("#label", story.frame4.label, 250)
    setText("#hi", story.frame4.step1, 500)
    setText("#mid", story.frame4.step2, 5050)
    
    setText("#low", story.frame4.step3, 9050)
    showGroup("path#groupPos0", 9700)
    showGroup("path#group0", 9700)
    
    showChord("path#chord1", 10000)
    showChord("path#chord0", 10000)
    
    setText("#end", story.frame4.step4, 15000)
    showGroup("path#groupPos6", 15700)
    showGroup("path#group6", 15700)
    showChord("path#chord6", 15700)
    showChord("path#chord7", 15700)
    
    resetAll(31000)
}

function m5(){
    clearText();
    clearProgressBars(20.5 * 1000)
    setText("#label", story.frame5.label, 250)
    setLink("#hi", story.frame5.step1, story.frame5.link1Text, story.frame5.link1, 1000)
    setLink("#mid", story.frame5.step2,story.frame5.link2Text, story.frame5.link2, 2000)
    setLink("#low", story.frame5.step3,story.frame5.link3Text, story.frame5.link3, 3000) 
}


function progressBar(id, t){
    d3.select("div#" + id + " svg rect#bar2")
    .transition()
    .duration(t)
    .ease(d3.easeLinear)
    .attr("width", facetWidth * 0.99) 
}

function clearProgressBars(t){
    d3.selectAll("svg rect#bar2")
    .transition()
    .ease(d3.easeLinear)
    .duration(t)
    .attr("width", 0)
}

function setText(id, text, delay, t){
    if (typeof t === "undefined") t = 1000;
    if (typeof delay === "undefined") delay = 250;
    var t0 = d3.select(id)
    .transition()
    .delay(delay)
    .duration(t)
    
    t0.style("opacity", 0)
    var t1 = t0.transition()
    t1.text(text).style("opacity", 1)
    return t1
}


function showChord(id, delay){
    if (typeof delay === "undefined") delay = 1000;
    var idno = id.match(/[0-9]/)[0];
    
    d3.select(id)
    .transition()
    .delay(delay)
    .duration(2000)
    .style("fill", '#4F81BD')
    
    d3.select("path#arrow" + idno)
    .transition()
    .delay(delay)
    .duration(2000)
    .style("opacity", 1.0)
}

function resetChord(id, delay){
    if (typeof delay === "undefined") delay = 1000;
    var idno = id.match(/[0-9]/)[0];
    
    d3.select(id)
    .transition()
    .delay(delay)
    .duration(1000)
    .style("opacity", 0.7)
    
    d3.select("path#arrow" + idno)
    .transition()
    .delay(delay)
    .duration(1000)
    .style("opacity", 0)
}

function clearText(){
    d3.selectAll("p")
    .transition()
    .duration(600)
    .style("opacity", 0)
}

function pauseFrame(){}

function show_ann(id, delay){
    d3.select(id)
    .transition()
    .delay(delay)
    .duration(2000)
    .style("opacity", 1)
}

function rm_ann(id){
    d3.select(id)
    .transition()
    .duration(2000)
    .style("opacity", 0)
}

var highlighted = [];

function idGroup(id){
    var idno = id.match(/[0-9]/)[0];
    if (id.match("groupPos")){
       id = !d3.select(id).empty() ? id : 
             d3.select(id + "A").empty() ? id + "L" : id + "A";
       var type = id.split(/path#groupPos[0-9]/)[1];
       idno = type === "A" ? idno : parseInt(idno) + 1;
    }
    return {tag: id, no: idno}
}

function showGroup(id, delay){
    var id = idGroup(id);
    var fill = id.no % 2 == 0 ? '#006BB6': '#F58221';
    
    d3.selectAll(id.tag)
    .transition()
    .delay(delay)
    .duration(1200)
    .style("fill", fill)
    
    highlighted.push(id.tag);   
}

function resetAll(delay, t){
    if (typeof delay === "undefined") delay = 3000;
    if (typeof t === "undefined") t = 1750;
    
    for (var i = 0; i < highlighted.length; i++){
        var id = idGroup(highlighted[i]),
        fill = id.no % 2 == 0 ? '#00AACC': '#FDAF18';
        
        d3.select(highlighted[i])
        .transition()
        .delay(delay)
        .duration(t)
        .style("fill", fill)
    }
    highlight = [];
    
    
    d3.selectAll(".chords")
    .transition()
    .delay(delay)
    .duration(t)
    .style("fill", "#A7B9E3")
    
    d3.selectAll(".arrows")
    .transition()
    .delay(delay)
    .duration(t)
    .style("opacity", 0)
    
    d3.selectAll(".annotations")
    .transition()
    .delay(delay)
    .duration(t)
    .style("opacity", 0)
}




function setLink(id, text, linkText, link, delay, t){
    if (typeof delay === "undefined") delay = 1000
    
    d3.select(id)
    .transition()
    .delay(delay)
    .duration(1000)
    .text(text + " ")
    .style("opacity", 0)
    .on("end", function(){
        var a = document.createElement('a');
        var linkNode = document.createTextNode(linkText);
        a.appendChild(linkNode);
        a.title = link;
        a.href = link;
        a.target = "_blank";
        document.getElementById(id.replace("#", "")).appendChild(a);
    })
    
    d3.select(id)
    .transition()
    .delay(delay + 1000)
    .duration(1700)
    .style("opacity", 1)
    
}
