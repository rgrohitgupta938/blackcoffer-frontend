import React, { useEffect } from "react";
import BarChart from "./BarChart";
import LikeliCart from "./LikeliCart";
import RelevanceChart from "./RelevanceChart";
import CountryChart from "./CountryChart";
import TopicChart from "./TopicChart";
import RegionChart from "./RegionChart";

const Home = ({ data, filters }) => {
  console.log(filters);
  let filteredData = [...data];
  if (
    filters.endYear ||
    filters.topic ||
    filters.sector ||
    filters.region ||
    filters.pestle ||
    filters.country ||
    filters.source
  ) {
    if (filters.endYear) {
      filteredData = filteredData.filter(
        (i) => +i.end_year === +filters.endYear
      );
    }
    if (filters.topic) {
      filteredData = filteredData.filter((i) => i.topic === filters.topic);
    }
    if (filters.sector) {
      filteredData = filteredData.filter((i) => i.sector === filters.sector);
    }
    if (filters.region) {
      filteredData = filteredData.filter((i) => i.region === filters.region);
    }
    if (filters.pestle) {
      filteredData = filteredData.filter((i) => i.pestle === filters.pestle);
    }
    if (filters.source) {
      filteredData = filteredData.filter((i) => i.source === filters.source);
    }
    if (filters.country) {
      filteredData = filteredData.filter((i) => i.country === filters.country);
    }
  }
  useEffect(() => {}, [filteredData]);
  console.log(filteredData);
  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        {filteredData.length !== 0 ? <BarChart data={filteredData} /> : ""}
      </div>
      <div className="row">
        {filteredData.length !== 0 ? <LikeliCart data={filteredData} /> : ""}
      </div>
      <div className="row">
        {filteredData.length !== 0 ? (
          <RelevanceChart data={filteredData} />
        ) : (
          ""
        )}
      </div>
      <div className="row">
        {filteredData.length !== 0 ? <CountryChart data={filteredData} /> : ""}
      </div>
      <div className="row">
        {filteredData.length !== 0 ? <TopicChart data={filteredData} /> : ""}
      </div>
      <div className="row">
        {filteredData.length !== 0 ? <RegionChart data={filteredData} /> : ""}
      </div>
    </div>
  );
};

export default Home;
