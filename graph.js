(function() { 
    d3.csv("./collision_crash_2019_2023.csv").then((data) => { 
        const sortedDataByMonth = new Map();
        // finds all unique values for years (available years)
            // data.map() returns array of all year values
            // new Set() returns set of unique values
            // Array.from() returns array (converts set to array)
        const availableYears = Array.from(new Set(data.map(d => +d.crash_year)))
        // Using availableYears create a dropdown for users to select year
            // Selects the <select> element in the html
            // Adds values to the <options> element using the availableYears
            // Make the current state of the dropdown the selectedYear
        const dropdown = d3.select("#year-select")
        dropdown.selectAll("option")
            .data(availableYears)
            .join("option")
            .attr("value", d => d)
            .text(d => d)
        let selectedYear = 2023;
        dropdown.property("value", selectedYear);
        
        data.forEach(row => {
            const year = +row.crash_year
            const month = +row.crash_month
            const key = `${year}-${(month)}`
            const date = new Date(year, month-1)

            if (!sortedDataByMonth.has(key)){
                sortedDataByMonth.set(key, {
                    date,
                    count: 0,

                    aggressive : 0, 
                    alcohol: 0,
                    phone: 0,
                    distracted: 0,
                    drug: 0, 
                    vehicle_failure: 0, 
                    fatigue: 0, 
                    run_red: 0, 
                    run_stop: 0, 
                    speeding: 0, 
                    tailgating: 0, 

                    aggressive_injuries: 0, 
                    alcohol_injuries: 0, 
                    phone_injuries: 0,
                    distracted_injuries: 0, 
                    drug_injuries: 0,
                    vehicle_failure_injuries: 0, 
                    fatigue_injuries: 0,
                    run_red_injuries: 0, 
                    run_stop_injuries: 0, 
                    speeding_injuries: 0,
                    tailgating_injuries: 0, 

                    aggressive_deaths: 0, 
                    alcohol_deaths: 0, 
                    phone_deaths: 0,
                    distracted_deaths: 0, 
                    drug_deaths: 0,
                    vehicle_failure_deaths: 0, 
                    fatigue_deaths: 0,
                    run_red_deaths: 0, 
                    run_stop_deaths: 0, 
                    speeding_deaths: 0,
                    tailgating_deaths: 0, 

                    sixteen: 0,
                    seventeen: 0,
                    eighteen: 0, 
                    nineteen: 0, 
                    twenty: 0, 
                    fifty_plus: 0,  
                    sixtyfive_plus: 0, 
                    sevetyfive_plus: 0, 

                    fatal: 0,
                    serious_injury: 0,
                    injury: 0,
                    
                    belted_death: 0,
                    unb_death: 0, 
                    ped_count: 0, 
                    ped_death_count: 0
                })
            }

            const entry = sortedDataByMonth.get(key);

            entry.count += 1;

            //bargraph data
            entry.aggressive += +row.aggressive_driving
            entry.alcohol += +row.alcohol_related
            entry.phone += +row.cell_phone
            entry.distracted += +row.distracted
            entry.drug += +row.drug_related
            entry.vehicle_failure += +row.vehicle_failure
            entry.fatigue += +row.fatigue_asleep
            entry.run_red += +row.running_red_lt
            entry.run_stop += +row.running_stop_sign
            entry.speeding += +row.speeding_related
            entry.tailgating += +row.tailgating
            //deaths
            if ((+row.aggressive_driving > 0)&&(+row.fatal_count > 0)){
                entry.aggressive_deaths += +row.fatal_count
            }
            if ((+row.alcohol_related > 0)&&(+row.fatal_count > 0)){
                entry.alcohol_deaths += +row.fatal_count
            }
            if ((+row.cell_phone > 0)&&(+row.fatal_count > 0)){
                entry.phone_deaths += +row.fatal_count
            }
            if ((+row.distracted > 0)&&(+row.fatal_count > 0)){
                entry.distracted_deaths += +row.fatal_count
            }
            if ((+row.drug_related > 0)&&(+row.fatal_count > 0)){
                entry.drug_deaths += +row.fatal_count
            }
            if ((+row.vehicle_failure > 0)&&(+row.fatal_count > 0)){
                entry.vehicle_failure_deaths += +row.fatal_count
            }
            if ((+row.fatigue_asleep > 0)&&(+row.fatal_count > 0)){
                entry.fatigue_deaths += +row.fatal_count
            }
            if ((+row.running_red_lt> 0)&&(+row.fatal_count > 0)){
                entry.run_red_deaths += +row.fatal_count
            }
            if ((+row.running_stop_sign > 0)&&(+row.fatal_count > 0)){
                entry.run_stop_deaths += +row.fatal_count
            }
            if ((+row.speeding_related > 0)&&(+row.fatal_count > 0)){
                entry.speeding_deaths += +row.fatal_count
            }
            if ((+row.tailgating > 0)&&(+row.fatal_count > 0)){
                entry.tailgating_deaths += +row.fatal_count
            }
            //injuries 
            if ((+row.aggressive_driving > 0)&&(+row.injury > 0)){
                entry.aggressive_injuries += +row.injury
            }
            if ((+row.alcohol_related > 0)&&(+row.injury > 0)){
                entry.alcohol_injuries += +row.injury
            }
            if ((+row.cell_phone > 0)&&(+row.injury > 0)){
                entry.phone_injuries += +row.injury
            }
            if ((+row.distracted > 0)&&(+row.injury > 0)){
                entry.distracted_injuries += +row.injury
            }
            if ((+row.drug_related > 0)&&(+row.injury > 0)){
                entry.drug_injuries += +row.injury
            }
            if ((+row.vehicle_failure > 0)&&(+row.injury > 0)){
                entry.vehicle_failure_injuries += +row.injury
            }
            if ((+row.fatigue_asleep > 0)&&(+row.injury > 0)){
                entry.fatigue_injuries += +row.injury
            }
            if ((+row.running_red_lt> 0)&&(+row.injury > 0)){
                entry.run_red_injuries += +row.injury
            }
            if ((+row.running_stop_sign > 0)&&(+row.injury > 0)){
                entry.run_stop_injuries += +row.injury
            }
            if ((+row.speeding_related > 0)&&(+row.injury > 0)){
                entry.speeding_injuries += +row.injury
            }
            if ((+row.tailgating > 0)&&(+row.injury > 0)){
                entry.tailgating_injuries += +row.injury
            }

            //circle graph data
            entry.sixteen += +row.driver_count_16yr
            entry.seventeen += +row.driver_count_17yr
            entry.eighteen += +row.driver_count_18yr
            entry.nineteen += +row.driver_count_19yr
            entry.twenty += +row.driver_count_20yr
            entry.fifty_plus += +row.driver_count_50_64
            entry.sixtyfive_plus += +row.driver_count_65_74
            entry.sevetyfive_plus += +row.driver_count_75plus

            //others
            entry.fatal += +row.fatal_count
            if ((+row.fatal === 0) && (+row.fatal_or_susp_serious_inj !== 0)){
                entry.serious_injury += +row.fatal_or_susp_serious_inj
            }
            entry.injury += +row.injury

            entry.belted_death += +row.belted_death_count
            entry.unb_death += +row.unb_death_count
            entry.ped_count += +row.ped_count
            entry.ped_death_count += +row.ped_death_count

        });
        console.log(sortedDataByMonth);

        function clearGraphs() {
            d3.select("#graphs").selectAll("*").remove();
            d3.select("#graphs2").selectAll("*").remove();
        }

        function drawGraphsForYear(year){
            const crashCounts = Array.from(sortedDataByMonth.values()).sort((a,b) => a.date - b.date)
            const crashCountsYear = crashCounts.filter(d => d.date.getFullYear() === year);
    
            const width = 600; 
            const height = 400;
            const margin = {top: 50, bottom: 50, left: 50, right: 50}

            const svg = d3.select("#graphs")
            const linegraph_tooltip = d3.select("#linegraph_tooltip")
            // x axis scale
            // smallest date to highest date 
            const linegraphX = d3.scaleTime()
                .domain(d3.extent(crashCountsYear, d => d.date))
                .range([margin.left, width-margin.right])
            // y axis scale
            // 0 - highest crashcount per month
            const linegraphY = d3.scaleLinear()
                .domain([0, 900])
                .nice()
                .range([height - margin.bottom, margin.top])

            const line = d3.line()
                .x(d=> linegraphX(d.date))
                .y(d => linegraphY(d.count));
            // draw line
            svg.append("path")
                .datum(crashCountsYear)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", line);

            svg.selectAll("circle")
                .data(crashCountsYear)
                .join("circle")
                .attr("cx", d=>linegraphX(d.date))
                .attr("cy", d=>linegraphY(d.count))
                .attr("r", 10)
                .attr("fill", "steelblue")
                .on("click", function(event, d){
                    updateBarChart(d);
                })
                .on("mouseover", function(event, d) {
                    linegraph_tooltip.style("display", "block")
                        .html(`<strong>${d3.timeFormat("%B %Y")(d.date)}</strong><br/>
                            Fatal: ${d.fatal} <br/>
                            Injury: ${d.injury}`)
                    d3.select(this)
                        .style("stroke", "black")
                        .style("fill", "red");
                })
                .on("mousemove", function(event){
                    linegraph_tooltip.style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })
                .on("mouseout", function(event){
                    linegraph_tooltip.style("display", "none");
                    d3.select(this)
                        .style("stroke", "none")
                        .style("fill", "steelblue")
                })

            // x axis
            svg.append("g")
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(linegraphX).tickFormat(d3.timeFormat("%b %Y")))
                .selectAll("text")
                    .attr("transform", "rotate(-40)")
                    .style("text-anchor", "end")
            // y axis
            svg.append("g")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(linegraphY))
                .selectAll("text")
                    .attr("fill", "black")


            // Barchart
            const bar_svg = d3.select("#graphs2")
            const categories = ["aggressive", "alcohol", "phone", "distracted", "drug", "vehicle_failure", "fatigue", "run_red", "run_stop", "speeding", "tailgating"]
            const categories_deaths = ["aggressive_deaths", "alcohol_deaths", "phone_deaths", "distracted_deaths", "drug_deaths", "vehicle_failure_deaths", "fatigue_deaths", "run_red_deaths", "run_stop_deaths", "speeding_deaths", "tailgating_deaths"]
            const categories_injuries = ["aggressive_injuries", "alcohol_injuries", "phone_injuries", "distracted_injuries", "drug_injuries", "vehicle_failure_injuries", "fatigue_injuries", "run_red_injuries", "run_stop_injuries", "speeding_injuries", "tailgating_injuries"]
            const barchart_tooltip = d3.select("#barchart_tooltip")
            const yearTotals = categories.reduce((acc, cat) => {
                acc[cat] = d3.sum(crashCountsYear, d => d[cat]);
                return acc;
            }, {});
            const yearTotalDeaths = categories_deaths.reduce((acc, cat) => {
                acc[cat] = d3.sum(crashCountsYear, d => d[cat]);
                return acc;
            }, {});
            const yearTotalInjuries = categories_injuries.reduce((acc, cat) => {
                acc[cat] = d3.sum(crashCountsYear, d => d[cat]);
                return acc;
            }, {});
            //scales
            const barchartX = d3.scaleBand()
                .domain(categories)
                .range([margin.left, width-margin.right])
                .padding(0.1)
            const barchartY = d3.scaleLinear()
                .domain([0, 3500])
                .nice()
                .range([height - margin.bottom, margin.top])
            // draw graph
            bar_svg.selectAll("rect")
                .data(categories)
                .join("rect")
                .attr("x", d => barchartX(d))
                .attr("y", d => barchartY(yearTotals[d]))
                .attr("width", barchartX.bandwidth())
                .attr("height", d => barchartY(0) - barchartY(yearTotals[d]))
                .attr("fill", "steelblue")
                .on('mouseover', (event, d) => {
                    d3.select(event.currentTarget)
                        .style("stroke", "black")
                        .style("fill", "red")
                    barchart_tooltip.style("display", "block")
                        .html(`<strong>${d.charAt(0).toUpperCase() + d.slice(1)}</strong><br/>
                            Count: ${yearTotals[d]}<br/>
                            Deaths: ${yearTotalDeaths[d + "_deaths"]}<br/>
                            Death Percentage: ${((yearTotalDeaths[d + "_deaths"]/yearTotals[d])*100).toFixed(2)}%<br/>
                            Injury: ${yearTotalInjuries[d + "_injuries"]}<br/>
                            Injury Percentage: ${((yearTotalInjuries[d + "_injuries"]/yearTotals[d])*100).toFixed(2)}%<br/>
                            `);
                            
                }) 
                .on("mousemove", function(event) {
                    barchart_tooltip.style("left", (event.pageX - 150) + "px")
                        .style("top", (event.pageY - 75) + "px");
                })
                .on("mouseout", function() {
                    barchart_tooltip.style("display", "none");
                    d3.select(this)
                        .style("stroke", "none")
                        .style("fill", "steelblue")
                })
            // x axis
            bar_svg.append("g")
                .attr("transform", `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(barchartX))
                .selectAll("text")
                    .attr("transform", "rotate(-40)")
                    .style("text-anchor", "end")
                    .text(function(d) {
                        return d.charAt(0).toUpperCase() + d.slice(1);
                    })
            // y axis
            const barYAxis = bar_svg.append("g")
                .attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(barchartY))
            barYAxis.selectAll("text")
                    .attr("fill", "black")
            
                    function updateBarChart(inputData) {
                        const categories = ["aggressive", "alcohol", "phone", "distracted", "drug", "vehicle_failure", "fatigue", "run_red", "run_stop", "speeding", "tailgating"]
                        
                        const yMax = d3.max(categories, cat => inputData[cat]);
                        barchartY.domain([0, 350]).nice();

                        barYAxis
                            .call(d3.axisLeft(barchartY))

                        const bars = bar_svg.selectAll("rect")
                            .data(categories)
                        
                        bars.join("rect")
                            .attr("x", d => barchartX(d))
                            .attr("y", d => barchartY(inputData[d]))
                            .attr("width", barchartX.bandwidth())
                            .attr("height", d => barchartY(0) - barchartY(inputData[d]))
                            .attr("fill", "steelblue")
                            .on('mouseover', (event, d) => {
                                d3.select(event.currentTarget)
                                    .style("stroke", "black")
                                barchart_tooltip.style("display", "block")
                                    .html(`<strong>${d.charAt(0).toUpperCase() + d.slice(1)}</strong><br/>
                                        Count: ${inputData[d]}<br/>
                                        Deaths: ${inputData[d + "_deaths"]}<br/>
                                        Death Percentage: ${((inputData[d + "_deaths"]/inputData[d])*100).toFixed(2)}%<br/>
                                        Injury: ${inputData[d + "_injuries"]}<br/>
                                        Injury Percentage: ${((inputData[d + "_injuries"]/inputData[d])*100).toFixed(2)}%<br/>
                                        `);

                            })
                                                 
                    
                    }
                
                    function resetBarChart() {
                        const categories = ["aggressive", "alcohol", "phone", "distracted", "drug", "vehicle_failure", "fatigue", "run_red", "run_stop", "speeding", "tailgating"];
                    
                        barchartY.domain([0, d3.max(categories, cat => yearTotals[cat])]).nice();
                    
                        bar_svg.selectAll("rect")
                            .data(categories)
                            .join("rect")
                            .attr("x", d => barchartX(d))
                            .attr("y", d => barchartY(yearTotals[d]))
                            .attr("width", barchartX.bandwidth())
                            .attr("height", d => barchartY(0) - barchartY(yearTotals[d]))
                            .attr("fill", "steelblue");
                    }
        }
        
        dropdown.on("change", function () {
            const newYear = +this.value;
            clearGraphs();
            drawGraphsForYear(newYear);
        });

        drawGraphsForYear(selectedYear)
            
    });
})();
