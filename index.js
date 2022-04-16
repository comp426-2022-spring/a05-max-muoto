const express = require('express');
const minimist = require('minimist');
const db = require("./database.js");
const morgan = require('morgan');
const fs = require('fs');


const app = express()
const argv = (minimist)(process.argv.slice(2));

// Set valid args
argv["port"];
argv["help"]
argv["debug"]


// Get port from arg, if no arg exists set to 5000
const HTTP_PORT = argv.port || 5000;

if (argv.help) {
  console.log("server.js [options]")
  console.log("--port	Set the port number for the server to listen on. Must be an integer between 1 and 65535.");
  console.log("--debug If set to `true`, creates endlpoints /app/log/access/ which returns a JSON access log from the database and /app/error which throws an error with the message \"Error test successful.\" Defaults to `false`.");
  console.log("--log If set to false, no log files are written. Defaults to true. Logs are always written to database.");
  console.log("--help Return this message and exit.");
  process.exit(0);
}

// Set log and debug constants based on args
debug = false;
log = true;

if (argv.debug) {
  debug = true;
}

if (!argv.log) {
  log = false;
}


// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Creates sqllite database
app.use((req, res, next) => {
  let logdata = {
    remoteaddr: req.ip,
    remoteuser: req.user,
    time: Date.now(),
    method: req.method,
    url: req.url,
    protocol: req.protocol,
    httpversion: req.httpVersion,
    status: res.statusCode,
    referer: req.headers['referer'],
    useragent: req.headers['user-agent']
  }

  const stmt = db.prepare(`INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insert = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
  next();
});


// Debug endpiont
if (debug == true) {
    app.get('/app/log/access', (req, res) => {
      const select_statement = db.prepare('SELECT * FROM accesslog').all();
      res.status(200).json(select_statement);
  });

  app.get('/app/error', (req, res) => {
    throw new Error('Error test successful.')
  });
}

// Log endpoint
if (log == true) {
  const WRITESTREAM = fs.createWriteStream('FILE', { flags: 'a' })
  app.use(morgan('combined', { stream: WRITESTREAM }))
} 


// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

