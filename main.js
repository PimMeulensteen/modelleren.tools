const model = new Model()
const plot = new Plot()
const ui = new DOMInterface()

function run () {
  model.runSetup(ui.getSetupContent())

  const data = model.runLoop(ui.getLoopContent())

  plot.updateGraphs()
  plot.plot(data)
}

window.onkeydown = function (event) {
  /* If you press crtl+enter, run the program. */
  if (event.keyCode === 13 && event.ctrlKey) {
    run()
  }

  /**
   * TAB == 4 spaces.
   * From https://stackoverflow.com/a/32128448/7267641
   */
  if (event.keyCode === 9) {
    if (event.target.classList.contains('editableDiv')) {
      event.preventDefault()

      const selection = event.target.ownerDocument.defaultView.getSelection()
      const range = selection.getRangeAt(0)
      const tabNode = document.createTextNode('    ')

      range.insertNode(tabNode)

      range.setStartAfter(tabNode)
      range.setEndAfter(tabNode)

      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
}

let resizeTimer
window.onresize = function (event) {
  /* If the window has resized, run the program again. */
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(function () {
    run()
  }, 150)
}
