import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import echarts from "echarts";
import { generateOption } from "./config";
import styles from "./IntradayCandlestickChart.module.scss";

const IntradayCandlestickChart = () => {
  const ref = useRef(null);
  const [chart, setChart] = useState(ref);
  const { data } = useSelector((state) => state.intradayCandlestick);

  useEffect(() => {
    if (chart.current) {
      setChart(echarts.init(ref.current, "theme"));
    } else {
      chart.setOption(generateOption(data), true);
    }
  }, [chart, data]);

  return <div className={styles["intraday-candlestick-chart"]} ref={ref}></div>;
};

export default IntradayCandlestickChart;
