import React from "react";
import Card from "../Card/Card";
import candlestick_image_1 from "../../images/candlestick_image_1.jpg";
import candlestick_image_2 from "../../images/candlestick_image_2.jpg";
import styles from "./CardGrid.module.scss";
import classNames from "classnames";

const CardGrid = () => {
  return (
    <div
      className={classNames(
        styles["card-grid"],
        "row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 text-center"
      )}
    >
      <Card
        title="Daily Candlestick Chart"
        description="Candlestick chart within multiple days, along with moving average lines"
        img={{ src: candlestick_image_1, alt: "candlestick_image_1" }}
        to="/daily-candlestick"
      />
      <Card
        title="Intraday Candlestick Chart"
        description="Candlestick chart within one day (only supports 10422)"
        img={{ src: candlestick_image_2, alt: "candlestick_image_2" }}
        to="/intraday-candlestick"
      />
    </div>
  );
};

export default CardGrid;
