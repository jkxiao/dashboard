const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const mysql = require("mysql");
const connection = mysql.createConnection(require("./config"));
connection.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

const MarketType = new GraphQLObjectType({
  name: "Market",
  fields: () => ({
    MKTModeRelID: { type: GraphQLInt },
    Name: { type: GraphQLString },
  }),
});

const DateRangeType = new GraphQLObjectType({
  name: "DateRange",
  fields: () => ({
    min: { type: GraphQLString },
    max: { type: GraphQLString },
  }),
});

const DayCandlestickType = new GraphQLObjectType({
  name: "DayCandlestick",
  fields: () => ({
    TradeDate: { type: GraphQLString },
    FirstPrice: { type: GraphQLFloat },
    LastPrice: { type: GraphQLFloat },
    LowPrice: { type: GraphQLFloat },
    HighPrice: { type: GraphQLFloat },
  }),
});

const MinCandlestickType = new GraphQLObjectType({
  name: "MinCandlestick",
  fields: () => ({
    Time: { type: GraphQLString },
    FirstPrice: { type: GraphQLFloat },
    LastPrice: { type: GraphQLFloat },
    LowPrice: { type: GraphQLFloat },
    HighPrice: { type: GraphQLFloat },
  }),
});

const CommodityType = new GraphQLObjectType({
  name: "Commodity",
  fields: () => ({
    CommodityInnerID: { type: GraphQLString },
    commodityName: { type: GraphQLString },
    dayDataDateRange: {
      type: DateRangeType,
      async resolve(parent) {
        let { CommodityInnerID } = parent;
        return await new Promise((resolve, reject) => {
          connection.query(
            `SELECT MIN(STR_TO_DATE(TradeDate, '%Y-%m-%d')) as min, MAX(STR_TO_DATE(TradeDate, '%Y-%m-%d')) AS max
             FROM qsd_historydaydata
             WHERE CommodityInnerID = '${CommodityInnerID}'`,
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              let [data] = results;
              resolve(data);
            }
          );
        });
      },
    },
    dayData: {
      type: new GraphQLList(DayCandlestickType),
      args: {
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          let { CommodityInnerID } = parent;
          let { startDate, endDate } = args;
          connection.query(
            `SELECT TradeDate, FirstPrice, LastPrice, LowPrice, HighPrice
             FROM qsd_historydaydata
             WHERE CommodityInnerID = '${CommodityInnerID}'
             AND STR_TO_DATE(TradeDate, '%Y-%m-%d')
             BETWEEN STR_TO_DATE('${startDate}', '%Y-%m-%d')
             AND STR_TO_DATE('${endDate}', '%Y-%m-%d')
             ORDER BY STR_TO_DATE(TradeDate, '%Y-%m-%d')`,
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              resolve(results);
            }
          );
        });
      },
    },
    minDataDateRange: {
      type: DateRangeType,
      async resolve(parent, args) {
        let { CommodityInnerID } = parent;
        let marketID = CommodityInnerID.split("-")[0];
        return await new Promise((resolve, reject) => {
          connection.query(
            `SELECT * FROM information_schema.tables WHERE table_name = 'qsd_history1mindata_${marketID}'`,
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              if (results.length === 0) {
                reject({ error: "Not Found" });
              } else {
                connection.query(
                  `SELECT MIN(STR_TO_DATE(TradeDate, '%Y-%m-%d')) as min, MAX(STR_TO_DATE(TradeDate, '%Y-%m-%d')) AS max
                   FROM qsd_history1mindata_${marketID}
                   WHERE CommodityInnerID = '${CommodityInnerID}'`,
                  (error, results, fields) => {
                    if (error) {
                      reject(error);
                    }
                    let [data] = results;
                    resolve(data);
                  }
                );
              }
            }
          );
        });
      },
    },
    minData: {
      type: new GraphQLList(MinCandlestickType),
      args: {
        date: { type: GraphQLString },
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          let { CommodityInnerID } = parent;
          let marketID = CommodityInnerID.split("-")[0];
          let { date } = args;
          connection.query(
            `SELECT * FROM information_schema.tables WHERE table_name = 'qsd_history1mindata_${marketID}'`,
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              if (results.length === 0) {
                reject({ error: "Not Found" });
              } else {
                connection.query(
                  `SELECT DATE_FORMAT(Time, '%H:%i') AS Time, FirstPrice, LastPrice, LowPrice, HighPrice
                   FROM qsd_history1mindata_${marketID}
                   WHERE CommodityInnerID = '${CommodityInnerID}'
                   AND STR_TO_DATE(TradeDate, '%Y-%m-%d') = STR_TO_DATE('${date}', '%Y-%m-%d')
                   ORDER BY Time`,
                  (error, results, fields) => {
                    if (error) {
                      reject(error);
                    }
                    resolve(results);
                  }
                );
              }
            }
          );
        });
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    markets: {
      type: new GraphQLList(MarketType),
      args: {
        name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let { name } = args;
        return await new Promise((resolve, reject) => {
          connection.query(
            `SELECT MKTModeRelID, Name
             FROM qsd_marketandMode
             WHERE Name LIKE '%${name}%'`,
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              resolve(results);
            }
          );
        });
      },
    },
    commodities: {
      type: new GraphQLList(CommodityType),
      args: {
        markets: { type: new GraphQLList(GraphQLInt) },
        name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let { markets, name } = args;
        return await new Promise((resolve, reject) => {
          connection.query(
            `SELECT CommodityInnerID, commodityName
             FROM qsd_commodity
             WHERE ${markets ? `MKTModeRelID IN (${markets}) AND ` : ``}
             commodityName LIKE '%${name}%'`,
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              resolve(results);
            }
          );
        });
      },
    },
    commodity: {
      type: CommodityType,
      args: {
        CommodityInnerID: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let { CommodityInnerID } = args;
        return await new Promise((resolve, reject) => {
          connection.query(
            `SELECT CommodityInnerID, commodityName
             FROM qsd_commodity
             WHERE CommodityInnerID = '${CommodityInnerID}'`,
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              let [data] = results;
              resolve(data);
            }
          );
        });
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
