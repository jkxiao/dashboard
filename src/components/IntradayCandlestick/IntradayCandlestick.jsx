import React from "react";
import IntradayCandlestickForm from "../IntradayCandlestickForm/IntradayCandlestickForm";
import IntradayCandlestickChart from "../IntradayCandlestickChart/IntradayCandlestickChart";
import styles from "./IntradayCandlestick.module.scss";

const IntradayCandlestick = () => {
  return (
    <div className={styles["intraday-candlestick-container"]}>
      <IntradayCandlestickForm />
      <IntradayCandlestickChart />
    </div>
  );
};

export default IntradayCandlestick;
