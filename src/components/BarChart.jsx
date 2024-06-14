import React, { useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  useEffect(() => {
    const max = 100;
    // Filter data based on intensity not being null
    const filteredData = data.filter((d) => d.intensity !== null);

    // Define the dimensions and margins of the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 90 },
      width = 990 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Remove any existing chart before creating a new one
    d3.select("#bar-chart").selectAll("*").remove();

    // Create an SVG container for the chart
    const svg = d3
      .select("#bar-chart")
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
    const intensityValues = filteredData.map((d) => d.intensity);
    const min = 0;

    // Calculate the bin width based on the maximum intensity and the number of desired bins (50)
    const binWidth = (max - min) / 50;

    // Generate an array of threshold values with evenly spaced bins
    const thresholds = d3.range(min, max + binWidth, binWidth);

    // Create a histogram generator with dynamic thresholds
    const histogram = d3.histogram().domain([0, max]).thresholds(thresholds);

    // Generate bins for the histogram
    const bins = histogram(intensityValues);

    // Filter out bins where bin.length === 0
    const filteredBins = bins.filter((bin) => bin.length !== 0);

    // Create the x-scale
    const xScale = d3
      .scaleBand()
      .domain(filteredBins.map((bin) => bin.x0))
      .range([0, width])
      .padding(0.1);

    // Create the y-scale
    const yScale = d3.scaleLinear().domain([0, 250]).nice().range([height, 0]);

    // Append the bars to the SVG
    svg
      .selectAll(".bar")
      .data(filteredBins)
      .enter()
      .append("rect")
      .attr("class", "bar")
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

    // Add the bar values as text elements
    svg
      .selectAll(".label")
      .data(filteredBins)
      .enter()
      .append("text")
      .attr("class", "label")
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

    // Add x-axis label
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2 - 30)
      .attr("y", height + margin.bottom)
      .text("Intensity")
      .style("font-size", "26px");

    // Add the y-axis label
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2)
      .attr("y", -margin.left + 20)
      .text("Number of Countries intensity-wise")
      .style("font-size", "20px");

    // Add the y-axis
    svg.append("g").call(d3.axisLeft(yScale));
  }, [data]);

  return (
    <div>
      <h1>Intensity Histogram</h1>
      <svg id="bar-chart"></svg>
    </div>
  );
};

export default BarChart;
