/*
 * Root file that handles instances of all the charts and loads the visualization
 */
(function(){
    var instance = null;

    /**
     * Creates instances for every chart (classes created to handle each chart;
     * the classes are defined in the respective javascript files.
     */
    function init() {
        //Creating instances for each visualization

        //static visualisation  comparing attributes of schools selected as
        //histogram
        var histoChart = new HistoChart();

        var rangeScaleChart = new RangeScaleChart();

        var mapCompare = new MapCompare(histoChart);

        //load the data corresponding to all the election years
        //pass this data and instances of all the charts that update on year selection to yearChart's constructor
        d3.csv("data/collegelocation.csv", function (error, collegeData) {
            //pass the instances of all the charts that update on selection change in YearChart
            // var mapCompare = new MapCompare(histoChart, rangeScaleChart, collegeData);
            // mapCompare.update();

	        var legendCompare = new LegendCompare(histoChart, rangeScaleChart, mapCompare, collegeData);
            legendCompare.update();
        });
    }

    /**
     *
     * @constructor
     */
    function Main(){
        if(instance  !== null){
            throw new Error("Cannot instantiate more than one Class");
        }
    }

    /**
     *
     * @returns {Main singleton class |*}
     */
    Main.getInstance = function(){
        var self = this;
        if(self.instance == null){
            self.instance = new Main();

            //called only once when the class is initialized
            init();
        }
        return instance;
    }

    Main.getInstance();
})();
