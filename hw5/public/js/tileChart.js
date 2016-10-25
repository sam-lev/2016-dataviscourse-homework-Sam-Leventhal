/**
 * Constructor for the TileChart
 */
function TileChart(){

    var self = this;
    self.init();
};


/**
 * Initializes the svg elements required to lay the tiles
 * and to populate the legend.
 */
TileChart.prototype.init = function(){
    var self = this;

    //Gets access to the div element created for this chart and legend element from HTML
    var divTileChart = d3.select("#tiles").classed("content", true);
    var legend = d3.select("#legend").classed("content",true);
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};

    var svgBounds = divTileChart.node().getBoundingClientRect();
    self.svgWidth = svgBounds.width - self.margin.left - self.margin.right+300;
    self.svgHeight = (self.svgWidth+300)/2;
    var legendHeight = 150;

    //creates svg elements within the div
    self.legendSvg = legend.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",legendHeight)
        .attr("transform", "translate(" + self.margin.left + ",0)")

    self.svg = divTileChart.append("svg")
                        .attr("width",self.svgWidth + 50)
                        .attr("height",self.svgHeight+300)
                        .attr("transform", "translate(" + self.margin.left + ",0)")
                        .style("bgcolor","green")

};

/**
 * Returns the class that needs to be assigned to an element.
 *
 * @param party an ID for the party that is being referred to.
 */
TileChart.prototype.chooseClass = function (party) {
    var self = this;
    if (party == "R"){
        return "republican";
    }
    else if (party== "D"){
        return "democrat";
    }
    else if (party == "I"){
        return "independent";
    }
}

/**
 * Renders the HTML content for tool tip.
 *
 * @param tooltip_data information that needs to be populated in the tool tip
 * @return text HTML content for tool tip
 */
TileChart.prototype.tooltip_render = function (tooltip_data) {
    var self = this;
    var text = "<h2 class ="  + self.chooseClass(tooltip_data.winner) + " >" + tooltip_data.state + "</h2>";
    text +=  "Electoral Votes: " + tooltip_data.electoralVotes;
    text += "<ul>";
    tooltip_data.result.forEach(function(row){
        text += "<li class = " + self.chooseClass(row.party)+ ">" + row.nominee+':\t\t'+row.votecount+'('+row.percentage+"%)" + "</li>"
    });
    text += "</ul>";
    return text;
};
/**
 * Helper function to detrmine state from 12*8 length array
 */
TileChart.prototype.state = function(map, index){
    var row = 0;
    var col = 0;
    
    if( index < 12){
	row = 0;
	col = index;
    }else{	
	row = index%8;
	col = index%12;
    }
  
    var state = map[index];
  
    var cord = {"x": col, "y": row, "state":state};

    return cord; 
}
/**
 * Creates tiles and tool tip for each state, legend for encoding the color scale information.
 *
 * @param electionResult election data for the year selected
 * @param colorScale global quantile scale based on the winning margin between republicans and democrats
 */
TileChart.prototype.update = function(electionResult, colorScale){
    var self = this;
    
    //Calculates the maximum number of columns to be laid out on the svg
    self.maxColumns = d3.max(electionResult,function(d){
                                return parseInt(d["Space"]);
                            });

    //Calculates the maximum number of rows to be laid out on the svg
    self.maxRows = d3.max(electionResult,function(d){
                                return parseInt(d["Row"]);
    });




    //for reference:https://github.com/Caged/d3-tip
    //Use this tool tip element to handle any hover over the chart
    tip = d3.tip().attr('class', 'd3-tip')
        .direction('se')
        .offset(function() {
            return [0,0];
        })
        .html(function(d) {
            // populate data in the following format
            tooltip_data = {
                "state": State,
                "winner": d.State_Winner,
                "electoralVotes": Total_EV,
                "result": [
                    {"nominee": D_Nominee_prop, "votecount": D_Votes, "percentage": D_Percentage, "party": "D"},
                    {"nominee": R_Nominee_prop, "votecount": R_Votes, "percentage": R_Percentage, "party": "R"},
                    {"nominee": I_Nominee_prop, "votecount": I_Votes, "percentage": I_Percentage, "party": "I"}
                ]
            };
            //pass this as an argument to the tooltip_render function then,
            //return the HTML content returned from that method.
            return self.tooltip_render(tooltip_data);

        });
    

    //Creates a legend element and assigns a scale that needs to be visualized
    self.legendSvg.append("g")
        .attr("class", "legendQuantile");

    var legendQuantile = d3.legendColor()
        .shapeWidth(120)
        .cells(10)
        .orient('horizontal')
        .scale(colorScale);


    // ******* TODO: PART IV *******
    //Tansform the legend element to appear in the center and make a call to this element for it to display.

    self.legendSvg.append("g")
        .attr("class","legendQuant")
        .attr("transform", "translate(10,0)");

    self.legendSvg.select(".legendQuant")
        .call(legendQuantile);
    
 

 /*   
    legendRect.selectAll("rect")
	.attr("fill","black")
	.attr("width", 100)
	.attr("height",100)
	.attr("x",0)
	.attr("y",0);
*/

    //Lay rectangles corresponding to each state according to the 'row' and 'column' information in the data.
    var svg = d3.select("#tileChart").select("#tiles").select("svg");
    var tiles = svg.selectAll("rect")
        .data(electionResult);

    var tileEnter = tiles
        .append("g")
        .attr("height", self.svgHeight)
        .attr("width", self.svgWidth);

    var tileEnter = tiles
        .enter()
        .append("g")
        .attr("height", self.svgHeight)
        .attr("width", self.svgWidth);

    pr(tileEnter);

    svg.call(tip);

 /*   tileEnter.append("rect")//error
	.attr("width",(self.svgWidth-5)/12)
	.attr("height",(self.svgHeight-5)/8)
	.attr("x",function(d,i){
	    return = self.state(map,i).col;
	})
	.attr("y",function(d,i){
	    return self.state(map,i).row;
	})
	.attr("fill","green")
	.attr("class", ".tile"); */
  

    //Map x with domain of length 8 and y of length 12
    var xScale = d3.scaleLinear()
        .range([0, self.svgHeight])
        .domain([0,7]);

    var yScale = d3.scaleLinear()
        .range([0, self.svgWidth])
        .domain([0,11])
        .clamp(true);



    var sqr = tileEnter.append("rect")
        .attr("x", function (d,i) {
            return xScale(parseInt(d.Space));
        })
        .attr("y",function (d,i) {
            return yScale(parseInt(d.Row));
        })
        .attr("width",(self.svgWidth)/12 )
        .attr("height",(self.svgHeight)/8 )
        .attr("fill", function (d,i) {
            if(d.State_Winner == "I"){
                return "green"
            }
            else{
                return colorScale(d.RD_Difference)
            }
        })
        .style("class","tile")
        .on("mouseover",tip.show)
        .on("mouseout",tip.hide);	       

    pr(tip);
    
    tileEnter.append("text")
        .attr("x", function (d,i) {
            return  xScale(parseInt(d.Space));
        })
        .attr("y", function (d,i) {
            return  xScale(parseInt(d.Row))+10;
        })
        .text(function (d) {
            return d.Abbreviation;
        })
        .style("class","tilestext");

    tileEnter.append("text")
        .attr("x", function (d,i) {
            return  xScale(parseInt(d.Space));
        })
        .attr("y", function (d,i) {
            return  xScale(parseInt(d.Row))+24;
        })
        .text(function (d) {
            return d.Total_EV;
        })
        .style("class","tilestext");

    tiles = tiles.merge(tileEnter);

    //Display the state abbreviation and number of electoral votes on each of these rectangles

    //Use global color scale to color code the tiles.

    //HINT: Use .tile class to style your tiles;
    // .tilestext to style the text corresponding to tiles

    //Call the tool tip on hover over the tiles to display stateName, count of electoral votes
    //then, vote percentage and number of votes won by each party.
    //HINT: Use the .republican, .democrat and .independent classes to style your elements.
};
