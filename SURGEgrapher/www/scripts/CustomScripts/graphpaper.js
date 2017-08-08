
$(document).ready(function () {

    // for negatives on the font
    JXG.Options.ticks.useUnicodeMinus = false;

    // Initial graph board set-up
    //JXG.Options.board.renderer = 'canvas';  //keep as svg default
    board = JXG.JSXGraph.initBoard('box', {

        axis: { ticks: { drawLabels: true }, firstArrow: true, strokeColor: 'black' },
        grid: { strokeWidth: 0.75 },
        showCopyright: false,
        showNavigation: false,
        keepaspectratio: true,
        zoom:
        {
            enabled: true,
            factorX: 1.25,
            factorY: 1.25,
            wheel: false,
            needShift: false,
            min: 0.0001,
            //max: 10000.0,
            pinchHorizontal: true,
            pinchVertical: true,
            pinchSensitivity: 7
        },
        pan:
        {
            enabled: true,
            needTwoFingers: false
        }
    });
    resize();

    //board.resizeContainer( $(window).width(), $(window).height() );
    //board.create('functiongraph', [function (x) { return Math.sin(x); }], { strokeWidth: 2 });

    $(window).on('resize', resize);

    function resize() {
        var bb = board.getBoundingBox();

        board.resizeContainer(
            window.innerWidth,
            window.innerHeight-20,
            false,
            true
        );//the true = do not call setBoundingBox
        board.setBoundingBox(bb, false);  //false = keep aspect ratio and same bb as coming in
    }
});