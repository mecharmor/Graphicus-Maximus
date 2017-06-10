var functions = [];
// This is used for editting a selected function.
var currIndex = -1;
var count = 0;

$(document).ready(function () {
    

    $("#userInput-1").keyup(function (e) {
        
        if (e.keyCode === 13) {

            var userText = $("#" + e.target.id).val(); // Gets the id of the main text box
            addFunction(userText);
            // Deletes the value from the main text box
            $("#" + e.target.id).val("");
        }

    });

    for (var i = 0; i < 5; i++)
        addFunction("x");

});
function appendInputField() {
    // Comes out disabled so that you must press the edit button. I added a index attribute to input-(index) for easy pickings
    var inputField = "<div id='input-" + count + "' class='input-group' index='" + count + "'>" +
        "<span class='input-group-addon btn' onclick='editFunc(" + Number(count) + ");' > <i class='glyphicon glyphicon-pencil'></i></span>" +
        "  <input disabled='disabled' type='text' class='form-control' value='" + functions[count].text + "'>" +
        " </div>";
    $('#function-list').append(inputField);
    count++;
}

function addFunction(userText) {
    if (userText === "") // Do not allow solo functions
        return;
    console.log(userText);
    //change user string to javascript math inside a function (javascript magic!)
    var userTextjs = mathjs(userText.toLowerCase(), 'x');
    var userFunction = function (x) { with (Math) return eval(userTextjs); };
    var graph = board.create('functiongraph', [userFunction], { strokeWidth: 2 });

    functions[count] = {
        graph: graph,
        text: userText
    };
    // Appends the input field to the next input
    appendInputField();
}

// Edits the function given the index
function editFunc(index) {
    // Let me explain the currIndex variable, it's pretty simple actually
    // currIndex is an index used for the function array.
    // Set currIndex to -1 for it to not mess with the function array
    // It starts out at -1, but when you edit a function it becomes the index for the function


    // This is the first time you click the button and currIndex is -1.
    // This will make currIndex to the selected index and enable the editting
    if (currIndex == -1) {
        currIndex = index;
        $("#input-" + (index+2)+" input").removeAttr("disabled");
        return;
        // Bounces out of there
    }
    // If something else is being editted then it shouldn't edit this one either
    else if (currIndex != index) {
        return;
    }

    // When you get to this point you reset currIndex to -1 so that you are no longer editting the function
    currIndex = -1;
    $("#input-" + (index + 2)+" input").attr("disabled", "disabled"); // Disables the input
    // Deletes the graph
    board.removeObject(functions[index].graph);
    delete functions[index].graph;
    // Creates a new graph
    // Note: The userInput-(index) is kind of messed up
    var userText = functions[index].text;
    if (userText === "") {// Do not allow solo functions
        return;
    }
    //change user string to javascript math inside a function (javascript magic!)
    var userTextjs = mathjs(userText.toLowerCase(), 'x');
    var userFunction = function (x) { with (Math) return eval(userTextjs); };
    var graph = board.create('functiongraph', [userFunction], { strokeWidth: 2 });

    functions[index] = {
        graph: graph,
        text: userText
    };
}