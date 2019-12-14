//random index from grid
var randomPoint = function(rows, cols) {
  return [Math.floor(Math.random() * rows), Math.floor(Math.random() * cols)];
};

// function to show source and destination pointers
var placePointers = function() {
  var source =
    '<img id = "source" class = "pointer-image" src = "../images/source.png" draggable=true ondragstart=\'onDragStart(event);\'>';
  var destination =
    '<img id = "destination" class = "pointer-image" src = "../images/destination.png" draggable=true ondragstart=\'onDragStart(event);\'>';

  var sIndex = randomPoint(numRows, numCols);
  var dIndex = randomPoint(numRows, numCols);

  while (sIndex[0] == dIndex[0]) {
    dIndex = randomPoint(numRows, numCols);
  }

  $(`#row_${sIndex[0]}`)
    .children(`#col_${sIndex[1]}`)
    .append(source);
  $(`#row_${dIndex[0]}`)
    .children(`#col_${dIndex[1]}`)
    .append(destination);
  currentSource = sIndex;
  currentDestination = dIndex;
  $(".pointer-image").show();
};

// ui to show the grid for shortest paths
var ui = function(type) {
  if (type == "shortest_path") {
    //Show the grid
    for (var j = 0; j < numRows; j++) {
      $(".path-grid").append(`<p id='grid_row_${j}' class = 'grid-row'></p>`);
      $(`#grid_row_${j}`).append(
        `<div id='row_${j}' class='grid-row-div'></div>`
      );
      allNodes[j] = new Array(numCols);
      for (var i = 0; i < numCols; i++) {
        $(`#row_${j}`).append(
          `<div id = 'col_${i}' class='grid-element' ondragenter='onDragEnter(event);' ondragleave='onDragLeave(event);' ondragover='onDragOver(event);' ondrop='onDrop(event);'></div>`
        );
        allNodes[j][i] = new Node(j, i);
      }
    }

    placePointers();
  }
};

var findIndex = function(event) {
  var row = $(event.target)
    .parent("div")
    .attr("id")
    .split("_")[1];
  var col = $(event.target)
    .attr("id")
    .split("_")[1];
  return [row, col];
};
var updateInvalid = function(node) {
  var elem = findElement(node);
  elem.attr("draggable", "true");
  elem.attr("ondragstart", "onDragStart(event);");
  elem.css("background-color", "black");
  var newNode = findNode(node);
  newNode.valid = false;
  allNodes[node[0]][node[1]] = newNode;
};
function onDragStart(event) {
  if (currentSelection != "wall") {
    event.dataTransfer.setData(
      "text/plain",
      event.target.id +
        "--" +
        $(event.target)
          .parent("div")
          .attr("id") +
        "--" +
        $(event.target)
          .parent("div")
          .parent("div")
          .attr("id")
    );
    currentSelection = event.target.id;
  }
}

function onDragOver(event) {
  event.preventDefault();
}

function onDragEnter(event) {
  event.preventDefault();
  var elemIndex = findIndex(event);
  if (currentSelection == "wall") {
    if (elemIndex != currentSource || elemIndex != currentDestination) {
      updateInvalid(elemIndex);
    }
  } else {
    if (
      elemIndex[0] != undefined &&
      elemIndex[1] != undefined &&
      findNode(elemIndex).valid
    ) {
      if (currentSelection == "destination" && findNode(elemIndex).visited) {
        var nodes = findNode(currentDestination).visitedNodes;
        var current = findNode(elemIndex).visitedNodes;

        removeBackTrack(currentDestination);

        currentDestination = elemIndex;
        if (nodes.length > current.length) {
          var toRemoveColor = nodes.slice(current.length);
          toRemoveColor.forEach(function(node) {
            findElement(node).css("background-color", "white");
          });
        } else if (nodes.length < current.length) {
          var toAddColor = current.slice(nodes.length);

          toAddColor.forEach(function(node) {
            findElement(node).css("background-color", "skyblue");
          });
        }
      }
    }
  }
}
function onDragLeave(event) {
  event.preventDefault();
  if (currentRun > 0) {
    backTrack(currentDestination);
  }
}

function onDrop(event) {
  if (currentSelection != "wall") {
    const id = event.dataTransfer.getData("text").split("--");

    var oldRow = id[2].split("_")[1];
    var oldCol = id[1].split("_")[1];

    $pointer = $(`#${id[0]}`).clone();
    $(`#${id[0]}`).remove();

    var row = $(event.target)
      .parent("div")
      .attr("id")
      .split("_")[1];
    var col = $(event.target)
      .attr("id")
      .split("_")[1];

    if (row != undefined && col != undefined && findNode([row, col]).valid) {
      $(event.target).append($pointer);

      if (id[0] == "source") {
        currentSource = [row, col];
      } else if (id[0] == "destination") {
        currentDestination = [row, col];
      }
    } else {
      if (id[0] == "source") {
        findElement(currentSource).append($pointer);
      } else if (id[0] == "destination") {
        findElement(currentDestination).append($pointer);
      }
    }
  }
  currentSelection = "";
  event.dataTransfer.clearData();
}

var current_algo = $("#current-algo").attr("value");

ui(current_algo);
