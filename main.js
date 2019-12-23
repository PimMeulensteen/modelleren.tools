const model = new Model()
const plot = new Plot()
const ui = new DOMInterface()

function run () {
  model.setRunTimes(ui.getRunTimes())

  model.runSetup(ui.getSetupContent())
  const data = model.runLoop(ui.getLoopContent())
  plot.updateGraphs()
  plot.plot(data)
}

window.onkeydown = function (event) {
  // If you press crtl+enter, run the model.
  if (event.keyCode === 13 && event.ctrlKey) {
    run()
  }
}

let resizeTimer
window.onresize = function (event) {
  /* If the window has  resized, run the program again. */
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(function () {
    run()
  }, 150)
}
