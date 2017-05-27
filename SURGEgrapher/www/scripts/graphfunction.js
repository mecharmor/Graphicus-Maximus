$(document).ready(function () {

    //graphing functionality here

    $("#userInput").keyup(function (e) {

        if (e.keyCode === 13) {
            var userText = $("#userInput").val();
            $("#userInput").val("");
            
            //change user string to javascript math inside a function (javascript magic!)
            var userTextjs = mathjs(userText.toLowerCase(), 'x');
            var userFunction = function (x) { with (Math) return eval(userTextjs); };

            board.create('functiongraph', [userFunction], { strokeWidth: 2 });
        }

    });

});