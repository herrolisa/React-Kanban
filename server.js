'use strict';

// REQUIRED MODULES ============================================================
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models');

const express = require('express');
const app = express();

// SET UP PUG TEMPLATES
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// ROUTES ======================================================================
app.get('/', function (req, res) {
  res.render('index');
});

app.listen(app.get('port'), function () {
  db.sequelize.sync();
  console.log(`Server listening on port ${app.get('port')}`);
});