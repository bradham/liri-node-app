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

var spotifyKey = new Spotify(keys.spotify);

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

// spotify-this-song

// movie-this

// do-what-it-says