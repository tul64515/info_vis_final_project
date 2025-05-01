d3.csv("./collision_crash_2019_2023.csv").then((data) => {
    data.forEach(d => {
        d.crash_year = +d.crash_year;
        d.time_of_day = Math.floor(+d.time_of_day / 100); /
    });
    

    const years = [...new Set(data.map(d => d.crash_year))].sort();
    
    const yearFilter = d3.select("#graph")
        .insert("g", ":first-child")
        .attr("transform", `translate(50, 25)`);
    
    yearFilter.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .text("Filter by Year:")
        .attr("alignment-baseline", "middle");
    
    // Add a dropdown element
    const yearSelect = yearFilter.append("foreignObject")
        .attr("x", 100)
        .attr("y", -15)
        .attr("width", 100)
        .attr("height", 30)
        .append("xhtml:select")
        .attr("id", "interval-year-select")
        .style("padding", "2px")
        .style("font-size", "14px");
    
    // Include an option to show all years
    yearSelect.append("option")
        .attr("value", "all")
        .text("All Years");
    
    // Add the actual year options
    years.forEach(year => {
        yearSelect.append("option")
            .attr("value", year)
            .text(year);
    });
    
    function updateVisualization(selectedYear) {
        d3.select("#graph g.chart-container").remove();
        
        let filteredData = data;
        if (selectedYear !== "all") {
            filteredData = data.filter(d => d.crash_year === +selectedYear);
        }
        
        // Set up time ranges and counts
        const intervals = [
            { range: "12am-4am", count: 0 },
            { range: "4am-8am", count: 0 },
            { range: "8am-12pm", count: 0 },
            { range: "12pm-4pm", count: 0 },
            { range: "4pm-8pm", count: 0 },
            { range: "8pm-12am", count: 0 }
        ];
        
        // Sort data into the time buckets
        filteredData.forEach(d => {
            const hour = d.time_of_day;
            if (hour >= 0 && hour < 4) intervals[0].count++;
            else if (hour >= 4 && hour < 8) intervals[1].count++;
            else if (hour >= 8 && hour < 12) intervals[2].count++;
            else if (hour >= 12 && hour < 16) intervals[3].count++;
            else if (hour >= 16 && hour < 20) intervals[4].count++;
            else if (hour >= 20 && hour < 24) intervals[5].count++;
        });
        
        // Chart size 
        const svg = d3.select("#graph"),
              width = +svg.attr("width"),
              height = +svg.attr("height"),
              margin = { top: 50, right: 50, bottom: 100, left: 70 },
              chartWidth = width - margin.left - margin.right,
              chartHeight = height - margin.top - margin.bottom;
        
        const g = svg.append("g")
            .attr("class", "chart-container")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        const tooltip = d3.select("body").select(".tooltip");
        
        // Axes scale 
        const x = d3.scaleBand()
            .domain(intervals.map(d => d.range))
            .range([0, chartWidth])
            .padding(0.2);
        
        const y = d3.scaleLinear()
            .domain([0, d3.max(intervals, d => d.count) || 1]).nice()
            .range([chartHeight, 0]);
        
        //  X axis
        g.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "rotate(-40)")
                .style("text-anchor", "end");
        
        //  Y axis
        g.append("g")
            .call(d3.axisLeft(y));
        
        // Axis labels
        g.append("text")
            .attr("x", chartWidth / 2)
            .attr("y", chartHeight + 70)
            .attr("text-anchor", "middle")
            .text("Time Interval");
        
        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -chartHeight / 2)
            .attr("y", -50)
            .attr("text-anchor", "middle")
            .text("Number of Crashes");

        // Draw bars
        const bars = g.selectAll(".bar")
            .data(intervals)
            .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.range))
                .attr("y", d => y(d.count))
                .attr("width", x.bandwidth())
                .attr("height", d => chartHeight - y(d.count))
                .attr("fill", "steelblue");
                
        // Tooltip interactions
        bars.on("mouseover", (event, d) => {
                d3.select(event.currentTarget)
                    .attr("fill", "orange");
                
                d3.select("#interval_tooltip")
                    .style("opacity", 1)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 30) + "px")
                    .html(`<strong>${d.range}</strong><br/>Crashes: ${d.count}`);
            })
            .on("mousemove", (event) => {
                d3.select("#interval_tooltip")
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 30) + "px");
            })
            .on("mouseout", (event) => {
                d3.select(event.currentTarget)
                    .attr("fill", "steelblue");
                
                d3.select("#interval_tooltip")
                    .style("opacity", 0);
            });
    }
    
    if (d3.select("#interval_tooltip").empty()) {
        d3.select("body").append("div")
            .attr("id", "interval_tooltip")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("padding", "6px 10px")
            .style("background", "#333")
            .style("color", "white")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("opacity", 0);
    }
    
    d3.select("#interval-year-select").on("change", function() {
        updateVisualization(this.value);
    });
    
    // Start with showing everything
    updateVisualization("all");
});
