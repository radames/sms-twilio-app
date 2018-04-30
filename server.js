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
    db.run('CREATE TABLE Messages (msg_id integer PRIMARY KEY, SmsSid TEXT, msg_fromCity TEXT, msg_fromState TEXT, msg_fromCountry TEXT, msg_body TEXT, media_content TEXT, msg_FromNumber TEXT NOT NULL, msg_datetime TEXT NOT NULL)');
    console.log('New table Messages created!');
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
app.get('/getMessages', function(request, response) {
  db.all('SELECT msg_fromCity, msg_fromState, msg_fromCountry, msg_body, media_content, msg_datetime from Messages ORDER BY msg_datetime', function(err, rows) {
    response.send(JSON.stringify(rows));
  });
});
//rest post for new messages
app.post('/newSms',  (request, response) => {
    const msg = request.body;
    let mediaList = [];
    for (var i = 0; i < msg.NumMedia; i++) {
      const mediaUrl = msg[`MediaUrl${i}`];
      const contentType = msg[`MediaContentType${i}`];

      mediaList.push({ mediaSid, MessageSid, mediaUrl, filename });
      saveOperations = mediaItems.map(mediaItem => SaveMedia(mediaItem));
    }
  
    console.log(msg);
    addMessagetoDB(msg);
    response.send('<Response></Response>');
});
function addMessagetoDB(message){
    const values = [message.SmsSid, message.FromCity, message.FromState, message.FromCountry, message.Body, message.From, new Date()];
    const placeholders = values.map((e) => '(?)').join(',');
  
    console.log(values);
    db.serialize(function() {
      db.run(`INSERT INTO Messages (SmsSid, msg_fromCity, msg_fromState, msg_fromCountry, msg_body, msg_FromNumber, msg_datetime) VALUES (${placeholders})`, values);
    });
}
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('"our app is listening on port ' + listener.address().port);
});


/*

{ MediaContentType1: 'image/jpeg',

  ToCountry: 'US',

  MediaContentType0: 'audio/3gpp',

  ToState: 'CA',

  SmsMessageSid: 'MMe7a1290d5edc38b65c139e6584601a64',

  NumMedia: '3',

  MediaUrl2: 'https://api.twilio.com/2010-04-01/Accounts/AC45263062787d3eda8583d555e65c6b05/Messages/MMe7a1290d5edc38b65c139e6584601a64/Media/ME40c23b1519318d95fc4ca2248d982b4b',

  ToCity: 'OAKLAND',

  FromZip: '63834',

  SmsSid: 'MMe7a1290d5edc38b65c139e6584601a64',

  FromState: 'MO',

  SmsStatus: 'received',

  FromCity: 'CHARLESTON',

  Body: '😀☺😍😂',

  FromCountry: 'US',

  To: '+15103450470',

  MediaUrl1: 'https://api.twilio.com/2010-04-01/Accounts/AC45263062787d3eda8583d555e65c6b05/Messages/MMe7a1290d5edc38b65c139e6584601a64/Media/ME0f9086a5e80daa9b85916f471a785c0e',

  ToZip: '94615',

  NumSegments: '3',

  MessageSid: 'MMe7a1290d5edc38b65c139e6584601a64',

  AccountSid: 'AC45263062787d3eda8583d555e65c6b05',

  MediaContentType2: 'image/gif',

  From: '+15734270584',

  MediaUrl0: 'https://api.twilio.com/2010-04-01/Accounts/AC45263062787d3eda8583d555e65c6b05/Messages/MMe7a1290d5edc38b65c139e6584601a64/Media/ME658c2005e6dc7a7c31c3fc40826913e5',

  ApiVersion: '2010-04-01' }


[ 'MMe7a1290d5edc38b65c139e6584601a64',

  'CHARLESTON',

  'MO',

  'US',

  '😀☺😍😂',

  '+15734270584',

  2018-04-27T03:51:46.651Z ]


{ MediaContentType1: 'image/jpeg',

  ToCountry: 'US',

  MediaContentType0: 'image/gif',

  ToState: 'CA',

  SmsMessageSid: 'MMd43e72a131d5d27398c88c6ea5431094',

  NumMedia: '3',

  MediaUrl2: 'https://api.twilio.com/2010-04-01/Accounts/AC45263062787d3eda8583d555e65c6b05/Messages/MMd43e72a131d5d27398c88c6ea5431094/Media/ME31b72368becab85d1a5465bbbd4fe5e8',

  ToCity: 'OAKLAND',

  FromZip: '63834',

  SmsSid: 'MMd43e72a131d5d27398c88c6ea5431094',

  FromState: 'MO',

  SmsStatus: 'received',

  FromCity: 'CHARLESTON',

  Body: 'Testando',

  FromCountry: 'US',

  To: '+15103450470',

  MediaUrl1: 'https://api.twilio.com/2010-04-01/Accounts/AC45263062787d3eda8583d555e65c6b05/Messages/MMd43e72a131d5d27398c88c6ea5431094/Media/ME09b0ae7c6eeba9fd1e7adca65344f052',

  ToZip: '94615',

  NumSegments: '3',

  MessageSid: 'MMd43e72a131d5d27398c88c6ea5431094',

  AccountSid: 'AC45263062787d3eda8583d555e65c6b05',

  MediaContentType2: 'audio/3gpp',

  From: '+15734270584',

  MediaUrl0: 'https://api.twilio.com/2010-04-01/Accounts/AC45263062787d3eda8583d555e65c6b05/Messages/MMd43e72a131d5d27398c88c6ea5431094/Media/ME0698fcea331a1fb902d36c2efa77c3b4',

  ApiVersion: '2010-04-01' }


[ 'MMd43e72a131d5d27398c88c6ea5431094',

  'CHARLESTON',

  'MO',

  'US',

  'Testando',

  '+15734270584',

  2018-04-27T03:51:47.637Z ]
  
  */