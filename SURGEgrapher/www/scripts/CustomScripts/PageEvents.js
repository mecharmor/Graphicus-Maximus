$(document).ready(function () {

    //Algebra Div
    var algebraDivId = $("#algebraPage");
    //Trigonometry Div
    var trigonometryDivId = $("#trigonometryPage");
    //Calculus Div
    var calculusDivId = $("#calculusPage");
    //Graph Div
    var graphDivId = $("#box");
    //Settings
    var settingsDivId = $("#settingsPage");

    //Start at Index View
    IntView(1);

    $("#deviceready").click(function () {
        //can use this as a splash screen?
        $(".app").hide();
    });

    //index = 1, algebra = 2, trigonometry = 3, calculus = 4, etc...
    function IntView(x) {

        algebraDivId.hide();
        trigonometryDivId.hide();
        calculusDivId.hide();
        settingsDivId.hide();
        graphDivId.hide();

        switch (x) {

            //Function Button Pressed
            case 0:
            //Home or Index 
            case 1:
                graphDivId.show();
                break;
            //Settings
            case 2:
                settingsDivId.show();
                break;
            //Calculus
            case 3:
                calculusDivId.show();
                break;
            //Trigonometry
            case 4:
                trigonometryDivId.show();
                break;
            //Algebra
            case 5:
                algebraDivId.show();
                break;
        }
    }

    //Draggable Menu Set
    let menu = $("#dragMenu");
    let menuItems = [];
    let _toggle = true;
    const m = menu.find("*");
    const mc=   [];

    for (let i = 0; i < m.length; i++)	{
        console.log(m[i]);
        mc[i] = new Hammer(m[i]);
        mc[i].on("pan", temp_pan);
    }
	
    function temp_pan(args) {
        console.log(args);
        if (!args.center) {
            console.log("fl");
            return;
        }
        if (args.center.x == 0 && args.center.y == 0) {

            console.log("fl");
            return;
        }
        menu.css("left", (args.center.x - 32) + "px").css("top", (args.center.y - 32) + "px");
    }

    for (let i = 1; i <= 6; i++) {
        menuItems[i - 1] = $("#menuItem" + i);
        //Home Button Clicked
        menuItems[i-1].click(function () {
            IntView(i-1);
        });
    }
    $("#dragMenuGlyphicon2").hide();

    menu.click(function () {
        // Shows the menu
        if (_toggle) {
            let top = 0;
            let left = 0;

            for (let i = 0; i < menuItems.length; i++) {
                switch (i) {
                    case 0: // f(x) button
                        // Placed north west
                        top = -2.5;
                        left = -4;
                        break;
                    case 1: // home button
                        // Placed north
                        top = -5;
                        break;
                    case 2: // Settings button
                        // Placed north east
                        top = -2.5;
                        left = 4;
                        break;
                    case 3: // Calc button
                        // Placed south east
                        top = 2.5;
                        left = 4;
                        break;
                    case 4: // Trig button
                        // Placed south
                        top = 5;
                        break;
                    case 5: // Alg button
                        // Placed south west
                        top = 2.5;
                        left = -4;
                        break;
                } // End of switch
                menuItems[i]
                    .css("top", top + "em")
                    .css("left", left+"em")
                    .css("transform", "rotate(360deg)")
                    .css("opacity", "1");
                top = 0;
                left = 0;
            } // End of for loop
            menu.css("transform", "rotate(360deg)");
            $("#dragMenuGlyphicon").fadeOut(500);
            setTimeout(function () {
                $("#dragMenuGlyphicon2").fadeIn(250);
            }, 250);
            _toggle = false;

        } else {
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i]
                    .css("top", "0px")
                    .css("left", "0px")
                    .css("transform", "rotate(0deg)")
                    .css("opacity", "0");
            }
            menu.css("transform", "rotate(0deg)");
            $("#dragMenuGlyphicon2").fadeOut(500);
            setTimeout(function () {
                $("#dragMenuGlyphicon").fadeIn(500);
            }, 250);
            _toggle = true;
        }

    });


});//document.ready

//Function Button Clicked
function boxBlur(x) {
    $("#box").css("filter", "blur(" + x + "px)");
    $("#dragMenu").css("filter", "blur(" + x + "px)");
};