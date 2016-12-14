var fs = require('fs');
var keysJS = require('./keys.js');

var Twitter = require('twitter');

var action = process.argv[2];

switch (action) {
	case "my-tweets":
		tweetFn();
		break;
	case "spotify-this-song":
		spotifyFn();
		break;
	case "movie-this":
		movieFn();
		break;
	case "do-what-it-says":
		doFn();
		break;
}

// show last 20 tweets and when they were created
function tweetFn(){
	// initialize twitter API keys
	var client = new Twitter({
		consumer_key: keysJS.twitterKeys.consumer_key,
		consumer_secret: keysJS.twitterKeys.consumer_secret,
		access_token_key: keysJS.twitterKeys.access_token_key,
		access_token_secret: keysJS.twitterKeys.access_token_secret
	});

	// set twitter handle
	var params = {screen_name: 'chezkevintam'};

	// get the last 20 tweets for given twitter handle
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < 20; i++){
				console.log(tweets[i].created_at + "\n");
				console.log(tweets[i].text)
			}
		}
	});
}

// Displays:
// * Artist(s)
// * The song's name
// * A preview link of the song from Spotify
// * The album that the song is from
function spotifyFn(){
	
}