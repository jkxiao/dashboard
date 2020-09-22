"use strict";

const express = require("express");
const api = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

const mysql = require("mysql");
const connection = mysql.createConnection(require("./config"));

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

module.exports = async (app) => {
  app.set("json spaces", 2);

  /* Connect to MySQL */
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting: " + err.stack);
      return;
    }
    console.log("Connected as id " + connection.threadId);
  });

  /* Handle requests that start with /api using the api Router */
  app.use("/api", api);
};

api.use(cors());
api.use(bodyParser.json());

/* Confirm the API is running */
api.get("/", (req, res) => {
  res.json({ message: "API running" });
});

/* Get a list of markets with a name template */
api.get("/markets", (req, res) => {
  let { name } = req.query;
  connection.query(
    `SELECT MKTModeRelID, Name
     FROM qsd_marketandMode
     WHERE Name LIKE '%${name}%'`,
    (error, results, fields) => {
      if (error) {
        console.error("Error query: " + error.stack);
        return;
      }
      res.json(results);
    }
  );
});

/* Get a list of commodities in a list of markets with a name template */
api.get("/commodities", (req, res) => {
  let { markets, name } = req.query;
  connection.query(
    `SELECT CommodityInnerID, commodityName
     FROM qsd_commodity
     WHERE ${markets ? `MKTModeRelID IN (${markets}) AND ` : ``}
     commodityName LIKE '%${name}%'`,
    (error, results, fields) => {
      if (error) {
        console.error("Error query: " + error.stack);
        return;
      }
      res.json(results);
    }
  );
});

/* Get the date range of a commodity for daily data */
api.get("/date-range/day", (req, res) => {
  let commodityID = req.query.commodityID;
  connection.query(
    `SELECT MIN(STR_TO_DATE(TradeDate, '%Y-%m-%d')) as min, MAX(STR_TO_DATE(TradeDate, '%Y-%m-%d')) AS max
     FROM qsd_historydaydata
     WHERE CommodityInnerID = '${commodityID}'`,
    (error, results, fields) => {
      if (error) {
        console.error("Error query: " + error.stack);
        return;
      }
      res.json(results);
    }
  );
});

/* Get the date range of a commodity for intraday data */
api.get("/date-range/min", (req, res) => {
  let commodityID = req.query.commodityID;
  let marketID = commodityID.split("-")[0];
  connection.query(
    `SELECT * FROM information_schema.tables WHERE table_name = 'qsd_history1mindata_${marketID}'`,
    (error, results, fields) => {
      if (error) {
        console.error("Error query: " + error.stack);
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Not Found" });
      } else {
        connection.query(
          `SELECT MIN(STR_TO_DATE(TradeDate, '%Y-%m-%d')) as min, MAX(STR_TO_DATE(TradeDate, '%Y-%m-%d')) AS max
           FROM qsd_history1mindata_${marketID}
           WHERE CommodityInnerID = '${commodityID}'`,
          (error, results, fields) => {
            if (error) {
              console.error("Error query: " + error.stack);
              return;
            }
            res.json(results);
          }
        );
      }
    }
  );
});

/* Get a list of daily candlestick data of a commodity within a date range */
api.get("/day-data", (req, res) => {
  let { commodityID, startDate, endDate } = req.query;
  connection.query(
    `SELECT TradeDate, FirstPrice, LastPrice, LowPrice, HighPrice
     FROM qsd_historydaydata
     WHERE CommodityInnerID = '${commodityID}'
     AND STR_TO_DATE(TradeDate, '%Y-%m-%d')
     BETWEEN STR_TO_DATE('${startDate}', '%Y-%m-%d')
     AND STR_TO_DATE('${endDate}', '%Y-%m-%d')
     ORDER BY STR_TO_DATE(TradeDate, '%Y-%m-%d')`,
    (error, results, fields) => {
      if (error) {
        console.error("Error query: " + error.stack);
        return;
      }
      res.json(results);
    }
  );
});

/* Get a list of intraday candlestick data of a commodity within a time range */
api.get("/min-data", (req, res) => {
  let { commodityID, date } = req.query;
  let marketID = commodityID.split("-")[0];
  connection.query(
    `SELECT * FROM information_schema.tables WHERE table_name = 'qsd_history1mindata_${marketID}'`,
    (error, results, fields) => {
      if (error) {
        console.error("Error query: " + error.stack);
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "Not Found" });
      } else {
        connection.query(
          `SELECT DATE_FORMAT(Time, '%H:%i') AS Time, FirstPrice, LastPrice, LowPrice, HighPrice
           FROM qsd_history1mindata_${marketID}
           WHERE CommodityInnerID = '${commodityID}'
           AND STR_TO_DATE(TradeDate, '%Y-%m-%d') = STR_TO_DATE('${date}', '%Y-%m-%d')
           ORDER BY Time`,
          (error, results, fields) => {
            if (error) {
              console.error("Error query: " + error.stack);
              return;
            }
            res.json(results);
          }
        );
      }
    }
  );
});

api.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
