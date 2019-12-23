class Plot {
    constructor() {
        //Get the main element for future reference
        this.outputElement = document.getElementById("output");
        this.settingsElement = document.getElementById('graph_settings');
    }

    updateGraphs() {
        //Read the graphs from the DOM.

        this.graphs = []
        this.outputElement.innerHTML = "";

        for (let x = 0; x < this.settingsElement.childElementCount; x++) {
            let temp_graph = []
            for (let y = 0; y < this.settingsElement.children[x].childElementCount; y++) {
                let temp_value = ""
                if (this.settingsElement.children[x].children[y].value != undefined) {
                    temp_value = this.settingsElement.children[x].children[y].value.trim()
                }

                if (temp_value.length != 0) {
                    temp_graph.push(temp_value)
                }
            }
            this.graphs.push(temp_graph)

            //For each graph, make a div element
            let graphElement = document.createElement('div')
            graphElement.id = `graph${x}`
            graphElement.classList = "graph"
            this.outputElement.appendChild(graphElement)
        }
    }
    show(x, data, yname, graphHeight, graphWidth) {

        let layout = {
            title: `(${yname.slice(0, -2)},${this.graphs[x][0]})-grafiek`,
            titlefont: {
                size: 18,
                color: `#a0002a`
            },
            height: graphHeight,
            width: graphWidth,
            autosize: true,
            xaxis: {
                title: this.graphs[x][0]
            },
            yaxis: {
                title: yname.slice(0, -2)
            }
        }
        Plotly.newPlot(`graph${x}`, data, layout, {
            scrollZoom: true,
            editable: true,
            displaylogo: false,
            modeBarButtonsToRemove: [`sendDataToCloud`]
        })
    }

    plot(modelData) {
        //For each graph
        for (let x = 0; x < this.graphs.length; x++) {
            //Temp value to add all the lines within one graph to.
            let data = []
            let yname = ''
            //For each variable minus one (the x variable stays the same)
            for (let y = 1; y < this.graphs[x].length; y++) {
                //Make a line (x,y1), (x,y2), etc.. with name y1,y2,y3 etc....
                data.push({
                    x: modelData[this.graphs[x][0]],
                    y: modelData[this.graphs[x][y]],
                    type: `scatter`,
                    name: this.graphs[x][y],
                    autosize: true
                })
                yname += this.graphs[x][y] + ', '
            }

            //Put the graph on the page
            let width_of_window = window.innerWidth;

            let graphWidth = width_of_window > (BREAKPOINT) ? width_of_window - 700 : width_of_window - 48;
            // let graphHeight = width_of_window < (1200) ? graphWidth / 1.5 : graphWidth / 1.5;
            let graphHeight = graphWidth / 1.5;
            console.log(graphHeight, graphWidth);
            this.show(x, data, yname, graphHeight, graphWidth)
        }
    }
}
