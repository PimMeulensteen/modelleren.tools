/**
 * 2019 by Pim Meulensteen
 *
 * This file contains a class to handle the interface between the model and
 * the DOM.
 */

class DOMInterface {
  constructor () {
    this.loopElement = document.getElementById('loopDiv')
    this.setupElement = document.getElementById('setupDiv')
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
    var lines = this.loopElement.innerText

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

  // formatter (text) {
  //   const lines = text.split('\n')
  //   for (const i in lines) {
  //     // const l = lines[i].split(COMMENT_CHARACTERS)
  //     const j = lines[i].match(COMMENT_CHARACTERS)
  //     const c = lines[i].split(COMMENT_CHARACTERS)
  //     if (j && j.length > 0) {
  //       lines[i] = lines[i].replace(`${j[0]}${c[1]}`, `<span class='comment'> ${j[0]}${c[1]} </span>`)
  //       console.log(lines[i])
  //     } else {
  //       // lines[i] = l[0]
  //     }
  //   }

  //   text = lines.join('<br>')
  //   // console.log(text)
  //   return text
  // }

  // formatText () {
  //   this.setupElement.innerHTML = this.formatter(this.setupElement.innerText)
  //   this.loopElement.innerHTML = this.formatter(this.loopElement.innerText)
  // }

  /**
     * This function get the content from the setup-textarea.
     * @returns array of sanatized lines.
     */
  getSetupContent () {
    let lines = this.setupElement.innerText.split('\n')

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
    text = text.replace('<br>', '')

    /* Remove comments. */
    text = text.split(COMMENT_CHARACTERS)[0]

    /* Replace , with . (decimal seperator). */
    text = text.replace(/[,]/g, '.')

    return text
  }

  setButtonTitles () {
    const aantalGrafiek = this.graphElement.childElementCount

    if (aantalGrafiek === MAX_GRAPHS) {
      document.getElementById('plus').title = 'Er kunnen maximaal zes grafieken zijn.'
    } else {
      document.getElementById('plus').title = 'Voeg een grafiek toe.'
    }

    if (aantalGrafiek === 1) {
      document.getElementById('minus').title = 'Er moet ten minste één grafiek zijn.'
    } else {
      document.getElementById('minus').title = 'Verwijder een grafiek.'
    }
  }

  /**
     * This function add a extra Graph-options-box to the DOM.
     */
  addGraph () {
    const aantalGrafiek = this.graphElement.childElementCount
    if (aantalGrafiek < MAX_GRAPHS) {
      var newDiv = document.createElement('div')

      var newInput
      for (var i = 0; i < 6; i++) {
        /* Add six value input boxes to the div. */
        newInput = document.createElement('input')
        newInput.setAttribute('type', 'text')
        newDiv.appendChild(newInput)
      }
      document.getElementById('graph_settings').appendChild(newDiv)

      document.getElementById('aantalGrafieken').innerHTML = aantalGrafiek + 1
    }
    this.setButtonTitles()
  }

  /**
     * This function add a remove Graph-options-box to the DOM.
     */
  removeGraph () {
    /* Make sure to keep at least one graph alive. */
    document.getElementById('plus').title = 'Voeg een grafiek toe.'
    const aantalGrafiek = this.graphElement.childElementCount
    if (aantalGrafiek > 1) {
      const lastChild = this.graphElement.childNodes[this.graphElement.childElementCount + 1]
      this.graphElement.removeChild(lastChild)
      document.getElementById('aantalGrafieken').innerHTML = aantalGrafiek - 1
    } else if (aantalGrafiek === 1) {
      document.getElementById('plus').title = 'Er moet altijd ten minste één grafiek zijn.'
    }

    this.setButtonTitles()
  }

  formatComments () {
    return true
  }
  // TODO somthing with the settings.
}
