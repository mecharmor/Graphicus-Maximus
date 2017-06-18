$(document).ready(function () {

    //Global Variables
    //Algebra Div
    var algebraDivId = $("#algebraPage");
    //Trigonometry Div
    var trigonometryDivId = $("#trigonometryPage");
    //Calculus Div
    var calculusDivId = $("#calculusPage");
    //Graph Div
    var graphDivId = $("#box");

    //Start at Index View
    IntView(0);

    $("#deviceready").click(function () {
        //can use this as a splash screen?
        $(".app").hide();
    });


    //Button Menu
    //inner Menu Buttons
    var btnHome = $("#btnHome");
    var btnAlgebra = $("#btnAlgebra");
    var btnTrig = $("#btnTrig");
    var btnCalc = $("#btnCalc");
    var btnFunc = $("#btnFunc");


    //Home Button Clicked
    btnHome.click(function () {
        IntView(0);
    });
    //Algebra Button Clicked
    btnAlgebra.click(function () {
        IntView(1);
    });
    //Trig Button Clicked
    btnTrig.click(function () {
        IntView(2);
    });
    //Calc Button Clicked
    btnCalc.click(function () {
        IntView(3);
    });

    //index = 0, algebra = 1, trigonometry = 2, calculus = 3, etc...
    function IntView(x) {

        switch (x) {
            //Index
            case 0:
                algebraDivId.hide();
                trigonometryDivId.hide();
                calculusDivId.hide();
                //Show Graph Here
                graphDivId.show();
                break;
            //Algebra
            case 1:
                algebraDivId.show();
                trigonometryDivId.hide();
                calculusDivId.hide();
                graphDivId.hide();

                break;
            //Trigonometry
            case 2:
                algebraDivId.hide();
                trigonometryDivId.show();
                calculusDivId.hide();
                graphDivId.hide();
                break;
            //Calculus
            case 3:
                algebraDivId.hide();
                trigonometryDivId.hide();
                calculusDivId.show();
                graphDivId.hide();
                break;
        }
    }

    //Draggable Menu Set
    let menu = $("#dragMenu");
    let menuItems = [];
    let _toggle = true;

    for (let i = 1; i <= 6; i++) {
        menuItems[q-1]= $("#menuItem" + i);
    }
    menu.draggable({ containment: "#box" });
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
};