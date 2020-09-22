import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ArticleList from "../ArticleList/ArticleList";
import ComponentTree from "../ComponentTree/ComponentTree";
import ComponentGraph from "../ComponentGraph/ComponentGraph";

const Analysis = () => {
  let { path } = useRouteMatch();
  return (
    <div className="page-container">
      <Switch>
        <Route path={path} exact>
          <ArticleList />
        </Route>
        <Route path={`${path}/component-tree`}>
          <ComponentTree />
        </Route>
        <Route path={`${path}/component-graph`}>
          <ComponentGraph />
        </Route>
      </Switch>
    </div>
  );
};

export default Analysis;
