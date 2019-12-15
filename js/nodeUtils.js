function Node(row, col) {
  this.valid = true;
  this.weight = Infinity;
  this.pi = null;
  this.visited = false;
  this.visitedNodes = null;
  var neighbour = [1, -1];
  edges = [];
  neighbour.forEach(function(item) {
    var row_neighbour = row + item;
    var col_neighbour = col + item;
    if (row_neighbour >= 0 && row_neighbour < numRows) {
      edges.push([row_neighbour, col]);
    }
    if (col_neighbour >= 0 && col_neighbour < numCols) {
      edges.push([row, col_neighbour]);
    }
  });
  this.edges = edges;
}

var wait = function(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, ms);
  });
};

var fwait = function(ms, _function, arg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      _function(arg);
      resolve("done");
    }, ms);
  });
};

var findElement = function(node) {
  return $(`#row_${node[0]}`).find(`#col_${node[1]}`);
};

var findNode = function(node) {
  return allNodes[node[0]][node[1]];
};

var updateNodeWeight = function(node, weight, predecessor, visited) {
  var newNode = findNode(node);
  newNode.weight = weight;
  newNode.pi = predecessor;
  if (visited != null) {
    newNode.visitedNodes = visited.slice(0);
  }
  allNodes[node[0]][node[1]] = newNode;
};

var checkVisited = function(node) {
  return findNode(node).visited;
};

var updateVisit = function(node) {
  var newNode = findNode(node);
  newNode.visited = true;
  allNodes[node[0]][node[1]] = newNode;
};

var relax = function(node, previous, visited) {
  var nodeObject = findNode(node);
  var previousNode = findNode(previous);
  if (nodeObject.weight > previousNode.weight + 1) {
    updateNodeWeight(node, previousNode.weight + 1, previous, visited);
  }
};

var backTrack = async function(destination) {
  var bt = destination;
  //findElement(destination).html("d");
  while (bt != null) {
    //only show backtrack visualization first time
    if (currentRun <= 1) {
      await wait(100);
    }
    findElement(bt).css("background-color", "yellow");
    bt = findNode(bt).pi;
  }
  currentRun += 1;
};

var removeBackTrack = function(destination) {
  var bt = destination;
  //findElement(destination).html("");
  while (bt != null) {
    if (bt == destination) {
      findElement(bt).css("background-color", "white");
    } else {
      findElement(bt).css("background-color", "skyblue");
    }
    bt = findNode(bt).pi;
  }
  return bt;
};

var visualizeNodes = async function(nodeList, found) {
  //starting from 1 since we donot visualize the source
  for (var i = 1; i < nodeList.length; i++) {
    if (i < 50) {
      await wait(10);
    } else {
      await wait(3);
    }
    findElement(nodeList[i]).css("background-color", "skyblue");
  }
  if (found) {
    if ($("#current-algo").attr("value") == "shortest_path") {
      backTrack(currentDestination);
    }
  } else {
    alert("Destination Not Found..!!");
  }
};

var sameNode = function(node1, node2) {
  if (
    node1[0].toString() == node2[0].toString() &&
    node1[1].toString() == node2[1].toString()
  ) {
    return true;
  }
  return false;
};
