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

app.get('/api/tasks', function (req, res) {
  db.Task.findAll().then(function(tasksArray) {
    res.json(tasksArray);
  });
});

app.post('/api/tasks', function (req, res) {
  db.Task.create({
    title: req.body.title,
    priority: req.body.priority,
    created_by: req.body.created_by,
    assigned_to: req.body.assigned_to,
  }).then(function(object) {
    res.json(object);
  });
});

app.listen(app.get('port'), function () {
  db.sequelize.sync();
  console.log(`Server listening on port ${app.get('port')}`);
});