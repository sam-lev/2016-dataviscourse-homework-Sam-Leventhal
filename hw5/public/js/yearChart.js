/**
 * Constructor for the Year Chart
 *
 * @param electoralVoteChart instance of ElectoralVoteChart
 * @param tileChart instance of TileChart
 * @param votePercentageChart instance of Vote Percentage Chart
 * @param electionInfo instance of ElectionInfo
 * @param electionWinners data corresponding to the winning parties over mutiple election years
 */
function pr(item){
    console.log(item);
}


function YearChart(electoralVoteChart, tileChart, votePercentageChart, electionWinners) {
    var self = this;

    self.electoralVoteChart = electoralVoteChart;
    self.tileChart = tileChart;
    self.votePercentageChart = votePercentageChart;
    self.electionWinners = electionWinners;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
YearChart.prototype.init = function(){

    var self = this;
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    var divyearChart = d3.select("#year-chart").classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divyearChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 100;

    //creates svg element within the div
    self.svg = divyearChart.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)

};

/**
 * Returns the class that needs to be assigned to an element.
 *
 * @param party an ID for the party that is being referred to.
 */
YearChart.prototype.chooseClass = function (party) {
    var self = this;
    if (party == "R") {
        return "yearChart republican";
    }
    else if (party == "D") {
        return "yearChart democrat";
    }
    else if (party == "I") {
        return "yearChart independent";
    }
}


/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
YearChart.prototype.update = function(){
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

    var dataUsed = self.electionWinners;

    
    var svg = d3.select("#year-chart").selectAll("svg");
    var circles = svg.selectAll("circle");
    var data = circles.data(self.electionWinners);

    data.exit().remove();
    
    //add number of data elements g containers at desired x and y coordinates
    var data = data.enter()
	.append("g")
	.attr("transform", function(d,i){
	    var x = i*50+50;
	    return "translate("+ x +", 40)"
	});

    //append circles to each g container in enter
    var circle = data.append("circle")
	.attr("cx", function(d,i){
	    return 0;
	})
	.attr("cy", 0)
	.attr("r", 15)
	.attr("class", function(d,i){
	    return self.chooseClass(d.PARTY);
	});

    //Append text information of each year right below the corresponding circle
    //HINT: Use .yeartext class to style your text elements

    // Add text to each g element below each circle
    var text = data.append("text")
	.attr("dx", 0)
	.attr("dy", function(d){
	    return 30
	})
	.attr("class", function(d,i){
	    return "yearText";
	})
	.text(function(d){
	    return d.YEAR;
	})
	.attr("font-size", "12px")
	.attr("text-anchor", "middle");

    var line = data.selectAll("line")
        .data(self.electionWinners)
        .append("line");

    var line = data.selectAll("line")
        .enter()
        .append("line");

    circle = circle.merge(line);
    
    var lines = line
        .attr("class","lineChart")
        .attr("x1", function(d, i) {
            return 10*i;
        })
        .attr("y1",0)
        .attr("x2",function(d,i){
                return 10*(i+1);
        })
        .attr("y2",0);
    //Style the chart by adding a dashed line that connects all these years.
    //HINT: Use .lineChart to style this dashed line

    //Clicking on any specific year should highlight that circle and  update the rest of the visualizations
    //HINT: Use .highlighted class to style the highlighted circle
    d3.select("svg").selectAll("g")
	.on("click", function(d,i){
	    var elm = d3.select(this);
	    var year = d3.select(this).text();
	    var allCircle = d3.selectAll("circle")
		.classed("selected", false);
	    var circle = elm.select("circle")
		.attr("class", function(d,i){
		    return self.chooseClass(d.PARTY) + " selected"});

	    self.update();

	    d3.csv("data/Year_Timeline_"+ year +".csv", function(error, yearData){

		self.electoralVoteChart.update(yearData, self.colorScale);
		self.votePercentageChart.update( yearData, self.colorScale);
		self.tileChart.update( yearData, self.colorScale);
		self.svg.append("g").attr("class", "brush").call(brush);
	
	    })

	
    });
    //Election information corresponding to that year should be loaded and passed to
    // the update methods of other visualizations


    //******* TODO: EXTRA CREDIT *******

    //Implement brush on the year chart created above.
    //Implement a call back method to handle the brush end event.
    //Call the update method of shiftChart and pass the data corresponding to brush selection.
    //HINT: Use the .brush class to style the brush.
    var brush = d3.brushX().extent([[0,50],[self.svgWidth,80]]).on("end", function() {
        var brushSelection = d3.event.selection;
              pr(brushSelection);
        console.log(brushSelection[0],brushSelection[1]);
        var texts = self.svg.selectAll("text");
 
        var array = [];

        texts.each(function(d,i){
            if (brushSelection[1] >= d3.select(this).attr("x") && brushSelection[0] <= d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        console.log(array);
        self.electoralVoteChart.shiftChart.update(array,1);
    });

    self.svg.append("g").attr("class", "brush").call(brush);
};
