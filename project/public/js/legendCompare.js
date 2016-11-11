


function LegendCompare(histoChart, rangeScaleChart, collegeData) {
    var self = this;

    self.histoChart = histoChart;
    self.rangeScaleChart= rangeScaleChart;
    self.collegeData= collegeData;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
LegendCompare.prototype.init = function(){

    var self = this;
    /*
     *Set svg parameters in terms of size ect..
     *
     */
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    var legendChart = d3.select("#legend-Compare").classed("sidebar", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = legendChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 250;

    //creates svg element within the div
    self.svg = legendChart.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight);


};


/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
LegendCompare.prototype.update = function(){
    var self = this;

    //Domain definition for global color scale
    var domain = [-60,-50,-40,-30,-20,-10,0,10,20,30,40,50,60 ];

    //Color range for global color scale
    var range = ["#0066CC", "#0080FF", "#3399FF", "#66B2FF", "#99ccff", "#CCE5FF", "#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#FF0000", "#CC0000"];

    //Global colorScale to be used consistently by all the charts
    self.colorScale = d3.scaleQuantile()
        .domain(domain).range(range);

    // ******* TODO: PART I *******

    // Create the chart by adding circle elements representing each election year
    //The circles should be colored based on the winning party for that year
    //HINT: Use the .yearChart class to style your circle elements
    //HINT: Use the chooseClass method to choose the color corresponding to the winning party.

};
