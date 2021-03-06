import React, { useRef, useState, useEffect } from "react";
import echarts from "echarts";
import option from "./config";
import styles from "./ComponentGraphChart.module.scss";

const ComponentGraphChart = () => {
  let ref = useRef(null);
  let [chart, setChart] = useState(ref);

  useEffect(() => {
    if (chart.current) {
      setChart(echarts.init(ref.current, "theme"));
    } else {
      chart.setOption(option);
    }
  }, [chart]);

  return <div className={styles["component-graph-chart"]} ref={ref}></div>;
};

export default ComponentGraphChart;
