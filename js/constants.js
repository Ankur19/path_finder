const numRows = 25;
const numCols = 70;
var allNodes = new Array(numRows);

// when document ready we need to track the source and destination
// current selection is for the button that is currently active
var currentSelection = "";
var currentSource = 0;
var currentDestination = 0;
var currentRun = 0;
