import { createStore, combineReducers } from "redux";
import dailyCandlestickReducer from "./dailyCandlestickReducer";
import intradayCandlestickReducer from "./intradayCandlestickReducer";

const rootReducer = combineReducers({
  dailyCandlestick: dailyCandlestickReducer,
  intradayCandlestick: intradayCandlestickReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
