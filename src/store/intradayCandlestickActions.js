export const setSelectedMarkets = (selectedMarkets) => ({
  type: "INTRADAYCANDLESTICK_SET_SELECTEDMARKETS",
  payload: selectedMarkets,
});

export const setSelectedCommodity = (selectedCommodity) => ({
  type: "INTRADAYCANDLESTICK_SET_SELECTEDCOMMODITY",
  payload: selectedCommodity,
});

export const setDateRange = (dateRange) => ({
  type: "INTRADAYCANDLESTICK_SET_DATERANGE",
  payload: dateRange,
});

export const setDate = (date) => ({
  type: "INTRADAYCANDLESTICK_SET_DATE",
  payload: date,
});

export const setData = (data) => ({
  type: "INTRADAYCANDLESTICK_SET_DATA",
  payload: data,
});

export const clear = () => ({
  type: "INTRADAYCANDLESTICK_CLEAR",
});
