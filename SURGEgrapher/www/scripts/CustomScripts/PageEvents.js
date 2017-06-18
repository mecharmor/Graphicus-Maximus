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


    //Draggable Menu Set
    let menu = $("#dragMenu");
    let _toggle = true;
    menu.draggable({ containment: "body" });
    //btnAlgebra.hide();


    menu.click(function () {

        if (_toggle) {

            btnCalc
                .css("top", "3em")
                .css("left", "3em")
                .css("opacity", "1")
                .css("transform", "rotate(360deg)");

            btnAlgebra
                .css("top", "3em")
                .css("opacity", "1")
                .css("transform", "rotate(360deg)");

            btnFunc
                .css("top", "-3em")
                .css("opacity", "1")
                .css("transform", "rotate(360deg)");

            btnHome
                .css("left", "3em")
                .css("opacity", "1")
                .css("transform", "rotate(360deg)");

            btnTrig
                .css("left", "-3em")
                .css("opacity", "1")
                .css("transform", "rotate(360deg)");
           
            _toggle = false;

        } else {

            btnCalc
                .css("top", "0em")
                .css("left", "0em")
                .css("opacity", "0")
                .css("transform", "rotate(0deg)");

            btnAlgebra
                .css("top", "0em")
                .css("opacity", "0")
                .css("transform", "rotate(0deg)");

            btnFunc
                .css("top", "0em")
                .css("opacity", "0")
                .css("transform", "rotate(0deg)");

            btnHome
                .css("left", "0em")
                .css("opacity", "0")
                .css("transform", "rotate(0deg)");

            btnTrig
                .css("left", "0em")
                .css("opacity", "0")
                .css("transform", "rotate(0deg)");

            _toggle = true;
        }

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

    //Draggable Menu Set
    let menu = $("#dragMenu");
    let menuItem1 = $("#menuItem1");
    let menuItem2 = $("#menuItem2");
    let menuItem3 = $("#menuItem3");
    let menuItem4 = $("#menuItem4");
    let menuItem5 = $("#menuItem5");
    let menuItem6 = $("#menuItem6");
    let menuItem7 = $("#menuItem7");
    let menuItem8 = $("#menuItem8");
    let menuItems = [
        menuItem1,
        menuItem2,
        menuItem3,
        menuItem4,
        menuItem5,
        menuItem6,
        menuItem7,
        menuItem8
    ];
    let _toggle = true;
    menu.draggable({ containment: "body" });
    //menuItem1.hide();

});//document.ready

        // Shows the menu
        if (_toggle) {
            let top = 0;
            let left = 0;
            for (let i = 0; i < menuItems.length; i++) {
                switch (i) {
                    case 0: // Alg button
                        top = -5;
                        break;
                    case 1: // Trig button
                        top = -2.5;
                        left = -4;
                        break;
                    case 2: // Calc button
                        top = -2.5;
                        left = 4;
                        break;
                    case 3: // Calc button
                        top = 2.5;
                        left = 4;
                        break;
                    case 4: // Calc button
                        top = 5;
                        break;
                    case 5: // Calc button
                        top = 2.5;
                        left = -4;
                        break;
                }
                menuItems[i]
                    .css("top", top + "em")
                    .css("left", left+"em")
                    .css("transform", "rotate(360deg)")
                    .css("opacity", "1");
                top = 0;
                left = 0;
            }
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

    menuItem1.click(function () {

        //Load Algebra Page
        IntView(1);

    });


});//document.ready
//Function Button Clicked  
function boxBlur(x) {
    $("#box").css("filter", "blur(" + x + "px)");
};