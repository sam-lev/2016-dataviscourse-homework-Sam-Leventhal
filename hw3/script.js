// Global var for FIFA world cup data
var allWorldCupData;
/*
convertCountryCode = (code) => {
	return isoCountries[code].name;
};*/
/**
 * Render and update the bar chart based on the selection of the data type in the drop-down box
 *
 * @param selectedDimension a string specifying which dimension to render in the bar chart
 */
function updateBarChart(selectedDimension) {

    var svgBounds = d3.select("#barChart").node().getBoundingClientRect(),
        xAxisWidth = 100,
        yAxisHeight = 70;

    xAxesData = [];
    yAxesData = [];
    for (i = 0; i< allWorldCupData.length; i++){
	xAxesData.push(allWorldCupData[i].year);
	yAxesData.push(allWorldCupData[i][selectedDimension]);
    }
   
    // ******* TODO: PART I *******

    // Create the x and y scales; make
    // sure to leave room for the axes: "Make sure to include x and y axes, with tick labels and use the proper d3 scales and axis."
    //Attendence x:0 - 66000   y :  Matches x:  y:0 - 70  Goals x:  y:0 - 170   Teams  x:  y: 0 - 50
    // Set up the yscales

    
    var xMin = d3.min(xAxesData);
    var xMax = d3.max(xAxesData);

    var yMin = d3.min(yAxesData);
    var yMax = d3.max(yAxesData);

    var height = yMax;
    var width = xMax;

    
    var spacing = 450 / xAxesData.length;
    
    var svg = d3.select("#barChart");
    svg.attr("height",400)
	.attr("width",500)
	.attr("transform", "translate(50,0)");
	
    var xScale = d3.scaleLinear()
        .domain([1920, 2016])
        .range([0, 480])
	.nice();

    var yScale = d3.scaleLinear()
        .domain([d3.max(yAxesData), 0])
        .range([0, 380])
	.nice();
    
    var colorScale = d3.scaleLinear()
            .domain([xMin, 0, xMax])
            .range(["darkred", "lightgray", "steelblue"]);
    


 // Update the barchart
    var barchart = d3.select("#barChart");
    var bars = barchart.select("#bars");
    var selection = bars.selectAll("rect");

        
    selection.exit().remove()
        .attr("opacity", 1)
        .transition()
        .duration(3000)
        .attr("opacity", 0)
        .remove();

    var newRect = selection
	.data(allWorldCupData)
	.enter()
	.append("rect")
	.attr("x", function (d,i) {
            return i*spacing + 5;
                })
        .attr("y", function(d,i){
	    return 380-yScale(yAxesData[i]);
	})
        .attr("width", 10)
        .attr("height", function(d,i){
	    return yScale(yAxesData[i]);
	})
	.attr("transform", "scale(1,1)")
        .style("fill",  function(i,d){
	    return colorScale(d);
	});

   

    newSelection = newRect.merge(selection);

    function mouseenter(d){
	d3.select(this)
	    .style("fill","green");
    }
    function mouseexit(d){
	d3.select(this)
	    .style("fill", function(i,d){
		    return colorScale(d);
	    });
    }

    function colorReset(d){
	d3.selected(this).classed("selected",false);

    }
    function selected(d){
	d3.select(this).classed("selected",true);
    }


    
    newSelection
	.data(allWorldCupData)
        .transition()
        .duration(3000)
	.attr("x", function (d,i) {
            return i*spacing + 5;
                })
        .attr("y", function(d,i){
	    return 380-yScale(yAxesData[i])
	})
        .attr("width", 10)
        .attr("height", function(d,i){
	    return yScale(yAxesData[i])
	})
    	.style("fill",function(i,d){
	    return colorScale(d);
	});
    
    newSelection
	.on("mouseover", mouseenter)
        .on("mouseout", mouseexit);
    newSelection
	.on("click",function(d,i){
	    //HANDLE COLORING
	    d3.select(".selected").classed("selected", false)
	    .transition()
	    .duration(10)
	    d3.select(this).style("fill", "blue")
	    .transition()
	    .duration(2000)
	    d3.select(this).style("fill",function(i,d){
	    return colorScale(d);
	    })
	    //d3.select(this).classed("selected",true)
    

	    //Gather Attributes
	    var tableInfo = [];
	    tableInfo.push(d.EDITION);
	    tableInfo.push(d.host);
	    tableInfo.push(d.winner);
	    tableInfo.push(d.runner_up);
	    var teamNames = d.TEAM_NAMES.split(',');
	    tableInfo.push(teamNames);
	   
	    //host_country_code
	    tableInfo.push(d.host_country_code);
	    
	    //teams_iso (list of string country codes)
	  
	    tableInfo.push(d.teams_iso);

	    //long lat winner
	    var winCoord = []
	    winCoord.push(parseFloat(d.WIN_LON));
	    winCoord.push(parseFloat(d.WIN_LAT));

	    var silverCoord = []
	    silverCoord.push(parseFloat(d.RUP_LON));
	    silverCoord.push(parseFloat(d.RUP_LAT));
	    
	    tableInfo.push(winCoord); // winner coord as two string
	                              // indes
	    tableInfo.push(silverCoord);
	    
	    updateInfo(tableInfo);
	})


    // create a new axis that has the ticks and labels on the bottom
    var xAxis = d3.axisBottom();
    var yAxis = d3.axisLeft();
	
    // assign the scale to the axis
    xAxis.scale(xScale);
    yAxis.scale(yScale);

    svg.select("#xAxis")
        .transition()
        .duration(2000)
	.attr("transform", " translate(0,380)")
	.call(xAxis);
    svg.select("#yAxis")
	.transition()
        .duration(2000)
	.call(yAxis);

    // Create colorScale: "color each bar based on the selected data attribute (both height and color should encode the selected attribute); define and use the colorScale variable."

    // Create the axes (hint: use #xAxis and #yAxis)

    // Create the bars (hint: use #bars)



    // ******* TODO: PART II *******

    // Implement how the bars respond to click events
    // Color the selected bar to indicate is has been selected.
    // Make sure only the selected bar has this new color.

    // Call the necessary update functions for when a user clicks on a bar.
    // Note: think about what you want to update when a different bar is selected.


}

/**
 *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
 *
 *  There are 4 attributes that can be selected:
 *  goals, matches, attendance and teams.
 */
function chooseData(data) {

    // ******* TODO: PART I *******
    //Changed the selected data when a user selects a different
    // menu item from the drop down.

    //Get value dataset from div plot-selector and pass the new bar-chart dataset selected in plot-selector to updateBarChart
    document.getElementById("plot-selector").onchange = function (event) {
        updateBarChart( event.target.value );
    }

}

/**
 * Update the info panel to show info about the currently selected world cup
 *
 * @param oneWorldCup the currently selected world cup
 */
function updateInfo(oneWorldCup) {

    // ******* TODO: PART III *******

    // Update the text elements in the infoBox to reflect:
    // World Cup Title, host, winner, runner_up, and all participating teams that year

    
    d3.select("#edition").html( oneWorldCup[0] )
    .style("color","green");

    d3.select("#host").html( oneWorldCup[1] )
    .style("color","blue");

    d3.select("#winner").html(oneWorldCup[2] )
    .style("color","blue");

    d3.select("#silver").html( oneWorldCup[3] )
    .style("color","blue");

    d3.select("#teams").html("");
    for(i=0; i < oneWorldCup[4].length; i++){
	d3.select("#teams").append("li").html( oneWorldCup[4][i] +"\n")
	    .style("color","blue");
    }

    //Change Map**********************************************
    //host country code
    updateMap(oneWorldCup);

}

/**
 * Renders and updated the map and the highlights on top of it
 *
 * @param the json data with the shape of all countries
 */
function drawMap(world) {

    //(note that projection is global!
    // updateMap() will need it to add the winner/runner_up markers.)

    projection = d3.geoConicConformal().scale(150).translate([400, 350]);

    // ******* TODO: PART IV *******

    // Draw the background (country outlines; hint: use #map)
    // Make sure and add gridlines to the map

    // Hint: assign an id to each country path to make it easier to select afterwards
    // we suggest you use the variable in the data element's .id field to set the id

    // Make sure and give your paths the appropriate class (see the .css selectors at
    // the top of the provided html file)

    var path = d3.geoPath()
	.projection(projection);

  
    var map = d3.selectAll("#map");

    var graticule = d3.geoGraticule(world.features);
    
    
    //load world map
    
    map.append("path")
	.attr("class","graticule")
	.datum(graticule)
	.attr("d", path);

    
    map.append("path")
	.datum(graticule.outline)
	.attr("class", "foreground")
	.attr("d", path);

    var countries = topojson.feature(world, world.objects.countries).features;

    map.selectAll("path")
	.data(countries)
	.enter().append("path")
	.attr("d", path)
    	.attr("id", function(d,i){
	    return d.id;
	})
    
    
    
}
/**
 * Clears the map
 */
function clearMap() {

    // ******* TODO: PART V*******
    //Clear the map of any colors/markers; You can do this with inline styling or by
    //defining a class style in styles.css

    //Hint: If you followed our suggestion of using classes to style
    //the colors and markers for hosts/teams/winners, you can use
    //d3 selection and .classed to set these classes on and off here.
    d3.selectAll("path").classed("host",false);
    d3.selectAll("path").classed("team",false);
    //d3.selectAll("circle").classed("gold",false);
}



/**
 * Update Map with info for a specific FIFA World Cup
 * @param the data for one specific world cup
 */
function updateMap(oneWorldCup) {

    //Clear any previous selections;
    clearMap();

    //highlight host country
    //d3.select("#"+oneWorldCup[5]).classed("host",true);
    //all teams

    for(i=0; i < oneWorldCup[6].length; i++){
	var country = "#"+oneWorldCup[6][i];
	if(country != "#"+oneWorldCup[5]){
	    d3.select(country)
		.classed("team", true);
	} else {
	    d3.select(country)
		.classed("host",true);
	}
    }

   
    var pointClass =  d3.select("#points");
    var points = pointClass.selectAll("circle");

            
    points.remove()
    
    var newPoint = points
	.data(oneWorldCup[7])
	.enter()
	.append("circle")
	.attr("cx", function(d) {
	    return projection(oneWorldCup[7])[0];
	})
	.attr("cy", function(d){
	    return projection(oneWorldCup[7])[1];
	})//  function(d) { projection(d)[0] })//
	.attr("r", 5)
	.classed("gold",true);

    newestPoint = newPoint.merge(points);

    newestPoint
	.data(oneWorldCup[7])
	.enter()
	.append("circle")
	.attr("cx", function(d) {
	    return projection(oneWorldCup[7])[0];
	})
	.attr("cy", function(d){
	    console.log(d);
	    return projection(oneWorldCup[7])[1];
	})//  function(d) { projection(d)[0] })//
	.attr("r", 5)
	.classed("gold",true);
    
    newestPoint = newPoint.merge(points);


    
    var newPoint = points
	.data(oneWorldCup[8])
	.enter()
	.append("circle")
	.attr("cx", function(d) {
	    return projection(oneWorldCup[8])[0];
	})
	.attr("cy", function(d){
	    return projection(oneWorldCup[8])[1];
	})//  function(d) { projection(d)[0] })//
	.attr("r", 5)
	.classed("silver",true);

    newestPoint = newPoint.merge(points);

    newestPoint
	.data(oneWorldCup[8])
	.enter()
	.append("circle")
	.attr("cx", function(d) {
	    return projection(oneWorldCup[8])[0];
	})
	.attr("cy", function(d){
	    console.log(d);
	    return projection(oneWorldCup[8])[1];
	})//  function(d) { projection(d)[0] })//
	.attr("r", 5)
	.classed("silver",true);
    
    newestPoint = newPoint.merge(points);

    // ******* TODO: PART V *******
//convertCountryCode = (code) => {
  //  return isoCountries[code].name;
//}
    // Add a marker for the winner and runner up to the map.

    //Hint: remember we have a conveniently labeled class called .winner
    // as well as a .silver. These have styling attributes for the two
    //markers.


    //Select the host country and change it's color accordingly.

    //Iterate through all participating teams and change their color as well.

    //We strongly suggest using classes to style the selected countries.



}

/* DATA LOADING */

// This is where execution begins; everything
// above this is just function definitions
// (nothing actually happens)

//Load in json data to make map
d3.json("data/world.json", function (error, world) {
    if (error) throw error;
    drawMap(world);
});

// Load CSV file
d3.csv("data/fifa-world-cup.csv", function (error, csv) {

    csv.forEach(function (d) {

        // Convert numeric values to 'numbers'
        d.year = +d.YEAR;
        d.teams = +d.TEAMS;
        d.matches = +d.MATCHES;
        d.goals = +d.GOALS;
        d.avg_goals = +d.AVERAGE_GOALS;
        d.attendance = +d.AVERAGE_ATTENDANCE;
        //Lat and Lons of gold and silver medals teams
        d.win_pos = [+d.WIN_LON, +d.WIN_LAT];
        d.ru_pos = [+d.RUP_LON, +d.RUP_LAT];

        //Break up lists into javascript arrays
        d.teams_iso = d3.csvParse(d.TEAM_LIST).columns;
        d.teams_names = d3.csvParse(d.TEAM_NAMES).columns;

    });

    // Store csv data in a global variable
    allWorldCupData = csv;
    // Draw the Bar chart for the first time
    updateBarChart('attendance');
});

