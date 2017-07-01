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

    //Draggable Menu Set
    let menu = $("#dragMenu");
    let menuItems = [];
    let _toggle = true;
    const m = menu.find("*");
    const mc=   [];

    //Move menu when pan gesture is triggered
    for (let i = 0; i < m.length; i++)	{
        console.log(m[i]);
        mc[i] = new Hammer(m[i]);
        //on pan, call function to move
        mc[i].on("pan", temp_pan);
    }

    //Troubleshooting Panning
    function temp_pan(args) {
        console.log(args);
        if (!args.center) {
            console.log("fl");
            return;
        }
        //Prevent button from snapping to the top corner of window
        if (args.center.x == 0 && args.center.y == 0) {

            console.log("fl");
            return;
        }
        menu.css("left", (args.center.x - 32) + "px").css("top", (args.center.y - 32) + "px");
    }
    //Populate menu button id's to select proper view
    for (let i = 1; i <= 6; i++) {
        menuItems[i - 1] = $("#menuItem" + i);
        //Home Button Clicked
        menuItems[i-1].click(function () {
            IntView(i-1);
        });
    }

    //hide menu glyphicon 'x'
    $("#dragMenuGlyphicon2").hide();

    //Modify css to shift outward/inward
    menu.click(function () {
        // Shows the menu
        if (_toggle) {
            let top = 0;
            let left = 0;

            for (let i = 0; i < menuItems.length; i++) {
                switch (i) {
                    case 0: // f(x) button
                        // Placed north west
                        top = -1.25;
                        left = -2;
                        break;
                    case 1: // home button
                        // Placed north
                        top = -2.5;
                        break;
                    case 2: // Settings button
                        // Placed north east
                        top = -1.25;
                        left = 2;
                        break;
                    case 3: // Calc button
                        // Placed south east
                        top = 1.25;
                        left = 2;
                        break;
                    case 4: // Trig button
                        // Placed south
                        top = 2.5;
                        break;
                    case 5: // Alg button
                        // Placed south west
                        top = 1.25;
                        left = -2;
                        break;
                } // End of switch
                menuItems[i]
                    .css("top", top + "em")
                    .css("left", left+"em")
                    .css("transform", "rotate(360deg)")
                    .css('box-shadow', '0px 0px 5px grey')
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
                    .css('box-shadow', '0px 0px 0px grey')
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

    //select view
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

});//document.ready

//Function Button Clicked
function boxBlur(x) {
    $("#box").css("filter", "blur(" + x + "px)");
    $("#dragMenu").css("filter", "blur(" + x + "px)");
};