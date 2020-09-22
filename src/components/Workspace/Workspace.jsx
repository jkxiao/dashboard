import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CardGrid from "../CardGrid/CardGrid";
import DailyCandlestick from "../DailyCandlestick/DailyCandlestick";
import IntradayCandlestick from "../IntradayCandlestick/IntradayCandlestick";

const Workspace = () => {
  let { path } = useRouteMatch();
  return (
    <div className={"page-container"}>
      <Switch>
        <Route path={path} exact>
          <CardGrid />
        </Route>
        <Route path={`${path}/daily-candlestick`}>
          <DailyCandlestick />
        </Route>
        <Route path={`${path}/intraday-candlestick`}>
          <IntradayCandlestick />
        </Route>
      </Switch>
    </div>
  );
};

export default Workspace;
