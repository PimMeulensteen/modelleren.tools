/**
 * 2019 by Pim Meulensteen
 *
 * This file contains a class to handle the interface between the model and
 * the DOM.
 */

class DOMInterface {
    constructor() {
        this.loopElement = document.getElementsByTagName("textarea")[0];
        this.setupElement = document.getElementsByTagName("textarea")[1];
        this.graphElement = document.getElementById('graph_settings');
    }

    getRunTimes(){
        return document.getElementById("max_t_input").value
    }

    /**
     * Get the content from the loop-textarea
     * @returns array of sanatized lines.
     */
    getLoopContent() {
        //Get the value from the textarea
        var lines = this.loopElement.value;

        //Split it on each new line
        lines = lines.split('\n')

        // For each line
        for (let i = 0; i < lines.length; i++) {
            lines[i] = this.sanitize(lines[i]);
        }

        //Filter out all the empty lines.
        var lines = lines.filter(function (element) {
            return element != "";
        });

        return lines
    }
    /**
     * This function get the content from the setup-textarea
     * @returns array of sanatized lines.
     */
    getSetupContent() {
        //Get the value from the textarea
        var lines = this.setupElement.value;

        //Split it on each new line
        lines = lines.split('\n')

        // For each line
        for (let i = 0; i < lines.length; i++) {
            lines[i] = this.sanitize(lines[i]);
        }

        //Filter out all the empty lines.
        var lines = lines.filter(function (element) {
            return element != "";
        });

        return lines
    }

    /**
     * This function removes all unwanted characters from a string of text
     * @param {string} text unsanitized text
     * @returns sanatized text.
     */
    sanitize(text) {
        //Remove spaces
        text = text.replace(/[ ]/g, "")

        //Remove comments
        text = text.split(commentCharacters)[0]

        //Replace , with . (decimal seperator)
        text = text.replace(/[,]/g, ".")

        return text;
    }

    addGraph() {
        //Set the max elements to 20
        if (this.graphElement.childElementCount < 20) {
            //Make new div
            var new_div = document.createElement('div');

            var new_input;
            for (var i = 0; i < 6; i++) {
                //Add six value input boxes to the div
                new_input = document.createElement('input');
                new_input.setAttribute('type', 'text');
                new_input.setAttribute('value', '');
                new_input.setAttribute('oninput', 'run()');
                new_div.appendChild(new_input)
            }

            //Add the div to the page
            document.getElementById('graph_settings').appendChild(new_div)
        }
    }

    removeGraph() {
        //Make sure to alway keep one element
        if (this.graphElement.childElementCount > 1) {
            //Remove last element
            this.graphElement.removeChild(this.graphElement.childNodes[this.graphElement.childElementCount + 1])
        }
    }

    //TODO somthing with the settings.
}