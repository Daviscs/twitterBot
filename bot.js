var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

//Posts a status
function tweetIt(text){

//Message for the status
    var tweet = {
      status: text
    }

    T.post('statuses/update', tweet, tweeted)

    function tweeted(err, data, response){
    }
}

//Monitors followers
var streamer = T.stream('user', 'KicksDeals');
streamer.on('tweet', tweetAlert);

function tweetAlert(eventMsg){
  var message = eventMsg.text;
  var name = eventMsg.user.screen_name;

//Words that the bot is looking for in the status
  var offWhiteMsg = message.includes("SNKS");
  var offWhiteMsg2 = message.includes("Off-White")

//Checks if the status contain the specific word
  if(offWhiteMsg == true || offWhiteMsg2 == true){
    tweet = {
     //The user that the bot will notify
      screen_name: "Bobby",
      text: 'Hello @' + name +' posted about Bobby!!'
    }

//Notifys the user by private message that a status contains the specfic word
    T.post("direct_messages/new", tweet)
  }
}

//Runs when a user follows the bot
var streamer = T.stream("user");
streamer.on('follow', sendingMsg);

function sendingMsg(eventMsg){
var name = eventMsg.source.screen_name,

tweet = {
  screen_name: name,
  text: 'Hello ' + name + ' thanks for the follow!'
}

//The status message when someone follows bot
tweetIt('@' + name + ' thanks for the follow! You are also beautiful :)');

//Sends a private message to the user
T.post("direct_messages/new", tweet)

}
