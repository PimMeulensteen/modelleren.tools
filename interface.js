/**
 * 2019 by Pim Meulensteen
 *
 * This file contains a class to handle the interface between the model and
 * the DOM.
 */

class DOMInterface {
  constructor () {
    this.loopElement = document.getElementsByTagName('textarea')[0]
    this.setupElement = document.getElementsByTagName('textarea')[1]
    this.graphElement = document.getElementById('graph_settings')
  }

  /**
     * Get the times to run from the DOM
     * @returns the amount of times to run.
     */
  getRunTimes () {
    return document.getElementById('max_t_input').value
  }

  /**
     * Get the content from the loop-textarea
     * @returns array of sanatized lines.
     */
  getLoopContent () {
    // Get the value from the textarea
    var lines = this.loopElement.value

    // Split it on each new line
    lines = lines.split('\n')

    // For each line
    for (let i = 0; i < lines.length; i++) {
      lines[i] = this.sanitize(lines[i])
    }

    // Filter out all the empty lines.
    lines = lines.filter(function (element) {
      return element !== ''
    })

    return lines
  }

  /**
     * This function get the content from the setup-textarea.
     * @returns array of sanatized lines.
     */
  getSetupContent () {
    var lines = this.setupElement.value
    lines = lines.split('\n')

    /* Run the `sanitize` function for every line. */
    for (let i = 0; i < lines.length; i++) {
      lines[i] = this.sanitize(lines[i])
    }

    /* Filter out all the empty lines. */
    lines = lines.filter(function (element) {
      return element !== ''
    })

    return lines
  }

  /**
     * This function removes all unwanted characters from a string of text
     * @param {string} text unsanitized text
     * @returns sanatized text.
     */
  sanitize (text) {
    /* Remove spaces. */
    text = text.replace(/[ ]/g, '')

    /* Remove comments. */
    text = text.split(COMMENT_CHARACTERS)[0]

    /* Replace , with . (decimal seperator). */
    text = text.replace(/[,]/g, '.')

    return text
  }

  /**
     * This function add a extra Graph-options-box to the DOM.
     */
  addGraph () {
    /* Maximum of 20 code graphs. */
    if (this.graphElement.childElementCount <= MAX_GRAPHS) {
      var newDiv = document.createElement('div')

      var newInput
      for (var i = 0; i < 6; i++) {
        /* Add six value input boxes to the div. */
        newInput = document.createElement('input')
        newInput.setAttribute('type', 'text')
        newInput.setAttribute('value', '')
        newInput.setAttribute('oninput', 'run()')
        newDiv.appendChild(newInput)
      }
      document.getElementById('graph_settings').appendChild(newDiv)
    } else {
      // TODO remove alert :/
      document.alert(`Je kan niet meer dan ${MAX_GRAPHS} grafieken maken.`)
    }
  }

  /**
     * This function add a remove Graph-options-box to the DOM.
     */
  removeGraph () {
    /* Make sure to keep at least one graph alive. */
    if (this.graphElement.childElementCount > 1) {
      const lastChild = this.graphElement.childNodes[this.graphElement.childElementCount + 1]
      this.graphElement.removeChild(lastChild)
    } else {
      // TODO remove alert :/
      document.alert('Er moet altijd ten minst één grafiek zijn.')
    }
  }

  // TODO somthing with the settings.
}
