// Global variable
var projection;
var selection = 0;
var centered;

function MapCompare(histoChart,rangeScaleChart) {
    var self = this;

    self.histoChart = histoChart;
    self.rangeScaleChart= rangeScaleChart;
    // self.collegeData= collegeData;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
MapCompare.prototype.init = function(){

    var self = this;
    /*
     *Set svg parameters in terms of size ect..
     *
     */
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    // var divyearChart = d3.select("#map-Compare");

    //Gets access to the div element created for this chart from HTML
    // self.svgBounds = divyearChart.node().getBoundingClientRect();
    self.svgWidth = 800;//self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 600;

    var legend = d3.select("#legend").append("svg")
        .attr("width", 700)
        .attr("height", 50);

    legend.append("circle")
        .attr("cx",10)
        .attr("cy",20)
        .attr("r",5)
        .style("fill","red");

    legend.append("text")
        .attr("x",20)
        .attr("y",25)
        .attr("fill","black")
        .text("{rank less than or = 10}")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    legend.append("circle")
        .attr("cx",190)
        .attr("cy",20)
        .attr("r",5)
        .style("fill","black");

    legend.append("text")
        .attr("x",200)
        .attr("y",25)
        .attr("fill","black")
        .text("{rank greater than 10 and less than or = 20}")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    legend.append("circle")
        .attr("cx",500)
        .attr("cy",20)
        .attr("r",5)
        .style("fill","blue");

    legend.append("text")
        .attr("x",510)
        .attr("y",25)
        .attr("fill","black")
        .text("{rank greater than 20}")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");
};


MapCompare.prototype.chooseClass = function (rank) {
    var self = this;
    if (rank <= 10){
        return "republican";
    }
    else if (rank > 10 && rank <= 20){
        return "democrat";
    }
    else if (rank > 20){
        return "independent";
    }
}

MapCompare.prototype.tooltip_render = function (tooltip_data) {
    var self = this;
    console.log("tooltip");
    var text = "<ul>";
    tooltip_data.result.forEach(function(row){
        text += "<li class = " + self.chooseClass(row.rank)+ ">" + row.Institution+ "</li>"
        text += "<li class = " + self.chooseClass(row.rank)+ ">" + "Rank : " + row.rank + "</li>"
        text += "<li class = " + self.chooseClass(row.rank)+ ">" + "State : " + row.State + "</li>"
        text += "<li class = " + self.chooseClass(row.rank)+ ">" + "Tuition($ per year) : " + row.Tuition + "</li>"
        text += "<li class = " + self.chooseClass(row.rank)+ ">" + "Average SAT Score : " + row.SATScores + "</li>"
        text += "<li class = " + self.chooseClass(row.rank)+ ">" + "Average ACT Score : " + row.ACTScores + "</li>"
    });
    return text;
}

/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
MapCompare.prototype.update = function(filteredData) {
	var self = this;

	 //Domain definition for global color scale
	 var domain = [-60,-50,-40,-30,-20,-10,0,10,20,30,40,50,60 ];

	 //Color range for global color scale
	 var range = ["#0066CC", "#0080FF", "#3399FF", "#66B2FF", "#99ccff", "#CCE5FF", "#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#FF0000", "#CC0000"];

	 //Global colorScale to be used consistently by all the charts
	 self.colorScale = d3.scaleQuantile()
	 .domain(domain).range(range);

    if(filteredData == null) {
        var circles = d3.select("#map-Compare").selectAll("circle");
        if(!circles.empty()) {
            circles.remove();
        }
        return;
    }
	// console.log("Call reaches here");
    console.log(filteredData);
    // d3.selectAll("circle").remove();
    d3.select("#map-Compare").selectAll("circle").remove();
    /*var filteredData = self.collegeData.filter(function (d) {
     if(d.rank <= 30) return d;
     });

    console.log(filteredData);
    // console.log(svg);*/

    tip = d3.tip().attr('class', 'd3-tip')
        .direction('s')
        .offset(function() {
            return [0,0];
        })
        .html(function(d) {
            // populate data in the following format
            tooltip_data = {
                "result" :[
                    {"rank": d.rank, "Tuition": d.Tuition, "Institution": d["institution.name"],"State": d.State_abbreviation, "SATScores": d.SAT_scores, "ACTScores": d.ACT_scores}
                ]
            }
            // pass this as an argument to the tooltip_render function then,
            // return the HTML content returned from that method.
            var renderer = self.tooltip_render(tooltip_data);
            return renderer;
        });

    d3.select("svg").selectAll("circle")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("cx",function (d,i) {
            // console.log(coordinates[i][0]);
            return projection([d.longitude,d.latitude])[0];
        })
        .attr("cy", function(d,i){
            // console.log(d);
            return projection([d.longitude, d.latitude])[1];
        })
        .attr("r", 3)
        .attr("fill", function (d) {
            if(d.rank <= 10) {
                return "red"
            } else if (d.rank > 10 && d.rank <= 20) {
                return "black"
            } else {
                return "blue"
            }
        })
        .on("mouseover",tip.show)
        .on("mouseout",tip.hide)
        .on("click",function(d,i) {
            // console.log(d3.select(this).attr("class"));
            if(d3.select(this).attr("class") == "selected") {
                d3.select(this).classed("selected",false);
                // console.log(d['institution.name']);
                self.rangeScaleChart.update(d);
            } else {
                d3.select(this).classed("selected",true);
                if(selection >= 10)
                    selection = 0;
                self.histoChart.update(d,selection);
                self.rangeScaleChart.update(d);
                selection++;
            }
        });

    console.log("Reaches here");

    svg = d3.select("#map-Compare").select("svg").selectAll("circle");
    console.log(svg);
    // console.log(tip);
    if(!svg.empty())
       svg.call(tip);
}

