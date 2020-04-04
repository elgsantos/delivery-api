# Delivery-API
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/standard/semistandard)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

### :truck: A delivery API to store and provide delivery data.

## Table of Contents
- [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
- [Built With](#built-with)
- [Tools used](#tools-used)
- [Contributing](#contributing)
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

### Usage

You can start the server with:

```sh
$ npm start
```

If you are in development environment, you can use the development server with autoreloading:

```sh
$ npm run dev
```

To run unit tests use: 

```sh
$ npm run test:unit
```

To run integration tests use: 

```sh
$ npm run test:integration
```

## Built With

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [fast-glob](https://github.com/mrmlnc/fast-glob)
- [jest](https://github.com/facebook/jest)
- [jest-mongodb](https://github.com/shelfio/jest-mongodb)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Nodemon](https://nodemon.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [semistandard](https://github.com/standard/semistandard)
- [lint-staged](https://github.com/okonet/lint-staged)
- [husky](https://github.com/typicode/husky)

## Tools used

The following tools were used in the development of the API:

- Code editor: [vscode](https://marketplace.visualstudio.com/vscode)
- Semistandard Extension: [vscode-semistandard](https://marketplace.visualstudio.com/items?itemName=flet.vscode-semistandard)

## Contributing

Feel free to develop and contribute, and send your pull requests. :blush:

* The semistandard should be used, to ensure that the code will follow the same pattern.
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

------------------------------|---------|----------|---------|---------|-------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------------------|---------|----------|---------|---------|-------------------
All files                     |     100 |      100 |     100 |     100 | 
 domain/usecases              |     100 |      100 |     100 |     100 |                   
  delivery-usecase.js         |     100 |      100 |     100 |     100 |                   
 infra/helpers                |     100 |      100 |     100 |     100 |                   
  mongo-helper.js             |     100 |      100 |     100 |     100 | 
 infra/repositories           |     100 |      100 |     100 |     100 | 
  delivery-repository.js      |     100 |      100 |     100 |     100 | 
 main/adapters                |     100 |      100 |     100 |     100 | 
  express-router-adapter.js   |     100 |      100 |     100 |     100 | 
 main/composers               |     100 |      100 |     100 |     100 | 
  delivery-router-composer.js |     100 |      100 |     100 |     100 | 
 main/middlewares             |     100 |      100 |     100 |     100 | 
  content-type.js             |     100 |      100 |     100 |     100 |                   
  cors.js                     |     100 |      100 |     100 |     100 | 
  json-parser.js              |     100 |      100 |     100 |     100 | 
 main/routes                  |     100 |      100 |     100 |     100 |                   
  delivery-routes.js          |     100 |      100 |     100 |     100 | 
 presentation/helpers         |     100 |      100 |     100 |     100 | 
  date-converter.js           |     100 |      100 |     100 |     100 | 
  http-response.js            |     100 |      100 |     100 |     100 | 
 presentation/routers         |     100 |      100 |     100 |     100 |                   
  delivery-router.js          |     100 |      100 |     100 |     100 | 
 utils/errors                 |     100 |      100 |     100 |     100 | 
  index.js                    |     100 |      100 |     100 |     100 | 
  missing-param-error.js      |     100 |      100 |     100 |     100 | 
  server-error.js             |     100 |      100 |     100 |     100 | 
------------------------------|---------|----------|---------|---------|-------------------

Test Suites: 9 passed, 9 total
Tests:       40 passed, 40 total
Snapshots:   0 total
Time:        17.995s
Enumerating objects: 80, done.
Counting objects: 100% (80/80), done.
Delta compression using up to 4 threads
Compressing objects: 100% (55/55), done.
Writing objects: 100% (58/58), 6.72 KiB | 132.00 KiB/s, done.
Total 58 (delta 26), reused 0 (delta 0)
remote: Resolving deltas: 100% (26/26), completed with 12 local objects.
```

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License. See `LICENSE` for more information.