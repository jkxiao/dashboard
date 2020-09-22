const INITIAL_STATE = {
  selectedMarkets: null,
  selectedCommodity: null,
  dateRange: {
    min: null,
    max: null,
  },
  minDate: "",
  maxDate: "",
  dayCountList: [
    {
      dayCount: 5,
      checked: false,
    },
    {
      dayCount: 10,
      checked: false,
    },
    {
      dayCount: 20,
      checked: false,
    },
    {
      dayCount: 50,
      checked: false,
    },
  ],
  data: [],
};

const dailyCandlestickReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DAILYCANDLESTICK_SET_SELECTEDMARKETS":
      return {
        ...state,
        selectedMarkets: action.payload,
      };
    case "DAILYCANDLESTICK_SET_SELECTEDCOMMODITY":
      return {
        ...state,
        selectedCommodity: action.payload,
      };
    case "DAILYCANDLESTICK_SET_DATERANGE":
      return {
        ...state,
        dateRange: action.payload,
      };
    case "DAILYCANDLESTICK_SET_MINDATE":
      return {
        ...state,
        minDate: action.payload,
      };
    case "DAILYCANDLESTICK_SET_MAXDATE":
      return {
        ...state,
        maxDate: action.payload,
      };
    case "DAILYCANDLESTICK_SET_DAYCOUNTLIST":
      return {
        ...state,
        dayCountList: action.payload,
      };
    case "DAILYCANDLESTICK_SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "DAILYCANDLESTICK_CLEAR":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default dailyCandlestickReducer;
