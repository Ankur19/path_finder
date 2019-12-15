$(document).ready(function() {
  var url = window.location.href;
  url = new URL(url);
  var algo = url.searchParams.get("algo");
  if (algo == undefined || algo == "djikstra") {
    $("#start").click(function() {
      if (currentSource != currentDestination && currentRun == 0) {
        //Run Bellman Ford
        //Find the current Node
        var node = findNode(currentSource);

        var needVisit = new Array();
        needVisit.push(currentSource);
        updateNodeWeight(currentSource, 0, null, null);
        var found = false;
        var iterations = 0;
        var extraIterations = 0;
        while (
          (!found && iterations < numRows * numCols - 1) ||
          (found && extraIterations < 3)
        ) {
          var newNodes = new Array();
          needVisit.forEach(function(node) {
            findNode(node).edges.forEach(function(neighbour) {
              if (findNode(neighbour).valid) {
                relax(neighbour, node, needVisit);
                if (
                  neighbour[0] == currentDestination[0] &&
                  neighbour[1] == currentDestination[1]
                ) {
                  found = true;
                }
                if (found) {
                  extraIterations += 1;
                }
                if (!checkVisited(neighbour)) {
                  newNodes.push(neighbour);
                  updateVisit(neighbour);
                }
              }
            });
          });
          newNodes.forEach(function(newNode) {
            needVisit.push(newNode);
          });
          iterations += 1;
        }
        visualizeNodes(needVisit, found);
        currentRun += 1;
        $("#source").attr("draggable", "false");
      }
    });
  }
});

// bellman ford algorithm logic in 2d space
var bellmanFord = function(source, destination) {
  var node = findNode(source);

  var needVisit = new Array();
  needVisit.push(source);
  updateNodeWeight(source, 0, null);
  var found = false;
  var iterations = 0;
  var extraIterations = 0;

  while (
    (!found && iterations < numRows * numCols - 1) ||
    (found && extraIterations < 3)
  ) {
    var newNodes = new Array();
    needVisit.forEach(function(node) {
      findNode(node).edges.forEach(function(neighbour) {
        relax(neighbour, node);
        if (neighbour[0] == destination[0] && neighbour[1] == destination[1]) {
          found = true;
        }
        if (found) {
          extraIterations += 1;
        }
        if (!checkVisited(neighbour)) {
          newNodes.push(neighbour);
          updateVisit(neighbour);
        }
      });
    });
    newNodes.forEach(function(newNode) {
      needVisit.push(newNode);
    });
    iterations += 1;
  }
  if (found) {
    backTrack(destination);
  } else {
    alert("No Path Present..!!");
  }
};
