import React from "react";
import DailyCandlestickForm from "../DailyCandlestickForm/DailyCandlestickForm";
import DailyCandlestickChart from "../DailyCandlestickChart/DailyCandlestickChart";
import styles from "./DailyCandlestick.module.scss";

const DailyCandlestick = () => {
  return (
    <div className={styles["daily-candlestick-container"]}>
      <DailyCandlestickForm />
      <DailyCandlestickChart />
    </div>
  );
};

export default DailyCandlestick;
