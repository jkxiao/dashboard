const data = [
  {
    name: "App",
    category: 0,
    value: "/...",
  },
  {
    name: "Header",
    category: 1,
  },
  {
    name: "Home",
    category: 2,
    value: "/",
  },
  {
    name: "Workspace",
    category: 2,
    value: "/workspace/...",
  },
  {
    name: "CardGrid",
    category: 3,
    value: "/workspace",
  },
  {
    name: "Card",
    category: 4,
  },
  {
    name: "DailyCandlestick",
    category: 5,
    value: "/workspace/daily-candlestick",
  },
  {
    name: "DailyCandlestickForm",
    category: 6,
  },
  {
    name: "DailyCandlestickChart",
    category: 6,
  },
  {
    name: "IntradayCandlestick",
    category: 5,
    value: "/workspace/intraday-candlestick",
  },
  {
    name: "IntradayCandlestickForm",
    category: 6,
  },
  {
    name: "IntradayCandlestickChart",
    category: 6,
  },
  {
    name: "Analysis",
    category: 2,
    value: "/analysis/...",
  },
  {
    name: "ArticleList",
    category: 3,
    value: "/analysis",
  },
  {
    name: "Article",
    category: 4,
  },
  {
    name: "ComponentTree",
    category: 7,
    value: "/analysis/component-tree",
  },
  {
    name: "ComponentTreeChart",
    category: 8,
  },
  {
    name: "ComponentGraph",
    category: 7,
    value: "/analysis/component-graph",
  },
  {
    name: "ComponentGraphChart",
    category: 8,
  },
  {
    name: "Footer",
    category: 1,
  },
];

const links = [
  {
    source: "App",
    target: "Header",
  },
  {
    source: "App",
    target: "Home",
  },
  {
    source: "App",
    target: "Workspace",
  },
  {
    source: "App",
    target: "Analysis",
  },
  {
    source: "App",
    target: "Footer",
  },
  {
    source: "Header",
    target: "Home",
  },
  {
    source: "Header",
    target: "Workspace",
  },
  {
    source: "Header",
    target: "Analysis",
  },
  {
    source: "Workspace",
    target: "CardGrid",
  },
  {
    source: "Workspace",
    target: "DailyCandlestick",
  },
  {
    source: "Workspace",
    target: "IntradayCandlestick",
  },
  {
    source: "CardGrid",
    target: "Card",
  },
  {
    source: "Card",
    target: "DailyCandlestick",
  },
  {
    source: "Card",
    target: "IntradayCandlestick",
  },
  {
    source: "DailyCandlestick",
    target: "DailyCandlestickForm",
  },
  {
    source: "DailyCandlestick",
    target: "DailyCandlestickChart",
  },
  {
    source: "IntradayCandlestick",
    target: "IntradayCandlestickForm",
  },
  {
    source: "IntradayCandlestick",
    target: "IntradayCandlestickChart",
  },
  {
    source: "Analysis",
    target: "ArticleList",
  },
  {
    source: "Analysis",
    target: "ComponentTree",
  },
  {
    source: "Analysis",
    target: "ComponentGraph",
  },
  {
    source: "ArticleList",
    target: "Article",
  },
  {
    source: "Article",
    target: "ComponentTree",
  },
  {
    source: "Article",
    target: "ComponentGraph",
  },
  {
    source: "ComponentTree",
    target: "ComponentTreeChart",
  },
  {
    source: "ComponentGraph",
    target: "ComponentGraphChart",
  },
];

const categories = [
  {
    name: "Application",
    symbolSize: 75,
  },
  {
    name: "Header & Footer",
    symbolSize: 25,
  },
  {
    name: "Page",
    symbolSize: 50,
  },
  {
    name: "Collection of elements",
    symbolSize: 25,
  },
  {
    name: "Element with link",
    symbolSize: 10,
  },
  {
    name: "Dynamic component",
    symbolSize: 25,
  },
  {
    name: "Dynamic sub-component",
    symbolSize: 5,
  },
  {
    name: "Static component",
    symbolSize: 25,
  },
  {
    name: "Static sub-component",
    symbolSize: 5,
  },
];

const option = {
  tooltip: {
    formatter: "{b}: {c}",
  },
  legend: [
    {
      data: categories.map((category) => category.name),
    },
  ],
  animationDuration: 1500,
  animationEasingUpdate: "quinticInOut",
  series: [
    {
      type: "graph",
      layout: "circular",
      circular: {
        rotateLabel: true,
      },
      data: data,
      links: links,
      categories: categories,
      edgeSymbol: ["circle", "arrow"],
      roam: false,
      focusNodeAdjacency: true,
      itemStyle: {
        borderColor: "#000",
        borderWidth: 1,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
      label: {
        show: true,
        formatter: "{b}",
      },
      lineStyle: {
        width: 2.5,
        color: "source",
        curveness: 0.25,
      },
      emphasis: {
        lineStyle: {
          width: 5,
        },
      },
    },
  ],
};

export default option;
