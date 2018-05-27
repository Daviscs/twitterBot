//Like an import statement for node
var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

//---------------Twitting---------------------
function tweetIt(txt){
    var tweet = {
      status: txt
    }

    T.post('statuses/update', tweet, tweeted)

    function tweeted(err, data, response){
    }
}

//Message when account tweets about off-white shoe
var streamer = T.stream('user', 'KicksDeals');
streamer.on('tweet', tweetAlert);

function tweetAlert(eventMsg){
  var message = eventMsg.text;
  var name = eventMsg.user.screen_name;
  var offWhiteMsg = message.includes("SNKS");
  var offWhiteMsg2 = message.includes("Off-White")

  if(offWhiteMsg == true || offWhiteMsg2 == true){
    tweet = {
      screen_name: 'daveyTrann',
      text: 'Hello @' + name +' posted something about off-white!!'
    }

    T.post("direct_messages/new", tweet)
  }

}

//-------------If someone follows bot--------------
var streamer = T.stream("user");
streamer.on('follow', sendingMsg);

function sendingMsg(eventMsg){
var name = eventMsg.source.screen_name,

tweet = {
  screen_name: name,
  text: 'Hello ' + name + ' thanks for the follow and contributing for the lols'
}

tweetIt('@' + name + ' thanks for the follow. Oh you are also beautiful, teehee :)');
T.post("direct_messages/new", tweet)

}
