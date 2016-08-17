'use strict';

// REQUIRED MODULES ============================================================
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models');

const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('You are online!');
});

app.listen(app.get('port'), function () {
  console.log(`Server listening on port ${app.get('port')}`);
});