var colleges = ["New England College", "Campbell University", "The King's college", "Newbury College", "University of Michigan-Ann Arbor", "University of Minnesota-Twin Cities",
    "Pennsylvania State University-Main Campus", "University of California-Irvine", "University of California-Davis", "University of California-San Diego"];
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
var selection = 0;
var chosen;
var random = [], tuition = [],income = [], sat = [], act = [], applicant = [], enroll = [], menpercent = [], womenpercent = [], school = [];

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
    //Gets access to the div element created for this chart from HTML
    // self.svgBounds = divyearChart.node().getBoundingClientRect();
    // self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 800;

    self.ranksSvg = d3.select("#histo-chart").select("#ranks").append("svg")
        .attr("width",300)
        .attr("height",350);

    self.tuitionSvg = d3.select("#histo-chart").select("#tuitions").append("svg")
        .attr("width",300)
        .attr("height",350);

    self.ranksSvg
        .append("text")
        .attr("dx",0)
        .attr("dy",30)
        .text("Rank")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    var barRanks = self.ranksSvg.selectAll("g").data(ranks)
        .enter().append("g");

    rankScale = d3.scaleLinear()
        .range([0,200])
        .domain([0,100]);

    var rect = barRanks
        .append("rect")
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d) {
            return rankScale(d);
        })
        .attr("fill","yellow")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    var text = barRanks.append("text")
        .attr("x",function (d) {
            return rankScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d) {
            return d;
        });

    self.tuitionSvg
        .append("text")
        .attr("dx",0)
        .attr("dy",30)
        .text("Tuition")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    var tuitionBars = self.tuitionSvg.selectAll("g").data(tuitions)
        .enter().append("g");

    tuitionScale = d3.scaleLinear()
        .range([0,200])
        .domain([80,49630]);

    rect = tuitionBars.append("rect")
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d) {
            return tuitionScale(d);
        })
        .attr("fill","orange")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    text = tuitionBars.append("text")
        .attr("x",function (d) {
            return tuitionScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d) {
            return d;
        });

    self.incomeSvg = d3.select("#histo-chart").select("#income").append("svg")
        .attr("width",300)
        .attr("height",350);

    self.incomeSvg
        .append("text")
        .attr("dx",0)
        .attr("dy",30)
        .text("Income After Graduation")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

     incomeScale = d3.scaleLinear()
        .range([0,200])
        .domain([0,72676]);

    var incomeBars = self.incomeSvg.selectAll("g").data(incomes)
        .enter().append("g");

    rect = incomeBars.append("rect")
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d) {
            return incomeScale(d);
        })
        .attr("fill","red")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    text = incomeBars.append("text")
        .attr("x",function (d) {
            return incomeScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d) {
            return d;
        });


    self.SATSvg = d3.select("#histo-chart").select("#SAT").append("svg")
        .attr("width",300)
        .attr("height",350);

    self.SATSvg
        .append("text")
        .attr("dx",0)
        .attr("dy",30)
        .text("Avg SAT Scores")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    SATScale = d3.scaleLinear()
        .range([0,200])
        .domain([0,8795]);

    var SATBars = self.SATSvg.selectAll("g").data(SAT)
        .enter().append("g");

    rect = SATBars.append("rect")
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d) {
            if(d == "NA")
                d = 0;
            return SATScale(d);
        })
        .attr("fill","pink")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    text = SATBars.append("text")
        .attr("x",function (d) {
            if(d== "NA")
                d = 0;
            return SATScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d) {
            if(d==0)
                return "NA"
            return d;
        });

    self.ACTSvg = d3.select("#histo-chart").select("#ACT").append("svg")
        .attr("width",300)
        .attr("height",350);

    self.ACTSvg
        .append("text")
        .attr("dx",0)
        .attr("dy",30)
        .text("Avg ACT Scores")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    ACTScale = d3.scaleLinear()
        .range([0,200])
        .domain([0,100]);

    var ACTBars = self.ACTSvg.selectAll("g").data(ACT)
        .enter().append("g");

    rect = ACTBars.append("rect")
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d) {
            if(d == "NA")
                d = 0;
            return ACTScale(d);
        })
        .attr("fill","violet")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    text = ACTBars.append("text")
        .attr("x",function (d) {
            if(d== "NA")
                d = 0;
            return ACTScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d) {
            if(d==0)
                return "NA";
            return d;
        });

    self.AppSvg = d3.select("#histo-chart").select("#Applicants").append("svg")
        .attr("width",300)
        .attr("height",350);

    self.AppSvg
        .append("text")
        .attr("dx",0)
        .attr("dy",30)
        .text("Total Applicants")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    TotalApplicantsScale = d3.scaleLinear()
        .range([0,200])
        .domain([0,72676]);

    var AppBars = self.AppSvg.selectAll("g").data(applicants)
        .enter().append("g");

    rect = AppBars.append("rect")
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d) {
            if(d == "NA")
                d = 0;
            return TotalApplicantsScale(d);
        })
        .attr("fill","purple")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    text = AppBars.append("text")
        .attr("x",function (d) {
            if(d== "NA")
                d = 0;
            return TotalApplicantsScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d) {
            if(d==0)
                return "NA";
            return d;
        });

    self.schoolSvg = d3.select("#histo-chart").select("#School").append("svg")
        .attr("width",300)
        .attr("height",350);

    self.schoolSvg
        .append("text")
        .attr("dx",0)
        .attr("dy",30)
        .text("Univerity Selection Order")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    var collegeBars = self.schoolSvg.selectAll("g").data(colleges)
        .enter().append("g");

    collegeBars
        .append("text")
        .attr("x", 0)
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            return (i+1)+ " - " + d;
        })
        .attr("font-size","13px")
        .attr("fill","steelblue")
        .style("font-weight", "bold")
        .on("click",function (d,i) {
            console.log("clicked");
            d3.selectAll("rect").classed("barGroup",false);
            d3.select("#School").selectAll("text").classed("independent",false);
            var panel = i;

            var school = d3.selectAll("#School > svg > g > text");
            school.filter(function (d,i) {
                if(panel == i) {
                    d3.select(this).classed("independent",true);
                }
            });

            var women = d3.selectAll("#Women > svg > g > rect");
            women.filter(function (d,i) {
                if(panel == i) {
                    console.log("panel matched",i);
                    console.log(d3.select(this));
                    console.log(this);
                    d3.select(this).classed("barGroup",true);
                }
            });

            var men = d3.selectAll("#Men > svg > g > rect");
            men.filter(function (d,i) {
                if(panel == i) {
                    console.log("panel matched",i);
                    console.log(d3.select(this));
                    console.log(this);
                    d3.select(this).classed("barGroup",true);
                }
            });

            var rank = d3.selectAll("#ranks > svg > g > rect");
            rank.filter(function (d,i) {
                if(panel == i) {
                    console.log("panel matched",i);
                    console.log(d3.select(this));
                    console.log(this);
                    d3.select(this).classed("barGroup",true);
                }
            });

            var rank = d3.selectAll("#tuitions > svg > g > rect");
            rank.filter(function (d,i) {
                if(panel == i) {
                    console.log("panel matched",i);
                    console.log(d3.select(this));
                    console.log(this);
                    d3.select(this).classed("barGroup",true);
                }
            });

            var rank = d3.selectAll("#income > svg > g > rect");
            rank.filter(function (d,i) {
                if(panel == i) {
                    console.log("panel matched",i);
                    console.log(d3.select(this));
                    console.log(this);
                    d3.select(this).classed("barGroup",true);
                }
            });

            var rank = d3.selectAll("#SAT > svg > g > rect");
            rank.filter(function (d,i) {
                if(panel == i) {
                    console.log("panel matched",i);
                    console.log(d3.select(this));
                    console.log(this);
                    d3.select(this).classed("barGroup",true);
                }
            });

            var rank = d3.selectAll("#ACT > svg > g > rect");
            rank.filter(function (d,i) {
                if(panel == i) {
                    console.log("panel matched",i);
                    console.log(d3.select(this));
                    console.log(this);
                    d3.select(this).classed("barGroup",true);
                }
            });

            var rank = d3.selectAll("#Applicants > svg > g > rect");
            rank.filter(function (d,i) {
                if(panel == i) {
                    console.log("panel matched",i);
                    console.log(d3.select(this));
                    console.log(this);
                    d3.select(this).classed("barGroup",true);
                }
            });

            var rank = d3.selectAll("#Enrolled > svg > g > rect");
            rank.filter(function (d,i) {
                if(panel == i) {
                    console.log("panel matched",i);
                    console.log(d3.select(this));
                    console.log(this);
                    d3.select(this).classed("barGroup",true);
                }
            });
        });

    // console.log(collegeBars);

    self.EnrollSvg = d3.select("#histo-chart").select("#Enrolled").append("svg")
        .attr("width",300)
        .attr("height",350);

    self.EnrollSvg
        .append("text")
        .attr("dx",0)
        .attr("dy",30)
        .text("Total Enrolled")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    TotalEnrollmentScale = d3.scaleLinear()
        .range([0,200])
        .domain([0,61874]);

    var EnrollBars = self.EnrollSvg.selectAll("g").data(enrolled)
        .enter().append("g");

    rect = EnrollBars.append("rect")
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d) {
            if(d == "NA")
                d = 0;
            return TotalEnrollmentScale(d);
        })
        .attr("fill","maroon")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    text = EnrollBars.append("text")
        .attr("x",function (d) {
            if(d== "NA")
                d = 0;
            return TotalEnrollmentScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d) {
            if(d==0)
                return "NA";
            return d;
        });

    self.MenSvg = d3.select("#histo-chart").select("#Men").append("svg")
        .attr("width",300)
        .attr("height",350);

    self.MenSvg
        .append("text")
        .attr("dx",0)
        .attr("dy",30)
        .text("Percent Admitted Men")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    TotalMenPercentScale = d3.scaleLinear()
        .range([0,200])
        .domain([0,100]);

    var MenPercentBars = self.MenSvg.selectAll("g").data(men)
        .enter().append("g");

    rect = MenPercentBars.append("rect")
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d) {
            if(d == "NA")
                d = 0;
            return TotalMenPercentScale(d);
        })
        .attr("fill","crimson")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    text = MenPercentBars.append("text")
        .attr("x",function (d) {
            if(d== "NA")
                d = 0;
            return TotalMenPercentScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d) {
            if(d==0)
                return "NA";
            return d;
        });

    self.WomenSvg = d3.select("#histo-chart").select("#Women").append("svg")
        .attr("width",300)
        .attr("height",350);

    self.WomenSvg
        .append("text")
        .attr("dx",0)
        .attr("dy",30)
        .text("Percent Admitted Women")
        .attr("font","20x")
        .attr("fill","black")
        .style("font-weight", "bold");

    TotalWomenPercentScale = d3.scaleLinear()
        .range([0,200])
        .domain([0,100]);

    WomenBars = self.WomenSvg.selectAll("g").data(women)
        .enter().append("g");

    rect = WomenBars.append("rect")
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d) {
            if(d == "NA")
                d = 0;
            return TotalWomenPercentScale(d);
        })
        .attr("fill","green")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    text = WomenBars.append("text")
        .attr("x",function (d) {
            if(d== "NA")
                d = 0;
            return TotalWomenPercentScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d) {
            if(d==0)
                return "NA";
            return d;
        });

};

/**
 * Creates tiles and tool tip for each state, legend for encoding the color scale information.
 *
 * @param electionResult election data for the year selected
 * @param colorScale global quantile scale based on the winning margin between republicans and democrats
 */
HistoChart.prototype.update = function(data,selection){
    var self = this;
    console.log(data);
    // console.log(selection);

    console.log(selection);
    chosen = d3.selectAll("#ranks > svg > g > rect");
    chosen
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d,i) {
            if(selection == i) {
                 random[selection] = data.rank;
            }
            if(i < random.length)
                d = random[i];
            if(d == "NA")
                d = 0;
            return rankScale(d);
        })
        .attr("fill","yellow")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    chosen = d3.selectAll("#ranks > svg > g > text");
    chosen
        .attr("x",function (d,i) {
            if(selection == i) {
                random[selection] = data.rank;
            }
            if(i < random.length)
                d = random[i];
            if(d== "NA")
                d = 0;
            return rankScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            if(selection == i) {
                random[selection] = data.rank;
            }
            if(i < random.length)
                d = random[i];
            if(d==0)
                return "NA";
            return d;
        });

    chosen = d3.selectAll("#tuitions > svg > g > rect");
    // console.log(chosen);
    chosen
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d,i) {
            if(selection == i) {
                tuition[selection] = data.Tuition;
            }
            if(i < tuition.length)
                d = tuition[i];
            if(d == "NA")
                d = 0;
            return tuitionScale(d);
        })
        .attr("fill","orange")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    chosen = d3.selectAll("#tuitions > svg > g > text");

    chosen
        .attr("x",function (d,i) {
            if(selection == i) {
                tuition[selection] = data.Tuition;
            }
            if(i < tuition.length)
                d = tuition[i];
            if(d == "NA")
                d = 0;
            return tuitionScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            if(selection == i) {
                tuition[selection] = data.Tuition;
            }
            if(i < tuition.length)
                d = tuition[i];
            if(d==0)
                return "NA";
            return d;
        });

    chosen = d3.selectAll("#income > svg > g > rect");
    // console.log(chosen);
    chosen
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d,i) {
            if(selection == i) {
                income[selection] = data.income;
            }
            if(i < income.length)
                d = income[i];
            if(d == "NA")
                d = 0;
            return incomeScale(d);
        })
        .attr("fill","red")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    chosen = d3.selectAll("#income > svg > g > text");

    chosen
        .attr("x",function (d,i) {
            if(selection == i) {
                income[selection] = data.income;
            }
            if(i < income.length)
                d = income[i];
            if(d == "NA")
                d = 0;
            return incomeScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            if(selection == i) {
                income[selection] = data.income;
            }
            if(i < income.length)
                d = income[i];
            if(d==0)
                return "NA";
            return d;
        });

    chosen = d3.selectAll("#SAT > svg > g > rect");
    // console.log(chosen);
    chosen
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d,i) {
            if(selection == i) {
                sat[selection] = data.SAT_scores;
            }
            if(i < sat.length)
                d = sat[i];
            if(d == "NA")
                d = 0;
            return SATScale(d);
        })
        .attr("fill","pink")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    chosen = d3.selectAll("#SAT > svg > g > text");

    chosen
        .attr("x",function (d,i) {
            if(selection == i) {
                sat[selection] = data.SAT_scores;
            }
            if(i < sat.length)
                d = sat[i];
            if(d == "NA")
                d = 0;
            return SATScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            if(selection == i) {
                sat[selection] = data.SAT_scores;
            }
            if(i < sat.length)
                d = sat[i];
            if(d==0)
                return "NA";
            return d;
        });

    chosen = d3.selectAll("#ACT > svg > g > rect");
    // console.log(chosen);
    chosen
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d,i) {
            if(selection == i) {
                act[selection] = data.ACT_scores;
            }
            if(i < act.length)
                d = act[i];
            if(d == "NA")
                d = 0;
            return ACTScale(d);
        })
        .attr("fill","violet")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    chosen = d3.selectAll("#ACT > svg > g > text");

    chosen
        .attr("x",function (d,i) {
            if(selection == i) {
                act[selection] = data.ACT_scores;
            }
            if(i < act.length)
                d = act[i];
            if(d == "NA")
                d = 0;
            return ACTScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            if(selection == i) {
                act[selection] = data.ACT_scores;
            }
            if(i < act.length)
                d = act[i];
            if(d==0)
                return "NA";
            return d;
        });

    chosen = d3.selectAll("#Applicants > svg > g > rect");
    // console.log(chosen);
    chosen
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d,i) {
            if(selection == i) {
                applicant[selection] = data.Applicants_total;
            }
            if(i < applicant.length)
                d = applicant[i];
            if(d == "NA")
                d = 0;
            return TotalApplicantsScale(d);
        })
        .attr("fill","purple")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    chosen = d3.selectAll("#Applicants > svg > g > text");

    chosen
        .attr("x",function (d,i) {
            if(selection == i) {
                applicant[selection] = data.Applicants_total;
            }
            if(i < applicant.length)
                d = applicant[i];
            if(d == "NA")
                d = 0;
            return TotalApplicantsScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            if(selection == i) {
                applicant[selection] = data.Applicants_total;
            }
            if(i < applicant.length)
                d = applicant[i];
            if(d==0)
                return "NA";
            return d;
        });

    chosen = d3.selectAll("#School > svg > g > text");

    chosen
        .attr("x",0)
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            if(selection == i) {
                school[selection] = data['institution.name'];
                console.log(school)
            }
            if(i < school.length)
                d = school[i];
            if(d==0)
                return "NA";
            return d;
        });

    chosen = d3.selectAll("#Enrolled > svg > g > rect");
    // console.log(chosen);
    chosen
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d,i) {
            if(selection == i) {
                enroll[selection] = data.year_fulltime_enrollment;
            }
            if(i < enroll.length)
                d = enroll[i];
            if(d == "NA")
                d = 0;
            return TotalEnrollmentScale(d);
        })
        .attr("fill","maroon")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    chosen = d3.selectAll("#Enrolled > svg > g > text");

    chosen
        .attr("x",function (d,i) {
            if(selection == i) {
                enroll[selection] = data.year_fulltime_enrollment;
            }
            if(i < enroll.length)
                d = enroll[i];
            if(d == "NA")
                d = 0;
            return TotalEnrollmentScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            if(selection == i) {
                enroll[selection] = data.year_fulltime_enrollment;
            }
            if(i < enroll.length)
                d = enroll[i];
            if(d==0)
                return "NA";
            return d;
        });

    chosen = d3.selectAll("#Men > svg > g > rect");
    // console.log(chosen);
    chosen
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d,i) {
            if(selection == i) {
                menpercent[selection] = data.Percent_admitted_men;
            }
            if(i < menpercent.length)
                d = menpercent[i];
            if(d == "NA")
                d = 0;
            return TotalMenPercentScale(d);
        })
        .attr("fill","crimson")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    chosen = d3.selectAll("#Men > svg > g > text");

    chosen
        .attr("x",function (d,i) {
            if(selection == i) {
                menpercent[selection] = data.Percent_admitted_men;
            }
            if(i < menpercent.length)
                d = menpercent[i];
            if(d == "NA")
                d = 0;
            return TotalMenPercentScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            if(selection == i) {
                menpercent[selection] = data.Percent_admitted_men;
            }
            if(i < menpercent.length)
                d = menpercent[i];
            if(d==0)
                return "NA";
            return d;
        });

    chosen = d3.selectAll("#Women > svg > g > rect");
    // console.log(chosen);
    chosen
        .attr("x", 0)
        .attr("y", function (d,i) {
            return i*30+40;
        })
        .attr("height",27)
        .attr("width", function (d,i) {
            if(selection == i) {
                womenpercent[selection] = data.Percent_admitted_women;
            }
            if(i < womenpercent.length)
                d = womenpercent[i];
            if(d == "NA")
                d = 0;
            return TotalWomenPercentScale(d);
        })
        .attr("fill","green")
        .attr("stroke","darkgrey")
        .attr("stroke-width","1px");

    chosen = d3.selectAll("#Women > svg > g > text");

    chosen
        .attr("x",function (d,i) {
            if(selection == i) {
                womenpercent[selection] = data.Percent_admitted_women;
            }
            if(i < womenpercent.length)
                d = womenpercent[i];
            if(d == "NA")
                d = 0;
            return TotalWomenPercentScale(d)+5;
        })
        .attr("y",function (d,i) {
            return i*30+58;
        })
        .text(function (d,i) {
            if(selection == i) {
                womenpercent[selection] = data.Percent_admitted_women;
            }
            if(i < womenpercent.length)
                d = womenpercent[i];
            if(d==0)
                return "NA";
            return d;
        });

    // selection++;

};