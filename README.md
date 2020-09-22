# Instruction

## Installation and Launch

1. Download the latest LTS version of Node.js (which includes npm) [from here](https://nodejs.org);

2. Download MySQL community server [from here](https://www.mysql.com);

3. Start MySQL server;

4. Configure MySQL server connection by modifying user, password and database in /api/config.js;

5. Install all dependencies by `npm install`;

6. Concurrently start the server and the app by `npm run launch` (this runs `npm run server` and `npm run start`);

7. Open http://localhost:3000 in the browser (Chrome recommended).

## Tutorial

### Home

In the "Home" page, you can view the introduction and the features of the project. Click "Get Started" to start working with charts.

### Workspace

In the "Workspace" page, you can create daily candlestick chart (1-day period with moving average lines) or intraday candlestick chart (1-minute period).

#### Daily Candlestick Chart

Markets: to specify any markets to include (none to include all), in order to narrow down the search results for commodities

Commodity: to specify one commodity (required) in the specified markets to plot

Date Range: to specify a date range to plot, with a start date and an end date (the default is the whole available range)

Candlestick Type: 1-day

Moving Average Type: to add multiple moving average lines in the chart (note that each change will cause the chart to refresh)

Create Figure: to create the daily candlestick chart with all the options

Clear: to clear the chart and all the options

In the figure, you can zoom in or out and shift left or right using the built-in slider. The highest high price and the lowest low price within the sliding window are automatically marked along with a line connecting them. The highest and the lowest close price are represented by two horizontal dashed lines. By clicking the legend, you can also show or hide the candlestick or moving average lines.

**Note: to leverage the systax of SQL, type "%" in the search area to list all the available markets or commodities in the database**

**Note: the chart and all the options will be cached unless the whole page gets refreshed**

#### Intraday Candlestick Chart

Markets: to specify any markets to include (none to include all), in order to narrow down the search results for commodities

Commodity: to specify one commodity (required) in the specified markets to plot

Date: to specify a date to plot (the default is the last day in the available range)

Candlestick Type: 1-minute

Create Figure: to create the intraday candlestick chart with all the options

Clear: to clear the chart and all the options

In the figure, you can zoom in or out and shift left or right using the built-in slider. The highest high price and the lowest low price within the sliding window are automatically marked along with a line connecting them. The highest and the lowest close price are represented by two horizontal dashed lines. By clicking the legend, you can also show or hide the candlestick.

**Note: currently only market 10422 is supported for intraday candlestick chart**

**Note: the chart and all the options will be cached unless the whole page gets refreshed**

### Analysis

In the "Analysis" page, you can post any analysis articles. Currently, two articles are presented to illustrate the structure of React components.

## Miscellaneous

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts (from create-react-app)

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Other Scripts

#### `npm run server`

Starts the localhost server listening port 4000.

#### `npm run launch`

Concurrently starts the server and the app.
