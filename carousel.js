var width = 890;
var height = 450;

var posterWidth = 170;
var posterHeight = 278;

var numberVisible = 5;
var tab = 0;

var svg = d3.select("#posters")
.attr("width", width)
.attr("height", height);

var data = [0,1,2,3,4,5,6,7,8,9,10,11,12];

var posterGroup = svg.selectAll("g")
.data(data)
.enter().append("g")
.attr("id", function (d, i) {
	return "poster_" + i;
})
.attr("transform", function (d, i) {
	return "translate(" + ((posterWidth + 10) * i) + ", " +
		((height / 2) - (posterHeight / 2)) + ")";
});

d3.selection.prototype.moveToFront = function() {  
	return this.each(function () {
		this.parentNode.appendChild(this);
	});
};

posterGroup.append("rect")
.attr("width", posterWidth)
.attr("height", posterHeight)
.style("fill", function (d, i) {
	if (i % 3 == 0)
		return "yellow";
	if (i % 2 == 0)
		return "cyan";
	return "magenta";
})
.on("mouseover", function (d, i) {
	if (i % numberVisible != 0 && ((i + 1) % numberVisible != 0)) {
		d3.select("#poster_" + i).transition()
		.attr("transform", "translate(" + (((posterWidth + 10) * i - width *
			tab - 10 * tab) + 0.5 * posterWidth - 0.5 * posterWidth * 1.5) +
			", " + ((height / 2) - (posterHeight * 1.5 / 2)) + ") scale(1.5)");
	}
	else if (i % numberVisible == 0) {
		d3.select("#poster_" + i).transition()
		.attr("transform", "translate(" + (((posterWidth + 10) * i) -
			width * tab - 10 * tab) + ", " + ((height / 2) -
			(posterHeight * 1.5 / 2)) + ") scale(1.5)");
	}
	else {
		d3.select("#poster_" + i).transition()
		.attr("transform", "translate(" + (width - posterWidth * 1.5) +
			", " + ((height / 2) - (posterHeight * 1.5 / 2)) + ") scale(1.5)");
	}
	d3.select("#poster_" + i).moveToFront().style("stroke", "#ffffff");
	data.forEach(function (d, j) {
		if (i % numberVisible == 0 && j > i) {
			d3.select("#poster_" + j).transition()
			.attr("transform", "translate(" + (((posterWidth + 10) * (j - 1) +
				(posterWidth * 1.5) + 10) - width * tab - 10 * tab) + ", " +
				((height / 2) - (posterHeight / 2)) + ")");
		}
		else if ((i + 1) % numberVisible == 0 && j < i) {
			d3.select("#poster_" + j).transition()
			.attr("transform", "translate(" + (((posterWidth + 10) * (j + 1) -
				(posterWidth * 1.5) - 10) - width * tab - 10 * tab) + ", " +
				((height / 2) - (posterHeight / 2)) + ")");
		}
		else if (j > i) {
			d3.select("#poster_" + j).transition()
			.attr("transform", "translate(" + ((posterWidth + 10) * j - width *
				tab - 10 * tab + (posterWidth * 1.5 /2 - posterWidth / 2)) +
				", " + ((height / 2) - (posterHeight / 2)) + ")");
		}
		else if (i % numberVisible != 0 && j < i) {
			d3.select("#poster_" + j).transition()
			.attr("transform", "translate(" + ((posterWidth + 10) * j -
				(posterWidth * 1.5 /2 - posterWidth / 2) - width * tab - 10 * tab) +
				", " + ((height / 2) - (posterHeight / 2)) + ")");
		}
	});
})
.on("mouseout", function (d, i) {
	d3.select("#poster_" + i).transition()
	.attr("transform", "translate(" + (((posterWidth + 10) * i) - width * tab -
		10 * tab) + ", " + ((height / 2) - (posterHeight / 2)) + ")")
	.style("stroke", "none");
	data.forEach(function (d, j) {
		if (j > i || j < i) {
			d3.select("#poster_" + j).transition()
			.attr("transform", "translate(" + (((posterWidth + 10) * j) - width *
				tab - 10 * tab) + ", " + ((height / 2) - (posterHeight / 2)) + ")");
		}
	});
});

// posterGroup.append("text")
// .attr("x", posterWidth / 2)
// .attr("y", posterHeight / 2)
// .style("fill", "#ffffff")
// .style("font-family", "'Open Sans', sans-serif")
// .style("text-anchor", "middle")
// .style("alignment-baseline", "middle")
// .style("pointer-events", "none")
// .text(function (d, i) { return "" + i; });


var leftArrow = d3.select("#arrow_left")
.append("text")
.attr("x", 10)
.attr("y", 225)
.style("fill", "#999999")
.style("font-size", 36)
.style("font-family", "'Open Sans', sans-serif")
.style("text-anchor", "middle")
.style("alignment-baseline", "middle")
.style("cursor", "pointer")
.style("visibility", "hidden")
.text("<")
.on("mouseover", function () {
	d3.select(this).style("fill", "#ffffff");
})
.on("mouseout", function () {
	d3.select(this).style("fill", "#999999");
})
.on("click", function () {
	tab -= 1;
	data.forEach(function (d, i) {
		d3.select("#poster_" + i).transition()
		.attr("transform", function () {
			return "translate(" + (((posterWidth + 10) * i) - width * tab - 10 * tab) +
				", " + ((height / 2) - (posterHeight / 2)) + ")";
		});
	});
	rightArrow
	.style("visibility", function () {
		if ((tab + 1) * numberVisible <= data.length)
			return "visible";
		return "hidden";
	});
	d3.select(this)
	.style("visibility", function () {
		if (tab == 0)
			return "hidden";
		return "visible";
	})
});

var rightArrow = d3.select("#arrow_right")
.append("text")
.attr("x", 10)
.attr("y", 225)
.style("fill", "#999999")
.style("font-size", 36)
.style("font-family", "'Open Sans', sans-serif")
.style("text-anchor", "middle")
.style("alignment-baseline", "middle")
.style("cursor", "pointer")
.style("visibility", function () {
	if (data.length < numberVisible)
		return "hidden";
	return "visible";
})
.text(">")
.on("mouseover", function () {
	d3.select(this).style("fill", "#ffffff");
})
.on("mouseout", function () {
	d3.select(this).style("fill", "#999999");
})
.on("click", function () {
	tab += 1;
	data.forEach(function (d, i) {
		d3.select("#poster_" + i).transition()
		.attr("transform", function () {
			return "translate(" + (((posterWidth + 10) * i) - width * tab - 10 * tab) +
				", " + ((height / 2) - (posterHeight / 2)) + ")";
		});
	});
	leftArrow.style("visibility", "visible");
	d3.select(this)
	.style("visibility", function () {
		if ((tab + 1) * numberVisible < data.length)
			return "visible";
		return "hidden";
	})
});
