const keys = require('./keys.js');
const express = require('express');
const app = express();
const axios = require('axios');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const dict = require('./dict.js')
const fired = require('./fired.js')

const PORT = 8080;
const cors = require('cors');
let current = '+15307986793';
let messages= [];
let past = [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const accountSid = keys.twilio_sid;
const authToken = keys.auth_token;
const client = require('twilio')(accountSid, authToken);

app.listen(PORT, function(){
    console.log(`API Server now listening on PORT ${PORT}`)
})

//get API to show the current number being conversed with
app.get('/', function (req, res) {
    res.send(`${current} - this phone `);
}); 

//get API showing the array of Recieved Numbers and Messages
app.get('/messages', function (req, res) {
    res.send(messages);
}); 

//This allows you to send messages back to the last person You spoke with Last
app.post('/post', function (req, res) {
    data = req.body.post
    res.send(data);
    client.messages
    .create({
        body: data,
        from: '+12513090755',
        to: current
     })
    .then(message => console.log(message.sid));
});


function bodyLogic(body){
    let response = dict[body.toLowerCase()]
    if (response == undefined){
        response = 'Sorry No Command exists'
    }
    return response
}


//Main Post request, hooks into Twilio.API
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  data = req.body;
  past.push(current);
  current = data.From;
  messages.push({ number: current, message:  data.Body });
  console.log(messages);
  console.log(current);
  console.log(req.body.Body);
//   twiml.message(`You said "${data.Body}" and you're from ${data.FromCity}, ${data.FromState} `);
  fired(bodyLogic(req.body.Body)).then((response) =>{
  twiml.message(response);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  });
});

