import React, { useEffect } from "react";
import * as d3 from "d3";

const TopicChart = ({ data }) => {
  useEffect(() => {
    // Filter data based on non-empty topic names
    const filteredData = data.filter((d) => d.topic !== "");

    // Count occurrences of each topic
    const topicCounts = filteredData.reduce((acc, curr) => {
      acc[curr.topic] = (acc[curr.topic] || 0) + 1;
      return acc;
    }, {});

    // Convert object to array of { topic, count } pairs
    const topicData = Object.entries(topicCounts).map(([topic, count]) => ({
      topic,
      count,
    }));

    // Sort topicData by count in descending order
    topicData.sort((a, b) => b.count - a.count);

    // Define the dimensions and margins of the chart
    const margin = { top: 20, right: 30, bottom: 80, left: 90 }, // Increased bottom margin
      width = 990 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Remove any existing chart before creating a new one
    d3.select("#topic-chart").selectAll("*").remove();

    // Create an SVG container for the chart
    const svg = d3
      .select("#topic-chart")
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

    // Create the x-scale
    const xScale = d3
      .scaleBand()
      .domain(topicData.map((d) => d.topic))
      .range([0, width])
      .padding(0.1);

    // Create the y-scale
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(topicData, (d) => d.count)])
      .nice()
      .range([height, 0]);

    // Append the bars to the SVG
    svg
      .selectAll(".bar")
      .data(topicData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.topic))
      .attr("y", (d) => yScale(d.count))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.count))
      .attr("fill", "orange")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Count: ${d.count}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Add the bar values as text elements
    svg
      .selectAll(".label")
      .data(topicData)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d.topic) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.count) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((d) => (d.count !== 0 ? d.count : ""));

    // Add the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("dy", "1.5em") // Adjust the distance between the x-axis ticks and the label
      .style("text-anchor", "end");

    // Add x-axis label
    svg
      .append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom) // Adjust vertical position to increase space
      .text("Topics")
      .style("font-size", "16px");

    // Add the y-axis
    svg.append("g").call(d3.axisLeft(yScale));

    // Add y-axis label
    svg
      .append("text")
      .attr("class", "y-axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2)
      .attr("y", -margin.left + 20)
      .text("Number of Topics")
      .style("font-size", "16px");
  }, [data]);

  return (
    <div>
      <h1>Topic Histogram</h1>
      <svg id="topic-chart"></svg>
    </div>
  );
};

export default TopicChart;
