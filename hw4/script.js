/** Global var to store all match data for the 2014 Fifa cup */
var teamData;

/** Global var for list of all elements that will populate the table.*/
var tableElements;
var originalTableElements;

/** Variables to be used when sizing the svgs in the table cells.*/
var cellWidth = 70,
    cellHeight = 20,
    cellBuffer = 15,
    barHeight = 20;

var max = function(d){return d3.max(d)};
var min = function(d){return d3.min(d)};
var dir = 1;

/**Set variables for commonly accessed data columns*/
var goalsMadeHeader = 'Goals Made',
    goalsConcededHeader = 'Goals Conceded';

/** Setup the scales*/
var goalScale;
//d3.max(teamData, d3.max(teamData,function (d) {return d.value['Goals Made'];}))])//d3.min([goalsMadeHeader, goalsConcededHeader]), d3.max([goalsMadeHeader, goalsConcededHeader]) ])

/**Used for games/wins/losses*/
var gameScale;

/**Color scales*/
/**For aggregate columns*/
var aggregateColorScale;

/**For goal Column*/
var goalColorScale;

/**json Object to convert between rounds/results and ranking value*/
var rank = {
    "Winner": 7,
    "Runner-Up": 6,
    'Third Place': 5,
    'Fourth Place': 4,
    'Semi Finals': 3,
    'Quarter Finals': 2,
    'Round of Sixteen': 1,
    'Group': 0
};


function pr(x){ console.log(x) };


//For the HACKER version, comment out this call to d3.json and implement the commented out
// d3.csv call below.

d3.json('data/fifa-matches.json',function(error,data){
    teamData = data;
    createTable();
    updateTable();
})


// // ********************** HACKER VERSION ***************************
// /**
//  * Loads in fifa-matches.csv file, aggregates the data into the correct format,
//  * then calls the appropriate functions to create and populate the table.
//  *
//  */
// d3.csv("data/fifa-matches.csv", function (error, csvData) {
//
//    // ******* TODO: PART I *******
//
//
// });
// // ********************** END HACKER VERSION ***************************

/**
 * Loads in the tree information from fifa-tree.csv and calls createTree(csvData) to render the tree.
 *
 */
d3.csv("data/fifa-tree.csv", function (error, csvData) {

    //Create a unique "id" field for each game
    csvData.forEach(function (d, i) {
        d.id = d.Team + d.Opponent + i;
    });

    createTree(csvData);
});

 


/**
 * Creates a table skeleton including headers that when clicked allow you to sort the table by the chosen attribute.
 * Also calculates aggregate values of goals, wins, losses and total games as a function of country.
 *
 */
function createTable() {

// ******* TODO: PART II *******
 
    
    goalScale = d3.scaleLinear()
	.domain([ 0, d3.max(teamData, function(d){ return d.value['Goals Made'] })])
	.range([cellBuffer, 2 * cellWidth - cellBuffer]);
    
    aggregateColorScale = d3.scaleLinear()
	.domain([ 0 ,  d3.max(teamData, function (d){  return d.value['TotalGames'];})])
    	.range(['#ece2f0', '#016450']);

    gameScale =  d3.scaleLinear()
        .domain([0, d3.max(teamData, function (d){ return d.value['TotalGames']; })])
        .range([0, cellWidth - cellBuffer]);

    goalColorScale = d3.scaleQuantize()
	.domain([-1, 1])
	.range(['#cb181d', '#034e7b']);
    
    // Axis goes in td class in css!
    var goalsAxis = d3.axisBottom();
    goalsAxis.scale(goalScale);

    var svg = d3.select('#goalHeader');
    svg.append("svg")
        .attr("width",cellWidth*2)
        .attr("height",cellHeight )
	.call(goalsAxis);

    tableElements = teamData;
    originalTableElements = teamData;

}

function findAttribute( attribute, td ){
    
}

/**
 * Updates the table contents with a row for each element in the global variable tableElements.
 *
 */
function updateTable() {

// ******* TODO: PART III *******

 
    /* basic filling of table */
    var tableBody = d3.select("tbody");
    //selectall and add data
    var tr = tableBody.selectAll("tr")
	.data(tableElements);
    
    tr.exit().remove();
  
    // enter and Merge
    tr = tr.enter().append("tr")
	.merge(tr);
    
    tr.attr("class",function(d){
        return d.value.type;
    });

    tr.append("th");
    var th = tr.select("th")
	.text(function(d){
            if(d.value['type'] != "aggregate"){return 'x' +  d.key;}
            else{return d.key;}
	})
    	.style("color", function(d){
	    if( d.value['type']  != "aggregate"){return "grey"}})
	.style("font-weight", function(d){
	    if( d.value['type']   != "aggregate"){return "200"}}); 

    
    var td = tr.selectAll("td")
	.data(function(d){
	    return [
		{ "type": d.value['type'], "class": "goals", "value": {"scored":d.value['Goals Made'],"conceded":d.value['Goals Conceded'],"delta":d.value['Delta Goals'], "country": "x"+ d.key}},
		{ "type": d.value['type'], "class": "text", "value": d.value['Result'] },
		{ "type": d.value['type'], "class": "bar", "value": d.value['Wins'] },
		{  "type": d.value['type'], "class": "bar", "value": d.value['Losses'] },
		{  "type": d.value['type'], "class": "bar", "value": d.value['TotalGames'] }
	    ];
	});

    td.exit().remove();
    td = td.enter().append("td")
	.merge(td);

    /* Add the 'Round/Result' Text field with the aggregetes label
       into the td elements whose class are 'text' */
    td.text(function(d){
	if(d.class == 'text'){
            return d.value["label"];
        }
    });

    /* Add the bar charts for 'Wins', 'Losses', and 'Total Games' 
       from 0 to the max number of wins and scaling with 
       d3.scalelinear for those values in both width and color */

    var b = td.filter(function (d) { return d.class == 'bar' });

    b.append("svg")
	.attr("width", cellWidth)
	.attr("height", cellHeight)
	.append("rect");
    b.select("svg").select("rect")
	.attr("width",function(d){return gameScale(d.value); })
	.attr("height", cellHeight-3)
	.attr("fill", function(d){
	    return aggregateColorScale(d.value)
	});
    var info = b.select("svg").append("text");
    info.text( function(d){ return d.value})
	.attr("x", function(d){ return gameScale(d.value) - cellHeight/2;})
	.attr("y", cellHeight/2)
	.attr("transform", "translate(2,2)")
	.attr("font-size", "10px");

    /* Add the goal visualisation to goals column  in which
       a red circle svg represents goals conceded and a blue circle
       represents goals made. A rectangle svg is used to represent
       the difference between the two and is filled depending light
       red if more games were conceded and filled light blue is more
       games were won*/
    var dif = td.filter(function(d){ return d.class == "goals" });

    var xTranslate;

    var rect =dif.append("svg")
	.attr("width", cellWidth*2)
	.attr("height", cellHeight)
	.append("rect");
    dif.select("svg").select("rect")
	.attr( "width", function(d){
	    goalsMadeHeader = d3.max([d.value["scored"], d.value["conceded"]]);
	    goalsConcededHeader = d3.min([ d.value["scored"], d.value["conceded"] ]);
	    return Math.abs(goalScale( goalsMadeHeader - goalsConcededHeader ))})
	.attr("height", function(d){
	    if(d.type == "game"){
		return cellHeight/6;}
	    else{ return cellHeight/2 }})
	.attr("x", function(d) {
	    goalsMadeHeader = d.value["scored"];
	    goalsConcededHeader = d.value["conceded"];
	    xTranslate = goalScale( d3.min( [goalsMadeHeader, goalsConcededHeader] ));
	    return xTranslate-10})
	.attr("y", function(d){
	    return cellHeight/2 })
	.attr("class", "goalBar")
	.attr("fill", function(d) {return( goalColorScale(d.value.delta))});

    var LTranslate;
    rect.append("svg")
	.attr("width", cellWidth*2)
	.attr("height", cellHeight);
    var circleC = dif.select("svg").append( "circle");
    circleC
	.attr("cx", function(d){
	    LTranslate = goalScale( d3.max([d.value["scored"], d.value["conceded"]]) );
	    return LTranslate+2})
	.attr("cy", 5+cellHeight/2)
	.attr("r", 6)
	.attr("fill", function(d){
	    if(d.value.delta > 0){
		return goalColorScale(1)}
	    else{
		return goalColorScale(-1)}}); 

    var RTranslate;
    rect.append("svg")
	.attr("width", cellWidth*2)
	.attr("height", cellHeight);
    var circleR = dif.select("svg").append("circle");
    circleR
	.attr("cx", function(d){
	    RTranslate = goalScale( d3.min([d.value["scored"], d.value["conceded"]]) );
	    return RTranslate-8})
	.attr("cy", 5+cellHeight/2)
	.attr("r", 6)
	.attr("fill", function(d){
	    if(d.value.delta > 0){
		return goalColorScale(-1)}
	    else{
		return goalColorScale(1)}}); 

    
    /* 
       Assign to each row click functionality calling updateList
     */
    tr.on("click",function(d,i){
	if(i == tableElements.length && !tableElements[i+1]){
	    updateList[i];
	};
	if(tableElements[i+1]){
	/** collapse table if team already expanded **/
	/** WHY DOES IT WORK FOR ALL EXPANDED EXCEPT FIRST CLICKED!?!?! **/
	if(tableElements[i+1].value['type'] == "game"){
	    collapseList();
	}
	/** supress action if element type game **/
	else if(d.value['type'] != 'game'){
            updateList(i);
	}
	}});

    /* Handle hovers between tree and table
     */
    d3.select("#matchTable").selectAll("tr")
        .on("mouseover", function (d) {
            updateTree(d);
        })
        .on("mouseout",function (d) {
            clearTree();
        });

    d3.select("#matchTable").selectAll("th")
        .on("click", function (d,i) {
            var select = d3.select(this).text();
            if(select == "Team") {
                if(dir == 1) {
                    dir = 0;
                    teamData.sort(function (a, b) {
                        return d3.descending(a.key, b.key);
                    })
                } else{
                    dir = 1;
                    teamData.sort(function (a, b) {
                        return d3.ascending(a.key, b.key);
                    })
                }
                updateTable();
            }});

    d3.select("#matchTable").selectAll("thead td")
        .on("click", function (d,i) {
            var select = d3.select(this).text();
	    pr(select);
	    if (select == "Wins") {
                if(dir == 1) {
                    dir = 0;
                    teamData.sort(function (a, b) {
                        return d3.descending(a.value['Wins'], b.value['Wins']);
                    })
                } else if (dir == 0) {
                    dir = 1;
                    teamData.sort(function (a, b) {
                        return d3.ascending(a.value['Wins'], b.value['Wins']);
                    })
                }
                updateTable();
            }
        });

    d3.select("#matchTable").selectAll("thead td")
        .on("click", function (d,i) {
            var select = d3.select(this).text();
	    if (select == "Losses") {
                if(dir == 1) {
                    dir = 0;
                    teamData.sort(function (a, b) {
                        return d3.descending(a.value['Losses'], b.value['Losses']);
                    })
                } else if (dir == 0) {
                    dir = 1;
                    teamData.sort(function (a, b) {
                        return d3.ascending(a.value['Losses'], b.value['Losses']);
                    })
                }
                updateTable();
            }
        });

 

};


/**
 * Collapses all expanded countries, leaving only rows for aggregate values per country.
 *
 */
function collapseList() {

    //Lets exploit the unique properties of a set
    var tableElementsSet = new Set(teamData);
    temp = [];
    tableElementsSet.forEach(function(d){ temp.push({
	key: d.key,
	value: d.value})});
    tableElements = temp;
    updateTable();


}

/**
 * Updates the global tableElements variable, with a row for each row to be rendered in the table.
 *
 */
function updateList(i) {

    // get index, the string of the country clicked, which games are associated to that country
    var games = tableElements[i].value["games"];
    /*
      Game clicked so do nothing
    */
    pr(tableElements[i].value['type']);
    if( tableElements[i].value['type'] == "game" ){
	return;
    }
	
    if( tableElements[i].value['type'] != "game" ) {
	var games = tableElements[i].value["games"];

	if( true ) {
	  // get games type aggregate following team prior to click
	    var following = tableElements.slice(i+1,games.length);
	    for( j = 0; j < games.length; j++){
		var game = games[j];
		for(  k = 0; k < following.length; k++){
		    var fol = following[k];
		    if( game.key == fol.key){
			pr(game.key)
			for(m in tableElements){
			    if(tableElements[m].key == game.key){
				tableElements.splice(m,1);
			    }}}
		}
	    }
	};
	
	// insert the newly ordered countries after the country clicked
	for(j=0; j < games.length; j++){
	    tableElements.splice(i+j+1, 0, games[j]);
	};

	updateTable();

    }

    /*
       Case in which sorting in needed
    */
    if( false ) {

	var countryRanks = games.map(function(d){ return [d.key,d.value["Result"].ranking]});

	//sort the tuple of collected countries and ranks in reverse order
	var sortedCountries = countryRanks.sort(function(a, b){ a = a[1]; b = b[1];
                                return a < b ? -1 : (a > b ? 1 : 0);});

	//use the sorted tuple to sort countries by rank and pull them from tableElements
	// by their key to have a sorted list of the player objects
	var orderedCountries = [];
	sortedCountries.map(function(d){
            tableElements.filter(function(s){ if( d[0] == s.key){ orderedCountries.push(s);}})
	});

    // insert the newly ordered countries after the country clicked
    // NOTE: the styling isn't changed for the countries added here so
    // if you will want to maybe do that with the attribure values in
    // orderedCountries
    for(j=0; j < orderedCountries.length; j++){
    tableElements.splice(i+j+1, 0, orderedCountries[j]); //note only do index j because want reverse order when
    };                                                // inserting our sorted country stat objects

    }


/*

Sort alphabetically, compare each two, goals sort by delta goals, if delta = 0 make grey

tree: feed nodes and edges and returns position to place them.
root has all children, id is , stored in (nothing to do with game data set)
d.id , parent id return field contianing parent open fifa csv, use d.links for styling
linking: hover highlights, each row is a json and has team, do on hover function d
which is associated to that country and select all elemets with that country
and use .selected in style sheet


*/
    // ******* TODO: PART IV *******


}

/**
 * Creates a node/edge structure and renders a tree layout based on the input data
 *
 * @param treeData an array of objects that contain parent/child information.
 */
function createTree(treeData) {

    // ******* TODO: PART VI *******
    var svg = d3.select("#tree");

    var g = svg.append("g").attr("transform", "translate(10,100)");

    
    var width = 300;
    var height = 500;
    
    var tree = d3.tree()
	.size([height, width]);
    
    var root = d3.stratify()
	.id(function(d,i) { return  d.Team + d.Opponent+i; })
	.parentId(function(d,i) { 
				if(d.ParentGame){
				    return treeData[d.ParentGame].id}
				else{
				    return ''}
			      })
    (treeData);
    
    tree(root);

    var link = g.selectAll(".link")
	.data(root.descendants().slice(1))
	.enter().append("path")
	.attr("class", "link")
	.attr("id", function(d,i){
	    var name = d.id;
	    var trunc = name.replace(i, "");
	    return trunc;
	})
        .attr("d", function (d) {
            if(d.id == "Germany26") {
                return ""
            } else {
                return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            }
        });

//	.merge(link);
    
    var node = g.selectAll(".node")
	.data(root.descendants())
	.enter().append("g")
	.attr("class", function(d) {
            if (d.data["Wins"] == 1) {
                return "node winner"
            } else {
                return "node loser"
            }
        })
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })


    
    node.append("circle")
	.attr("r", 5);
    
    node.append("text")
        .attr("dy", 16)
        .attr("x", function(d) { return d.children ? -8 : 8; })
        .style("label", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.data["Team"];  });


};//(d.parent.y +d.y)/2 

/**
 * Updates the highlighting in the tree based on the selected team.
 * Highlights the appropriate team nodes and labels.
 *
 * @param team a string specifying which team was selected in the table.
 */


function updateTree(row) {
    // ******* TODO: PART VII *******
    
    var  allTeams = row.value["games"];
    var links = d3.selectAll(".link");

    for(i=0; i< allTeams.length; i++){
	var team = allTeams[i];
	var contained = links.selectAll(team.key);
	contained.classed("selected",true);
    }

   // allTeams.classed("selected",true);


}

/**
 * Removes all highlighting from the tree.
 */
function clearTree() {

    // ******* TODO: PART VII *******
   /* tableElements.map(function (d) {
	var elm = d.key;
        return d.classed("selected", false);
    });*/


}




