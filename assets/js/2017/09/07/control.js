function bezierCurveAnimation(tag, points, height=300) {
    var container = document.querySelector(tag);
    var w = container.offsetWidth,
        h = height,
        t = .5,
        delta = .01,
        padding = 10,
        bezier = {},
        n = points.length,
        stroke = d3.scale.category20b(),
	    line = d3.svg.line().x(x).y(y),
        orders = d3.range(n, n + 1);

    var offset = w / 2;
    for (var i = 0; i < n; i ++) {
        points[i].x += offset;
        points[i].y = h-3*padding - points[i].y;
    }

    var vis = d3.select(tag).selectAll("svg")
            .data(orders)
            .enter().append("svg")
            .attr("width", w + 2 * padding)
            .attr("height", h + 2 * padding)
            .append("g")
            .attr("transform", "translate(" + padding + "," + padding + ")");


    update();

    vis.selectAll("circle.control")
        .data(function(d) { return points.slice(0, d); })
        .enter().append("circle")
        .attr("class", "control")
        .attr("r", 7)
        .attr("cx", x)
        .attr("cy", y)
        .call(d3.behavior.drag()
              .on("dragstart", function(d) {
                  this.__origin__ = [d.x, d.y];
				  d3.select(this).classed("drag", true);
              })
              .on("drag", function(d) {
                  d.x = Math.min(w-2*padding, Math.max(0, this.__origin__[0] += d3.event.dx));
                  d.y = Math.min(h-3*padding, Math.max(0, this.__origin__[1] += d3.event.dy));
                  bezier = {};
                  update();
                  vis.selectAll("circle.control")
                      .attr("cx", x)
                      .attr("cy", y);
                  vis.selectAll("text.controltext")
                      .text(function(d, i) { return ["P",i, " (", (d.x-offset).toFixed(0), ", ", (h-3*padding-d.y).toFixed(0), ")"].join(""); });

              })
              .on("dragend", function() {
                  delete this.__origin__;
				  d3.select(this).classed("drag", false);
              }));

    vis.append("text")
        .attr("class", "t")
        .attr("x", w / 2)
        .attr("y", h)
        .attr("text-anchor", "middle");

    vis.selectAll("text.controltext")
        .data(function(d) { return points.slice(0, d); })
        .enter().append("text")
        .attr("class", "controltext")
        .attr("dx", "10px")
        .attr("dy", ".4em")
        .text(function(d, i) { return ["P",i, " (", (points[i].x-offset).toFixed(0), ", ", (h-3*padding-points[i].y).toFixed(0), ")"].join(""); });


    var last = 0;
    d3.timer(function(elapsed) {
        t = (t + (elapsed - last) / 5000) % 1;
        last = elapsed;
        update();
    });

    function update() {
        var interpolation = vis.selectAll("g")
                .data(function(d) { return getLevels(d, t); });
        interpolation.enter().append("g")
            .style("fill", colour)
            .style("stroke", colour);

        var circle = interpolation.selectAll("circle")
                .data(Object);
        circle.enter().append("circle")
            .attr("r", 4);
        circle
            .attr("cx", x)
            .attr("cy", y);

        var path = interpolation.selectAll("path")
                .data(function(d) { return [d]; });
        path.enter().append("path")
            .attr("class", "line")
            .attr("d", line);
        path.attr("d", line);

        var curve = vis.selectAll("path.curve")
                .data(getCurve);
        curve.enter().append("path")
            .attr("class", "curve");
        curve.attr("d", line);

        vis.selectAll("text.controltext")
            .attr("x", x)
            .attr("y", y);
        vis.selectAll("text.t")
            .text("t=" + t.toFixed(2));
    }

    function interpolate(d, p) {
        if (arguments.length < 2) p = t;
        var r = [];
        for (var i=1; i<d.length; i++) {
            var d0 = d[i-1], d1 = d[i];
            r.push({x: d0.x + (d1.x - d0.x) * p, y: d0.y + (d1.y - d0.y) * p});
        }
        return r;
    }

    function getLevels(d, t_) {
        if (arguments.length < 2) t_ = t;
        var x = [points.slice(0, d)];
        for (var i=1; i<d; i++) {
            x.push(interpolate(x[x.length-1], t_));
        }
        return x;
    }

    function getCurve(d) {
        var curve = bezier[d];
        if (!curve) {
            curve = bezier[d] = [];
            for (var t_=0; t_<=1; t_+=delta) {
                var x = getLevels(d, t_);
                curve.push(x[x.length-1][0]);
            }
        }
        return [curve.slice(0, t / delta + 1)];
    }

    function colour(d, i) {
        stroke(-i);
        return d.length > 1 ? stroke(i) : "red";
    }

    function x(d) { return d.x; }
    function y(d) { return d.y; }

}

