const keys = require('./keys.js');
const express = require('express');
const app = express();
const axios = require('axios');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const PORT = 8080;
const cors = require('cors');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const accountSid = keys.twilio_sid;
const authToken = keys.auth_token;
const client = require('twilio')(accountSid, authToken);

app.listen(PORT, function(){
    console.log(`API Server now listening on PORT ${PORT}`)
})

app.get('/', function (req, res) {
    res.send("It's working");
}); 

app.post('/post', function (req, res) {
    data = req.body.post
    res.send(data);
    client.messages
    .create({
        body: data,
        from: '+12513090755',
        to: '+15307012179'
     })
    .then(message => console.log(message.sid));
});



app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

