import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import echarts from "echarts";
import theme from "./theme/theme.json";
import App from "./components/App/App";

echarts.registerTheme("theme", theme);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
