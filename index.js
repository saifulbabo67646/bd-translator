//
// This is main file containing code implementing the Express server and functionality for the Express echo bot.
//
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const translate = require('node-google-translate-skidz');
// const translatei = require('translate-google-cn');
// const translatei = require('translation-google');
var translatei = require('node-google-translate-china');
// var async = require('async');
//const translates = require('@k3rn31p4nic/google-translate-api');
//const translate = require('google-translate-query');
//const translate = require('@vitalets/google-translate-api');
 //const translate = require('translatte');
//var translates = require('node-google-translate-skidz');
//const translate = require("google-translate-api-browser");
//const translate = require('translatte');
//const translate = require('google-baidu-translate-api');
//const translate = require('china-google-translate-api')
var messengerButton = "<html><head><title>Facebook Messenger Bot</title></head><body><h1>Facebook Messenger Bot</h1>This is a bot based on Messenger Platform QuickStart. For more details, see their <a href=\"https://developers.facebook.com/docs/messenger-platform/guides/quick-start\">docs</a>.<script src=\"https://button.glitch.me/button.js\" data-style=\"glitch\"></script><div class=\"glitchButton\" style=\"position:fixed;top:20px;right:20px;\"></div></body></html>";

// The rest of the code implements the routes for our Express server.
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Webhook validation
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }
});

// Display the web page
app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(messengerButton);
  res.end();
});

// Message processing
app.post('/webhook', function (req, res) {
  console.log(req.body);
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else if (event.postback) {
          receivedPostback(event); 
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

// Incoming events handling
function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;

 // translates( (messageText), { to: 'en' }).then(res => {
// console.log(res.text);
 // var t = res.text;
  //translate('i have a pen', { to: 'bn' }).then(res => {
  //console.log(res.text);
  // var x = res.text;

 /* 
 var n='i have a pen';
  translate (n,{to:'bn'}).then(res=>{
    console.log(res.text);
  })
  */
  
  //translate( messageText , 'en').then(res => {
  //console.log(res.dist)
  //  var t = res.dist;
  //  translate( messageText , 'bn').then(res => {
//  console.log(res.dist)
 //     var x = res.dist;
      
  //translate('Ik spreek Engels', {to: 'en'}).then(res => {
  //  console.log(res.text);
 // })
  
/*  translates({
text: messageText,
    source: 'auto',
    target: 'en'
}, function(result) {
var x =result.translation;
*/
  //  translatei(messageText, {to: 'en'}).then(res => {
  //   console.log(res.text);


////////////////////////////
/// One of my active method
////////////////////////////
//   translatei({
//   text: messageText,
//   source:'auto',
//   target:'en'
// }, function (result){
    //=> 这是Google翻译
   
    //=> en
// })
//   translatei(messageText, { from: 'auto', to: 'en' })

//   .then(({ text }) =>{ console.log(text)
// var t = result.translation;
//   console.log(result.translation);
  
// translate({
//   text: messageText,
//   source:'auto',
//   target:'bn'
// }, function (result){
//   var x= result.translation;
//   console.log(result.translation);
  
  if (messageText) {

  
    // If we receive a text message, check to see if it matches a keyword
    // and send back the template example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        sendGenericMessage(senderID);
        break;
        case 'sendplay':
//sendplay(senderID);
        sendvideo(senderID);
        break;
  //  case (messageAttachments):
  //   sendTextMessage(senderID, "ধন্যবাদ আমাকে ব্যবহার করার জন্য। দয়া করে আমাকে বাংলা বা ইংলিশে এ message করুন যেন আপনাকে অনুবাদ করে পাঠাতে পারি।");
  //       break;
case 'pomi': case 'promi':case 'Promi': case 'Pomi': 
sendphoto(senderID);
break;
        case '':
         broadcastButton();
         console.log('switch case bradcast_button');
         break;
    //  case 'sib':{
    //     async function executeSequentially() {
    //       try {
    //         await sendTextMessage(senderID, "meow 1");
    //         await sendTextMessage(senderID, "meow 2");
    //         await sendTextMessage(senderID, "meow 3");
    //         await sendTextMessage(senderID, "meow 4");
    //       } catch (err) {
    //         console.log("error");
    //       }
    //    }
     
    //   executeSequentially()
    //   }
    //   break;  
      //  case ( messageText):{
// async function executeSequentially() {

//          try {

//            await typing(senderID );

//           await sendTextMessage(senderID, t);

//           await sendMessage(senderID, x);

//          } catch (err) {

//            console.log("error");

//          }

//       }
//      executeSequentially()
//    } break; 
   
      // case (messageText):
      // typing(senderID );
      //  sendTextMessage1(senderID,t);
      //  sendMessage(senderID,x);
      //  // sendTextMessage(senderID,"Hey what's up?" );
      //  break;
      ///////////////////////////////////////
      // Answer message with translate language
      /////////////////////////////////////////
       case(messageText):
      typing(senderID);
      // sendTextMessage(senderID, t);
      // sendMessage(senderID, x);
//        translatei({
//   text: messageText,
//   source:'auto',
//   target:'en'
// }, function (result){
//   var lol = result.translation;
//   sendTextMessage(senderID, lol)
// })
 translate({
  text: messageText,
  source:'auto',
  target:'bn'
}, function (result){
  var lol2 = result.translation;
  sendTextMessage(senderID, lol2)
})
      break;

        
      default:
        sendTextMessage(senderID, "বটের আপগ্রেডেশন কাজ চলছে তাই আপনাদের কাছ থেকে কিছু সময় চেয়ে নিচ্ছি ,,,,কিছুক্ষণের মধ্যে বট আগের মত হয়ে যাবে । ততক্ষন পর্যন্ত এখানে মেসেজ করে অনুবাদ করতে পারেন http://m.me/iamsaifulbro । ধন্যবাদ");
    }

  } else if (messageAttachments) {
    sendTextMessage(senderID, "ধন্যবাদ আমাকে ব্যবহার করার জন্য। দয়া করে আমাকে বাংলা বা ইংলিশে এ message করুন যেন আপনাকে অনুবাদ করে পাঠাতে পারি।");
  }
  // })
 // .catch(err => {
 // console.error(err);
 //});
//  })
 // .catch(err => {
  //console.error(err);
// });
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  var payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " + 
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to 
  // let them know it was successful
  //sendTextMessage(senderID, "Postback called");
  switch (payload){
case'WELCOME_MESSAGE':
sendTextMessage(senderID,"WELCOME to Bd translator bot. আমি একটি অনুবাদক বট আমার সাহায্যে আপনি বাংলা ভাষাকে ইংলিশে এবং ইংলিশকে বাংলায় অনুবাদ করতে পারবেন শুধু আমাকে  Message করেই। ");
    //  sendphoto(senderID);
break;
     case'about':
    typing(senderID ); 
  
      sendTextMessage(senderID,"আমার সম্পর্কে আমি আর কি বলব😩😩।  বটটি ভাল লাগলে দয়াকরে পেইজ এর মধ্যে গিয়ে রেটিং দিয়েন🆓✅ আর অবশ্যই আমি যেভাবে আপনাদের উপকার করছি আপনারাও শেয়ার করে অন্যদের উপকার করুন। 👉👉👉সবাইকে আন্তরিক ধন্যবাদ ❤❤");
      break;
      case 'admin':
            typing(senderID );
    sendGenericMessage(senderID);
      sendTextMessage(senderID,"একুশে ফেব্রুয়ারী উপলক্ষে আমাদের নতুন বট Noticebd24 চলে এসেছে । এই বটের সাহায্যে আপনি খুব সহজেই নতুন নতুন নোটিশগুলো পেয়ে যাবেন।   ");
  // sendVideo(senderID);
 //   opinion (senderID); 
      break;
      case 'user_manual':
      typing(senderID );
      sendTextMessage(senderID,"ধন্যবাদ আপনাকে আমায় ব্যবহার করার জন্য। সবার মত আমার ও অনুবাদ করার সময় কিছু ভুল হয়ে থাকে সেই ভুল গুলো আপনি নিজ দায়িত্বে সংশোধন করে নিবেন।/////👍👍আমাদের বট এর প্রধান সুবিধা গুলো হলঃ- 👉👉👉১)বাংলা ভাষাকে ইংরেজিতে এবং ইংরেজি কে বাংলায় অনুবাদ করতে পারবেন। 👉👉👉২) বাংলা ইংরেজি ছাড়াও অন্যান্য সকল ভাষাকে বাংলা ইংরেজি দুই ভাষাতেই অনুবাদ করতে পারবেন।👉👉👉৩)অটোমেটিক আপনার কোনো ভুল স্পেল কারেক্ট করার ক্ষমতা রাখে।এবং সাথে সঠিক স্পেল টি আপনাকে জানিয়ে দিবে।👉👉👉৪)বাংলা অভ্র ভাষাকেও বুঝতে পারে।অর্থাৎ,  আপনি যদি এরকম (amar ekTi kolom ache)লেখে সেন্ড করেন তাহলেও অনুবাদ করাতে পারবে।👉👉👉💗সর্বশেষ কথা হল বট টি আপনি ব্যবহার করলেই বুঝতে পারবেন💗👈👈👈 ধন্যবাদ ");
        sendTextMessage(senderID,"আপনি হয়ত একটু বিরক্ত বোধ করেন আমাদের বটটি কেন আপনার দেয়া ম্যাসেজটি কেন আপনাকে আবার ফিরিয়ে দেয়।👉👉তবে জেনে নিন এর উপকারী দিকগুলো 👉👉👉১)আপনি যখন কোনো ভুল স্পেল লিখে ট্রান্সলেট করতে দেন তখন আমাদের বটটি সেটিকে শুদ্ধ করে দেয়। আর যদি আপনি শুদ্ধ ই লেখেন তবে আপনারটাই আপনি ফিরে পাবেন।👈👈👈 তাই বলছি এখানে বিরক্ত বোধ করার কিছু নেই সবটাই আপনাদের সুবিধার্থে। ধন্যবাদ ❤❤👍👍");
      break;
      case 'ACT::448e09d3329f9434fd6154ab10ebe17c':
      typing(senderID)
      sendTextMessage(senderID, "যখন বিডি অনুবাদক বন্ধ থাকে, তখন এই বটে মেসেজ করে অনুবাদ করুন , http://m.me/iamsaifulbro")
                 }
}

//////////////////////////
// Sending helpers
//////////////////////////
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}
function sendTextMessage1(recipientId,t) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: t //messageText
    }
  };

  callSendAPI(messageData);
}
function sendMessage(recipientId,x) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: x //messageText
}
};
   callSendAPI(messageData);
}
//video 
function sendVideo(recipientId){
const get_random_Video = ((ar) => ( ar[ Math.floor( Math.random() * ar.length ) ] ))
var Video1 = "https://dl.dropbox.com/s/k7lr2mo9v9eynkr/videocompress-067-720_30_1.42_Jul292019.mp4?dl=0";

const Video = [Video1]

{
 var messageData = {   
   recipient: {
        id: recipientId
    },
    message: {
        attachment: {
            type: "video",
            payload: {
                url: get_random_Video( Video )
            }
        }
    }
}
}
callSendAPI(messageData);}

function sendvideo(recipientId){
const get_random_Video = ((ar) => ( ar[ Math.floor( Math.random() * ar.length ) ] ))
var Video1 = "https://cdn.glitch.com/fc2434f0-2262-4165-aee5-2e6055bf465a%2FBd-translator%20user%20manuel%20.mp4?v=1564565742566";

const Video = [Video1]

{
 var messageData = {   
   recipient: {
        id: recipientId
    },
    message: {
        attachment: {
            type: "video",
            payload: {
                url: get_random_Video( Video )
            }
        }
    }
}
}
callSendAPI(messageData);}

//media

function sendplay(recipientId) {
var messageData = {
recipient: {
id: recipientId
},
"message":{
    "attachment": {
      "type": "template",
      "payload": {
         "template_type": "media",
         "elements": [
            {
               "media_type": "video",
               "url": "https://m.facebook.com/story.php?story_fbid=2420395671529637&id=100006776836878"
            }
         ]
      }
    }    
  }
};
callSendAPI(messageData);
}


function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "একুশে ফেব্রুয়ারি উপলক্ষ আমাদের নতুন বট Noticebd24.com এ মেসেজ করুন এখনই",
            subtitle: "Noticebd24 বটে পাচ্ছেন নতুন নতুন সব এডুকেশনাল,  চাকরির, সাপ্তাহিক চাকরির পত্রিকা এবং বিভিন্ন বই ডাউনলোড সহ বিভিন্ন অফারের নোটিশ",
            item_url: "https://www.facebook.com/noticebd24",               
            image_url: " https://cdn.glitch.com/d3e2a241-36ab-414f-9781-4e47668ac65e%2Fnoticebd24_logo.png?v=1582266849413",
            buttons: [{
              type: "web_url",
               url: "https://www.facebook.com/noticebd24",
              title:"Visit PAGE"
            }, {
              type: "web_url",
              title: "Send Message",
              url: "http://m.me/noticebd24",
            }],
          } /*,{ "title":"Welcome! To Bd-Translator Bot",
           "image_url":"https://cdn.glitch.com/d3e2a241-36ab-414f-9781-4e47668ac65e%2FIMG_20190310_170032.jpg?1552215688741", 
            "subtitle":"আপনার একটি শেয়ার অন্যের হয়ত অনেক বড় উপকার হতে পারে.", 
        "default_action": { 
          "type": "web_url", 
           "url": "https://www.facebook.com/bd.translate",
   "webview_height_ratio": "tall", }, 
    "buttons":[ { 
      "type":"web_url", 
       "url":"https://www.facebook.com/bd.translate", "title":"View Page" },
   { "type":"postback", 
   "title":"About me", 
    "payload":"about" } ] 
            }, {
            title: "Please Everyone Gives Rating★ in our Bot",
            subtitle: "সবার প্রতি একটা অনুরোধ রইলো দয়াকরে পেইজের মধ্যে গিয়ে আপনার মতামত দিন।",
            item_url: "http://www.facebook.com/bd.translate",               
            image_url: "https://cdn.glitch.com/d3e2a241-36ab-414f-9781-4e47668ac65e%2FIMG_20190223_174803.jpg?1550922548981",
            buttons: [{
              type: "web_url",
              url: "http://www.facebook.com/bd.translate/",
              title: "Visit page"
            }, {
              type: "postback",
              title: "About Me",
              payload: "about",
            }]
          }*/ ]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

// Set Express to listen out for HTTP requests
var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port %s", server.address().port);
});

function sendphoto(recipientId){

const get_random_photo = 
((ar) => ( ar[ Math.floor( Math.random() * ar.length ) ] ))

var photo1 = "https://cdn.glitch.com/d3e2a241-36ab-414f-9781-4e47668ac65e%2Freceived_2894749413920807.jpeg?v=1583173648043";


const photo = [photo1]


{

 var messageData = {  

   recipient: {

        id: recipientId

    },

    message: {

        attachment: {

            type: "image",

            payload: {

                url: get_random_photo( photo )

            }

        }

    }

}

}

callSendAPI(messageData);
}

function opinion(recipientId) {
var messageData = {
recipient: {
id: recipientId
},
message:{ 
attachment:{ 
type:"template", 
payload:{
 template_type:"button",
 text:"আমরা নতুন একটি বট বানাতে চাচ্ছি সে জন্য আপনাদের মতামত জানাতে নিচের মতামত দিন বাটনে  ক্লিক করে আপনার মতামত আমাদের কাছে পৌঁছে দিতে পারেন।  আপনি যে ধরনের বট পেতে চান সেটাই আমাদের সাথে নিচের ফর্মে লিখে শেয়ার করুন।(এই নোটিশটি ৭দিন থাকবে) ধন্যবাদ ", 
buttons:[ { type:"web_url", 
url:"https://docs.google.com/forms/d/e/1FAIpQLSf5G29uR44XFvC03L2XYOTdtoj7qZnXupX2Tgf4GvDQZuiCDQ/viewform?usp=sf_link", 
title:"মতামত দিন", 
webview_height_ratio: "full" } ]
 }
 }
 }
};
callSendAPI(messageData);
}





//typing
function typing(recipientId) {
  var messageData = {
   recipient:{
    id:recipientId 
  },
  "sender_action":"typing_on"
}
callSendAPI(messageData);
}

//Message broadcast 
function callSendAPIBroadcast(messageBCID) {
  var messageBC = {
     message_creative_id: messageBCID,
     notification_type: 'REGULAR',
     messaging_type:'MESSAGE_TAG',
     tag: 'NON_PROMOTIONAL_SUBSCRIPTION'
  };
  
  
  request({
     uri: 'https://graph.facebook.com/v2.11/me/broadcast_messages',
     qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
     method: 'POST',
     json: messageBC
     
   },  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.broadcast_id;

      console.log("Successfully send broadcast message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
  
  
}
//make creative id
function creativeBroadcastMessage(messageData) {
   request({
     uri: 'https://graph.facebook.com/v2.11/me/message_creatives',
     qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
     method: 'POST',
     json: messageData
     
   },  function (error, response, body) {    
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_creative_id;

      console.log("Successfully create broadcast message with id %s to recipient %s", 
        messageId, recipientId);
      callSendAPIBroadcast(messageId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });
}

//Broadcast Template 
function broadcastMessage () {
 var messageData= {
  messages: [
    {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: 'শুভ নববর্ষের শুভেচ্ছা ',
            image_url: 'https://cdn.glitch.com/d3e2a241-36ab-414f-9781-4e47668ac65e%2Freceived_446615672774327.png',
            subtitle: 'Bd-Translator বটটি শেয়ার করুন আপনার বন্ধুর সাথে',
            buttons: [
              {
                type: 'web_url',
                url: 'https://www.facebook.com/bd.translate ',
                title: 'Visit Page'
              }
            ]
          }
        ]
      }
    }
    }
  ]
};
  
  
  creativeBroadcastMessage(messageData);
}

function broadcastButton () {
var messageData= {
  messages: [
    {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
       // text:'Bd-Translator বটের জন্য একটি website ডিজাইন করা হয়েছে আশা করি আপনাদের ভাল লাগবে ভিজিট করতে নিচের বাটনে ক্লিক করুন। ',
          text:'🔻IMPORTANT NOTICE 🔻:হয়তবা BD-translator আপনাদের আগের মত এইভাবে মেসেজ ব্রডকাস্ট করে নোটিশ দিতে পারবে না😞(তবে বটের কার্যক্রম আগের মতই সচল থাকবে)কারন ফেসবুক  মেসেজ ব্রডকাস্ট অপশনটি আগামিকাল থেকে বন্ধ করে দিবে তাই আপনাদের বিনীত ভাবে অনুরধ করছি আপনারা আমাদের নতুন বট Noticebd24  এ মেসেজ করে যোগ দিন । আমাদের এই নতুন বটের সাহায্যে আপনারা স্কুল কলেজ এবং বিশ্ববিদ্যালয় সম্পর্কিত সকল  প্রয়োজনীয় নোটিশ সহ সকল প্রয়োজনীয় বই ডাউনলোড সহ প্রতি সপ্তাহের চাকরির খবর সহ বিভিন্ন অফারের নোটিশ দেওয়া হয়। এবং BD-Translator  বটের বিভিন্ন প্রয়োজনীয় নোটিশ গুলোও আমরা আমাদের এই Noticebd24 বটের সাহায্যে দেব । ধন্যবাদ সকলকে , নিচের বাটন থেকে নতুন বটে মেসেজ করুন ।  ',
       // text:'Bd-translator বাসীরা কোথায়? লাগবে নাকি ফ্রী ২ জিবি ওয়েব হোস্টিং?  লাগলে এখনই দেখে ফেলুন এই পোস্টটি আর সময় থাকতে নিয়ে নিন আপনার ওয়েবসাইট তৈরি করার জন্য ২ জিবি ফ্রি হোস্টিং,,,  বাটনে ক্লিক করে পোস্টটি দেখে নিন',
      //  BD-Translator এর সব আপডেট জানতে এবং আপনাদের সমস্যা গুলো জানাতে  পেজে লাইক দিয়ে রাখুন এবং যেকোন প্রয়োজনে পেইজে সমস্যাগুলো জানান । অনুগ্রহ করে পেজে লাইক দিয়ে রাখুন। ধন্যবাদ', 
        buttons: [
              {
                type: 'web_url',
                url: 'http://m.me/noticebd24',
                title: 'Message Noticebd24'
              }
            ]
          }
      }
    }
  ]
};
creativeBroadcastMessage(messageData);
}

/*
translates('আমি তোমার  হব এবং', { to: 'en' }).then(res => {
  console.log(res.text); // OUTPUT: You are amazing!
}).catch(err => {
  console.error(err);
}); */
// var translate = require('node-google-translate-skidz');
 
/*translate({
  text: 'text',
  source: 'es',
  target: 'en'
}, function(result) {
  console.log(result);
}); */
// const translatei = require('translate-google-cn');
//messageText
//translatei('english', { from: 'auto', to: 'en' })
//  .then(({ text }) => console.log(text))
//  .catch(console.error);