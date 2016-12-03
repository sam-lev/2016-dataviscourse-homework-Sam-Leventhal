// Maintain the filtered data which could be sent to update
var filtered;
var lowerRank, higherRank;
var rankSelected = false;

var tuitionSelected = false;
var lowerTuition, higherTuition;

var incomeSelected = false;
var lowerIncome, higherIncome;

var lowerSAT, higherSAT;
var SATSelected = false;

var ACTSelected = false;
var lowerACT, higherACT;

var applicantSelected = false;
var lowerApplicants, higherApplicants;

var enrollmentSelected = false;
var lowerEnrollment, higherEnrollment;

var lowerMenPercent, higherMenPercent;
var menSelected = false;

var lowerWomenPercent, higherWomenPercent;
var womenSelected = false;

function LegendCompare(rangeScaleChart, mapCompare, collegeData) {
    var self = this;
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


LegendCompare.prototype.redraw = function(){
    var self = this;

    filtered = self.collegeData;
    if(rankSelected) {
        filtered = filtered.filter(function (d) {
            if(d.rank > lowerRank && d.rank < higherRank)
                return d;
        });
    }
    if(tuitionSelected) {
        filtered = filtered.filter(function (d) {
            if(d.Tuition > lowerTuition && d.Tuition < higherTuition)
                return d;
        });
    }
    if(incomeSelected) {
        filtered = filtered.filter(function (d) {
            if(d.income > lowerIncome && d.income < higherIncome)
                return d;
        });
    }
    if(SATSelected) {
        filtered = filtered.filter(function (d) {
            if(d.SAT_scores > lowerSAT && d.SAT_scores < higherSAT)
                return d;
        });
    }
    if(ACTSelected) {
        filtered = filtered.filter(function (d) {
            if(d.ACT_scores > lowerACT && d.ACT_scores < higherACT)
                return d;
        });
    }
    if(applicantSelected) {
        filtered = filtered.filter(function (d) {
            if(d.Applicants_total > lowerApplicants && d.Applicants_total < higherApplicants)
                return d;
        });
    }
    if(enrollmentSelected) {
        filtered = filtered.filter(function (d) {
            if(d.year_fulltime_enrollment > lowerEnrollment && d.year_fulltime_enrollment < higherEnrollment)
                return d;
        });
    }
    if(menSelected) {
        filtered = filtered.filter(function (d) {
            if(d.Percent_admitted_men > lowerMenPercent && d.Percent_admitted_men < higherMenPercent)
                return d;
        });
    }
    if(womenSelected) {
        filtered = filtered.filter(function (d) {
            if(d.Percent_admitted_women > lowerWomenPercent && d.Percent_admitted_women < higherWomenPercent)
                return d;
        });
    }
    self.mapCompare.update(filtered);
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

    if(filtered == null) {
        filtered = self.collegeData;
        self.mapCompare.update(filtered);
    }

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

    // Create scale for getting data from all the brushes
    var rankScale = d3.scaleLinear()
        .range([0,30])
        .domain([300,self.svgWidth-190]);

    var brush1 = d3.brushX().extent([[300,2],[self.svgWidth-190,15]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        if(brushSelection == null) {
            this.clear;
            filtered = null;
            self.mapCompare.update(filtered);
            rankSelected = false;
            self.redraw();
            self.rangeScaleChart.update(0);
            return;
        }
        rankSelected = true;
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select(this);
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        // console.log(brushSelection[0],brushSelection[1]);
        // console.log(array);
        lowerRank = rankScale(brushSelection[0]);
        higherRank = rankScale(brushSelection[1]);
        // console.log(lowerRank,higherRank);
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
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",15)
        .text(100)
        .attr("font","3x")
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    var tuitionScale = d3.scaleLinear()
        .range([80,49630])
        .domain([300,self.svgWidth-190]);

    self.svg
        .append("text")
        .attr("dx",275)
        .attr("dy",45)
        .text(80)
        .attr("font","3x")
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",45)
        .text(49630)
        .attr("font","3x")
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    var brush2 = d3.brushX().extent([[300,32],[self.svgWidth-190,45]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        if(brushSelection == null) {
            this.clear;
            filtered = null;
            self.mapCompare.update(filtered);
            tuitionSelected = false;
            self.redraw();
            self.rangeScaleChart.update(0);
            return;
        }
        tuitionSelected = true;
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select(this);
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        // console.log(brushSelection[0],brushSelection[1]);
        // console.log(array);
        lowerTuition = tuitionScale(brushSelection[0]);
        higherTuition = tuitionScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.Tuition > lowerTuition && d.Tuition < higherTuition)
                return d;
        });
        // console.log(filtered);
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
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",75)
        .text(72676)
        .attr("font","3x")
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    var brush3 = d3.brushX().extent([[300,62],[self.svgWidth-190,75]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        if(brushSelection == null) {
            this.clear;
            filtered = null;
            self.mapCompare.update(filtered);
            incomeSelected = false;
            self.redraw();
            self.rangeScaleChart.update(0);
            return;
        }
        incomeSelected = true;
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select(this);
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        // console.log(brushSelection[0],brushSelection[1]);
        // console.log(array);
        lowerIncome = incomeScale(brushSelection[0]);
        higherIncome = incomeScale(brushSelection[1]);
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
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",105)
        .text(8795)
        .attr("font","3x")
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");


    var brush4 = d3.brushX().extent([[300,92],[self.svgWidth-190,105]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        if(brushSelection == null) {
            this.clear;
            filtered = null;
            self.mapCompare.update(filtered);
            SATSelected = false;
            self.redraw();
            self.rangeScaleChart.update(0);
            return;
        }
        SATSelected = true;
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select(this);
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        // console.log(brushSelection[0],brushSelection[1]);
        // console.log(array);
        lowerSAT = SATScale(brushSelection[0]);
        higherSAT = SATScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.SAT_scores > lowerSAT && d.SAT_scores < higherSAT)
                return d;
        });
        // console.log(filtered);
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
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",135)
        .text(100)
        .attr("font","3x")
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    var brush5 = d3.brushX().extent([[300,122],[self.svgWidth-190,135]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        if(brushSelection == null) {
            this.clear;
            filtered = null;
            self.mapCompare.update(filtered);
            ACTSelected = false;
            self.redraw();
            self.rangeScaleChart.update(0);
            return;
        }
        ACTSelected = true;
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select(this);
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        // console.log(brushSelection[0],brushSelection[1]);
        // console.log(array);
        lowerACT = ACTScale(brushSelection[0]);
        higherACT = ACTScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.ACT_scores > lowerACT && d.ACT_scores < higherACT)
                return d;
        });
        // console.log(filtered);
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
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",165)
        .text(72676)
        .attr("font","3x")
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    var brush6 = d3.brushX().extent([[300,152],[self.svgWidth-190,165]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        if(brushSelection == null) {
            this.clear;
            filtered = null;
            self.mapCompare.update(filtered);
            applicantSelected = false;
            self.redraw();
            self.rangeScaleChart.update(0);
            return;
        }
        applicantSelected = true
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select(this);
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        // console.log(brushSelection[0],brushSelection[1]);
        // console.log(array);
        lowerApplicants = TotalApplicantsScale(brushSelection[0]);
        higherApplicants = TotalApplicantsScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.Applicants_total > lowerApplicants && d.Applicants_total < higherApplicants)
                return d;
        });
        // console.log(filtered);
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
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",195)
        .text(61874)
        .attr("font","3x")
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    var brush7 = d3.brushX().extent([[300,182],[self.svgWidth-190,195]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        if(brushSelection == null) {
            this.clear;
            filtered = null;
            self.mapCompare.update(filtered);
            enrollmentSelected = false;
            self.redraw();
            self.rangeScaleChart.update(0);
            return;
        }
        enrollmentSelected = true;
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select(this);
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        // console.log(brushSelection[0],brushSelection[1]);
        // console.log(array);
        lowerEnrollment = TotalEnrollementScale(brushSelection[0]);
        higherEnrollment = TotalEnrollementScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.year_fulltime_enrollment > lowerEnrollment && d.year_fulltime_enrollment < higherEnrollment)
                return d;
        });
        // console.log(filtered);
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
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",225)
        .text(100)
        .attr("font","3x")
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    var brush8 = d3.brushX().extent([[300,212],[self.svgWidth-190,225]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        if(brushSelection == null) {
            this.clear;
            filtered = null;
            self.mapCompare.update(filtered);
            menSelected = false;
            self.redraw();
            self.rangeScaleChart.update(0);
            return;
        }
        menSelected = true;
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select(this);
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        // console.log(brushSelection[0],brushSelection[1]);
        // console.log(array);
        lowerMenPercent = TotalMenPercentScale(brushSelection[0]);
        higherMenPercent = TotalMenPercentScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.Percent_admitted_men > lowerPercent && d.Percent_admitted_woman < higherPercent)
                return d;
        });
        // console.log(filtered);
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
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",self.svgWidth-180)
        .attr("dy",255)
        .text(100)
        .attr("font","3x")
        .attr("fill","brown")
        .attr("font","sans-serif")
        .style("font-weight", "bold");

    var brush9 = d3.brushX().extent([[300,242],[self.svgWidth-190,255]]).on("end", function() {
        var brushSelection = d3.event.selection;
        console.log(brushSelection);
        if(brushSelection == null) {
            this.clear;
            filtered = null;
            self.mapCompare.update(filtered);
            womenSelected = false;
            self.redraw();
            self.rangeScaleChart.update(0);
            return;
        }
        womenSelected = true;
        // console.log(brushSelection[0],brushSelection[1]);
        var rects = d3.select(this);
        var array = [];

        rects.each(function(d,i){
            if (brushSelection[1] > d3.select(this).attr("x") && brushSelection[0] < d3.select(this).attr("x")) {
                array.push(d3.select(this).data());
            }
        })
        array.pop();
        // console.log(brushSelection[0],brushSelection[1]);
        // console.log(array);
        lowerWomenPercent = TotalPercentWomanScale(brushSelection[0]);
        higherWomenPercent = TotalPercentWomanScale(brushSelection[1]);
        // console.log(lowerTuition,higherTuition);
        if(filtered == null)
            filtered = self.collegeData;
        filtered = filtered.filter(function (d) {
            if(d.Percent_admitted_women > lowerPercent && d.Percent_admitted_women < higherPercent)
                return d;
        });
        // console.log(filtered);
        self.mapCompare.update(filtered);
    });

    self.svg.append("g").attr("class", "brush").style("fill","green").call(brush9);
};
