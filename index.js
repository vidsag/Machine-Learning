var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var natural =require('natural')
var algorithm=require('./algorithm.js')
var qapair=require('./question_answer_pair.json')
var app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello. How can I help you?')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'PASSWORD') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

var token = "TOKEN"

function sendTextMessage(sender, text) {
    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function processText(text)
{
    tokenizer=new natural.WordTokenizer()
    tokens=tokenizer.tokenize(text)

    return tokens
}


app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        if (event.message && event.message.text) {
            text = event.message.text
            lower_case_text = text.toLowerCase()
            tokens = processText(lower_case_text)
            index = algorithm.findCountAndIndex(tokens)
            if (index != -1) {
                temp_ans = "" + "ans_" + maxindex
                sendTextMessage(sender,qapair.question_answer[index]['answer'] )
            }
            else {
                sendTextMessage(sender, "Sorry, I am not sure how to help you with that. Please reach us at " + "URL " +  "with your query.")
            }
            }
        }
        res.sendStatus(200)
    })




