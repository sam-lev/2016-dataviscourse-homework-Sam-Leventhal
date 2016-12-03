

function RangeScaleChart(collegeData) {
    var self = this;
    self.collegeData = collegeData;
    self.init();
};


/**
 * Initializes the svg elements required for this chart
 */
RangeScaleChart.prototype.init = function(){

    var self = this;
    var minY = 40;
    var maxY = 1000;

    self.selected = [];
    self.Uni = [];
    var data = d3.range(9);

    self.svg = d3.select("#range-scale").append("svg")
        .attr("width",800)
        .attr("height",110);

    self.svg1 = d3.select("#range-scale").append("svg")
        .attr("width",800)
        .attr("height",110);

    self.svg2 = d3.select("#range-scale").append("svg")
        .attr("width",800)
        .attr("height",110);

    self.svg3 = d3.select("#range-scale").append("svg")
        .attr("width",800)
        .attr("height",110);

    self.svg4 = d3.select("#range-scale").append("svg")
        .attr("width",800)
        .attr("height",110);

    self.svg5 = d3.select("#range-scale").append("svg")
        .attr("width",800)
        .attr("height",110);

    self.svg6 = d3.select("#range-scale").append("svg")
        .attr("width",800)
        .attr("height",110);

    self.svg7 = d3.select("#range-scale").append("svg")
        .attr("width",800)
        .attr("height",110);

    self.svg8 = d3.select("#range-scale").append("svg")
        .attr("width",800)
        .attr("height",110);

    var gradient = self.svg
        .append("linearGradient")
        .attr("y1", "0")
        .attr("y2", "0")
        .attr("x1", minY)
        .attr("x2", maxY)
        .attr("id", "gradient")
        .attr("gradientUnits", "userSpaceOnUse");

    gradient
        .append("stop")
        .attr("offset", "0")
        .attr("stop-color", "#50D0D0")

    gradient
        .append("stop")
        .attr("offset", "0.5")
        .attr("stop-color", "#2A0080")

    self.svg
        .append("text")
        .attr("x",200)
        .attr("y",10)
        .text("Rank")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.rect1 = self.svg
        .append("rect")
        .attr("x", minY)
        .attr("y", 30)
        .attr("width", 400)
        .attr("height", 20)
        .attr("fill", "url(#gradient)");

    self.circle1 = self.svg.append("circle")
        .attr("cx",minY)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.circle2 = self.svg.append("circle")
        .attr("cx",440)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg1
        .append("text")
        .attr("x",200)
        .attr("y",10)
        .text("Tuition")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg1
        .append("rect")
        .attr("x", minY)
        .attr("y", 30)
        .attr("width", 400)
        .attr("height", 20)
        .attr("fill", "url(#gradient)");

    self.svg1.append("circle")
        .attr("cx",minY)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg1.append("circle")
        .attr("cx",440)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg2
        .append("text")
        .attr("x",200)
        .attr("y",10)
        .text("Income After Graudation")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg2
        .append("rect")
        .attr("x", minY)
        .attr("y", 30)
        .attr("width", 400)
        .attr("height", 20)
        .attr("fill", "url(#gradient)");

    self.svg2.append("circle")
        .attr("cx",minY)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg2.append("circle")
        .attr("cx",440)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg3
        .append("text")
        .attr("x",200)
        .attr("y",10)
        .text("SAT Scores")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg3
        .append("rect")
        .attr("x", minY)
        .attr("y", 30)
        .attr("width", 400)
        .attr("height", 20)
        .attr("fill", "url(#gradient)");

    self.svg3.append("circle")
        .attr("cx",minY)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg3.append("circle")
        .attr("cx",440)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg4
        .append("text")
        .attr("x",200)
        .attr("y",10)
        .text("ACT Scores")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg4
        .append("rect")
        .attr("x", minY)
        .attr("y", 30)
        .attr("width", 400)
        .attr("height", 20)
        .attr("fill", "url(#gradient)");

    self.svg4.append("circle")
        .attr("cx",minY)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg4.append("circle")
        .attr("cx",440)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg5
        .append("text")
        .attr("x",200)
        .attr("y",10)
        .text("Total Applicants")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg5
        .append("rect")
        .attr("x", minY)
        .attr("y", 30)
        .attr("width", 400)
        .attr("height", 20)
        .attr("fill", "url(#gradient)");

    self.svg5.append("circle")
        .attr("cx",minY)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg5.append("circle")
        .attr("cx",440)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg6
        .append("text")
        .attr("x",200)
        .attr("y",10)
        .text("Total Enrollment")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg6
        .append("rect")
        .attr("x", minY)
        .attr("y", 30)
        .attr("width", 400)
        .attr("height", 20)
        .attr("fill", "url(#gradient)");

    self.svg6.append("circle")
        .attr("cx",minY)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg6.append("circle")
        .attr("cx",440)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg7
        .append("text")
        .attr("x",200)
        .attr("y",10)
        .text("Percent Admitted Men")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg7
        .append("rect")
        .attr("x", minY)
        .attr("y", 30)
        .attr("width", 400)
        .attr("height", 20)
        .attr("fill", "url(#gradient)");

    self.svg7.append("circle")
        .attr("cx",minY)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg7.append("circle")
        .attr("cx",440)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg8
        .append("text")
        .attr("x",200)
        .attr("y",10)
        .text("Percent Admitted Women")
        .attr("font-size","15px")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg8
        .append("rect")
        .attr("x", minY)
        .attr("y", 30)
        .attr("width", 400)
        .attr("height", 20)
        .attr("fill", "url(#gradient)");

    self.svg8.append("circle")
        .attr("cx",minY)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");

    self.svg8.append("circle")
        .attr("cx",440)
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)");
    // Tuition Scale
    self.tuitionCollegeScale = d3.scaleLinear()
        .domain([80,49630])
        .range([40, 440]);

    // Tuition Scale
    self.rankCollegeScale = d3.scaleLinear()
        .domain([0,100])
        .range([40, 440]);

    self.incomeCollegeScale = d3.scaleLinear()
        .domain([0,72676])
        .range([40, 440]);

    self.SATCollegeScale = d3.scaleLinear()
        .domain([0,8795])
        .range([40, 440]);

    self.ACTCollegeScale = d3.scaleLinear()
        .domain([0,100])
        .range([40, 440]);

    self.ApplicantCollegeScale = d3.scaleLinear()
        .domain([0,72676])
        .range([40, 440]);

    self.EnrollmentCollegeScale = d3.scaleLinear()
        .domain([12,61874])
        .range([40, 440]);

    self.MenCollegeScale = d3.scaleLinear()
        .domain([0,100])
        .range([40, 440]);

    self.WomenCollegeScale = d3.scaleLinear()
        .domain([0,100])
        .range([40, 440]);
};


RangeScaleChart.prototype.chooseClass = function (rank) {
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

/**
 * Renders the HTML content for tool tip.
 *
 * @param tooltip_data information that needs to be populated in the tool tip
 * @return text HTML content for tool tip
 */
RangeScaleChart.prototype.tooltip_render = function (tooltip_data) {
    var self = this;
    console.log("tooltip");
    var text = "<ul>";
    tooltip_data.result.forEach(function(row){
        text += "<li class = " + self.chooseClass(row.rank)+ ">" + row.Institution+ "</li>"
    });
    return text;
}

/**
 * Creates tiles and tool tip for each state, legend for encoding the color scale information.
 *
 * @param electionResult election data for the year selected
 * @param colorScale global quantile scale based on the winning margin between republicans and democrats
 */
RangeScaleChart.prototype.update = function(data){
    var self = this;
    var circles = 0;

    if(data == 0) {
        console.log("data 0");
        d3.select("#range-scale").selectAll("circle").filter(function (d) {
            if(d3.select(this).attr("class") == "highlighted") {
                d3.select(this).remove();
            }
        });
        console.log(circles);
        self.Uni = [];
        self.selected = [];
        return;
    }

    for (var j=0; j<self.selected.length; j++) {
        if (self.Uni[j].match(data['institution.name'])){
            console.log("found index",j);
            self.svg.select("g").selectAll("circle").filter(function (d,i) {
                if(j == i)
                   d3.select(this).remove();
            });
            self.svg1.select("g").selectAll("circle").filter(function (d,i) {
                if(j == i)
                    d3.select(this).remove();
            });
            self.svg2.select("g").selectAll("circle").filter(function (d,i) {
                if(j == i)
                    d3.select(this).remove();
            });
            self.svg3.select("g").selectAll("circle").filter(function (d,i) {
                if(j == i)
                    d3.select(this).remove();
            });
            self.svg4.select("g").selectAll("circle").filter(function (d,i) {
                if(j == i)
                    d3.select(this).remove();
            });
            self.svg5.select("g").selectAll("circle").filter(function (d,i) {
                if(j == i)
                    d3.select(this).remove();
            });
            self.svg6.select("g").selectAll("circle").filter(function (d,i) {
                if(j == i)
                    d3.select(this).remove();
            });
            self.svg7.select("g").selectAll("circle").filter(function (d,i) {
                if(j == i)
                    d3.select(this).remove();
            });
            self.svg8.select("g").selectAll("circle").filter(function (d,i) {
                if(j == i)
                    d3.select(this).remove();
            });

            self.Uni.splice(j,1);
            self.selected.splice(j,1);
            return;
        }
    }


    //Use this tool tip element to handle any hover over the chart
    tip = d3.tip().attr('class', 'd3-tip')
        .direction('se')
        .offset(function() {
            return [0,0];
        })
        .html(function(d) {
            // console.log("Range tooltip",d);
            tooltip_data = {
                "result" :[
                    {"rank": d.rank,"Institution": d["institution.name"]}
                ]
            }
            var renderer = self.tooltip_render(tooltip_data);
            return renderer;
        });

    self.selected.push(data);
    self.Uni.push(data['institution.name']);
    console.log(self.selected);;
    // Tuition Scale
    // console.log(Math.max.apply(Math,tuitions));
    // console.log(Math.min.apply(Math,tuitions));

    self.svg.append("g");
    var circle = self.svg.select("g").selectAll("circle").data(self.selected);
    console.log(circle);

    var enter = circle.enter().append("circle")
        .attr("cx",function(d,i) {
            if(self.selected[i].rank == "NA")
                self.selected[i].rank = 0;
            return self.rankCollegeScale(self.selected[i].rank);
        })
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)")
        .classed("highlighted",true)
        .on("mouseover", tip.show)
        .on("mouseout",tip.hide);

    self.svg1.append("g");
    var circle1 = self.svg1.select("g").selectAll("circle").data(self.selected);
    console.log(circle1);

    var enter = circle1.enter().append("circle")
        .attr("cx",function(d,i) {
            if(self.selected[i].Tuition == "NA")
                self.selected[i].Tuition = 0;
            return self.tuitionCollegeScale(self.selected[i].Tuition);
        })
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)")
        .classed("highlighted",true)
        .on("mouseover", tip.show)
        .on("mouseout",tip.hide);

    self.svg2.append("g");
    var circle2 = self.svg2.select("g").selectAll("circle").data(self.selected);
    console.log(circle2);

    var enter = circle2.enter().append("circle")
        .attr("cx",function(d,i) {
            if(self.selected[i].income == "NA")
                self.selected[i].income = 0;
            return self.incomeCollegeScale(self.selected[i].income);
        })
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)")
        .classed("highlighted",true)
        .on("mouseover", tip.show)
        .on("mouseout",tip.hide);

    self.svg3.append("g");
    var circle3 = self.svg3.select("g").selectAll("circle").data(self.selected);
    console.log(circle3);

    var enter = circle3.enter().append("circle")
        .attr("cx",function(d,i) {
            if(self.selected[i].SAT_scores == "NA")
                self.selected[i].SAT_scores = 0;
            return self.SATCollegeScale(self.selected[i].SAT_scores);
        })
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)")
        .classed("highlighted",true)
        .on("mouseover", tip.show)
        .on("mouseout",tip.hide);

    self.svg4.append("g");
    var circle4 = self.svg4.select("g").selectAll("circle").data(self.selected);
    console.log(circle4);

    var enter = circle4.enter().append("circle")
        .attr("cx",function(d,i) {
            if(self.selected[i].ACT_scores == "NA")
                self.selected[i].ACT_scores = 0;
            return self.ACTCollegeScale(self.selected[i].ACT_scores);
        })
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)")
        .classed("highlighted",true)
        .on("mouseover", tip.show)
        .on("mouseout",tip.hide);

    self.svg5.append("g");
    var circle5 = self.svg5.select("g").selectAll("circle").data(self.selected);
    console.log(circle5);

    var enter = circle5.enter().append("circle")
        .attr("cx",function(d,i) {
            if(self.selected[i].Applicants_total == "NA")
                self.selected[i].Applicants_total = 0;
            return self.ApplicantCollegeScale(self.selected[i].Applicants_total);
        })
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)")
        .classed("highlighted",true)
        .on("mouseover", tip.show)
        .on("mouseout",tip.hide);

    self.svg6.append("g");
    var circle6 = self.svg6.select("g").selectAll("circle").data(self.selected);
    console.log(circle3);

    var enter = circle6.enter().append("circle")
        .attr("cx",function(d,i) {
            if(self.selected[i].year_fulltime_enrollment == "NA")
                self.selected[i].year_fulltime_enrollment = 0;
            return self.EnrollmentCollegeScale(self.selected[i].year_fulltime_enrollment);
        })
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)")
        .classed("highlighted",true)
        .on("mouseover", tip.show)
        .on("mouseout",tip.hide);

    self.svg7.append("g");
    var circle7 = self.svg7.select("g").selectAll("circle").data(self.selected);
    console.log(circle7);

    var enter = circle7.enter().append("circle")
        .attr("cx",function(d,i) {
            if(self.selected[i].Percent_admitted_men == "NA")
                self.selected[i].Percent_admitted_men = 0;
            return self.MenCollegeScale(self.selected[i].Percent_admitted_men);
        })
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)")
        .classed("highlighted",true)
        .on("mouseover", tip.show)
        .on("mouseout",tip.hide);

    self.svg8.append("g");
    var circle8 = self.svg8.select("g").selectAll("circle").data(self.selected);
    console.log(circle8);

    var enter = circle8.enter().append("circle")
        .attr("cx",function(d,i) {
            if(self.selected[i].Percent_admitted_women == "NA")
                self.selected[i].Percent_admitted_women = 0;
            return self.WomenCollegeScale(self.selected[i].Percent_admitted_women);
        })
        .attr("cy",40)
        .attr("r",10)
        .attr("fill","url(#gradient)")
        .classed("highlighted",true)
        .on("mouseover", tip.show)
        .on("mouseout",tip.hide);


    var svg = d3.select("#range-scale").selectAll("circle");
    console.log(svg);
    svg.call(tip);


    //Creates a legend element and assigns a scale that needs to be visualized
    /*self.legendSvg.append("g")
        .attr("class", "legendQuantile");

    var legendQuantile = d3.legendColor()
        .shapeWidth(120)
        .cells(10)
        .orient('horizontal')
        .scale(colorScale);*/

    // ******* TODO: PART IV *******
    //Tansform the legend element to appear in the center and make a call to this element for it to display.

    //Lay rectangles corresponding to each state according to the 'row' and 'column' information in the data.

    //Display the state abbreviation and number of electoral votes on each of these rectangles

    //Use global color scale to color code the tiles.

    //HINT: Use .tile class to style your tiles;
    // .tilestext to style the text corresponding to tiles

    //Call the tool tip on hover over the tiles to display stateName, count of electoral votes
    //then, vote percentage and number of votes won by each party.
    //HINT: Use the .republican, .democrat and .independent classes to style your elements.
};