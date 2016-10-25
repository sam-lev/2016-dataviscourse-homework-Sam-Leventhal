
/**
 * Constructor for the ElectoralVoteChart
 *
 * @param shiftChart an instance of the ShiftChart class
 */
function ElectoralVoteChart(shiftChart){

    var self = this;
    self.init();
    self.shiftChart = shiftChart;
};

/**
 * Initializes the svg elements required for this chart
 */
ElectoralVoteChart.prototype.init = function(){
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 60};

    //Gets access to the div element created for this chart from HTML
    var divelectoralVotes = d3.select("#electoral-vote").classed("content", true);
    self.svgBounds = divelectoralVotes.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 150;

    //creates svg element within the div
    self.svg = divelectoralVotes.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)
};

/**
 * Returns the class that needs to be assigned to an element.
 *
 * @param party an ID for the party that is being referred to.
 */
ElectoralVoteChart.prototype.chooseClass = function (party) {
    var self = this;
    if (party == "R"){
        return "republican";
    }
    else if (party == "D"){
        return "democrat";
    }
    else if (party == "I"){
        return "independent";
    }
}

/**
 * Creates the stacked bar chart, text content and tool tips for electoral vote chart
 *
 * @param electionResult election data for the year selected
 * @param colorScale global quantile scale based on the winning margin between republicans and democrats
 */

ElectoralVoteChart.prototype.update = function(electionResult, colorScale){
    var self = this;


    // ******* TODO: PART II *******

    //Group the states based on the winning party for the state;
    //then sort them based on the margin of victory
    var winner;
    var evSum = 0;
    var indpEVSum = 0;
    var repEVSum = 0;
    var demEVSum = 0;
    
    var indp = electionResult.filter(function (d){
	evSum = evSum + parseInt(d.Total_EV);
	indpEVSum = indpEVSum + parseInt(d.I_EV_Total);
	winner = d['Winning Party'];
	return d['State_Winner'] == "I" ;
    });
    indp = indp.sort(function(a,b) {
	return d3.descending(b.RD_Difference, a.RD_Difference)
    });
    
    // Republican data sorted
    var rep = electionResult.filter(function (d){
	repEVSum = repEVSum + parseInt(d.R_EV_Total);
	return d['State_Winner'] == "R";
    });
    rep = rep.sort(function(a, b) {
	return d3.ascending(Math.abs(a.RD_Difference) , Math.abs(b.RD_Difference) )
    });

    var dem = electionResult.filter(function (d){
	demEVSum = demEVSum + parseInt(d.D_EV_Total);
	return d['State_Winner'] == "D";
    });
    dem = dem.sort(function(a,b){
	return d3.descending(Math.abs(a.RD_Difference), Math.abs(b.RD_Difference))
    });

  
    var barScale = d3.scaleLinear()
	.domain([0, evSum])
	.range([0, self.svgWidth]);

    var allData = indp.concat(dem, rep);

    //Create the stacked bar chart.
    //Use the global color scale to color code the rectangles.
    //HINT: Use .electoralVotes class to style your bars.
    var  divelectoralVotes = d3.select("#electoral-vote");
    var svg = divelectoralVotes.select("svg");
    var bars = svg.selectAll("rect")
	.data(allData);

    svg.selectAll("rect").remove();
    
    svg.selectAll("text").remove();
    

    
    
    var barEnter = bars
	.append("g")
	.attr("height", self.svgHeight)
	.attr("width", self.svgWidth);
    

    var barEnter = bars
	.enter()
	.append("g")
	.attr("height", self.svgHeight)
	.attr("width", self.svgWidth);
    
    var xShift = 0;
    barEnter.append("rect")
	.attr("width", function(d, i){
	    return barScale(parseInt(d.Total_EV)) 
	})
	.attr("height", 20)
	.attr("x", function(d, i){
	    var xBar = xShift;
	    xShift = xShift + parseFloat(d.Total_EV);
	    return barScale(xBar + 10);
	})
    	.attr("y", 30)
	.attr("fill", function(d, i){
	    if(d.State_Winner == "D")
	    { return colorScale(d.RD_Difference) }
	    else if(d.State_Winner == "R"){ return colorScale(d.RD_Difference) }
	    else if(d.State_Winner == "I"){ return "green" }
	    else{ return "green" };
	}); 

    barEnter.append("rect")
	.attr("width", 1)
	.attr("height", 20)
	.attr("x", evSum/2)
	.attr("y", 30)
	.attr("fill", "black");

    barEnter.append("text")
    	.attr("dx", evSum/4+10)
	.attr("dy", 30)
	.text(function(d){
	    return "Electoral Vote ("+evSum/2+" needed to win)"
	})
	.attr("font-size","13px");

    barEnter.append("text")
    	.attr("dx", 0)
	.attr("dy", 35)
	.text(function(d){return d.I_EV_Total})
	.attr("font-size","15px")
	.attr("stroke", "green"); 

    barEnter.append("text")
    	.attr("dx", function(d){ return barScale( parseInt(d.I_EV_Total))})
	.attr("dy", 20)
	.text(function(d){ return d.D_EV_Total})
	.attr("font-size","15px")
	.attr("stroke", function(d){ return colorScale(-1*d.RD_Difference)});
	     
    barEnter.append("text")
    	.attr("dx", function(d){  return evSum-10})
	.attr("dy", 10)
	.text(function(d){ return d.R_EV_Total})
	.attr("font-size","15px")
	.attr("stroke", function(d){ return colorScale(d.RD_Difference)});
    
    bars = bars.merge(barEnter);
    
    bars.attr("transform", function(d,i){
	return "translate(30, 0)"
    });

    svg.selectAll("rect").attr("transform", function(d,i){
	return "translate(0, 14)"
    });
    svg.selectAll("text").attr("transform", function(d,i){
	return "translate(0, 2)"
    });
    //Display total count of electoral votes won by the Democrat and Republican party
    //on top of the corresponding groups of bars.
    //HINT: Use the .electoralVoteText class to style your text elements;  Use this in combination with
    // chooseClass to get a color based on the party wherever necessary

    //Display a bar with minimal width in the center of the bar chart to indicate the 50% mark
    //HINT: Use .middlePoint class to style this bar.

    //Just above this, display the text mentioning the total number of electoral votes required
    // to win the elections throughout the country
    //HINT: Use .electoralVotesNote class to style this text element

    //HINT: Use the chooseClass method to style your elements based on party wherever necessary.

    //******* TODO: PART V *******
    //Implement brush on the bar chart created above.
    //Implement a call back method to handle the brush end event.
    //Call the update method of shiftChart and pass the data corresponding to brush selection.
    //HINT: Use the .brush class to style the brush.

        var brush = d3.brushX().extent([[0,40],[self.svgWidth,80]]).on("end", function() {
        var brushSelection = d3.event.selection;
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.selectAll("#electoral-vote > svg > g > rect");
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                    array.push(d3.select(this).data());
            }
        })
        array.pop();
        self.shiftChart.update(array,0);
    });

    svg.append("g").attr("class", "brush").call(brush);

};
