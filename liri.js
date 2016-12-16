// require the file system so that we can read files
var fs = require('fs');

// require the javascript file with our keys
var keysJS = require('./keys.js');

// require the appropriate libraries
var Twitter = require('twitter');
var Spotify = require('spotify');
var Request = require('request');

var action = process.argv[2];

function switchFn(action){
	switch (action) {
		case "my-tweets":
			tweetFn();
			break;
		case "spotify-this-song":
			var title = process.argv.slice(3,process.argv.length);
			tite = title.join(" ");
			spotifyFn(title);
			break;
		case "movie-this":
			var title = process.argv.slice(3,process.argv.length);
			tite = title.join(" ");
			movieFn(process.argv.slice(3,process.argv.length));
			break;
		case "do-what-it-says":
			doFn();
			break;
	}
}

// tweet function: show last 20 tweets and when they were created
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

// spotify function: displays artist, song name, preview link from Spotify, album
// * if no song is provided then default to "The Sign" by Ace of Base
function spotifyFn(songName){
	if (songName.length === 0){
		console.log('You did not enter a song, so please enjoy the musical stylings of Ace of Base.\n');
		console.log('Artist(s): Ace of Base');
		console.log('Song Name: The Sign');
		console.log('Album: The Sign (US Album) [Remastered]');
		console.log('Preview Link: https://p.scdn.co/mp3-preview/177e65fc2b8babeaf9266c0ad2a1cb1e18730ae4?cid=null' +'\n');
		return;
	}

	Spotify.search({ type: 'track', query: songName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 	else{
	 		//for (var i = 0; i < data.tracks.items.length; i++){
	 		for (var i = 0; i < 1; i++){
	 			console.log('Artist(s): ' + data.tracks.items[i].artists[0].name);
				console.log('Song Name: ' + data.tracks.items[i].name)
				console.log('Album: ' + data.tracks.items[i].album.name);
				//console.log('Preview Link: ' + data.tracks.items[i].album.artists[0].external_urls.spotify +'\n');
				console.log('Preview Link: ' + data.tracks.items[i].preview_url +'\n');
			}
	 	}
	});
}

// omdb function: displays title, year of release, IMDB rating,
// country, language, plot, actors, rotten tomatoes rating and
// rotten tomatoes URL
function movieFn(movieName){
	if (movieName.length === 0){
		movieName = "Mr. Nobody";
	}
	var omdbURL = "http://www.omdbapi.com?tomatoes=true&t=" + movieName;
	Request(omdbURL, function (error, response, data) {
		if (!error && response.statusCode == 200) {
			data = JSON.parse(data);
			console.log("Title: " + data.Title);
			console.log("Year of release: " + data.Year);
			console.log("IMDB rating: " + data.imdbRating);
			console.log("Country: " + data.Country);
			console.log("Language: " + data.Language);
			console.log("Plot: " + data.Plot);
			console.log("Actors: " + data.Actors);
			console.log("Rotten Tomatoes Rating: " + data.tomatoRating);
			console.log("Rotten Tomatoes URL: " + data.tomatoURL);
		}
	});
}

function doFn(){
	// read the existing  file
	fs.readFile("random.txt", "utf8", function(err, data) {

		// Break down all the numbers inside
		data = data.split(",");
		action = data[0];
		title = data[1];
		switch (action) {
			case "my-tweets":
				tweetFn();
				break;
			case "spotify-this-song":
				spotifyFn(title);
				break;
			case "movie-this":
				movieFn(title);
				break;
			case "do-what-it-says":
				doFn();
				break;
		}
	});
}

// figure out what the user wants program to do
switchFn(process.argv[2]);