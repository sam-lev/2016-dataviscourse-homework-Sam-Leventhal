var college1, college2, college3, college4, college5, college6, college7, college8, college9, college10;
var college_1, college_2, college_3, college_4, college_5, college_6, college_7, college_8, college_9, college_10;
var colleges = [];
var count = 0;
var rankScale, incomeScale, tuitionScale, SATScale, ACTScale, TotalApplicantsScale, TotalEnrollmentScale, TotalMenPercentScale, TotalWomenPercentScale;
var ranks = [7, 9,6,9,40,29,30,21,23,24];
var tuitions = [33000,26240,31300,28950,13142,13555,16992,13149,13895,6766];
var incomes = [5723,11714,3033,4915,46813,43048,47552,56515,49820,51163];
var SAT = ["NA",646,74,132,2045,779,5916,4848,4876,3879];
var ACT = ["NA",43,75,0,83,92,14,41,45,42];
var applicants = [5723,11714,3033,4915,46813,43048,47552,56515,49820,51163 ];
var enrolled = [1707,6328,522,924,44504,54328,45854,29232,32172,27516];
var men = [89,70,73,54,30,44,52,40,41,29];
var women = [91,70,70,63,37,45,56,44,48,31];

function HistoChart() {
    var self = this;
    self.init();
};


/**
 * Initializes the svg elements required for this chart
 */
HistoChart.prototype.init = function(){

    var self = this;
    /*
     *Set svg parameters in terms of size ect..
     *
     */
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    var divyearChart = d3.select("#school").classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divyearChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 800;

    //creates svg element within the div
    self.svg = divyearChart.append("svg")
        .attr("width",self.svgWidth-325)
        .attr("height",self.svgHeight);

    var ranks = d3.select("#ranks").classed("fullView",true);
    self.ranksSvg = ranks.append("svg")
        .attr("width",250)
        .attr("heigth",400)
        .attr("transform","translate(40,60)");

    self.svg
        .append("text")
        .attr("dx",450)
        .attr("dy",40)
        .text("Rank")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",700)
        .attr("dy",40)
        .text("Tuition")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",950)
        .attr("dy",40)
        .text("Income After Graduation")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",1200)
        .attr("dy",40)
        .text("Avg SAT Scores")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",1450)
        .attr("dy",40)
        .text("Avg ACT Scores")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",450)
        .attr("dy",400)
        .text("Total Applicants")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",700)
        .attr("dy",400)
        .text("Total Enrolled")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",950)
        .attr("dy",400)
        .text("% Admitted Men")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    self.svg
        .append("text")
        .attr("dx",1200)
        .attr("dy",400)
        .text("% Admitted Women")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    college1 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",75)
        .text("New England College")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college1);
    college_1 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",430)
        .text("New England College")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college_1);
    college2 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",105)
        .text("Campbell University")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college2);
    college_2 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",460)
        .text("Campbell University")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college_2);
    college3 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",135)
        .text("The King's college")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college3);
    college_3 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",490)
        .text("The King's college")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college_3);
    college4 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",165)
        .text("Newbury College")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college4);
    college_4 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",520)
        .text("Newbury College")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college_4);
    college5 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",195)
        .text("University of Michigan-Ann Arbor")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college5);
    college_5 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",550)
        .text("University of Michigan-Ann Arbor")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college_5);
    college6 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",225)
        .text("University of Minnesota-Twin Cities")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college6);
    college_6 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",580)
        .text("University of Minnesota-Twin Cities")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college_6);
    college7 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",255)
        .text("Pennsylvania State University-Main Campus")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college7);
    college_7 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",610)
        .text("Pennsylvania State University-Main Campus")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college_7);
    college8 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",285)
        .text("University of California-Irvine")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college8);
    college_8 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",640)
        .text("University of California-Irvine")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college_8);
    college9 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",315)
        .text("University of California-Davis")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college9);
    college_9 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",670)
        .text("University of California-Davis")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college_9);
    college10 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",345)
        .text("University of California-San Diego")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college10);
    college_10 = self.svg
        .append("text")
        .attr("dx",0)
        .attr("dy",700)
        .text("University of California-San Diego")
        .attr("font","20x")
        .attr("fill","black");
    colleges.push(college_10);

    rankScale = d3.scaleLinear()
        .range([0,200])
        .domain([0,100]);

    tuitionScale = d3.scaleLinear()
        .range([0,200])
        .domain([80,49630]);

    incomeScale = d3.scaleLinear()
        .range([0,72676])
        .domain([1000,1200]);

    SATScale = d3.scaleLinear()
        .range([0,8795])
        .domain([1250,1450]);

    ACTScale = d3.scaleLinear()
        .range([0,100])
        .domain([1500,1700]);

    TotalApplicantsScale = d3.scaleLinear()
        .range([0,72676])
        .domain([450,650]);

    TotalEnrollementScale = d3.scaleLinear()
        .range([12,61874])
        .domain([700,950]);

    TotalMenPercentScale = d3.scaleLinear()
        .range([0,100])
        .domain([1000,1200]);

    TotalWomenPercentScale = d3.scaleLinear()
        .range([0,100])
        .domain([1250,1450]);

    var bars = self.ranksSvg.selectAll("g").data(ranks)
        .enter().append("g");

    var RBars = bars
        .append("rect")
        .attr("x", 450)
        .attr("y", function (d,i) {
            return i*30+60;
        })
        .attr("height",27)
        .attr("width", function (d) {
            return rankScale(d);
        })
        .attr("fill","yellow")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    bars.append("text")
        .attr("x",function (d) {
            return 450+rankScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+80;
        })
        .text(function (d) {
            return d;
        });

    var tuitionBars = self.svg.append("g").data(tuitions);

    var Tbars = tuitionBars
        .append("rect")
        .attr("x", 700)
        .attr("y", function (d,i) {
            return i*30+60;
        })
        .attr("height",27)
        .attr("width", function (d) {
            return tuitionScale(d);
        })
        .attr("fill","orange")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    console.log(Tbars);

    bars = bars.merge(tuitionBars);

    console.log(bars);



};

/**
 * Creates tiles and tool tip for each state, legend for encoding the color scale information.
 *
 * @param electionResult election data for the year selected
 * @param colorScale global quantile scale based on the winning margin between republicans and democrats
 */
HistoChart.prototype.update = function(data){
    var self = this;
    console.log(data);

};