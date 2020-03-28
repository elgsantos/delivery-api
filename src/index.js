const express = require('express');

const app = express();
const port = process.env.PORT || 3333;

app.listen(port, function () {
  console.log(`Server running on port ${this.address().port}`);
});