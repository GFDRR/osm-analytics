'use strict';

const path = require('path');
const express = require('express');

const app = express();

// Load environment config
require(path.join(__dirname, 'environments', process.env.NODE_ENV || 'development'))(app);

module.exports = app;
