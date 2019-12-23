model = new Model();
plot = new Plot();
ui = new DOMInterface();

run();
function run() {
    model.setRunTimes(ui.getRunTimes());

    model.runSetup(ui.getSetupContent());
    data = model.runLoop(ui.getLoopContent());
    plot.updateGraphs();
    plot.plot(data)
}

window.onkeydown = function (event) {
    //If you press crtl+enter, run the model.
    if (event.keyCode == 13 && event.ctrlKey) {
        run()
    }
}

window.onresize = function (event) {
    //If the window is resized, rerun the program.
    run()
}