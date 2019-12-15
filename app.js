var url = window.location.href;

url = new URL(url);
var algo = url.searchParams.get("algo");
if (algo == undefined || algo == "djikstra") {
  $("#nav-algo").append("  " + "Djikstra's Algorithm");
  $("#current-algo").attr("value", "shortest_path");
} else if (algo == "dfs") {
  $("#nav-algo").append("  " + "Depth First Search");
  $("#current-algo").attr("value", "tree");
}

document.ready(function() {
  var url = window.location.href;
  if (url.indexOf("index.html") == -1) {
    url = url + "index.html?algo=djikstra";
    window.location.href(url);
  }
});
