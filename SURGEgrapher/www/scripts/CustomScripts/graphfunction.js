
var functions = [];
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
	
	try	{
		// TODO: Turn this into DRY-compliant
		if(asciiMath.indexOf("x=")!= -1)	{
			// Variables
			var	temp=	asciiMath.substring(asciiMath.indexOf("x=")+2).toLowerCase();
			var	userTextjs=	mathjs(temp, 'y');
			var	userFunction=	function(y)	{	with(Math)	return eval(userTextjs);	};
			var	colorID=	Math.trunc(Math.random()*colors.length);
			var	userjsxgraph=	board.create(
				"curve",
				[userFunction, function(y) { return y; }],
				{
					strokeWidth:	2,
					strokeColor:	colors[colorID],
					fixed:	true
				}
			);
			var	funcObj=	{
				graph: userjsxgraph,
				colorID: colorID,
				text: asciiMath.toLowerCase(),
				latex:  txt2tex(asciiMath.toLowerCase())
			};
			
			functions.push(funcObj);
			remakeFunctionList();
			$("#userInput").val("");
			return;
		}
		
		//change user string to javascript math inside a function (javascript magic!)
		var userTextjs = mathjs(asciiMath.toLowerCase(), 'x');
		var userFunction = function (x) { with (Math) return eval(userTextjs); };
		var colorID = Math.trunc(Math.random() * colors.length);
		var userjsxgraph = board.create('functiongraph', userFunction, {
			strokeWidth: 2,
			strokeColor: colors[colorID]
		});

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
	
	} catch(e)	{
		// Original border color: rgb(102, 175, 233)
		for(let i= 0; i<= 9; i++)	{
			setTimeout(function()	{
				$("#userInput").css("border-color", ((i%2== 0) ? "tomato" : "rgb(102, 175, 233)"));
			}, 200+i*200);
			console.log(e);
		}
	}
}
function appendFunctionList(funcJson) {
    var index = functions.indexOf(funcJson);
    var inputField = 
        $("<div class='input-group' style='max-width:90%;' >" +
        "<div class='input-group-btn'>" +
            "<button name='edit' value='" + index + "' class='btn btn-info'><i class='glyphicon glyphicon-console'></i></button>" +
            "<button class='btn btn-default disabled katex-text'>" + funcJson.text + "</button>" +
            "<button class='btn btn-default color-picker' style='color:" + colors[functions[index].colorID] +";'><span class='glyphicon glyphicon-tint'></span></button>" + 
            "<button name='delete' value='" + index + "' class='btn btn-danger'><i class='glyphicon glyphicon-trash'></i></button>" +
        "</div>" +
        "</div>");

    inputField.find(".color-picker").on("click", function (args) {
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
    } catch (e) {
		//console.log(e);
		katex.render(funcJson.text, inputField.find(".katex-text")[0]);
	}
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
