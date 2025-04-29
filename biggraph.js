d3.csv("./collision_crash_2019_2023.csv").then((data) => {
    const intervals = [
        { range: "12am-4am", count: 0 },
        { range: "4am-8am", count: 0 },
        { range: "8am-12pm", count: 0 },
        { range: "12pm-4pm", count: 0 },
        { range: "4pm-8pm", count: 0 },
        { range: "8pm-12am", count: 0 }
    ];

    data.forEach(d => {
        const hour = +d.time_of_day; 
        if (hour >= 0 && hour < 4) intervals[0].count++;
        else if (hour >= 4 && hour < 8) intervals[1].count++;
        else if (hour >= 8 && hour < 12) intervals[2].count++;
        else if (hour >= 12 && hour < 16) intervals[3].count++;
        else if (hour >= 16 && hour < 20) intervals[4].count++;
        else if (hour >= 20 && hour < 24) intervals[5].count++;
    });

    // Set up SVG and dimensions
    const svg = d3.select("#graph"),
          width = +svg.attr("width"),
          height = +svg.attr("height"),
          margin = { top: 50, right: 50, bottom: 100, left: 70 },
          chartWidth = width - margin.left - margin.right,
          chartHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Tooltip div
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("padding", "6px 10px")
        .style("background", "#333")
        .style("color", "white")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("opacity", 0);

    // scales
    const x = d3.scaleBand()
        .domain(intervals.map(d => d.range))
        .range([0, chartWidth])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(intervals, d => d.count)]).nice()
        .range([chartHeight, 0]);

    // x Axis
    g.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "rotate(-40)")
            .style("text-anchor", "end");

    // y Axis
    g.append("g")
        .call(d3.axisLeft(y));

    // bars with hover
    g.selectAll(".bar")
        .data(intervals)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.range))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => chartHeight - y(d.count))
            .attr("fill", "steelblue")
            .on("mouseover", (event, d) => {
                tooltip
                    .style("opacity", 1)
                    .html(`<strong>${d.range}</strong><br/>Crashes: ${d.count}`);
            })
            .on("mousemove", (event) => {
                tooltip
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 30) + "px");
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            });
});
