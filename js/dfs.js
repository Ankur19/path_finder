$(document).ready(function() {
  var url = window.location.href;
  url = new URL(url);
  var algo = url.searchParams.get("algo");
  if (algo == "dfs") {
    $("#start").click(function() {
      currentSelection = "";
      if (currentSource != currentDestination && currentRun == 0) {
        //Run Dfs
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
        while (!found && needVisit.length > 0) {
          var current = needVisit.pop();
          //visualizeDfsNode(current);
          visitOrder.push(current);
          updateVisit(current);
          if (sameNode(current, currentDestination)) {
            found = true;
          }
          if (hasUnvisitedChildNodes(current)) {
            needVisit.push(current);
            findNode(current).edges.forEach(edge => {
              if (findNode(edge).valid && findNode(edge).visited == false) {
                needVisit.push(edge);
              }
            });
          }
        }
        currentRun += 1;
        visualizeDfsNode(visitOrder);
        if (!found) {
          alert("Destination Not Found");
        }
        $("#source").attr("draggable", "false");
        $("#destination").attr("draggable", "false");
      }
    });
  }
});

var visualizeDfsNode = async function(nodeList) {
  for (var i = 0; i < nodeList.length; i++) {
    await updateDfsNodeColor(nodeList[i]);
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
    }, 10);
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
