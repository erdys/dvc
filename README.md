# Data Visualisation Component

Your company is developing a dashboard to display real-time data from various sources. You are tasked with creating
a data visualisation component that displays live data using React.js and integrates it with HTML and CSS for a
seamless user interface.

The demo is available [here](https://demo.berdychowski.com/dvc/).

## Technologies

-   **Chartjs-2**: A library used for creating interactive charts in JavaScript. Utilized for data visualization.
-   **AXIOS**: A JavaScript library for performing HTTP requests, used to communicate with the FakeStoreAPI to retrieve data.
-   **FakeStoreAPI**: A public REST API that provides fake data about store products, ideal for testing eCommerce applications and data analysis.

## Quick Start

Clone the repo and install the dependencies.

```bash
npm install
```

The `dev` command will start a dev server and watch for code changes in JS and CSS files. Hot reloading is enabled, so that any change will be visible in your browser as you type.

```bash
npm run dev
```

For production usage, run the `build` command and everything packed together into the `dist` directory.

```bash
npm run build
```
