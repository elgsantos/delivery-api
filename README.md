# Delivery-Route-API
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

A delivery API with address verification and integration with the maps API.

## Table of Contents
- [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
- [Built With](#built-with)
- [Tools used](#tools-used)
- [License](#license)

## Getting Started

### Prerequisites

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

### Installation

Clone the project with:

```sh
git clone https://github.com/elgsantos/delivery-route-api.git
```

Get in the path project, then install the dependencies with:

```sh
npm install
```

Install Jest globally to run tests

```sh
npm install jest -g
```

To test and commit files using the repository standard, install semistandard globally

```sh
npm install semistandard -g
```

### Usage

You can start the server with:

```sh
npm start
```

If you are in development environment, you can use the development server with autoreloading:

```sh
npm run dev
```

## Built With

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [jest](https://github.com/facebook/jest)
- [Nodemon](https://nodemon.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [semistandard](https://github.com/standard/semistandard)
- [lint-staged](https://github.com/okonet/lint-staged)
- [husky](https://github.com/typicode/husky)

## Tools used

The following tools were used in the development of the API:

- Code editor: [vscode](https://marketplace.visualstudio.com/vscode)
- Semistandard Extension: [vscode-semistandard](https://marketplace.visualstudio.com/items?itemName=flet.vscode-semistandard)

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License. See `LICENSE` for more information.