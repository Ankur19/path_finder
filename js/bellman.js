function Node(row, col){
    this.valid = true;
    this.weight = Infinity;
    this.pi = null;
    this.visited = false;
    this.visitedNodes = null;
    var neighbour = [1,-1];
    edges = [];
    neighbour.forEach(function(item){
        var row_neighbour = row+item;
        var col_neighbour = col+item;
        if (row_neighbour>=0 && row_neighbour<numRows){
            edges.push([row_neighbour, col]);
        }
        if (col_neighbour>=0 && col_neighbour <numCols){
            edges.push([row, col_neighbour]);
        }
    });
    this.edges = edges;
}
var wait = function(ms){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            resolve("done");
        }, ms)
    })
};

var fwait = function(ms, _function, arg){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            _function(arg);
            resolve("done");
        }, ms)
    });
};

var findElement = function(node){
    return $(`#row_${node[0]}`).find(`#col_${node[1]}`);
};

var findNode = function(node){
    return allNodes[node[0]][node[1]];
};

var updateNodeWeight = function(node, weight, predecessor, visited){
    var newNode = findNode(node);
    newNode.weight = weight;
    newNode.pi = predecessor;
    if (visited != null){
        newNode.visitedNodes = visited.slice(0);
    }
    allNodes[node[0]][node[1]] = newNode;
}

var checkVisited = function(node){
    return findNode(node).visited;
};

var updateVisit = function(node){
    var newNode = findNode(node);
    newNode.visited= true;
    allNodes[node[0]][node[1]] = newNode;
}

var relax = function(node, previous, visited){
    var nodeObject = findNode(node);
    var previousNode = findNode(previous);
    if (nodeObject.weight> previousNode.weight + 1){
        updateNodeWeight(node, previousNode.weight + 1, previous, visited);
    }
};

var backTrack = async function(destination){
    var bt = destination; 
    //findElement(destination).html("d");
    while (bt!=null) {
        //only show backtrack visualization first time
        if(currentRun<=1){
            await wait(100);
        }
        findElement(bt).css("background-color", "yellow");
        bt = findNode(bt).pi;
      }
      currentRun+=1;
};

var removeBackTrack = function(destination){
    var bt = destination;
    //findElement(destination).html("");
    while (bt!=null){
        if (bt==destination){
            findElement(bt).css("background-color", "white");
        }
        else{
            findElement(bt).css("background-color", "skyblue");
        }
        bt = findNode(bt).pi;
        
    };
    return bt;
};

var visualizeNodes = async function(nodeList, found){
    //starting from 1 since we donot visualize the source
    for(var i=1;i<nodeList.length;i++){
        if(i<50){
            await wait(10);
        }
        else{
            await wait(3);
        }
        findElement(nodeList[i]).css("background-color","skyblue");
    }
    if(found){
        backTrack(currentDestination);
    }
    else{
        alert("Destination Not Found..!!");
    }
    
};

$(document).ready(function(){

    // when any grid element is clicked it checks which button is currently active and based on the button selects the source or destination
    $(".grid-element").on('click', function(){
        var col = $(this).attr("id").split("_")[1];
        var row = $(this).parent().attr('id').split("_")[1];
        var elem = [row,col];
        if(currentSelection=="wall" && currentSource != elem && currentDestination != elem){
            updateInvalid(elem);
            
        }
    });

    $("#start").click(function(){
        if((currentSource != currentDestination) && currentRun==0){
            //Run Bellman Ford
            //Find the current Node 
            var node = findNode(currentSource);

            var needVisit = new Array();
            needVisit.push(currentSource);
            updateNodeWeight(currentSource, 0, null, null);
            var found = false;
            var iterations = 0;
            var extraIterations = 0;
            while ((!found && iterations < ((numRows*numCols)-1)) || (found && extraIterations<3)){
                var newNodes = new Array();
                needVisit.forEach(function(node){
                    findNode(node).edges.forEach(function(neighbour){
                        if(findNode(neighbour).valid){
                            relax(neighbour, node, needVisit);
                            if ((neighbour[0]==currentDestination[0]) && (neighbour[1]==currentDestination[1])){
                                found=true;
                            }
                            if (found){
                                extraIterations+=1;
                            }
                            if(!checkVisited(neighbour)){
                                newNodes.push(neighbour);
                                updateVisit(neighbour);
                            }
                        }
                        
                    });
                });
                newNodes.forEach(function(newNode){
                    needVisit.push(newNode);
                });
                iterations+=1;
            };
            visualizeNodes(needVisit, found);
            currentRun+=1;
            $("#source").attr("draggable", "false");
        }
    });

    $("#wall").click(function(){
        currentSelection = "wall";
    })

});





// bellman ford algorithm logic in 2d space
var bellmanFord = function(source, destination){

    var node = findNode(source);

    var needVisit = new Array();
    needVisit.push(source);
    updateNodeWeight(source, 0, null);
    var found = false;
    var iterations = 0;
    var extraIterations = 0;

    while ((!found && iterations < ((numRows*numCols)-1)) || (found && extraIterations<3)){
        var newNodes = new Array();
        needVisit.forEach(function(node){
            findNode(node).edges.forEach(function(neighbour){
                relax(neighbour, node);
                if ((neighbour[0]==destination[0]) && (neighbour[1]==destination[1])){
                    found=true;
                }
                if (found){
                    extraIterations+=1;
                }
                if(!checkVisited(neighbour)){
                    newNodes.push(neighbour);
                    updateVisit(neighbour);
                }
            });
        });
        newNodes.forEach(function(newNode){
            needVisit.push(newNode);
        });
        iterations+=1;
    };
    if(found){
        backTrack(destination);
    }
    else{
        alert("No Path Present..!!");
    }
    
};