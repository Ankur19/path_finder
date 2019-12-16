$(document).ready(function() {
  if ($("#first-time-ind").attr("value") != "0") {
    updateTutorialModal($("#first-time-ind").attr("value"));
    setTimeout(() => {
      $("#tutorial").modal("show");
    }, 1000);
  }

  $("#tutorial-next").click(function() {
    if (parseInt($("#first-time-ind").attr("value")) < 5) {
      var currentPage = parseInt($("#first-time-ind").attr("value")) + 1;
      $("#first-time-ind").attr("value", currentPage);
      updateTutorialModal($("#first-time-ind").attr("value"));
    }
  });

  $("#tutorial-previous").click(function() {
    if (parseInt($("#first-time-ind").attr("value")) > 1) {
      var currentPage = parseInt($("#first-time-ind").attr("value")) - 1;
      $("#first-time-ind").attr("value", currentPage);
      updateTutorialModal($("#first-time-ind").attr("value"));
    }
  });
});

var updateTutorialModal = function(num) {
  if (num == "1") {
    $("#staticBackdropLabel").html(
      `<span id='modal-header-content'>Welcome to Path Finder</span>`
    );

    $("#current-tutorial-page").html(`${num}/5`);

    var body = $(".modal-body");
    body.html("");
    body.append("<p id='modal-maintext' class='font-italic'></p>");
    $("#modal-maintext").append(
      "A tool to visualize common shortest path finding algorithms and tree search algorithms. The app provides a <span class='font-weight-bold'>source</span> and a <span class='font-weight-bold'>destination</span> which can be placed anywhere in the grid and the selected algorithm can be used to find the shortest path from the source to the destination"
    );
    body.append("<br><div id='modal-bodytext'></div>");
    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>a.</span> <span class='font-italic'> Click here to select the algorithm</span><br><br>"
    );
    $("#modal-bodytext").append(
      "<img src='images/1_algos.png' style='height:70px;width:500px;'><br><br>"
    );

    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>b.</span> <span class='font-italic'> The <span class='font-weight-bold'>current</span> option shows the current algorithm selected</span><br><br>"
    );
    $("#modal-bodytext").append(
      "<img src='images/1_current.png' style='height:70px;width:450px;margin-bottom:20px;'><br>"
    );

    $("#modal-bodytext").append(
      "<hr/><img  src='images/path.gif' style='border:1px solid grey;'>"
    );
  } else if (num == "2") {
    $("#staticBackdropLabel").html(
      `<span id='modal-header-content'>The Source and the Destination</span>`
    );

    $("#current-tutorial-page").html(`${num}/5`);

    var body = $(".modal-body");
    body.html("");
    body.append("<p id='modal-maintext' class='font-italic'></p>");
    $("#modal-maintext").append(
      "The source and destination provides the user with choices as to where they want the visualization to start and end. The more distant they are the more calculations are needed"
    );
    body.append("<br><div id='modal-bodytext'></div>");
    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>a.</span> <span class='font-italic'> The <span class='font-weight-bold'>source</span> is the icon pointing left and is dark blue</span><br><br>"
    );
    $("#modal-bodytext").append(
      "<img src='images/2_source.png' style='height:70px;width:300px;border:1px solid grey;'><br><br>"
    );

    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>b.</span> <span class='font-italic'> The <span class='font-weight-bold'>destination</span> is the icon pointing right and is light blue</span><br><br>"
    );
    $("#modal-bodytext").append(
      "<img src='images/2_destination.png' style='height:70px;width:300px;border:1px solid grey;margin-bottom:20px;'><br>"
    );

    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>c.</span> <span class='font-italic'>The source and destination support drag and drop anywhere in the grid </span><br>"
    );

    $("#modal-bodytext").append(
      "<hr/><img  src='images/path.gif' style='border:1px solid grey;'>"
    );
  } else if (num == "3") {
    $("#staticBackdropLabel").html(
      `<span id='modal-header-content'>How to Visualize</span>`
    );

    $("#current-tutorial-page").html(`${num}/5`);

    var body = $(".modal-body");
    body.html("");
    body.append("<p id='modal-maintext' class='font-italic'></p>");
    $("#modal-maintext").append(
      "On clicking start button the visualization starts. After completion, the destination icon can be dragged around visited nodes to check the path taken for each node"
    );
    body.append("<br><div id='modal-bodytext'></div>");
    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>a.</span> <span class='font-italic'> Click the <span class='font-weight-bold'>start</span> button in the upper left corner</span><br><br>"
    );
    $("#modal-bodytext").append(
      "<img src='images/3_start.gif' style='height:200px;width:400px;border:1px solid grey;'><br><br>"
    );

    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>b.</span> <span class='font-italic'> Once visualization completes the <span class='font-weight-bold'>destination</span> icon can be moved over visited nodes</span><br><br>"
    );
    $("#modal-bodytext").append(
      "<img src='images/3_visited.gif' style='height:200px;width:400px;border:1px solid grey;'><br>"
    );

    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>c.</span> <span class='font-italic'>The blue nodes indicate the nodes visited to find the path to the given destination</span>"
    );
  } else if (num == "4") {
    $("#staticBackdropLabel").html(
      `<span id='modal-header-content'>Option to Build Walls</span>`
    );

    $("#current-tutorial-page").html(`${num}/5`);

    var body = $(".modal-body");
    body.html("");
    body.append("<p id='modal-maintext' class='font-italic'></p>");
    $("#modal-maintext").append(
      "The build wall button can be used to build walls in the grid. The algorithm never takes a path through a wall and will find an alternative route to reach the destination"
    );
    body.append("<br><div id='modal-bodytext'></div>");
    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>a.</span> <span class='font-italic'> Click the build wall button to start</span><br><br>"
    );
    $("#modal-bodytext").append(
      "<img src='images/4_build_wall.gif' style='height:200px;width:400px;border:1px solid grey;'><br><br>"
    );

    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>b.</span> <span class='font-italic'> Now click anywhere in the grid to generate a wall node. Once the node turns black, drag it to draw walls of unique shapes</span><br><br>"
    );
    $("#modal-bodytext").append(
      "<img src='images/4_wall_draw.gif' style='height:200px;width:400px;border:1px solid grey;'><br>"
    );
  } else if (num == "5") {
    $("#staticBackdropLabel").html(
      `<span id='modal-header-content'>Build a Maze and try Visualizing</span>`
    );

    $("#current-tutorial-page").html(`${num}/5`);

    var body = $(".modal-body");
    body.html("");
    body.append("<p id='modal-maintext' class='font-italic'></p>");
    $("#modal-maintext").append(
      "The build maze button can be used to build a maze over the graph. The maze uses randomized prims minimum spanning tree algorithm to create walls and pathways"
    );
    body.append("<br><div id='modal-bodytext'></div>");
    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>a.</span> <span class='font-italic'> Click the draw maze button to start</span><br><br>"
    );
    $("#modal-bodytext").append(
      "<img src='images/5_maze.gif' style='height:200px;width:400px;border:1px solid grey;'><br><br>"
    );

    $("#modal-bodytext").append(
      "<span class='font-weight-bold'>b.</span> <span class='font-italic'> The selected algorithm can now be visualized similarly by clicking start</span><br><br>"
    );
  }
};
