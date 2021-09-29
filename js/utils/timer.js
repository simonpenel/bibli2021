var timeoutInMiliseconds = 20000;
var timeoutId; 
 
function startTimer() { 
    // window.setTimeout returns an Id that can be used to start and stop a timer
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}
 
function doInactive() {
    // does whatever you need it to actually do - probably signs them out or stops polling the server for info
	console.log("Session inactive, back to root");
	zoomTo(1);
	map.removeLayer(SPfocus);    
	if (selected) {
		degrise(selected);
	}
    //close sliding window if open
    closebarre2()
    //remove way between species if any
}

function resetTimer() { 
    window.clearTimeout(timeoutId)
    startTimer();
}
function setupTimers () {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
     
    startTimer();
}
 
