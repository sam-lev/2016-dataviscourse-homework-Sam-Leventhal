/**
 * Constructor for the RangeScaleChart
 */
function RangeScaleChart(collegeData){
    var self = this;
    self.collegeData = collegeData;
    self.init();
};


/**

 * Initializes the svg elements required for this chart
 */
RangeScaleChart.prototype.init = function(){

    var self = this;
    self.collegeSet = self.collegeData;
    self.statistic = "Tuition";

    /*
     *Set svg parameters in terms of size ect..
     *
     */
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    var scaleChart = d3.select("#range-scale").classed("fullView", true);

    //attribute list
    self.attributeNames = ["Rank", "Tuition", "Income After Graduation", "Avg SAT Scores", "Avg ACT Scores","Total Applications", "Total Enrolled", "Percent Admitted Men", "Percent Admitted Women"];



    //Gets access to the div element created for this chart from HTML
    self.svgBounds = scaleChart.node().getBoundingClientRect();
    self.svgWidth = 400;
    self.svgHeight = 450;

    //creates svg element within the div
    self.svg = scaleChart.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)
        .attr("transform", "translate(" + self.margin.left + ","+30+")");

    console.log(self.collegeData);

    // Tuition Scale
    self.tuitionCollegeScale = d3.scaleLinear()
        .domain([d3.min(self.collegeData, function(d){
            console.log(d)
            return parseInt(d.Tuition);
        }), d3.max(self.collegeData, function(d){
            return parseInt(d.Tuition)})])
        .range([0, 285]);

    self.tuitionColorScale = d3.scaleLinear()
        .range(["#50D0D0", "#2A0080"])
        .domain([d3.min(self.collegeData, function(d){
            return parseInt(d.Tuition);
        }), d3.max(self.collegeData, function(d){
            return parseInt(d.Tuition)})]);

    /*
     *
     *   Abstract linear scaling function which uses a local variable for both the dataset
     *   and attribute with which to scale. This allows us to use one lineaer scaling
     *   function for all attributes over both cases of when we are (a) considering only
     *   the maximum and minimum attribute values for the colleges selected and (b) when
     *   we are considering all colleges nationally.
     *
     */
    self.collegeAttributeScale = d3.scaleLinear()
        .range([0,285])
        .domain([d3.min(self.collegeSet, function(d){return parseInt(d[self.statistic])}),
            d3.max(self.collegeSet, function(d){return parseInt(d[self.statistic])})]);

    /*
     *
     * Set svg parameters for scale rectangles
     *
     *
     */
    for(var i = 0; i < self.attributeNames.length; i++) {
        var g = self.svg.append("g")
            .attr("y", i*40)
            .attr("x", 0)//(2%i)+20)
            .attr("transform", "translate(" +0+ ","+i*50+")")
            .classed(self.attributeNames[i], true);
        g.append("rect")
            .attr("height", 20)
            .attr("width", 40)
            .attr("fill","lightblue");

    }



    for(j=0; j< self.attributeNames.length; j++) {

        var range = self.svg.selectAll("g").data(self.collegeData);

        range.exit().remove();

        var attributeName = self.attributeNames[j];
        var collegeName;
        var outerCirc = range.enter().append("circle");
         outerCirc
         .attr("cx", function (d,i) {

         collegeName = self.collegeData[i]["institution.name"]
         if (self.tuitionCollegeScale(parseInt(d.Tuition)) != NaN) {
         return self.tuitionCollegeScale(parseFloat(d.Tuition))
         } else {
            return 0;
          }
         })
         .attr("cy", 50 * j)
         .attr("r", 12)
         .attr("fill", "#D14F4F")
         .attr("fill-opacity", .6)
         .classed(collegeName, true)
         .classed(attributeName, true)
         .merge(range);

        var collegeName;

        var innerCirc = range.enter().append("circle");
        innerCirc
            .attr("cx", function (d,i) {

                collegeName = self.collegeData[i]["institution.name"]
                if (self.tuitionCollegeScale(parseInt(d.Tuition)) != NaN) {
                    return self.tuitionCollegeScale(parseFloat(d.Tuition))
                } else {
                    return 0;
                }
            })
            .attr("cy", 50*j)//function(d,i){ return i+20+15})
            .attr("r", 10)

            .attr("fill", function (d) {
                return self.tuitionColorScale(parseInt(d.Tuition))
            })
            .classed(attributeName, true)
            .classed(collegeName, true)
            .classed("collegeCircle",true)
            .style("fill-opacity", 0.6)
            .merge(range);
    }
};

/**
 * Renders the HTML content for tool tip.
 *
 * @param tooltip_data information that needs to be populated in the tool tip
 * @return text HTML content for tool tip
 */
RangeScaleChart.prototype.tooltip_render = function (tooltip_data) {
    var self = this;
    var text = "<h2 class ="  + self.chooseClass(tooltip_data.winner) + " >" + tooltip_data.state + "</h2>";
    text +=  "Electoral Votes: " + tooltip_data.electoralVotes;
    text += "<ul>";
    tooltip_data.result.forEach(function(row){
        text += "<li class = " + self.chooseClass(row.party)+ ">" + row.nominee+":\t\t"+row.votecount+"("+row.percentage+"%)" + "</li>"
    });
    text += "</ul>";
    return text;
}

/**
 * Creates tiles and tool tip for each state, legend for encoding the color scale information.
 *
 * @param collegeData attributes for all colleges
 * @param collegeData global of colleges which have been selected by user
 */
RangeScaleChart.prototype.update = function(collegeData, selectedColleges){
    var self = this;

    console.log("collegeData", collegeData)

    self.collegeSet = collegeData;
    self.statistic = "Tuition";


    // Tuition Scale
    self.tuitionCollegeScale = d3.scaleLinear()
        .domain([d3.min(collegeData, function(d){
            return parseInt(d.Tuition);
        }), d3.max(collegeData, function(d){
            return parseInt(d.Tuition)})])
        .range([0, 285]);

    self.tuitionColorScale = d3.scaleLinear()
        .range(["#50D0D0", "#2A0080"])
        .domain([d3.min(collegeData, function(d){
            return parseInt(d.Tuition);
        }), d3.max(collegeData, function(d){
            return parseInt(d.Tuition)})]);

    self.tuitionColorRange = d3.scaleLinear()
        .domain([d3.min(collegeData, function(d){
            return parseInt(d.Tuition);
        }), 1, d3.max(collegeData, function(d){
            return parseInt(d.Tuition)})])
        .range(['#cb181d', '#034e7b']);


    self.rankCollegeScale = d3.scaleLinear()
        .range([0, 285])
        .domain([d3.min(collegeData, function(d){
            return parseInt(d.rank)
        }),
            d3.max( collegeData, function(d){
            return parseInt(d.rank);
        })]);

    self.menCollegeScale = d3.scaleLinear()
        .range([0, 285])
        .domain([d3.min(collegeData, function(d){
            return parseInt(d.Percent_admitted_men);
        }), d3.max(collegeData, function(d) {
            return parseInt(d.Percent_admitted_men);
        })]);

    self.womenCollegeScale = d3.scaleLinear()
        .range([0, 285])
        .domain([d3.min(collegeData, function(d){ return parseInt(d.Percent_admitted_women)})
            ,d3.max(collegeData, function(d) { return parseInt(d.Percent_admitted_women)})]);

    self.SATCollegeScale = d3.scaleLinear()
        .range([0, 285])
        .domain([d3.min(collegeData, function(d){return parseInt(d.SAT_scores)}),
            d3.max(collegeData, function(d){ return parseInt(d.SAT_scores)})]);

    self.ACTCollegeScale = d3.scaleLinear()
        .range([0, 285])
        .domain([d3.min(collegeData, function(d){return parseInt(d.ACT_scores)}),
        d3.max(collegeData, function(d){ return parseInt(d.ACT_scores)})]);

    // Income after Graduation
    self.incomeCollegeScale = d3.scaleLinear()
        .domain([d3.min(collegeData, function(d){
            return parseInt(d.income);
        }), d3.max(collegeData, function(d){
            return parseInt(d.income)})])
        .range([0, 285]);

    self.incomeColorScale = d3.scaleLinear()
        .range(["#50D0D0", "#2A0080"])
        .domain([d3.min(collegeData, function(d){
            return parseInt(d.income)
        }), d3.max(collegeData, function(d){
            return parseInt(d.income)})]);


    self.applicantsCollegeScale = d3.scaleLinear()
        .range([0, 285])
        .domain([d3.min(collegeData, function(d){return parseInt(d.Applicants_total)}),
            d3.max(collegeData, function(d){return parseInt(d.Applicants_total)})]);


    self.enrolledCollegeScale = d3.scaleLinear()
        .range([0, 285])
        .domain([d3.min(collegeData, function(d){return parseInt(d.year_fulltime_enrollment)}),
            d3.max(collegeData, function(d){return parseInt(d.year_fulltime_enrollment)})]);

    /*
    *
    *   Abstract linear scaling function which uses a local variable for both the dataset
    *   and attribute with which to scale. This allows us to use one lineaer scaling
    *   function for all attributes over both cases of when we are (a) considering only
    *   the maximum and minimum attribute values for the colleges selected and (b) when
    *   we are considering all colleges nationally.
    *
     */

    self.collegeAttributeScale = d3.scaleLinear()
        .range([0,285])
        .domain([d3.min(self.collegeSet, function(d){return parseInt(d[self.statistic])}),
            d3.max(self.collegeSet, function(d){return parseInt(d[self.statistic])})]);

    /*
    *
    *
       Begin updating attribute scale bars to (a) show each selected college's place with respect to
       the other selected colleges, i.e. in a range where min( value of attribute) is the lower bound
       and max( value of attribute) is the upper bound and (b) where the colleges are places with respect
       to the national maximum and minimum values.



    /*
     * National Scales:
     *
     *
     * Draw a circle for each  selected circle for each attribute and with
     * respect to the min and max of that value nationally each circle
     * classed by unit id so all scales can be updated at once
    */

//List of national linear scaling functions


















    /*
 *
 *     Iterate for each college that has been selected in parameter selectedColleges
 *     and for each college iterate over each attribute and project a circle onto it's
 *     corresponding attribute scale.
 *
  */

    // List of all scale functions
    self.scales = [self.rankCollegeScale, self.tuitionColorScale, self.incomeCollegeScale, self.SATCollegeScale,
        self.ACTCollegeScale,self.applicantsCollegeScale,self.enrolledCollegeScale, self.menCollegeScale,
        self.womenCollegeScale];

    // List of all keys college dictionaries
    self.keys = ["rank", "Tuition", "income", "SAT_scores","ACT_scores", "year_fulltime_enrollment",
        "Percent_admitted_men", "Percent_admitted_women"];

    console.log("selected colleges", selectedColleges);

    console.log("abstract", self.collegeAttributeScale(parseFloat(collegeData[0][self.keys[1]])))
  /*
    for(j = 0; j < self.keys.length; j++){
            var colleges = self.svg.selectAll("g").data(selectedColleges);
            self.collegeSet = selectedColleges;

            colleges.exit().remove();

            var outerCircle = colleges.enter().append("circle");
            outerCircle
                .attr("cx", function (d) {
                    //if (self.tuitionCollegeScale(parseInt(d.Tuition)) != NaN) { //how to get rid of NaN
                    // return ????????
                    return self.collegeAttributeScale(parseFloat(d[self.keys[j]]))
                    //} else {
                    //   return 0;
                    // }
                })
                .attr("cy", 50 * j)
                .attr("r", 12)
                .attr("fill", "#D14F4F")
                .attr("fill-opacity", .6)
                .classed(function (d) {
                    return self.attributeNames[j];
                }, true)
                .classed(function (d) {
                    return d.institution.name
                }, true)
                .merge(range);
    }

*/
};
