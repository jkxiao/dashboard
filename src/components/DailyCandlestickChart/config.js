/* rawData: [date: string, open: number, close: number, lowest: number, highest: number] */
const formatData = (rawData) => {
  let categoryData = [];
  let values = [];
  for (let i = 0; i < rawData.length; i++) {
    let { TradeDate, FirstPrice, LastPrice, LowPrice, HighPrice } = rawData[i];
    categoryData.push(TradeDate);
    values.push([FirstPrice, LastPrice, LowPrice, HighPrice]);
  }
  return {
    categoryData,
    values,
  };
};

const calculateMA = (dayCount, data) => {
  let result = [];
  for (let i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(2));
  }
  return result;
};

export const generateOption = (rawData, dayCountList) => {
  let data = formatData(rawData);
  return {
    title: {
      text: "Daily Candlestick",
      left: 0,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: [
        "1-day candlestick",
        ...dayCountList
          .filter((dayCountItem) => dayCountItem.checked)
          .map((dayCountItem) => `MA${dayCountItem.dayCount}`),
      ],
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%",
    },
    xAxis: {
      type: "category",
      data: data.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      splitNumber: 20,
      min: "dataMin",
      max: "dataMax",
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true,
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 75,
        end: 100,
      },
      {
        show: true,
        type: "slider",
        top: "90%",
        start: 75,
        end: 100,
      },
    ],
    series: [
      {
        name: "1-day candlestick",
        type: "candlestick",
        data: data.values,
        markPoint: {
          label: {
            normal: {
              formatter: (param) =>
                param != null ? Math.round(param.value) : "",
            },
          },
          data: [
            {
              name: "highest value",
              type: "max",
              valueDim: "highest",
              itemStyle: {
                color: "rgba(50,50,50,0.75)",
              },
            },
            {
              name: "lowest value",
              type: "min",
              valueDim: "lowest",
              symbolRotate: 180,
              label: { offset: [0, 10] },
              itemStyle: {
                color: "rgba(50,50,50,0.75)",
              },
            },
          ],
          tooltip: {
            formatter: (param) =>
              param.name + "<br>" + (param.data.coord || ""),
          },
        },
        markLine: {
          symbol: ["none", "none"],
          lineStyle: {
            color: "rgba(50,50,50,0.75)",
            width: 2,
          },
          data: [
            [
              {
                name: "from lowest to highest",
                type: "min",
                valueDim: "lowest",
                symbol: "circle",
                symbolSize: 10,
                label: {
                  show: false,
                },
                emphasis: {
                  label: {
                    show: false,
                  },
                },
              },
              {
                type: "max",
                valueDim: "highest",
                symbol: "circle",
                symbolSize: 10,
                label: {
                  show: false,
                },
                emphasis: {
                  label: {
                    show: false,
                  },
                },
              },
            ],
            {
              name: "min line on close",
              type: "min",
              valueDim: "close",
            },
            {
              name: "max line on close",
              type: "max",
              valueDim: "close",
            },
          ],
        },
      },
      ...dayCountList
        .filter((dayCountItem) => dayCountItem.checked)
        .map((dayCountItem) => ({
          name: `MA${dayCountItem.dayCount}`,
          type: "line",
          data: calculateMA(dayCountItem.dayCount, data),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        })),
    ],
  };
};
