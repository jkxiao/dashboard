import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import echarts from "echarts";
import { generateOption } from "./config";
import styles from "./DailyCandlestickChart.module.scss";

const DailyCandlestickChart = () => {
  const ref = useRef(null);
  const [chart, setChart] = useState(ref);
  const { data, dayCountList } = useSelector((state) => state.dailyCandlestick);

  useEffect(() => {
    if (chart.current) {
      setChart(echarts.init(ref.current, "theme"));
    } else {
      chart.setOption(generateOption(data, dayCountList), true);
    }
  }, [chart, data, dayCountList]);

  return <div className={styles["daily-candlestick-chart"]} ref={ref}></div>;
};

export default DailyCandlestickChart;
