class Model {
  constructor () {
    this.variables = {}
    this.runTimes = 1000
  }

  /**
   * Setter for the runTimes-variable.
   * @param {int} n times.
   */
  setRunTimes (n) {
    this.runTimes = n
  }

  /**
   * Turn text into variables in this.variables.
   * @param {string} lines input lines.
   */
  runSetup (lines) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].split('=')
      this.variables[line[0]] = Number(line[1])
    }
  }

  /**
   * Split the string into seperatre piece.
   * @param {string} input to split.
   * @returns {array} the input split into pieces.
   */
  split (input) {
    /* Replace all the predetirmend operators with their correct JavaScript implementation. */
    REPLACMENTS.forEach(function (replacement) {
      input = input.replace(replacement[0], replacement[1])
    })

    /* Add comma's to the operators, and thus where to split them. */
    input = input.replace(/[^A-Za-z0-9 ]/g, ',$&,')
    input = input.split(',')

    return input
  }

  /**
 * When the user make a new variable in the setup, make sure it excists
 * @param {string} input variable to check
 */
  checkExcistence (input) {
    if (!RESERVED.has(input)) {
      if (model.variables[input] === undefined || input.length === 0) {
        model.variables[input] = 0
      }
    }
  }

  /**
 * Add PREFIX to every variable, so it can be executed "savely" in eval().
 * @param {array} input
 */
  addPrefix (input) {
    const variables = model.variables

    /* If the line contains a variable, add 'this.variables.'
    in front of it for it to be evaluated correctly */
    for (let x = 0; x < input.length; x++) {
      for (const variable in variables) {
        if (variable === input[x] && variable !== '') {
          input[x] = PREFIX + input[x]
        }
      }
    }

    return input
  }

  finishFormat (input) {
    return 'if(!stop){' + input.join('') + ';}'
  }

  linesToCode (lines) {
    let result = ''

    for (let i = 0; i < lines.length; i++) {
      let line = this.split(lines[i])

      this.checkExcistence(line[0])

      line = this.addPrefix(line)
      line = this.finishFormat(line)

      result += line
    }
    return result
  }

  runLoop (lines) {
    const history = {}
    /* Change the lines to executable code. */
    const totalCode = this.linesToCode(lines)

    /* Copy this.variables to history, but use arrays as values
    with the original value as first item. */
    for (const n in this.variables) {
      history[n] = [this.variables[n]]
    }

    /* Run as many times as determined by the user input. */
    for (let x = 0; x < this.runTimes; x++) {
      const stop = false
      eval(totalCode) // Execute the code.
      for (const n in this.variables) {
        /* Make the value a number with maximum of n digits */
        const value = Math.round(Number((this.variables[n])) * (10 ** DECIMALS)) / (10 ** DECIMALS)

        /* Add the value of this.variables to history for the corresponding key. */
        history[n].push(value)
      }
      if (stop) break
    }
    return history
  }
}
