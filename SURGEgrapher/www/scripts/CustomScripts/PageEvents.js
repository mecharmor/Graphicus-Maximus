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

    for (let i = 1; i <= 6; i++) {
        menuItems[i - 1] = $("#menuItem" + i);
        //Home Button Clicked
        menuItems[i-1].click(function () {
            IntView(i-1);
        });
    }
    menu.draggable({ containment: "body" });
    //menuItem1.hide();

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
            _toggle = false;

        } else {
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i]
                    .css("top", "0px")
                    .css("left", "0px")
                    .css("transform", "rotate(0deg)")
                    .css("opacity", "0");
            }

            _toggle = true;
        }

    });


});//document.ready

//Function Button Clicked
function boxBlur(x) {
    $("#box").css("filter", "blur(" + x + "px)");
    $("#dragMenu").css("filter", "blur(" + x + "px)");
};