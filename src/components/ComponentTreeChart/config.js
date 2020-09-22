const data = {
  name: "App",
  value: "/...",
  children: [
    /* Header */
    {
      name: "Header",
    },
    /* Home page */
    {
      name: "Home",
      value: "/",
    },
    /* Workspace page */
    {
      name: "Workspace",
      value: "/workspace/...",
      children: [
        {
          name: "CardGrid",
          value: "/workspace",
          children: [
            {
              name: "Card",
            },
          ],
        },
        {
          name: "DailyCandlestick",
          value: "/workspace/daily-candlestick",
          children: [
            {
              name: "DailyCandlestickForm",
            },
            {
              name: "DailyCandlestickChart",
            },
          ],
        },
        {
          name: "IntradayCandlestick",
          value: "/workspace/intraday-candlestick",
          children: [
            {
              name: "IntradayCandlestickForm",
            },
            {
              name: "IntradayCandlestickChart",
            },
          ],
        },
      ],
    },
    /* Analysis page */
    {
      name: "Analysis",
      value: "/analysis/...",
      children: [
        {
          name: "ArticleList",
          value: "/analysis",
          children: [
            {
              name: "Article",
            },
          ],
        },
        {
          name: "ComponentTree",
          value: "/analysis/component-tree",
          children: [
            {
              name: "ComponentTreeChart",
            },
          ],
        },
        {
          name: "ComponentGraph",
          value: "/analysis/component-graph",
          children: [
            {
              name: "ComponentGraphChart",
            },
          ],
        },
      ],
    },
    /* Footer */
    {
      name: "Footer",
    },
  ],
};

const option = {
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
    formatter: "{b}: {c}",
  },
  series: [
    {
      type: "tree",
      name: "Component Tree",
      data: [data],
      top: "5%",
      left: "5%",
      bottom: "5%",
      right: "15%",
      symbolSize: 16,
      label: {
        position: "left",
        verticalAlign: "middle",
        align: "right",
      },
      leaves: {
        label: {
          position: "right",
          verticalAlign: "middle",
          align: "left",
        },
      },
      initialTreeDepth: -1,
      expandAndCollapse: true,
      animationDuration: 1000,
      animationDurationUpdate: 1000,
    },
  ],
};

export default option;
