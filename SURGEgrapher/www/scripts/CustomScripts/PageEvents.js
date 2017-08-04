$(document).ready(function () {

    //Algebra Div
    var algebraDivId = $("#algebraPage");
    //Trigonometry Div
    var trigonometryDivId = $("#trigonometryPage");
    //Calculus Div
    var calculusDivId = $("#calculusPage");
    //Graph Div
    var graphDivId = $("#box");
    
    let dragState = "top-left";

    //Start at Index View
    IntView(1);

    setTimeout(function () {
		board.moveOrigin($(window).width() / 2.0, $(window).height() / 2.0);
        $("#resetZoom").click(function () {
			console.log(board);
            board.zoom100();
			board.moveOrigin($(window).width() / 2.0, $(window).height() / 2.0);
            IntView(1);
        });
    }, 100);

    $("#deviceready").click(function () {
        //can use this as a splash screen?
        $(".app").hide();
    });

    //Drag Menu Set
    let menu = $("#dragMenu");
    let menuItems = [];
    let isClosed = true;
    const m = menu.find("*");
    const mc=   [];

    // Do we??? Hammer js is like 21KB while jqueryMobile is like 106 KB
    /*Hammer JS might need to be deleted once we get Jquery Mobile moving the menu button properly*/

    //Move menu when pan gesture is triggered
    for (let i = 0; i < m.length; i++)	{
        //console.log(m[i]);
        mc[i] = new Hammer(m[i]);
        //on pan, call function to move
        mc[i].on("pan", temp_pan);
    }

    //Troubleshooting Panning
    function temp_pan(args) {
        if (!args.center) {
            return;
        }
        // Prevent button from snapping to the top corner of window
        if (args.center.x == 0 && args.center.y == 0) {
            return;
        }

        // Variables
        var x = args.center.x;
        var y = args.center.y;
        // The width and height are for simplicity's sake
        var w = window.innerWidth;
        var h = window.innerHeight;
        var _dragState = "";

        menu.css("left", (x-32) + "px").css("top", (y-32) + "px");

        // Gets the drag state from the location on the window
        // The left right part
        if (x < w/3) {
            _dragState = "-left";
        }
        else if (x < w * (2 / 3)) {
            _dragState = "-center";
        }
        else {
            _dragState = "-right";
        }

        // The up down part
        if (y < h / 4) {
            _dragState = "top" + _dragState;
        }
        else if (y < h * (3 / 4)) {
            _dragState = "mid" + _dragState;
        }
        else {
            _dragState = "bot" + _dragState;
        }

        updateMenuPositions(_dragState);
    }
    //Populate menu button id's to select proper view
    for (let i = 1; i <= 6; i++) {
        menuItems[i - 1] = $("#menuItem" + i);
        //Home Button Clicked
        menuItems[i - 1].click(function () {
            if (!isClosed)
                IntView(i - 1);
        });
    }

    //hide menu glyphicon 'x'
    $("#dragMenuGlyphicon2").hide();

    menu.bind("tap", function () {    
        if (isClosed) {
            updateMenuPositions(dragState, true);
            $("#dragMenuGlyphicon").fadeOut(500);
            setTimeout(function () {
                $("#dragMenuGlyphicon2").fadeIn(250);
                isClosed = false;
            }, 250);
            
        } else {
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i]
                    .css("top", "0px")
                    .css("left", "0px")
                    .css("transform", "rotate(0deg)")
                    .css('box-shadow', '0px 0px 0px grey')
                    .css("opacity", "0");
            }
            $("#dragMenuGlyphicon2").fadeOut(500);
            setTimeout(function () {
                $("#dragMenuGlyphicon").fadeIn(500);
                isClosed = true;
            }, 250);
        }

    });

    // Initiates the given view
    //   x is the view id number
    /*
        0-  functions
        1-  home
        2-  calculus
        3-  trigonometry
        4-  algebra
    */
    function IntView(x) {

        //Fixes back button glitch
        $('body').scrollTop(0);

        algebraDivId.hide();
        trigonometryDivId.hide();
        calculusDivId.hide();
        graphDivId.hide();

        switch (x) {
            //Function Button Pressed
            case 0:
            //Home or Index 
            case 1: graphDivId.show();  break;
            //Calculus
            case 2: calculusDivId.show();   break;
            //Trigonometry
            case 3: trigonometryDivId.show();   break;
            //Algebra
            case 4: algebraDivId.show();    break;
        }
    }

    // Updates all the menu positions
    //   _dragState is the new drag state you want to make
    //   manualChange should be set to true if it comes from the toggle event
    function updateMenuPositions(_dragState, manualChange) {
        // Variables
        // A variable to see if this is from the toggle event or from
        // the drag event. Effieciently makes sure not to double up.
        var changed = manualChange || (dragState != _dragState);

        if (!changed)
            return;

        dragState = _dragState; // Changes the drag state
        // Checks if its from the toggle event. Else it makes sure the
        // menu is open
        if (manualChange || !isClosed) {
            // Variables
            let left = 0; // x
            let top = 0; // y
            // The size of the menu item.
            // CHANGE THIS WHENEVER YOU WANT TO CHANGE THE DIAMETER (SIZE) OF THE ITEM!!! /please
            let sz = 2.5;
            // Just so I don't have to do more than 1 square root. Name == irrelevent.
            let phi = 1 / Math.sqrt(2);

            sz *= 1.65; // Gets that sweet sweet empty space

            // List of numbers lol
            // Its a little weird to explain this one.
            // There is a ms paint about it in schematics.
            // Shows an ok representation of it (except the center).
            for (let i = 0; i < menuItems.length; i++) {
                switch (i) {
                    case 0: // f(x) button
                        switch (dragState) {
                            case "top-left":
                                left = sz;
                                break;
                            case "top-right":
                                left = -sz;
                                break;
                            case "mid-left":
                            case "mid-right":
                            case "bot-left":
                            case "bot-right":
                                top = -sz;
                                break;
                            case "top-center":
                            case "mid-center":
                            case "bot-center":
                                left = -sz;
                                break;
                        }
                        break;
                    case 1: // home button
                        switch (dragState) {
                            case "top-left":
                            case "top-right":
                            case "mid-left":
                            case "mid-right":
                                top = sz;
                                break;
                            case "top-center":
                            case "mid-center":
                            case "bot-center":
                            case "bot-left":
                                left = sz;
                                break;
                            case "bot-right":
                                left = -sz;
                        }
                        break;
                    case 2: // Calc button
                        switch (dragState) {
                            case "top-center":
                                top = sz * phi;
                                left = sz * phi;
                                break;
                            case "mid-center":
                            case "bot-center":
                                top = -sz * phi;
                                left = sz * phi;
                                break;
                            case "mid-left":
                                top = sz * phi;
                                left = sz * phi;
                                break;
                            case "mid-right":
                                top = sz * phi;
                                left = -sz*phi;
                                break;
                            case "top-left":
                                top = sz * phi;
                                left = sz * (phi + 1);
                                break;
                            case "top-right":
                                top = sz * phi;
                                left = -sz * (phi + 1);
                                break;
                            case "bot-left":
                                top = -sz * phi;
                                left = sz * (phi + 1);
                                break;
                            case "bot-right":
                                top = -sz * phi;
                                left = -sz * (phi + 1);
                                break;
                        }
                        break;
                    case 3: // Trig button
                        switch (dragState) {
                            case "top-center":
                                top = sz;
                                break;
                            case "mid-center":
                            case "bot-center":
                                top = -sz;
                                break;
                            case "mid-left":
                                left = sz;
                                break;
                            case "mid-right":
                                left = -sz;
                                break;
                            case "top-left":
                                top = sz * (phi + 1);
                                left = sz * phi;
                                break;
                            case "top-right":
                                top = sz * (phi + 1);
                                left = -sz * phi;
                                break;
                            case "bot-left":
                                top = -sz * (phi + 1);
                                left = sz * phi;
                                break;
                            case "bot-right":
                                top = -sz * (phi + 1);
                                left = -sz * phi;
                                break;
                        }
                        break;
                    case 4: // Alg button
                        switch (dragState) {
                            case "top-left":
                                top = sz * 0.85;
                                left = sz * 0.85;
                                break;
                            case "top-center":
                                top = sz * phi;
                                left = -sz * phi;
                                break;
                            case "mid-center":
                            case "bot-center":
                                top = -sz * phi;
                                left = -sz * phi;
                                break;
                            case "top-right":
                                top = sz * 0.85;
                                left = -sz * 0.85;
                                break;
                            case "mid-left":
                                top = -sz * phi;
                                left = sz * phi;
                                break;
                            case "mid-right":
                                top = -sz * phi;
                                left = -sz * phi;
                                break;
                            case "bot-left":
                                top = -sz * 0.85;
                                left = sz * 0.85;
                                break;
                            case "bot-right":
                                top = -sz * 0.85;
                                left = -sz * 0.85;
                                break;
                        }
                        break;
                } // End of switch
                // Changes the location, transition is made in css file
                menuItems[i]
                    .css("top", top + "em")
                    .css("left", left + "em");

                // This is for the toggle event version
                if (manualChange) {
                    menuItems[i]
                    .css('box-shadow', '0px 0px 5px grey')
                    .css("opacity", "1");
                }
                // Resets it for the next one
                top = 0;
                left = 0;
            } // End of for loop
        }
    }

 

});

//Function Button Clicked
function boxBlur(x) {
    $("#box").css("filter", "blur(" + x + "px)");
    $("#dragMenu").css("filter", "blur(" + x + "px)");
};