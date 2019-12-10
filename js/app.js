//var ui = require("./ui.js");

var numRows = 30;
var numCols = 60;
var allNodes = new Array(numRows);

$(document).ready(function(){

    // when document ready we need to track the source and destination
    // current selection is for the button that is currently active
    var currentSelection = '';
    var currentSource = 0;
    var currentDestination = 0;
    // when select source is clicked update current selection value
    $("#select-source").click(function(){
        currentSelection = 'source';
    });
    // when select destination is clicked update current selection value
    $("#select-destination").click(function(){
        currentSelection = 'destination';
    });

    // when any grid element is clicked it checks which button is currently active and based on the button selects the source or destination
    $(".grid-element").on('click', function(){
        
        if (currentSelection=='source'){
            if(currentSource !=0){
                var element = $(`#row_${currentSource[0]}`).find(`#col_${currentSource[1]}`);
                element.html("");
                element.css("background-color","white");
            }
            var col = $(this).attr("id").split("_")[1];
            var row = $(this).parent().attr('id').split("_")[1];
            currentSource = [row, col];
            var element = $(`#row_${currentSource[0]}`).find(`#col_${currentSource[1]}`);
            element.html("<p>s</p>");
            element.css("background-color","yellow");
            currentSelection = "";
        }

        else if (currentSelection=='destination'){
            if(currentDestination !=0){
                var element = $(`#row_${currentDestination[0]}`).find(`#col_${currentDestination[1]}`);
                element.html("");
                element.css("background-color","white");
            }
            var col = $(this).attr("id").split("_")[1];
            var row = $(this).parent().attr('id').split("_")[1];
            currentDestination = [row, col];
            var element = $(`#row_${currentDestination[0]}`).find(`#col_${currentDestination[1]}`);
            element.html("<p>d</p>");
            element.css("background-color","yellow");
            currentSelection = "";
        }
        else{
            var col = $(this).attr("id").split("_")[1];
            var row = $(this).parent().attr('id').split("_")[1];
            var destination = [row,col];
            if(findNode(destination).visited){
                removeBackTrack(currentDestination);
                backTrack(destination);
                currentDestination = destination;
            }
        }
    });

    $("#start").click(function(){
        if(currentSource != currentDestination){
            bellmanFord(currentSource, currentDestination);
        }
    });



});

function Node(row, col){
    this.valid = true;
    this.weight = Infinity;
    this.pi = null;
    this.visited = false;
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

var findElement = function(node){
    return $(`#row_${node[0]}`).find(`#col_${node[1]}`);
};

var findNode = function(node){
    return allNodes[node[0]][node[1]];
};

var updateNodeWeight = function(node, weight, predecessor){
    var newNode = findNode(node);
    newNode.weight = weight;
    newNode.pi = predecessor;
    allNodes[node[0]][node[1]] = newNode;
    findElement(node).css("background-color","blue");
}

var checkVisited = function(node){
    return findNode(node).visited;
};

var updateVisit = function(node){
    var newNode = findNode(node);
    newNode.visited= true;
    allNodes[node[0]][node[1]] = newNode;
}

var relax = function(node, previous){
    var nodeObject = findNode(node);
    var previousNode = findNode(previous);
    if (nodeObject.weight> previousNode.weight + 1){
        updateNodeWeight(node, previousNode.weight + 1, previous);
    }
};

var backTrack = function(destination){
    var bt = destination;
    findElement(destination).html("d");
    while (bt!=null){
        findElement(bt).css("background-color", "yellow");
        bt = findNode(bt).pi;
    };
};

var removeBackTrack = function(destination){
    var bt = destination;
    findElement(destination).html("");
    while (bt!=null){
        findElement(bt).css("background-color", "blue");
        bt = findNode(bt).pi;
    };
};

// bellman ford algorithm logic in 2d space
var bellmanFord = function(source, destination){

    var node = findNode(source);

    var needVisit = new Array();
    needVisit.push(source);
    updateNodeWeight(source, 0, null);
    var found = false;
    var iterations = 0;
    var extraIterations = 0;

    while (!found || (found && extraIterations<3)){
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
        })
    };

    backTrack(destination);
    
};




// ui to show the grid for shortest paths
var ui = function(type){

    if (type=="shortest_path"){
        for(var j = 0;j<numRows;j++){
            $(".path-grid").append(`<div id='row_${j}' class='row'></div>`);
            allNodes[j] = new Array(numCols);
                for(var i=0; i<numCols;i++){
                    $(`#row_${j}`).append(`<div id = 'col_${i}' class='grid-element col'></div>`);
                    allNodes[j][i] = new Node(j,i);
                }
        }
    
    }
};

ui("shortest_path");