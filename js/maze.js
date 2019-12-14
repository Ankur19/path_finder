var validWall = function(wall){
    var node = findNode(wall);
    var numVisited = 0;
    node.edges.forEach((edge) => {
        if(!findNode(edge).visited){
            numVisited+=1;
        }
    });
    if (numVisited==1){
        return true;
    }
    else{
        return false;
    }
}
var updateMazeUi = function(wall){
    findElement(wall).css("background-color","white")
}
var updateMaze = function(wall){
    node = findNode(wall);
    node.valid = true;
    node.visited = false;
    allNodes[wall[0]][wall[1]] = node;
}

var drawMaze = async function(){
    for(var i=0;i<numRows;i++){
        for(var j=0;j<numCols;j++){
            var nodeIdx = [i.toString(),j.toString()];
            findElement(nodeIdx).css("background-color","black");
            node = findNode(nodeIdx);
            node.valid = false;
            node.visited = true;
            allNodes[i][j] = node;

        }
    }

    //update current source and destination as valid
    findElement(currentSource).css("background-color","white");
    node = findNode(currentSource);
    node.valid = true;
    node.visited = false;
    allNodes[currentSource[0]][currentSource[1]] = node;

    findElement(currentDestination).css("background-color","white");
    node = findNode(currentDestination);
    node.valid = true;
    node.visited = false;
    allNodes[currentDestination[0]][currentDestination[1]] = node;

    //randomized prims algorithm
    var current = null;
    var wallsList = new Array();
    findNode(currentSource).edges.forEach((node) =>{
        wallsList.push(node);
    })
    var iterations = 0;
    while (iterations <2000 && wallsList.length>=1){
        var randomItem = Math.floor(Math.random() * wallsList.length);
        current = wallsList[randomItem];
        wallsList.splice(randomItem, 1);
        while(!validWall(current) && wallsList.length>0){
            randomItem = randomItem = Math.floor(Math.random() * wallsList.length);
            current = wallsList[randomItem];
            wallsList.splice(randomItem, 1);
        }
        updateMaze(current);
        findNode(current).edges.forEach(( edge ) =>{
            wallsList.push(edge);
        });
        iterations +=1;
    }

    for(var i=0;i<numRows;i++){
        for(var j=0;j<numCols;j++){
            if(findNode([i,j]).valid){
                await fwait(1, updateMazeUi, [i,j]);
            }
        }
    }
}


$(document).ready(function(){
    $("#maze").click(function(){
        drawMaze();
    })
});