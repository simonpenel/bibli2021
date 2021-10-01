var timeoutInMiliseconds = 50000;
var timeoutId;

function startTimer() {
    // window.setTimeout returns an Id that can be used to start and stop a timer
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}

function doInactive() {
    // does whatever you need it to actually do - probably signs them out or stops polling the server for info
	console.log("Session inactive, back to root");
    //get back to initial step
    BackToInitialStep()

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
