$(document).ready(function() {
  // when any grid element is clicked it checks which button is currently active and based on the button selects the source or destination
  $(".grid-element").on("click", function() {
    var col = $(this)
      .attr("id")
      .split("_")[1];
    var row = $(this)
      .parent()
      .attr("id")
      .split("_")[1];
    var elem = [row, col];
    if (
      currentSelection == "wall" &&
      currentSource != elem &&
      currentDestination != elem
    ) {
      updateInvalid(elem);
    }
  });

  $("#wall").click(function() {
    currentSelection = "wall";
  });
});
