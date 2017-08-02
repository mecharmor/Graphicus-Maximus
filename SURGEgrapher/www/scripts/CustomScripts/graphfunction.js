﻿var functions = [];
var colors = [
    "blue",
    "red",
    "green",
    "purple",
    "black"
];
// This is used for editting a selected function.
var currIndex = -1;
var count = 0;

$(document).ready(function () {
    
    $("#userInput").keyup(function (e) {
        
        if (e.keyCode === 13) {
            //Mr. Redden's attempt to streamline this
            var userText = $(this).val();

            if (userText == "")
                return;

            graphFunction(userText);
           
        }
    });

    $("#graphInput").click(function () {
        // Variables
        var userText = $("#userInput").val();

        if (userText == "")
            return;

        graphFunction(userText);
        $("#menuModal").modal("hide");
        boxBlur(0);
    });

  
});

//Mr. Redden's attempt to streamline this *****************************
function graphFunction(asciiMath) {
    if (asciiMath === "") // Do not allow solo functions
        return;
    
    //change user string to javascript math inside a function (javascript magic!)
    var userTextjs = mathjs(asciiMath.toLowerCase(), 'x');
    var userFunction = function (x) { with (Math) return eval(userTextjs); };
    var colorID = Math.trunc(Math.random() * colors.length);
    var userjsxgraph = board.create('functiongraph', [userFunction], { strokeWidth: 2, strokeColor: colors[colorID] });

    var funcObj = {
        graph: userjsxgraph,
        colorID: colorID,
        text: asciiMath.toLowerCase(),
        latex:  txt2tex(asciiMath.toLowerCase())
    };
    // add this graph to the end of the global functions array
    functions.push(funcObj);
    //add this to the end of the function list
    remakeFunctionList();
    $("#userInput").val("");
}
function appendFunctionList(funcJson) {
    var index = functions.indexOf(funcJson);
    var inputField = 
        $("<div class='input-group' >" +
        "<div class='input-group-btn'>" +
            "<button name='edit' value='" + index + "' class='btn btn-info'><i class='glyphicon glyphicon-console'></i></button>" +
            "<button class='btn btn-default disabled katex-text' style='color:"+colors[functions[index].colorID]+";'>" + funcJson.text + "</button>" +
            "<button name='delete' value='"+index+"' class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>" +
        "</div>" +
        "</div>");

    inputField.find(".katex-text").on("click", function (args) {
        // Variables
        var newColorID = (functions[index].colorID + 1) % colors.length;

        // Switches the color on the graph
        functions[index].graph.setAttribute({
            strokeColor: colors[newColorID]
        });
        // Switches the color on the dom
        args.target.style.color = colors[newColorID];

        functions[index].colorID = newColorID;
    });
    $('#function-list').append(inputField);
    try {
        katex.render(funcJson.latex, inputField.find(".katex-text")[0]);
    } catch (e) { console.log(e);}
}

function deleteFunctionList(funcJson) {
    board.removeObject(funcJson.graph);
    //delete and shift functions array
    functions.splice(functions.indexOf(funcJson), 1);

    if (functions.length === 0) {
        board.zoom100();
        centerOrigin();
    }

    remakeFunctionList();
}

// Centers the origin
function centerOrigin() {
    board.moveOrigin($(window).width() / 2.0, $(window).height() / 2.0);
};

function remakeFunctionList() {
    $('#function-list').html("");
    for (var i= 0; i < functions.length; i++){
        appendFunctionList(functions[i]);
    }
    $("button[name='edit']").one("click", function (args) {
        // Variables
        var index = args.currentTarget.value;
        var funcObj = functions[index];

        $("#userInput").val(funcObj.text);
        deleteFunctionList(funcObj);
        $("#userInput").focus();
    });
    $('button[name="delete"]').one('click', function (e) {
        var index = e.currentTarget.value;
        var funcObj = functions[index];

        deleteFunctionList(funcObj);
    });
}

//Mr. Redden's attempt to streamline this *****************************


/*
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
}*/