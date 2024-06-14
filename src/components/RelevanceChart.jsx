import React, { useEffect } from "react";
import * as d3 from "d3";

const RelevanceChart = ({ data }) => {
  useEffect(() => {
    const max = 8;
    // Filter data based on intensity not being null
    const filteredData = data.filter((d) => d.relevance !== null);

    // Define the dimensions and margins of the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 90 },
      width = 990 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Remove any existing chart before creating a new one
    d3.select("#relevance-chart").selectAll("*").remove();

    // Create an SVG container for the chart
    const svg = d3
      .select("#relevance-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create a tooltip div element
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#f4f4f4")
      .style("padding", "5px 10px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Extract intensity values from the filtered data
    const relevanceValue = filteredData.map((d) => d.relevance);
    const min = 0;
    console.log(min);

    // Calculate the bin width based on the maximum intensity and the number of desired bins (48)
    const binWidth = (max - min) / 8;

    // Generate an array of threshold values with 48 evenly spaced bins
    const thresholds = d3.range(min, max + binWidth, binWidth);

    // Create a histogram generator with dynamic thresholds
    const histogram = d3.histogram().domain([0, max]).thresholds(thresholds);

    // Generate bins for the histogram
    const bins = histogram(relevanceValue);
    console.log(bins);
    // Create the x-scale
    const xScale = d3
      .scaleBand()
      .domain(bins.map((bin) => bin.x0))
      .range([0, width])
      .padding(0.1);

    // Create the y-scale
    const yScale = d3.scaleLinear().domain([0, 350]).nice().range([height, 0]);

    // Append the bars to the SVG
    svg
      .selectAll(".bar")
      .data(bins)
      .enter()
      .append("rect")
      .attr("className", "bar")
      .attr("x", (bin) => xScale(bin.x0))
      .attr("y", (bin) => yScale(bin.length))
      .attr("width", xScale.bandwidth())
      .attr("height", (bin) => height - yScale(bin.length))
      .attr("fill", "orange")
      .on("mouseover", (event, bin) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Count: ${bin.length}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });
    console.log("bandwidth", xScale.bandwidth());
    // Add the bar values as text elements
    svg
      .selectAll(".label")
      .data(bins)
      .enter()
      .append("text")
      .attr("className", "label")
      .attr("x", (bin) => xScale(bin.x0) + xScale.bandwidth() / 2)
      .attr("y", (bin) => yScale(bin.length) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((bin) => (bin.length !== 0 ? bin.length : ""));

    // Add the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    //Add x-axis label
    svg
      .append("text")
      .attr("className", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2 - 30)
      .attr("y", height + margin.bottom)
      .text("Relevance")
      .style("font-size", "26px");
    console.log(d3);

    //Add the y-axis label
    svg
      .append("text")
      .attr("className", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2)
      .attr("y", -margin.left + 20)
      .text("Number of News Relevance-wise")
      .style("font-size", "20px");
    // Add the y-axis
    svg.append("g").call(d3.axisLeft(yScale));
  }, [data]);

  return (
    <div>
      <h1>Relevance Histogram</h1>
      <svg id="relevance-chart"></svg>
    </div>
  );
};

export default RelevanceChart;
