export const setSelectedMarkets = (selectedMarkets) => ({
  type: "DAILYCANDLESTICK_SET_SELECTEDMARKETS",
  payload: selectedMarkets,
});

export const setSelectedCommodity = (selectedCommodity) => ({
  type: "DAILYCANDLESTICK_SET_SELECTEDCOMMODITY",
  payload: selectedCommodity,
});

export const setDateRange = (dateRange) => ({
  type: "DAILYCANDLESTICK_SET_DATERANGE",
  payload: dateRange,
});

export const setMinDate = (minDate) => ({
  type: "DAILYCANDLESTICK_SET_MINDATE",
  payload: minDate,
});

export const setMaxDate = (maxDate) => ({
  type: "DAILYCANDLESTICK_SET_MAXDATE",
  payload: maxDate,
});

export const setDayCountList = (dayCountList) => ({
  type: "DAILYCANDLESTICK_SET_DAYCOUNTLIST",
  payload: dayCountList,
});

export const setData = (data) => ({
  type: "DAILYCANDLESTICK_SET_DATA",
  payload: data,
});

export const clear = () => ({
  type: "DAILYCANDLESTICK_CLEAR",
});
