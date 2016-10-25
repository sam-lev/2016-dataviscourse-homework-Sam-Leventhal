
/**
 * Constructor for the ShiftChart
 */
function ShiftChart(){
    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart;
 */
ShiftChart.prototype.init = function(){
    var self = this;
    self.divShiftChart = d3.select("#shiftChart").classed("sideBar", true);
};

/**
 * Creates a list of states that have been selected by brushing over the Electoral Vote Chart
 *
 * @param selectedStates data corresponding to the states selected on brush
 */
ShiftChart.prototype.update = function(selectedStates, flag){
/*
    var self = this;
    d3.selectAll('ul').remove();
    var ul = d3.select("#stateList").append('ul');

    if (flag == 0) {
        ul.selectAll("li")
            .data(selectedStates)
            .append("li")
            .html(function (d, i) {
                return d[0].State;
            });
        ul.selectAll("li")
            .data(selectedStates)
            .enter()
            .append("li")
            .html(function (d, i) {
                return d[0].State;
            });
    }

   if (flag == 1) {
        ul.selectAll("li")
            .data(selectedStates)
            .append("li")
            .text(function (d, i) {
                return d[0].YEAR;
            });

        ul.selectAll("li")
            .data(selectedStates)
            .enter()
            .append("li")
            .text(function (d, i) {
                return d[0].YEAR;
            });
*/
};
