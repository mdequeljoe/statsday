
document.addEventListener("visibilitychange", function(){
    if (document.visibilityState == "visible") location.reload()
  })

  //no annotations for small screens
window.addEventListener("resize", function(){
    if (window.innerWidth < 1360){
        d3.select("g.annotation-group").remove();
        d3.select("g.annotation-total").remove();
        d3.select("g.annotation-chord").remove();
      } 
  })

runStory();

