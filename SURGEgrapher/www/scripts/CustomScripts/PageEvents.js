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
            var btnSettings = $("#btnSettings");

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
        btnSettings.click(function () {
            IntView(4);
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
            btnSettings
                .css("left", "-6em")
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
            btnSettings
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

    }

});//document.ready

//Function Button Clicked  
function boxBlur(x) {
    $("#box").css("filter", "blur(" + x + "px)");
};