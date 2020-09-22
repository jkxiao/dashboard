import React from "react";
import ComponentGraphChart from "../ComponentGraphChart/ComponentGraphChart";
import styles from "./ComponentGraph.module.scss";

const ComponentGraph = () => {
  return (
    <div className={styles["component-graph-container"]}>
      <ComponentGraphChart />
    </div>
  );
};

export default ComponentGraph;
