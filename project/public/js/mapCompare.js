


function MapCompare(histoChart, rangeScaleChart, collegeData) {
    var self = this;

    self.histoChart = histoChart;
    self.rangeScaleChart= rangeScaleChart;
    self.collegeData= collegeData;
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
    var divyearChart = d3.select("#map-Compare").classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divyearChart.node().getBoundingClientRect();
    self.svgWidth = 800;//self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 600;

    //creates svg element within the div
    self.svg = divyearChart.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight);
};


MapCompare.prototype.chooseClass = function (rank) {
    var self = this;
    if (rank <= 10){
        return "red";
    }
    else if (rank > 10 && rank <= 20){
        return "black";
    }
    else if (party > 20){
        return "blue";
    }
}

MapCompare.prototype.tooltip_render = function (tooltip_data) {
    var self = this;
    var text = "<ul>";
    tooltip_data.forEach(function(row){
        text += "<li class = "  + self.chooseClass(row.rank)+ ">" + row.Institution + row.Tuition+":\t\t"+row.State+"("+row.SAT-Scores+", " + row.ACT-Scores + ")" + "</li>"
    });
}

/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
MapCompare.prototype.update = function() {
	var self = this;

	 //Domain definition for global color scale
	 var domain = [-60,-50,-40,-30,-20,-10,0,10,20,30,40,50,60 ];

	 //Color range for global color scale
	 var range = ["#0066CC", "#0080FF", "#3399FF", "#66B2FF", "#99ccff", "#CCE5FF", "#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#FF0000", "#CC0000"];

	 //Global colorScale to be used consistently by all the charts
	 self.colorScale = d3.scaleQuantile()
	 .domain(domain).range(range);

	// console.log("Call reaches here");
	//Had to add projection to work in v4.0
	var projection = d3.geoAlbersUsa()
		.translate([self.svgWidth/2, self.svgHeight/2])
		.scale([1000]);

	// Define default path generator
	var path = d3.geoPath()
		.projection(projection);

	//Load in GeoJSON data
	d3.json("data/us-states.json", function(json) {

		//Bind data and create one path per GeoJSON feature
		self.svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			// here we use the familiar d attribute again to define the path
			.attr("d", path);

        var filteredData = self.collegeData.filter(function (d) {
            if(d.rank <= 30) return d;
        });

        console.log(filteredData);

        self.svg.selectAll("circle")
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
            .attr("r", 2.5)
            .attr("fill", function (d) {
                if(d.rank <= 10) {
                    return "red"
                } else if (d.rank > 10 && d.rank <= 20) {
                    return "black"
                } else {
                    return "blue"
                }
            });

        // console.log("Reaches here");
        tip = d3.tip().attr('class', 'd3-tip')
            .direction('s')
            .offset(function() {
                return [0,0];
            })
            .html(function(d) {
                // populate data in the following format
                tooltip_data = {
                    "rank": d.rank,
                    "Institution":d["institution.name"],
                    "Tuition":d.Tuition,
                    "State":d.State_abbreviation,
                    "SAT-Scores":d.SAT_scores,
                    "ACT-Scores":d.ACT_scores
                }
                // pass this as an argument to the tooltip_render function then,
                // return the HTML content returned from that method.
                var renderer = self.tooltip_render(tooltip_data);
                return renderer;
            });
        self.svg.call(tip);
	});

}

