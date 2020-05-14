const express = require('express');
const http = require('http');
const path = require('path');

const fs = require('fs');
const compression = require('compression');

let app = express();

const hasGzip = (fileName) => {
  return fs.existsSync(`../dist${fileName}.gz`);
};

const gzip = (req, res, next) => {
  if (hasGzip(req.url)) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
  } else {
    next();
  }
};

app.get('*.js', gzip);
app.get('*.css', gzip);

app.use(compression());

app.use(express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || '8080';
app.set('port', port);
const server = http.createServer(app).listen(port, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log('Listening on port: ' + port + '.');
  }
});