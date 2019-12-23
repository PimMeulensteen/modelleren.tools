class Plot {
  constructor () {
    this.outputElement = document.getElementById('output')
    this.settingsElement = document.getElementById('graph_settings')
  }

  /**
     * Read the graph elements from the DOM and store them in `this.graphs`.
     */
  updateGraphs () {
    this.graphs = []
    this.outputElement.innerHTML = '' /* Clear the output-element */

    for (let x = 0; x < this.settingsElement.childElementCount; x++) {
      const tempGraph = []
      for (let y = 0; y < this.settingsElement.children[x].childElementCount; y++) {
        let tempValue = ''
        if (this.settingsElement.children[x].children[y].value !== undefined) {
          tempValue = this.settingsElement.children[x].children[y].value.trim()
        }

        if (tempValue.length !== 0) {
          tempGraph.push(tempValue)
        }
      }
      this.graphs.push(tempGraph)

      /* For each graph, make a div element with id graph{NUMBER} */
      const graphElement = document.createElement('div')
      graphElement.id = `graph${x}`
      graphElement.classList = 'graph'
      this.outputElement.appendChild(graphElement)
    }
  }

  show (x, data, yname, graphHeight, graphWidth) {
    const layout = {
      title: `(${yname.slice(0, -2)},${this.graphs[x][0]})-grafiek`,
      titlefont: {
        size: 18,
        color: '#a0002a'
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
      modeBarButtonsToRemove: ['sendDataToCloud']
    })
  }

  plot (modelData) {
    for (let x = 0; x < this.graphs.length; x++) {
      // for (let graph in this.graphs) {
      const graph = this.graphs[x]
      // Temp value to add all the lines within one graph to.
      const data = []
      let yname = ''
      // For each variable minus one (the x variable stays the same)
      for (let y = 1; y < graph.length; y++) {
        // Make a line (x,y1), (x,y2), etc.. with name y1,y2,y3 etc....
        data.push({
          x: modelData[graph[0]],
          y: modelData[graph[y]],
          type: 'scatter',
          name: graph[y],
          autosize: true
        })
        yname += graph[y] + ', '
      }

      const windowWidth = window.innerWidth
      const graphWidth = windowWidth > (BREAKPOINT) ? windowWidth - 700 : windowWidth - 48
      const graphHeight = graphWidth / 1.5

      this.show(x, data, yname, graphHeight, graphWidth)
    }
  }
}
