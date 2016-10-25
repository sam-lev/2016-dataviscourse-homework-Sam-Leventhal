/**
 * Constructor for the Vote Percentage Chart
 */
function VotePercentageChart(){

    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
VotePercentageChart.prototype.init = function(){
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};
    var divvotesPercentage = d3.select("#votes-percentage").classed("content", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divvotesPercentage.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 200;

    //creates svg element within the div
    self.svg = divvotesPercentage.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)
};

/**
 * Returns the class that needs to be assigned to an element.
 *
 * @param party an ID for the party that is being referred to.
 */
VotePercentageChart.prototype.chooseClass = function (party) {
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
 * Renders the HTML content for tool tip
 *
 * @param tooltip_data information that needs to be populated in the tool tip
 * @return text HTML content for toop tip
 */
VotePercentageChart.prototype.tooltip_render = function (tooltip_data) {
    var self = this;
    var text = "<ul>";
    tooltip_data.result.forEach(function(row){
        text += "<li class = " + self.chooseClass(row.party)+ ">" + row.nominee+":\t\t"+row.votecount+"("+row.percentage+"%)" + "</li>"
    });
    return text;
}

VotePercentageChart.prototype.handleNaN = function(value){
    var result;
    if(value){
	result = value;
    }else{
	result = 0;
    }
    return result
}

VotePercentageChart.prototype.IPerson = function( nominee ){
    if(nominee == ""){
	nom = nominee
    }else{
	nom = "No One"
    };
    return nom
}
/**
 * Creates the stacked bar chart, text content and tool tips for Vote Percentage chart
 *
 * @param electionResult election data for the year selected
 */
VotePercentageChart.prototype.update = function(electionResult){
    var self = this;
    var INominee= self.IPerson( electionResult[0].I_Nominee_prop );
    //for reference:https://github.com/Caged/d3-tip
    //Use this tool tip element to handle any hover over the chart
    tip = d3.tip().attr('class', 'd3-tip')
        .direction('s')
        .offset(function() {
            return [0,0];
        })
        .html(function(d) {
            // populate data in the following format
              tooltip_data = {
              "result":[
		  {"nominee": electionResult[0].D_Nominee_prop,"votecount": parseFloat(electionResult[0].D_Votes_Total),"percentage": parseFloat(self.handleNaN(electionResult[0].D_PopularPercentage)),"party":"D"} ,
		  {"nominee": electionResult[0].R_Nominee_prop,"votecount": parseFloat(electionResult[0].R_Votes_Total),"percentage": parseFloat(self.handleNaN(electionResult[0].R_PopularPercentage)),"party":"R"} ,
		  {"nominee": INominee  ,"votecount": parseFloat(electionResult[0].I_Votes_Total),"percentage": parseFloat(self.handleNaN(electionResult[0].I_PopularPercentage)),"party":"I"}
              ]
              }
              //pass this as an argument to the tooltip_render function then,
             // return the HTML content returned from that method.
              
	    var htmlRender  = self.tooltip_render(tooltip_data);
            return htmlRender ;
        });


    // ******* TODO: PART III *******

    //Create the stacked bar chart.
    //Use the global color scale to color code the rectangles.
    //HINT: Use .votesPercentage class to style your bars.
    var barScale = d3.scaleLinear()
	.domain([0, parseFloat(self.handleNaN(electionResult[0].D_PopularPercentage))+ parseFloat(self.handleNaN(electionResult[0].R_PopularPercentage)) + parseFloat(self.handleNaN(electionResult[0].I_PopularPercentage))])
	.range([0, self.svgWidth]);
    
    var divvotesPercentage = d3.select("#votes-percentage");
    var svg = divvotesPercentage.select("svg");
    var bars = svg.selectAll("rect")
	.data([{"party": "I", "nominee": INominee,"percent":parseFloat(self.handleNaN(electionResult[0].I_PopularPercentage))},{"party":"D", "nominee": electionResult[0].D_Nominee_prop,"percent": parseFloat(self.handleNaN(electionResult[0].D_PopularPercentage))},{"party":"R","nominee": electionResult[0].R_Nominee_prop,"percent": parseFloat(self.handleNaN(electionResult[0].R_PopularPercentage))}]);

    bars.exit().remove();
    svg.selectAll("rect").remove();
    svg.selectAll("text").remove();

    
    var barEnter = bars.enter()
	.append("g");

    svg.call(tip);
    
    var xShift = 0;
    barEnter.append("rect")
	.attr("width", function(d){ return barScale( self.handleNaN(d.percent)) })
	.attr("height", 20)
	.attr("x", function(d) { var xBar = xShift; xShift = xShift + self.handleNaN(d.percent); return barScale( xBar )})
	.attr("y",3)
    	.attr("class", function(d, i){
	    if(d.party == "D")
	    { return "democrat"}
	    else if(d.party== "R")
	    { return "republican" }
	    else if(d.party == "I")
	    { return "independent" }
	    else{ return "green" };
	})
    	.on("mouseenter", tip.show)
	.on("mouseout", tip.hide);

    barEnter.append("text")
    	.attr("dx", function(d){
	    if(d.party == "I"){
		return barScale(parseFloat(self.handleNaN(electionResult[0].I_PopularPercentage))/4)}
	    else if(d.party == "D"){ return barScale( (parseFloat(self.handleNaN(electionResult[0].I_PopularPercentage))+d.percent)/2  ) }
	    else if( d.party =="R"){ return barScale(100-d.percent/3) }
		
	})
	.attr("dy", 0)
	.text(function(d){
	    if(d.party == "I"){
		if(electionResult[0].I_PopularPercentage){
	
		    return electionResult[0].I_Nominee_prop;
		}else{
		    return ""
		};
	    }
	    else{ return d.nominee}
	})
	.attr("font-size","15px")
	.attr("class", function(d){ return self.chooseClass(d.party)});

    barEnter.append("text")
    	.attr("dx", function(d){
	    if(d.party == "I"){
		return barScale(parseFloat(self.handleNaN(electionResult[0].I_PopularPercentage))/4)}
	    else if(d.party == "D"){ return barScale( (parseFloat(self.handleNaN(electionResult[0].I_PopularPercentage))+d.percent)/2  ) }
	    else if( d.party =="R"){ return barScale(100-d.percent/3) }
		
	})
	.attr("dy", 10)
	.text(function(d){
	    if(d.party == "I"){
		if(electionResult[0].I_PopularPercentage){
		    return d.percent+"%";
		}else{
		    return ""
		};
	    }
	    else{ return d.percent+"%"}
	})
	.attr("font-size","11px")
	.attr("class", function(d){ return self.chooseClass(d.party)}); 
/*
    barEnter.append("text")
    	.attr("dx", function(d){ return barScale( parseInt(d.))})
	.attr("dy", 10)
	.text(function(d){ return d.nominee})
	.attr("font-size","15px")
	.attr("stroke", function(d){ return colorScale(-1*d.RD_Difference)});
	     
    barEnter.append("text")
    	.attr("dx", function(d){  return d-10})
	.attr("dy", 10)
	.text(function(d){ return d.R_Nominee_prop})
	.attr("font-size","15px")
	.attr("stroke", function(d){ return colorScale(d.RD_Difference)});*/
    
    bars = bars.merge(barEnter);

    svg.selectAll("rect").attr("transform", function(d,i){
	return "translate(40, 40)"
    });
    
    svg.selectAll("text").attr("transform", function(d,i){
	return "translate(40, 20)"
    });

   


    
    
    //Display the total percentage of votes won by each party
    //on top of the corresponding groups of bars.
    //HINT: Use the .votesPercentageText class to style your text elements;  Use this in combination with
    // chooseClass to get a color based on the party wherever necessary

    //Display a bar with minimal width in the center of the bar chart to indicate the 50% mark
    //HINT: Use .middlePoint class to style this bar.

    //Just above this, display the text mentioning details about this mark on top of this bar
    //HINT: Use .votesPercentageNote class to style this text element

    //Call the tool tip on hover over the bars to display stateName, count of electoral votes.
    //then, vote percentage and number of votes won by each party.

    //HINT: Use the chooseClass method to style your elements based on party wherever necessary.

};
