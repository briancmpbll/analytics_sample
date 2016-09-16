// jshint node: true
'use strict';

var express = require('express');
var router = express.Router();

var request = require('request');
var zlib = require('zlib');

function sendError(res) {
  res.status(500).json({ error: 'Something went wrong' });
}

router.get('/data', function(req, res) {
  var get = request.get('http://aware-ui-test1.s3.amazonaws.com/sample_data.json.txt.gz');
  get.on('response', function(response) {
      if (response.statusCode === 200) {
        get.pipe(zlib.createGunzip()).pipe(res);
      }
      else {
        sendError(res);
      }
    })
    .on('error', function(err) {
      console.log(err);
      sendError(res);
    });
});

module.exports = router;
