import React from "react";
import ComponentTreeChart from "../ComponentTreeChart/ComponentTreeChart";
import styles from "./ComponentTree.module.scss";

const ComponentTree = () => {
  return (
    <div className={styles["component-tree-container"]}>
      <ComponentTreeChart />
    </div>
  );
};

export default ComponentTree;
