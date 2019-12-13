
var drawMaze = async function(){

    for(var i=0;i<numRows;i++){
        for(var j=0;j<numCols;j++){
            var nodeIdx = [i.toString(),j.toString()];
            if(currentSource != nodeIdx){
                findElement(nodeIdx).css("background-color","black");
                node = findNode(nodeIdx);
                node.valid = false;
                node.visited = true;
                allNodes[i][j] = node;
            }
        }
    }
    //randomized prims algorithm
    var current = currentSource;
    var wallsList = findNode(current).edges;
    while (wallsList.length>0){
        var randomItem = Math.floor(Math.random() * wallsList.length);
        
    }
}


$(document).ready(function(){
    $("#maze").click(function(){
        drawMaze();
    })
});