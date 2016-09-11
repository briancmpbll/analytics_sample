// jshint node: true
'use strict';

var express = require('express');
var router = express.Router();

var request = require('request');
var zlib = require('zlib');

router.get('/data', function(req, res) {
  var read = request
    .get('http://aware-ui-test1.s3.amazonaws.com/sample_data.json.txt.gz');
  read.pipe(zlib.createGunzip()).pipe(res);
});

module.exports = router;
