// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Messages (msg_id integer PRIMARY KEY, SmsSid TEXT, msg_fromCity TEXT, msg_fromState TEXT, msg_fromCountry TEXT, msg_body TEXT, msg_FromNumber TEXT NOT NULL, msg_datetime TEXT NOT NULL)');
    console.log('New table Messages created!');
     db.serialize(function() {
      db.run('INSERT INTO Messages (msg_body, msg_number, msg_datetime) VALUES ("This is a test Message", "2323232323", "04/26/2018")');
    });
  }
  else {
    console.log('Database "Messages" ready to go!');
    db.each('SELECT * from Messages', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// endpoint to get all the dreams in the database
// currently this is the only endpoint, ie. adding dreams won't update the database
// read the sqlite3 module docs and try to add your own! https://www.npmjs.com/package/sqlite3
app.get('/getDreams', function(request, response) {
  db.all('SELECT * from Messages', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});


//rest post for new messages
app.post('/newSms',  (request, response) => {
    const msg = request.body;
    addMessagetoDB(msg);
    response.send('<Response></Response>');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('"our app is listening on port ' + listener.address().port);
});
function addMessagetoDB(message){
    const values = [message.SmsSid, message.FromCity, message.FromState, message.FromCountry, message.Body, message.From, new Date()];
    const placeholders = values.map((e) => '(?)').join(',');
  
    console.log(values);
    db.serialize(function() {
      db.run(`INSERT INTO Messages (SmsSid, msg_fromCity, msg_fromState, msg_fromCountry, msg_body, msg_FromNumber, msg_datetime) VALUES (${placeholders})`, values);
    });
}