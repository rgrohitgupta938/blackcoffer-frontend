import React from "react";
import "../styles/sidebar.css";

const Sidebar = ({ filters, setFilters, options }) => {
  const handleFilterChange = (e, filterType) => {
    setFilters({ ...filters, [filterType]: e.target.value });
  };

  return (
    <div id="sidebar" className="container d-flex flex-column sticky-sidebar">
      <div className="row mt-3 mb-3">
        <h6>Filter By End Year:</h6>
        <select onChange={(e) => handleFilterChange(e, "endYear")}>
          <option value="">Select End Year</option>
          {options.endYear.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="row mt-3 mb-3">
        <h6>Filter By Topics:</h6>
        <select onChange={(e) => handleFilterChange(e, "topic")}>
          <option value="">Select Topic</option>
          {options.topics.map((topic, index) => (
            <option key={index} value={topic}>
              {topic
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
      </div>
      <div className="row mt-3 mb-3">
        <h6>Filter By Sector:</h6>
        <select onChange={(e) => handleFilterChange(e, "sector")}>
          <option value="">Select Sector</option>
          {options.sectors.map((sector, index) => (
            <option key={index} value={sector}>
              {sector
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
      </div>
      <div className="row mt-3 mb-3">
        <h6>Filter By Region:</h6>
        <select onChange={(e) => handleFilterChange(e, "region")}>
          <option value="">Select Region</option>
          {options.regions.map((region, index) => (
            <option key={index} value={region}>
              {region
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
      </div>
      <div className="row mt-3 mb-3">
        <h6>Filter By Pestle:</h6>
        <select onChange={(e) => handleFilterChange(e, "pestle")}>
          <option value="">Select Pestle</option>
          {options.pestles.map((pestle, index) => (
            <option key={index} value={pestle}>
              {pestle
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
      </div>
      <div className="row mt-3 mb-3">
        <h6>Filter By Source:</h6>
        <select onChange={(e) => handleFilterChange(e, "source")}>
          <option value="">Select Source</option>
          {options.sources.map((source, index) => (
            <option key={index} value={source}>
              {source
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
      </div>
      <div className="row mt-3 mb-3">
        <h6>Filter By Country:</h6>
        <select onChange={(e) => handleFilterChange(e, "country")}>
          <option value="">Select Country</option>
          {options.countries.map((country, index) => (
            <option key={index} value={country}>
              {country
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
