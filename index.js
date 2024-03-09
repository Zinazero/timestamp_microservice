// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  var dateString = req.params.date;
  var date;

  if (/^\d+$/.test(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }
  
  if (isNaN(date)) {
    res.json({ error: "Invalid date" });
  } else {
    var unixTimeStamp = date.getTime();
    var utcDate = date.toUTCString();
    res.json({ unix: unixTimeStamp, utc: utcDate });
  }
});


app.get("/api", function (req, res) {
  var currentDate = new Date();
  var currentTime = currentDate.getTime();

  res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() })
})




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
