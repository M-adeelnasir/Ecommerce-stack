const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser())


module.exports = app;