class Line {
    constructor(content) {
        this.content = content
    }

    sanitize() {
        //Remove empty lines
        for (let x = 0; x < ignoredCharaters.length; x++) {
            this.content = this.content.split(ignoredCharaters[x]).join(' ')
        }

        //Remove comments
        for (let x = 0; x < commentCharacters.length; x++) {
            this.content = this.content.split(commentCharacters[x])[0]
        }
        //Replace , with . (decimal seperator)
        this.content = this.content.replace(/[,]/g, ".")

        return true
    }

    split() {
        for (let i = 0; i < replacements.length; i++) {
            this.content = this.content.replace(replacements[i][0], replacements[i][1])
        }

        //SPLIT
        this.content = this.content.replace(/[^A-Za-z0-9 ]/g, ',$&,')
        this.content = this.content.split(",")
    }

    finishFormat() {
        //Join the string back together
        this.content = this.content.join('')
        this.content += ";";
        return true
    }

    checkExcistence() {
        if (!reserved.has(this.content[0])) {
            if (model.variables[this.content[0]] == undefined || this.content[0].length == 0) {
                model.variables[this.content[0]] = 0
            }
        }
    }

    addPrefix() {
        let prefix = 'this.variables.'
        let variables = model.variables

        //If the line contains a variable, add 'this.variables.' in front of it for it to be evaluated correctly
        for (let x = 0; x < this.content.length; x++) {
            for (let vari in variables) {
                if (vari == this.content[x] && vari != "") {
                    this.content[x] = prefix + this.content[x]
                }
            }
        }
        return true
    }
}