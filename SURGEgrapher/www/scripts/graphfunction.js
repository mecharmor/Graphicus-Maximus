$(document).ready(function () {

    //graphing functionality here
    var count = 1;


    $("body").keyup(function (e) {
        console.log(e);
        if (e.keyCode === 13) {

            var userText = $("#" + e.target.id).val();
            //$("#" + e.target.id).val("");
            

            
            //change user string to javascript math inside a function (javascript magic!)
            var userTextjs = mathjs(userText.toLowerCase(), 'x');
            var userFunction = function (x) { with (Math) return eval(userTextjs); };
            appendInputField();
            board.create('functiongraph', [userFunction], { strokeWidth: 2 });
            console.log("test");
            console.log(count);
        }

    });

    function appendInputField() {
        var inputField = "<div id='input-" + (count + 1) + "' class='input-group'>" +
            "<span class='input-group-addon' > <i class='glyphicon glyphicon-pencil'></i></span>" +
                "  <input id='userInput-" + (count+1) + "' type='text' class='form- control' placeholder='Enter Function'>" +
            " </div>";
        $('#input-' + count).after(inputField);
        count++;

    }

});