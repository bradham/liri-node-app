/* ***************
LIRI node.js projec by Brad Ham
October 2019
*************** */

//read and set any environment variables with the dotenv package
require("dotenv").config();

var fs = require("fs");
// Include the axios, moment, and spotify npm packages
var axios = require("axios");
var moment = require("moment");
var spotify = require("node-spotify-api");

var keys = require("./keys.js");

//var spotifyKey = new Spotify(keys.spotify);

//Get the command the user wrote
var command = process.argv[2];
//console.log("Command is " + command);

//Get the name of the artist or song or movie to find
var name = process.argv[3];

switch (command) {
    case "concert-this":
        concertThis(name);
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doThis();
        break;

    default: {
        console.log("Please input a correct command");
    }

}

// concert-this
/*
node liri.js concert-this <artist/band name here>

This will search the Bands in Town Artist Events API
("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
for an artist and render the following information about each event to the terminal:

Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")
*/
// Store all of the arguments in an array
function concertThis(artist) {
    console.log("<**----------------------------**>");
    console.log("Artist: " + artist);
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    
    axios.get(queryUrl).then(
        function(response) {
          console.log("Venue name: " + response.data[0].venue.name);
          console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + " " + response.data[0].venue.country);
          console.log("Date of event: " + response.data[0].datetime);
          console.log("<**----------------------------**>");

          
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      
}

// spotify-this-song
function spotifyThis() {
    console.log("<**----------------------------**>");

}

// movie-this
function movieThis() {
    console.log("<**----------------------------**>");

}

// do-what-it-says
function doThis() {
    console.log("<**----------------------------**>");

}
