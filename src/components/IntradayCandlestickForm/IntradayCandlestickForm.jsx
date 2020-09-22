import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { gql } from "@apollo/client";
import { axiosClient, apolloClient } from "../../clients/clients";
import * as actions from "../../store/intradayCandlestickActions";
import styles from "./IntradayCandlestickForm.module.scss";
import classNames from "classnames";

/* "API_GRAPHQL" to use GraphQL api, "API_REST" to use REST api */
const API_OPTION = "API_GRAPHQL";

const GET_MARKETS = gql`
  query Markets($name: String) {
    markets(name: $name) {
      MKTModeRelID
      Name
    }
  }
`;

const GET_COMMODITIES = gql`
  query Commodities($markets: [Int], $name: String) {
    commodities(markets: $markets, name: $name) {
      CommodityInnerID
      commodityName
    }
  }
`;

const GET_DATERANGE = gql`
  query Commodity($CommodityInnerID: String) {
    commodity(CommodityInnerID: $CommodityInnerID) {
      minDataDateRange {
        min
        max
      }
    }
  }
`;

const GET_DATA = gql`
  query Commodity($CommodityInnerID: String, $date: String) {
    commodity(CommodityInnerID: $CommodityInnerID) {
      minData(date: $date) {
        Time
        FirstPrice
        LastPrice
        LowPrice
        HighPrice
      }
    }
  }
`;

const IntradayCandlestickForm = () => {
  const { selectedMarkets, selectedCommodity, dateRange, date } = useSelector(
    (state) => state.intradayCandlestick
  );
  const {
    setSelectedMarkets,
    setSelectedCommodity,
    setDateRange,
    setDate,
    setData,
    clear,
  } = actions;
  const dispatch = useDispatch();
  const [showsNoSelectedAlert, setShowsNoSelectedAlert] = useState(false);
  const [showsNotAvailableAlert, setShowsNotAvailableAlert] = useState(false);

  return (
    <div className={styles["intraday-candlestick-form"]}>
      <form>
        <div className="form-group mb-3">
          <label>Markets</label>
          <AsyncSelect
            name="market-select"
            placeholder="Search a market"
            value={selectedMarkets}
            onChange={(selectedMarkets) => {
              dispatch(setSelectedMarkets(selectedMarkets));
              dispatch(setSelectedCommodity(null));
            }}
            loadOptions={(inputValue) => {
              switch (API_OPTION) {
                case "API_REST":
                  return axiosClient
                    .get("/markets", {
                      params: { name: inputValue },
                    })
                    .then((res) =>
                      res.data.map((market) => ({
                        value: market.MKTModeRelID,
                        label: market.Name,
                      }))
                    );
                case "API_GRAPHQL":
                  return apolloClient
                    .query({
                      query: GET_MARKETS,
                      variables: { name: inputValue },
                    })
                    .then((res) =>
                      res.data.markets.map((market) => ({
                        value: market.MKTModeRelID,
                        label: market.Name,
                      }))
                    );
                default:
                  return;
              }
            }}
            isMulti
            components={makeAnimated()}
          />
          <div className="form-row">
            <small className="form-text text-muted col-12">
              Pleace specify any markets to include (none to include all).
            </small>
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Commodity</label>
          <AsyncSelect
            name="commodity-select"
            placeholder="Search a commodity"
            value={selectedCommodity}
            onChange={(selectedCommodity) => {
              setShowsNoSelectedAlert(false);
              setShowsNotAvailableAlert(false);
              dispatch(setSelectedCommodity(selectedCommodity));
              dispatch(setDate(""));
              switch (API_OPTION) {
                case "API_REST":
                  axiosClient
                    .get("/date-range/min", {
                      params: { commodityID: selectedCommodity.value },
                    })
                    .then((res) => {
                      let [dataRange] = res.data;
                      dispatch(setDateRange(dataRange));
                    })
                    .catch((err) => console.log(err));
                  break;
                case "API_GRAPHQL":
                  apolloClient
                    .query({
                      query: GET_DATERANGE,
                      variables: {
                        CommodityInnerID: selectedCommodity.value,
                      },
                    })
                    .then((res) => {
                      dispatch(
                        setDateRange(res.data.commodity.minDataDateRange)
                      );
                    })
                    .catch((err) => console.log(err));
                  break;
                default:
                  return;
              }
            }}
            loadOptions={(inputValue) => {
              switch (API_OPTION) {
                case "API_REST":
                  return axiosClient
                    .get("/commodities", {
                      params: {
                        markets:
                          selectedMarkets &&
                          selectedMarkets.map((market) => market.value),
                        name: inputValue,
                      },
                    })
                    .then((res) =>
                      res.data.map((commodity) => ({
                        value: commodity.CommodityInnerID,
                        label: commodity.commodityName,
                      }))
                    );
                case "API_GRAPHQL":
                  return apolloClient
                    .query({
                      query: GET_COMMODITIES,
                      variables: {
                        markets:
                          selectedMarkets &&
                          selectedMarkets.map((market) => market.value),
                        name: inputValue,
                      },
                    })
                    .then((res) =>
                      res.data.commodities.map((commodity) => ({
                        value: commodity.CommodityInnerID,
                        label: commodity.commodityName,
                      }))
                    );
                default:
                  return;
              }
            }}
            components={makeAnimated()}
          />
          <div className="form-row">
            <small className="form-text text-muted col-12">
              Pleace specify one commodity to plot.
            </small>
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Date</label>
          <div className="form-row">
            <div className="input-group col-md-6">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-hourglass-start"></i>
                </span>
              </div>
              <input
                type="date"
                className="form-control"
                min={dateRange.min}
                max={dateRange.max}
                value={date}
                onChange={(event) => dispatch(setDate(event.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Candlestick Type</label>
          <br />
          <div
            className={classNames(
              styles["custom-control"],
              "custom-control custom-radio custom-control-inline"
            )}
          >
            <input
              type="radio"
              id="customRadioInline"
              name="customRadioInline"
              className="custom-control-input"
              checked
              readOnly
            />
            <label className="custom-control-label" htmlFor="customRadioInline">
              1-minute
            </label>
          </div>
        </div>

        <button
          className="btn btn-primary col-12 mb-3"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            if (selectedCommodity === null) {
              setShowsNoSelectedAlert(true);
              return;
            }
            setShowsNoSelectedAlert(false);
            switch (API_OPTION) {
              case "API_REST":
                let params = { commodityID: selectedCommodity.value };
                if (date === "") {
                  params.date = dateRange.max;
                  dispatch(setDate(dateRange.max));
                } else {
                  params.date = date;
                }
                axiosClient
                  .get("/min-data", {
                    params,
                  })
                  .then((res) => dispatch(setData(res.data)))
                  .catch((err) => setShowsNotAvailableAlert(true));
                break;
              case "API_GRAPHQL":
                let variables = { CommodityInnerID: selectedCommodity.value };
                if (date === "") {
                  variables.date = dateRange.max;
                  dispatch(setDate(dateRange.max));
                } else {
                  variables.date = date;
                }
                apolloClient
                  .query({ query: GET_DATA, variables })
                  .then((res) => dispatch(setData(res.data.commodity.minData)))
                  .catch((err) => setShowsNotAvailableAlert(true));
                break;
              default:
                return;
            }
          }}
        >
          Create Figure
        </button>

        <button
          className="btn btn-danger col-12 mb-3"
          onClick={(event) => {
            event.preventDefault();
            setShowsNoSelectedAlert(false);
            setShowsNotAvailableAlert(false);
            dispatch(clear());
          }}
        >
          Clear
        </button>

        {showsNoSelectedAlert && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>No commodity selected</strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowsNoSelectedAlert(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {showsNotAvailableAlert && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>
              Selected Commodity Not Available for Intraday Candlestick
            </strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => setShowsNotAvailableAlert(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default IntradayCandlestickForm;
