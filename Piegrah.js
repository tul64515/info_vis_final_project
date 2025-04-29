d3.csv("./collision_crash_2019_2023.csv").then((data) => {
    // Prepare 4-hour intervals with AM/PM labels
    const intervals = [
        { range: "12am-4am", count: 0 },
        { range: "4am-8am", count: 0 },
        { range: "8am-12pm", count: 0 },
        { range: "12pm-4pm", count: 0 },
        { range: "4pm-8pm", count: 0 },
        { range: "8pm-12am", count: 0 }
    ];

    // Count crashes in each time interval
    data.forEach(d => {
        const hour = +d.time_of_day; 
        if (hour >= 0 && hour < 4) intervals[0].count++;
        else if (hour >= 4 && hour < 8) intervals[1].count++;
        else if (hour >= 8 && hour < 12) intervals[2].count++;
        else if (hour >= 12 && hour < 16) intervals[3].count++;
        else if (hour >= 16 && hour < 20) intervals[4].count++;
        else if (hour >= 20 && hour < 24) intervals[5].count++;
    });

    // Calculate total crashes
    const totalCrashes = d3.sum(intervals, d => d.count);

    // Set up SVG and dimensions
    const width = 500, height = 500, margin = 50;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#piegraph")  
        .append("svg")
        .attr("id", "piechart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width/2},${height/2})`);

    // Color scale
    const color = d3.scaleOrdinal()
        .domain(intervals.map(d => d.range))
        .range(d3.schemeCategory10);

    // Generate the pie
    const pie = d3.pie()
        .value(d => d.count);

    const data_ready = pie(intervals);

    // Generate arcs
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("padding", "6px 10px")
        .style("background", "#333")
        .style("color", "white")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("opacity", 0);

    // Build the pie chart
    svg.selectAll('path')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.range))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", (event, d) => {
            const percentage = ((d.data.count / totalCrashes) * 100).toFixed(1);
            tooltip
                .style("opacity", 1)
                .html(`<strong>${d.data.range}</strong><br/>${percentage}% of crashes`);
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
