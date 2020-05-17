const express = require('express');
const http = require('http');
const path = require('path');

const fs = require('fs');
const compression = require('compression');
const sslRedirect = require("heroku-ssl-redirect");
const routes = {
  main: "/",
  visualize: "/visualize",
  posts: "/posts",
  support: "/support",
  login: "/login",
  register: "/register",
  forgottenPassword: "/forgotten-password",
  maintenance: "/maintenance"
}

const appFile = path.join(__dirname+'/build/index.html');
const Ddos = require("ddos");

// DDOS protection
const ddos = new Ddos({
  burst: 20,
  limit: 80,
  maxexpiry: 30,
  trustProxy: true,
  onDenial: (req) => {
    const ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);
    req.res.status(429).end(
        `<h1>You're temporary blocked! Too many request with IP ${ip}</h1>`
    );
  }
});


let app = express();

const port = process.env.PORT || '8080';
app.set('port', port);
if (port !== 3000 && port !== 3001 && port !== 8080) {
  app.use(sslRedirect());
}
app.enable("trust proxy");

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

app.use(ddos.express);

app.get('*.js', gzip);
app.get('*.css', gzip);

app.use(compression());


app.use(express.static(path.join(__dirname, 'build')));

Object.keys(routes).forEach((r) => {
  app.get(routes[r], (req,res) => {
    res.status(200).sendFile(appFile);
  });
});

app.get('*', (req,res) => {
    res.status(404).sendFile(appFile);
});


const server = http.createServer(app).listen(port, (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log('Listening on port: ' + port + '.');
  }
});