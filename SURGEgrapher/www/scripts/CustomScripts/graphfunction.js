var functions=  [];

$(document).ready(function () {

    //graphing functionality here
    var count = 0;

    $("body").keyup(function (e) {
        if (e.keyCode === 13) {

            var userText = $("#" + e.target.id).val();
            if (userText === "") // Do not allow solo functions
                return;
            //change user string to javascript math inside a function (javascript magic!)
            var userTextjs = mathjs(userText.toLowerCase(), 'x');
            var userFunction = function (x) { with (Math) return eval(userTextjs); };
            var graph=  board.create('functiongraph', [userFunction], { strokeWidth: 2 });
            var index=  Number(e.target.id.split('-')[1])-1;
            
            if(index>= count)   {
                functions[count]=   {
                    graph:  graph,
                    text:   userText
                };
                appendInputField();
            }
            else    {
                board.removeObject(functions[index].graph);
                delete functions[index].graph;
                functions[index]=   {
                    graph:  graph,
                    text:   userText
                };
            }
        }

    });
    
    function appendInputField() {
        var inputField = "<div id='input-" + (count + 2) + "' class='input-group'>" +
            "<span class='input-group-addon' > <i class='glyphicon glyphicon-pencil'></i></span>" +
                "  <input id='userInput-" + (count+2) + "' type='text' class='form-control' placeholder='Enter Function'>" +
            " </div>";
        $('#input-' + (count + 1)).after(inputField);
        $("#userInput-" + (count + 2)).focus();
        count++;
    }

});