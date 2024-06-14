import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Sidebar from "./Sidebar";
import "../styles/index.css";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: "",
    topic: "",
    sector: "",
    region: "",
    pestle: "",
    source: "",
    country: "",
  });

  useEffect(() => {
    axios
      .get("https://blackcoffer-backend-2lwh.onrender.com")
      .then((response) => {
        setData(response.data);
        s;
      })
      .catch((error) => {
        console.log("Axios error: ", error);
      });
  }, []);

  const getUniqueValues = (key) => {
    return [
      ...new Set(
        data
          .map((item) => item[key])
          .filter((item) => item !== null && item !== "")
      ),
    ];
  };

  const options = {
    endYear: getUniqueValues("end_year"),
    topics: getUniqueValues("topic"),
    sectors: getUniqueValues("sector"),
    regions: getUniqueValues("region"),
    pestles: getUniqueValues("pestle"),
    sources: getUniqueValues("source"),
    countries: getUniqueValues("country"),
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar
              filters={filters}
              setFilters={setFilters}
              options={options}
            />
          </div>
          <div className="col-10 ps-5 pe-5">
            <Routes>
              <Route
                path="/"
                element={<Home data={data} filters={filters} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
