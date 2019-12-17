$(document).ready(function() {
  var url = window.location.href;
  var parsedUrl = new URL(url);
  var algo = parsedUrl.searchParams.get("algo");

  if (url.indexOf("index.html") == -1) {
    url = url + "index.html?algo=djikstra&first=true";
    window.location.assign(url);
  }
  if (parsedUrl.searchParams.get("first") == "true") {
    $("#first-time-ind").attr("value", "1");
  }
  if (algo == undefined || algo == "djikstra") {
    $("#nav-algo").append("  " + "Djikstra's Algorithm");
    $("#current-algo").attr("value", "shortest_path");
  } else if (algo == "dfs") {
    $("#nav-algo").append("  " + "Depth First Search");
    $("#current-algo").attr("value", "tree");
  } else if (algo == "bfs") {
    $("#nav-algo").append("  " + "Breadth First Search");
    $("#current-algo").attr("value", "tree");
  }
});
