/**
 * 2019 by Pim Meulensteen
 *
 * This file contains a class to handle the lines in the LOOP-textarea, and
 * sanatize the lines/change it to executable code.
 */

class Line {
  constructor (content) {
    this.content = content
  }

  sanitize () {
    // Remove empty lines
    for (let x = 0; x < IGNORED_CHARACTERS.length; x++) {
      this.content = this.content.split(IGNORED_CHARACTERS[x]).join(' ')
    }

    // Remove comments
    for (let x = 0; x < COMMENT_CHARACTERS.length; x++) {
      this.content = this.content.split(COMMENT_CHARACTERS[x])[0]
    }
    // Replace , with . (decimal seperator)
    this.content = this.content.replace(/[,]/g, '.')

    return true
  }

  split () {
    for (let i = 0; i < REPLACMENTS.length; i++) {
      this.content = this.content.replace(REPLACMENTS[i][0], REPLACMENTS[i][1])
    }

    // SPLIT
    this.content = this.content.replace(/[^A-Za-z0-9 ]/g, ',$&,')
    this.content = this.content.split(',')
  }

  finishFormat () {
    // Join the string back together
    this.content = this.content.join('')

    // REALY stop when `stop == true`.
    this.content = 'if(!stop){' + this.content + ';}'

    return true
  }

  checkExcistence () {
    if (!RESERVED.has(this.content[0])) {
      if (model.variables[this.content[0]] === undefined || this.content[0].length === 0) {
        model.variables[this.content[0]] = 0
      }
    }
  }

  addPrefix () {
    const prefix = 'this.variables.'
    const variables = model.variables

    // If the line contains a variable, add 'this.variables.' in front of it for it to be evaluated correctly
    for (let x = 0; x < this.content.length; x++) {
      for (const vari in variables) {
        if (vari === this.content[x] && vari !== '') {
          this.content[x] = prefix + this.content[x]
        }
      }
    }
    return true
  }
}
