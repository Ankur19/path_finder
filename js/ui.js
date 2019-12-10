var ui = function(type){

    if (type=="shortest_path"){
        for(var j = 0;j<20;j++){
            $(".path-grid").append(`<div id='row_${j}' class='row'>`);
            for(var i=0; i<50;i++){
                $(".path-grid").append(`<div id = 'col_${i}' class='grid-element col'></div>`);
            }
            $(".path-grid").append("</div>");
        }

        $(".grid-element").css("height", "5%");
        $(".grid-element").css("width", "2%");
    }
};

module.exports = ui;