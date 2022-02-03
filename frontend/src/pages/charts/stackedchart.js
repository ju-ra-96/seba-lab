import React, { useState } from "react";
import "./charts.css";
import StackedAreaChart from "./stackedareachart";


const allKeys = ["🥑", "🍌", "🍆"];

const colors = {
  "🥑": "green",
  "🍌": "orange",
  "🍆": "purple"
};

function StackedChart() {
  const [keys, setKeys] = useState(allKeys);
  const [data, setData] = useState([
    {
      year: 1980,
      "🥑": 10,
      "🍌": 20,
      "🍆": 30
    },
    {
      year: 1990,
      "🥑": 20,
      "🍌": 40,
      "🍆": 60
    },
    {
      year: 2000,
      "🥑": 30,
      "🍌": 45,
      "🍆": 80
    },
    {
      year: 2010,
      "🥑": 40,
      "🍌": 60,
      "🍆": 100
    },
    {
      year: 2020,
      "🥑": 50,
      "🍌": 80,
      "🍆": 120
    }
  ]);

  return (
    <React.Fragment>
      <StackedAreaChart data={data} keys={keys} colors={colors} />
    </React.Fragment>
  );
}

export default StackedChart;