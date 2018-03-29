
document.addEventListener("visibilitychange", function(){
    if (document.visibilityState == "visible") location.reload()
  })

  //found here: 
//https://stackoverflow.com/questions/641857/javascript-window-resize-event
var addEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
      object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
      object.attachEvent("on" + type, callback);
    } else {
      object["on"+type] = callback;
    }
  };
  
  //no annotations for small screens
  addEvent(window, "resize", function(event) {
    if (window.innerWidth < 1070){
      rm_ann("g.annotation-group");
      rm_ann("g.annotation-total");
      rm_ann("g.annotation-chord");
    }  
  });

runStory();

