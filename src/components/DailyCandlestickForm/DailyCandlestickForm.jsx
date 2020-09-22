import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";
import makeAnimated from "react-select/animated";
import { v4 as uuidv4 } from "uuid";
import { gql } from "@apollo/client";
import { axiosClient, apolloClient } from "../../clients/clients";
import * as actions from "../../store/dailyCandlestickActions";
import styles from "./DailyCandlestickForm.module.scss";
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
      dayDataDateRange {
        min
        max
      }
    }
  }
`;

const GET_DATA = gql`
  query Commodity(
    $CommodityInnerID: String
    $startDate: String
    $endDate: String
  ) {
    commodity(CommodityInnerID: $CommodityInnerID) {
      dayData(startDate: $startDate, endDate: $endDate) {
        TradeDate
        FirstPrice
        LastPrice
        LowPrice
        HighPrice
      }
    }
  }
`;

const DailyCandlestickForm = () => {
  const {
    selectedMarkets,
    selectedCommodity,
    dateRange,
    minDate,
    maxDate,
    dayCountList,
  } = useSelector((state) => state.dailyCandlestick);
  const {
    setSelectedMarkets,
    setSelectedCommodity,
    setDateRange,
    setMinDate,
    setMaxDate,
    setDayCountList,
    setData,
    clear,
  } = actions;
  const dispatch = useDispatch();
  const [showsAlert, setShowsAlert] = useState(false);

  return (
    <div className={styles["daily-candlestick-form"]}>
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
              setShowsAlert(false);
              dispatch(setSelectedCommodity(selectedCommodity));
              dispatch(setMinDate(""));
              dispatch(setMaxDate(""));
              switch (API_OPTION) {
                case "API_REST":
                  axiosClient
                    .get("/date-range/day", {
                      params: { commodityID: selectedCommodity.value },
                    })
                    .then((res) => {
                      let [dataRange] = res.data;
                      dispatch(setDateRange(dataRange));
                    });
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
                        setDateRange(res.data.commodity.dayDataDateRange)
                      );
                    });
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
          <label>Date Range</label>
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
                max={maxDate === "" ? dateRange.max : maxDate}
                value={minDate}
                onChange={(event) => dispatch(setMinDate(event.target.value))}
              />
            </div>
            <div className="input-group col-md-6">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-hourglass-end"></i>
                </span>
              </div>
              <input
                type="date"
                className="form-control"
                min={minDate === "" ? dateRange.min : minDate}
                max={dateRange.max}
                value={maxDate}
                onChange={(event) => dispatch(setMaxDate(event.target.value))}
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
              1-day
            </label>
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Moving Average Type</label>
          <br />
          {dayCountList.map((dayCountItem, index) => (
            <div
              key={uuidv4()}
              className={classNames(
                styles["custom-control"],
                "custom-control custom-checkbox custom-control-inline"
              )}
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id={`customCheck-${dayCountItem.dayCount}`}
                checked={dayCountItem.checked}
                onChange={(event) => {
                  let targetIndex = index;
                  dispatch(
                    setDayCountList(
                      dayCountList.map((dayCountItem, index) =>
                        index === targetIndex
                          ? { ...dayCountItem, checked: event.target.checked }
                          : dayCountItem
                      )
                    )
                  );
                }}
              />
              <label
                className="custom-control-label"
                htmlFor={`customCheck-${dayCountItem.dayCount}`}
              >
                {dayCountItem.dayCount}-day
              </label>
            </div>
          ))}
        </div>

        <button
          className="btn btn-primary col-12 mb-3"
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            if (selectedCommodity === null) {
              setShowsAlert(true);
              return;
            }
            setShowsAlert(false);
            switch (API_OPTION) {
              case "API_REST":
                let params = { commodityID: selectedCommodity.value };
                if (minDate === "") {
                  params.startDate = dateRange.min;
                  dispatch(setMinDate(dateRange.min));
                } else {
                  params.startDate = minDate;
                }
                if (maxDate === "") {
                  params.endDate = dateRange.max;
                  dispatch(setMaxDate(dateRange.max));
                } else {
                  params.endDate = maxDate;
                }
                axiosClient
                  .get("/day-data", {
                    params,
                  })
                  .then((res) => dispatch(setData(res.data)));
                break;
              case "API_GRAPHQL":
                let variables = { CommodityInnerID: selectedCommodity.value };
                if (minDate === "") {
                  variables.startDate = dateRange.min;
                  dispatch(setMinDate(dateRange.min));
                } else {
                  variables.startDate = minDate;
                }
                if (maxDate === "") {
                  variables.endDate = dateRange.max;
                  dispatch(setMaxDate(dateRange.max));
                } else {
                  variables.endDate = maxDate;
                }
                apolloClient
                  .query({ query: GET_DATA, variables })
                  .then((res) => dispatch(setData(res.data.commodity.dayData)));
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
            setShowsAlert(false);
            dispatch(clear());
          }}
        >
          Clear
        </button>

        {showsAlert && (
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
              onClick={() => setShowsAlert(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DailyCandlestickForm;
