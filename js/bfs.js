$(document).ready(function() {
  var url = window.location.href;
  url = new URL(url);
  var algo = url.searchParams.get("algo");
  if (algo == "bfs") {
    $("#start").click(function() {
      currentSelection = "";
      if (currentSource != currentDestination && currentRun == 0) {
        //Run bfs
        //Find the current Source Node
        var node = findNode(currentSource);
        var needVisit = new Array();

        node.edges.forEach(edge => {
          if (findNode(edge).valid == true) {
            needVisit.push(edge);
          }
        });
        updateVisit(currentSource);

        var found = false;
        var visitOrder = new Array();
        var newNeedVisit = new Array();
        while (!found && needVisit.length > 0) {
          var current = needVisit.pop();
          //visualizeDfsNode(current);
          visitOrder.push(current);
          updateVisit(current);
          if (sameNode(current, currentDestination)) {
            found = true;
          }
          if (hasUnvisitedChildNodes(current)) {
            findNode(current).edges.forEach(edge => {
              if (findNode(edge).valid && findNode(edge).visited == false) {
                newNeedVisit.push(edge);
              }
            });
          }
          if (needVisit.length == 0) {
            newNeedVisit = [...new Set(newNeedVisit)];
            newNeedVisit.forEach(edge => {
              needVisit.push(edge);
            });
            newNeedVisit = new Array();
          }
        }
        currentRun += 1;
        visualizeDfsNode(visitOrder, found);
        $("#source").attr("draggable", "false");
        $("#destination").attr("draggable", "false");
      }
    });
  }
});

var visualizeDfsNode = async function(nodeList, found) {
  for (var i = 0; i < nodeList.length; i++) {
    await updateDfsNodeColor(nodeList[i]);
  }
  if (!found) {
    alert("Destination Not Found");
  }
};

var updateDfsNodeColor = function(node) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //if skyblue or deep skyblue
      if (
        findElement(node).css("background-color") == "rgb(135, 206, 235)" ||
        findElement(node).css("background-color") == "rgb(0, 191, 255)"
      ) {
        findElement(node).css("background-color", "deepskyblue");
      } else {
        findElement(node).css("background-color", "skyblue");
      }
      resolve("done");
    }, 5);
  });
};

var hasUnvisitedChildNodes = function(node) {
  var count = 0;
  findNode(node).edges.forEach(edge => {
    if (findNode(edge).valid && findNode(edge).visited == false) {
      count += 1;
    }
  });
  if (count > 0) {
    return true;
  }
  return false;
};
