const INITIAL_STATE = {
  selectedMarkets: null,
  selectedCommodity: null,
  dateRange: {
    min: null,
    max: null,
  },
  date: "",
  data: [],
};

const intradayCandlestickReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INTRADAYCANDLESTICK_SET_SELECTEDMARKETS":
      return {
        ...state,
        selectedMarkets: action.payload,
      };
    case "INTRADAYCANDLESTICK_SET_SELECTEDCOMMODITY":
      return {
        ...state,
        selectedCommodity: action.payload,
      };
    case "INTRADAYCANDLESTICK_SET_DATERANGE":
      return {
        ...state,
        dateRange: action.payload,
      };
    case "INTRADAYCANDLESTICK_SET_DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "INTRADAYCANDLESTICK_SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "INTRADAYCANDLESTICK_CLEAR":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default intradayCandlestickReducer;
