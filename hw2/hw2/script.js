/*globals alert, document, d3, console*/
// These keep JSHint quiet if you're using it (highly recommended!)

function staircase() {
    // ****** TODO: PART II ******
    var g = document.getElementById("bars").children;
    var bars = g[0].children;
    var nums = [];
    var i;
    var ordered = [];
    for (i=0; i < bars.length; i++) {
	nums.push(bars[i].getAttribute("height"));
    }
    nums.sort(compareNumbers);

    for(i=0;i<bars.length; i++){
	bars[i].setAttribute("height",nums[i]);
    }

    var g = document.getElementById("barsY").children;
    var bars = g[0].children;
    var nums = [];
    var i;
    var ordered = [];
    for (i=0; i < bars.length; i++) {
	nums.push(bars[i].getAttribute("height"));
    }
    nums.sort(compareNumbers);

    for(i=0;i<bars.length; i++){
	bars[i].setAttribute("height",nums[i]);
    }
}


function compareNumbers(a ,b){
    return b-a;
}

function update(error, data) {
    if (error !== null) {
        alert("Couldn't load the dataset!");
    } else {
        // D3 loads all CSV data as strings;
        // while Javascript is pretty smart
        // about interpreting strings as
        // numbers when you do things like
        // multiplication, it will still
        // treat them as strings where it makes
        // sense (e.g. adding strings will
        // concatenate them, not add the values
        // together, or comparing strings
        // will do string comparison, not
        // numeric comparison).

        // We need to explicitly convert values
        // to numbers so that comparisons work
        // when we call d3.max()
        data.forEach(function (d) {
            d.a = parseInt(d.a);
            d.b = parseFloat(d.b);
        })
    }
    
    // Set up the scales
    var aScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.a;
        })])
        .range([0, 150]);
    var bScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.b;
        })])
        .range([0, 150]);
    var iScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, 110]);

    // ****** TODO: PART III (you will also edit in PART V) ******

    // TODO: Select and update the 'a' bar chart bars
    
    var barchart = d3.select("#barChartX");
    var selection = barchart.selectAll("rect")
	.data(data)

    var newRect = selection.enter().append("rect")
	.attr("x",function(d,i){
	    return i*10+10;
	})
	.attr("y",0)
	.attr("width",10)
	.attr("height",function (d,i) {
	    return aScale(d.a);
	})
	.attr("class", "barChart")
        .style("fill", "steelblue");

    selection.exit()
        .attr("opacity", 1)
        .transition()
        .duration(3000)
        .attr("opacity", 0)
        .remove();
    
    selection = newRect.merge(selection);
    
    selection
        .transition()
        .duration(3000)
    	.attr("x",function(d,i){
	    return i*10+10;
	})
	.attr("y",0)
	.attr("width",10)
	.attr("height",function (d,i) {
	    return aScale(d.a);
	})
	.attr("class", "barChart")
        .style("fill", "steelblue");

    var newRect = selection.enter().append("rect")
	.attr("x",function(d,i){
	    return i*10+10;
	})
	.attr("y",0)
	.attr("width",10)
	.attr("height",function (d,i) {
	    return aScale(d.a);
	})
	.attr("class", "barChart")
        .style("fill", "steelblue");
            

    // B Barchart ------------------------//
    var barchartY = d3.select("#barChartY");
    var selectionY = barchartY.selectAll("rect")
	.data(data)

    var newRectB = selectionY.enter().append("rect")
	.attr("x",function(d,i){
	    return i*10+10;
	})
	.attr("y",0)
	.attr("width",10)
	.attr("height",function (d,i) {
	    return bScale(d.b);
	})
	.attr("class", "barChart")
        .style("fill", "steelblue");

    selectionY.exit()
        .attr("opacity", 1)
        .transition()
        .duration(3000)
        .attr("opacity", 0)
        .remove();
    
    selectionY = newRectB.merge(selectionY);
    
    selectionY
        .transition()
        .duration(3000)
    	.attr("x",function(d,i){
	    return i*10+10;
	})
	.attr("y",0)
	.attr("width",10)
	.attr("height",function (d,i) {
	    return bScale(d.b);
	})
	.attr("class", "barChart")
        .style("fill", "steelblue")

    
    // TODO: Select and update the 'a' line chart path using this line generator
    var aLineGenerator = d3.line()
        .x(function (d, i) {
            return iScale(i);
        })
        .y(function (d) {
            return aScale(d.a);
        });

    var makeLine =  d3.select("#xline");
    var selection = makeLine.selectAll("path")
        .style("fill", "none")
        .style("stroke", "steelblue")
        .style("stroke-width", 2)
        .attr("d", aLineGenerator(data));
    

    var bLineGenerator = d3.line()
        .x(function (d, i) {
            return iScale(i);
        })
        .y(function (d) {
            return bScale(d.b);
        });

    var makeLine =  d3.select("#yline");
    var selection = makeLine.selectAll("path")
        .style("fill", "none")
        .style("stroke", Math.floor((Math.random() * 100) + 1))
        .style("stroke-width", 2)
        .attr("d", bLineGenerator(data));
    // TODO: Select and update the 'b' line chart path (create your own generator)

    // TODO: Select and update the 'a' area chart path using this line generator
    var aAreaGenerator = d3.area()
        .x(function (d, i) {
            return iScale(i);
        })
        .y0(0)
        .y1(function (d) {
            return aScale(d.a);
        });
    var makeAreaA =  d3.select("#xarea");
    var selection = makeAreaA.selectAll("path")
        .style("fill", "steelblue")
        .style("stroke", "steelblue")
        .style("stroke-width", 2)
        .attr("d", aAreaGenerator(data));

    var bAreaGenerator = d3.area()
        .x(function (d, i) {
            return iScale(i);
        })
        .y0(0)
        .y1(function (d) {
            return aScale(d.b);
        });
    var makeAreaB =  d3.select("#yarea");
    var selection = makeAreaB.selectAll("path")
        .style("fill", "orange")
        .style("stroke", "orange")
        .style("stroke-width", 2)
        .attr("d", bAreaGenerator(data));


    var makeScat =  d3.select("#scatter");
    var selection = makeScat.selectAll("circle")
	.data(data)
        .attr("cx",function(d){
	    return aScale(d.a);
	})
	.attr("cy",function(d){
	    return bScale(d.b);
	})
	.attr("r",4)
        .style("fill", "steelblue");
    

}				

/*
var document.getElementById("rect").addEventListener("mouseover", function( event ) {   
    // highlight the mouseover target
    d3.select("rect").style("fill", "green");
    
}*/


function changeData() {
    // // Load the file indicated by the select menu
    var dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        randomSubset();
    }
    else{
	d3.csv('data/' + dataFile + '.csv', update)
    }
}

function randomSubset() {
    // Load the file indicated by the select menu,
    // and then slice out a random chunk before
    // passing the data to update()
    var dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        d3.csv('data/' + dataFile + '.csv', function (error, data) {
            var subset = [];
            data.forEach(function (d) {
                if (Math.random() > 0.5) {
                    subset.push(d);
                }
            });
            update(error, subset);
        });
    }
    else{
        changeData();
    }
}
