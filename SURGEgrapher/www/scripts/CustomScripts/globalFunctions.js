
//Back Button call
function backButton() {

    //Algebra Div
    $("#algebraPage").hide();
    //Trigonometry Div
    $("#trigonometryPage").hide();
    //Calculus Div
    $("#calculusPage").hide();
    //Graph Div
    $("#box").show();
    //Settings
    $("#settingsPage").hide();

    //Fixes back button glitch
    $('body').scrollTop(0);


}

//Keep menu in focus while scrolling
$().ready(function () {
    $(window).scroll(function () {
        $("#dragMenu").stop().animate({ "marginTop": ($(window).scrollTop()) }, "fast");
    });
});