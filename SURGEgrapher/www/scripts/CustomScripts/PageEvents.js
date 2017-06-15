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

            //Draggable Menu Object
            $('#NavButton').mousedown(handle_mousedown);


    //Vertical Button Menu

        //Home Button Clicked
        $("#homeBtn").click(function () {
            IntView(0);
        });
        //Algebra Button Clicked
        $("#algebraBtn").click(function () {
            IntView(1);
        });
        //Trig Button Clicked
        $("#trigonometryBtn").click(function () {
            IntView(2);
        });
        //Calc Button Clicked
        $("#calculusBtn").click(function () {
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

    //Allows Any element to be dragged
    function handle_mousedown(e) {
        window.my_dragging = {};
        my_dragging.pageX0 = e.pageX;
        my_dragging.pageY0 = e.pageY;
        my_dragging.elem = this;
        my_dragging.offset0 = $(this).offset();
        function handle_dragging(e) {
            var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
            var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
            $(my_dragging.elem)
                .offset({ top: top, left: left });
        }
        function handle_mouseup(e) {
            $('body')
                .off('mousemove', handle_dragging)
                .off('mouseup', handle_mouseup);
        }
        $('body')
            .on('mouseup', handle_mouseup)
            .on('mousemove', handle_dragging);
    }//End Mousedown function

});