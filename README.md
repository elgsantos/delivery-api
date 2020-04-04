# Delivery-API
[![Build Status](https://travis-ci.com/elgsantos/delivery-api.svg?branch=master)](https://travis-ci.com/elgsantos/delivery-api)
[![Coverage Status](https://coveralls.io/repos/github/elgsantos/delivery-api/badge.svg?branch=master)](https://coveralls.io/github/elgsantos/delivery-api?branch=master)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

### :truck: A delivery API to store and provide delivery data.

Built using TDD, clean architecture, Factory pattern and dependency injection.

## Table of Contents
- [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Documentation](#documentation)
- [Built With](#built-with)
- [Tools used](#tools-used)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## Getting Started

### Prerequisites

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

### Installation

Clone the project with:

```sh
$ git clone https://github.com/elgsantos/delivery-route-api.git
```

Get in the path project, then install the dependencies with:

```sh
$ npm install
```

Install Jest globally to run tests

```sh
$ npm install jest -g
```

To test and commit files using the repository standard, install semistandard globally

```sh
$ npm install semistandard -g
```

If local, create a .env file on project's root directory containing your MONGO_URL:
```sh
MONGO_URL = "your_url"
```

### Usage

You can start the server with:

```sh
$ npm start
```

To run and watch unit tests, use: 

```sh
$ npm run test:unit
```

To run and watch integration tests, use: 

```sh
$ npm run test:integration
```

### Documentation

Read the [documentation](https://github.com/elgsantos/delivery-api/blob/master/DOCUMENTATION.md).

## Built With

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [fast-glob](https://github.com/mrmlnc/fast-glob)
- [jest](https://github.com/facebook/jest)
- [jest-mongodb](https://github.com/shelfio/jest-mongodb)
- [SuperTest](https://github.com/visionmedia/supertest)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [semistandard](https://github.com/standard/semistandard)
- [lint-staged](https://github.com/okonet/lint-staged)
- [husky](https://github.com/typicode/husky)

## Tools used

The following tools were used in the development of the API:

- Code editor: [vscode](https://marketplace.visualstudio.com/vscode)
- Semistandard Extension: [vscode-semistandard](https://marketplace.visualstudio.com/items?itemName=flet.vscode-semistandard)
- REST Client: [Insomnia](https://insomnia.rest/)

## Contributing

Feel free to develop and contribute, and send your pull requests. :blush:

* The [semistandard](https://github.com/standard/semistandard) should be used, to ensure that the code will follow the same standard.
* Before each commit, husky runs tasks to standardize the code correctly.
* Tests are performed on the staged files, and if the tests are not ok, the commit will be canceled.

```
$ git commit -m "some awesome feature"

husky > pre-commit (node v12.4.0)
‼ Some of your tasks use `git add` command. Please remove it from the config since 
all modifications made by tasks will be automatically added to the git commit index.

Preparing... [started]
Preparing... [completed]
Running tasks... [started]
Running tasks for *.js [started]
semistandard --fix [started]
semistandard --fix [completed]
npm run test:staged [started]
npm run test:staged [completed]
git add [started]
git add [completed]
Running tasks for *.js [completed]
Running tasks... [completed]
Applying modifications... [started]
Applying modifications... [completed]
Cleaning up... [started]
Cleaning up... [completed]
[master f252e10] server and database configuration
 23 files changed, 334 insertions(+), 32 deletions(-)
```

* Tests are also performed before push, so code will be pushed if 100% is passing.
```
$ git push origin master

husky > pre-push (node v12.4.0)
...

Test Suites: 9 passed, 9 total
Tests:       40 passed, 40 total
...
```

## Author
* **Eduardo Santos** - [elgsantos](https://github.com/elgsantos/)

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License. See `LICENSE` for more information.