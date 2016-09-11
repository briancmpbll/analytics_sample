// jshint node: true
'use strict';

var express = require('express');
var app = express();

var api = require('./routes/api');

app.use(express.static('public'));
app.use('/vendor', express.static('bower_components'));
app.use('/api', api);

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
