


function LegendCompare(histoChart, rangeScaleChart, mapCompare, collegeData) {
    var self = this;

    self.histoChart = histoChart;
    self.rangeScaleChart= rangeScaleChart;
    self.mapCompare = mapCompare;
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
    self.svgHeight = 300;

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
    self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",20)
        .text("Rank")
        .attr("font","20x")
        .attr("fill","blue")
        .style("font-weight", "bold");
        //.attr("classs","electoralVoteText");

    self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",50)
        .text("Tuition")
        .attr("font","20x")
        .attr("fill","blue")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",80)
        .text("Income After Graduation")
        .attr("font","20x")
        .attr("fill","blue")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",110)
        .text("Avg SAT Scores")
        .attr("font","20x")
        .attr("fill","blue")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",140)
        .text("Avg ACT Scores")
        .attr("font","20x")
        .attr("fill","blue")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",170)
        .text("Total Applicants")
        .attr("font","20x")
        .attr("fill","blue")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",200)
        .text("Total Enrolled")
        .attr("font","20x")
        .attr("fill","blue")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",230)
        .text("Percent Admitted Men")
        .attr("font","20x")
        .attr("fill","blue")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",260)
        .text("Percent Admitted Women")
        .attr("font","20x")
        .attr("fill","blue")
        .style("font-weight", "bold");

    var bars1 = self.svg
        .append("rect")
        .classed("votesPercentage",true)
        .attr("x", 300)
        .attr("y",5)
        .attr("width",300)
        .attr("height",8)
        .attr("fill","green");

    var bars2 = self.svg
        .append("rect")
        .classed("votesPercentage",true)
        .attr("x", 300)
        .attr("y",35)
        .attr("width",300)
        .attr("height",8)
        .attr("fill","green");

    var bars3 = self.svg
        .append("rect")
        .classed("votesPercentage",true)
        .attr("x", 300)
        .attr("y",65)
        .attr("width",300)
        .attr("height",8)
        .attr("fill","green");

    var bars4 = self.svg
        .append("rect")
        .classed("votesPercentage",true)
        .attr("x", 300)
        .attr("y",95)
        .attr("width",300)
        .attr("height",8)
        .attr("fill","green");

    var bars5 = self.svg
        .append("rect")
        .classed("votesPercentage",true)
        .attr("x", 300)
        .attr("y",125)
        .attr("width",300)
        .attr("height",8)
        .attr("fill","green");

    var bars6 = self.svg
        .append("rect")
        .classed("votesPercentage",true)
        .attr("x", 300)
        .attr("y",155)
        .attr("width",300)
        .attr("height",8)
        .attr("fill","green");

    var bars7 = self.svg
        .append("rect")
        .classed("votesPercentage",true)
        .attr("x", 300)
        .attr("y",185)
        .attr("width",300)
        .attr("height",8)
        .attr("fill","green");

    var bars8 = self.svg
        .append("rect")
        .classed("votesPercentage",true)
        .attr("x", 300)
        .attr("y",215)
        .attr("width",300)
        .attr("height",8)
        .attr("fill","green");

    var bars9 = self.svg
        .append("rect")
        .classed("votesPercentage",true)
        .attr("x", 300)
        .attr("y",245)
        .attr("width",300)
        .attr("height",8)
        .attr("fill","green");
    // console.log(rects);

    // Create scale for getting data from all the brushes
    var rankScale = d3.scaleLinear()
        .range([0,30])
        .domain([300,self.svgWidth-190]);

    // Maintain the filtered data which could be sent to update
    var filtered;

    var brush1 = d3.brushX().extent([[300,2],[self.svgWidth-190,15]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select("bars1");
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        console.log(brushSelection[0],brushSelection[1]);
        console.log(array);
        var lowerRank = rankScale(brushSelection[0]);
        var higherRank = rankScale(brushSelection[1]);
        console.log(lowerRank,higherRank);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.rank > lowerRank && d.rank < higherRank)
               return d;
        });
        console.log(filtered);
        self.mapCompare.update(filtered)
    });
    self.svg.append("g").attr("class", "brush").style("fill","yellow").call(brush1);
    self.svg
        .append("text")
        .attr("dx",280)
        .attr("dy",15)
        .text(0)
        .attr("font","3x")
        .attr("fill","black");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",15)
        .text(30)
        .attr("font","3x")
        .attr("fill","black");

    var tuitionScale = d3.scaleLinear()
        .range([80,49630])
        .domain([300,self.svgWidth-190]);

    self.svg
        .append("text")
        .attr("dx",275)
        .attr("dy",45)
        .text(80)
        .attr("font","3x")
        .attr("fill","black");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",45)
        .text(49630)
        .attr("font","3x")
        .attr("fill","black");

    var brush2 = d3.brushX().extent([[300,32],[self.svgWidth-190,45]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select("bars2");
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        console.log(brushSelection[0],brushSelection[1]);
        console.log(array);
        var lowerTuition = tuitionScale(brushSelection[0]);
        var higherTuition = tuitionScale(brushSelection[1]);
        console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.Tuition > lowerTuition && d.Tuition < higherTuition)
                return d;
        });
        console.log(filtered);
        self.mapCompare.update(filtered);
    });

    self.svg.append("g").attr("class", "brush").style("fill","orange").call(brush2);

    var incomeScale = d3.scaleLinear()
        .range([0,72676])
        .domain([300,self.svgWidth-190]);

    self.svg
        .append("text")
        .attr("dx",280)
        .attr("dy",75)
        .text(0)
        .attr("font","3x")
        .attr("fill","black");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",75)
        .text(72676)
        .attr("font","3x")
        .attr("fill","black");

    var brush3 = d3.brushX().extent([[300,62],[self.svgWidth-190,75]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select("bars3");
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        console.log(brushSelection[0],brushSelection[1]);
        console.log(array);
        var lowerIncome = incomeScale(brushSelection[0]);
        var higherIncome = incomeScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.income > lowerIncome && d.Tuition < higherIncome)
                return d;
        });
        console.log(filtered);
        self.mapCompare.update(filtered);
    });

    self.svg.append("g").attr("class", "brush").style("fill","red").call(brush3);

    var SATScale = d3.scaleLinear()
        .range([0,8795])
        .domain([300,self.svgWidth-190]);

    self.svg
        .append("text")
        .attr("dx",280)
        .attr("dy",105)
        .text(0)
        .attr("font","3x")
        .attr("fill","black");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",105)
        .text(8795)
        .attr("font","3x")
        .attr("fill","black");

    var brush4 = d3.brushX().extent([[300,92],[self.svgWidth-190,105]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select("bars4");
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        console.log(brushSelection[0],brushSelection[1]);
        console.log(array);
        var lowerSAT = SATScale(brushSelection[0]);
        var higherSAT = SATScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.SAT_scores > lowerSAT && d.SAT_scores < higherSAT)
                return d;
        });
        console.log(filtered);
        self.mapCompare.update(filtered);
    });

    self.svg.append("g").attr("class", "brush").style("fill","pink").call(brush4);

    var ACTScale = d3.scaleLinear()
        .range([0,100])
        .domain([300,self.svgWidth-190]);

    self.svg
        .append("text")
        .attr("dx",280)
        .attr("dy",135)
        .text(0)
        .attr("font","3x")
        .attr("fill","black");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",135)
        .text(100)
        .attr("font","3x")
        .attr("fill","black");

    var brush5 = d3.brushX().extent([[300,122],[self.svgWidth-190,135]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select("bars5");
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        console.log(brushSelection[0],brushSelection[1]);
        console.log(array);
        var lowerACT = ACTScale(brushSelection[0]);
        var higherACT = ACTScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.ACT_scores > lowerACT && d.ACT_scores < higherACT)
                return d;
        });
        console.log(filtered);
        self.mapCompare.update(filtered);
    });

    self.svg.append("g").attr("class", "brush").style("fill","violet").call(brush5);

    var TotalApplicantsScale = d3.scaleLinear()
        .range([0,72676])
        .domain([300,self.svgWidth-190]);

    self.svg
        .append("text")
        .attr("dx",280)
        .attr("dy",165)
        .text(0)
        .attr("font","3x")
        .attr("fill","black");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",165)
        .text(72676)
        .attr("font","3x")
        .attr("fill","black");

    var brush6 = d3.brushX().extent([[300,152],[self.svgWidth-190,165]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select("bars6");
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        console.log(brushSelection[0],brushSelection[1]);
        console.log(array);
        var lowerAppliants = TotalApplicantsScale(brushSelection[0]);
        var higherApplicants = TotalApplicantsScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.Applicants_total > lowerAppliants && d.Applicants_total < higherApplicants)
                return d;
        });
        console.log(filtered);
        self.mapCompare.update(filtered);
    });

    self.svg.append("g").attr("class", "brush").style("fill","purple").call(brush6);

    var TotalEnrollementScale = d3.scaleLinear()
        .range([12,61874])
        .domain([300,self.svgWidth-190]);

    self.svg
        .append("text")
        .attr("dx",275)
        .attr("dy",195)
        .text(12)
        .attr("font","3x")
        .attr("fill","black");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",195)
        .text(61874)
        .attr("font","3x")
        .attr("fill","black");

    var brush7 = d3.brushX().extent([[300,182],[self.svgWidth-190,195]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select("bars7");
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        console.log(brushSelection[0],brushSelection[1]);
        console.log(array);
        var lowerEnrollment = TotalEnrollementScale(brushSelection[0]);
        var higherEnrollment = TotalEnrollementScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.year_fulltime_enrollment > lowerEnrollment && d.year_fulltime_enrollment < higherEnrollment)
                return d;
        });
        console.log(filtered);
        self.mapCompare.update(filtered);
    });

    self.svg.append("g").attr("class", "brush").style("fill","maroon").call(brush7);

    var TotalMenPercentScale = d3.scaleLinear()
        .range([0,100])
        .domain([300,self.svgWidth-190]);

    self.svg
        .append("text")
        .attr("dx",280)
        .attr("dy",225)
        .text(0)
        .attr("font","3x")
        .attr("fill","black");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",225)
        .text(100)
        .attr("font","3x")
        .attr("fill","black");

    var brush8 = d3.brushX().extent([[300,212],[self.svgWidth-190,225]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select("bars8");
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        console.log(brushSelection[0],brushSelection[1]);
        console.log(array);
        var lowerPercent = TotalMenPercentScale(brushSelection[0]);
        var higherPercent = TotalMenPercentScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.Percent_admitted_men > lowerPercent && d.Percent_admitted_woman < higherPercent)
                return d;
        });
        console.log(filtered);
        self.mapCompare.update(filtered);
    });

    self.svg.append("g").attr("class", "brush").style("fill","crimson").call(brush8);

    var TotalPercentWomanScale = d3.scaleLinear()
        .range([0,100])
        .domain([300,self.svgWidth-190]);

    self.svg
        .append("text")
        .attr("dx",280)
        .attr("dy",255)
        .text(0)
        .attr("font","3x")
        .attr("fill","black");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",255)
        .text(100)
        .attr("font","3x")
        .attr("fill","black");

    var brush9 = d3.brushX().extent([[300,242],[self.svgWidth-190,255]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select("bars9");
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        console.log(brushSelection[0],brushSelection[1]);
        console.log(array);
        var lowerPercent = TotalPercentWomanScale(brushSelection[0]);
        var higherPercent = TotalPercentWomanScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.Percent_admitted_women > lowerPercent && d.Percent_admitted_women < higherPercent)
                return d;
        });
        console.log(filtered);
        self.mapCompare.update(filtered);
    });

    self.svg.append("g").attr("class", "brush").style("fill","green").call(brush9);
};
