/* ***************
LIRI node.js project by Brad Ham
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

//RE-ENABLE WHEN USED. ERROR OCCURS CURRENTLY
//var spotifyKey = new Spotify(keys.spotify);

//Get the command the user wrote
var command = process.argv[2];
//console.log("Command is " + command);

//An array to get the name of the artist or song or movie to find
var nodeArgs = process.argv;
var name = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      name = name + "+" + nodeArgs[i];
    } else {
      name += nodeArgs[i];
  
    }
  };
  

switch (command) {
    case "concert-this":
        concertThis(name);
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis(name);
        break;

    case "do-what-it-says":
        doThis();
        break;

    default: {
        console.log("Please input a correct command");
    }

};

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
    //console.log("Input: " + artist);
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    
    axios.get(queryUrl).then(
        function (response) {
            console.log(" ");
            console.log("<**-------------------------------------**>");
            console.log("Artist: " + response.data[0].lineup[0]);
            console.log("Venue name: " + response.data[0].venue.name);
            console.log("Venue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + " " + response.data[0].venue.country);

            //Format the date so that it's readable.
            var date = moment(response.data[0].datetime).format('MMMM Do YYYY, h:mm a')
            console.log("Date of event: " + date);
            console.log("<**-------------------------------------**>");
            console.log(" ");

            //console.log(JSON.stringify(response.data[0].lineup));

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
/* 
node liri.js movie-this '<movie name here>'

This will output the following information to your terminal/bash window:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
*/
function movieThis(movie) {
    console.log("Input: " + movie);

    if (!movie) {
      movie = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    //console.log("URL: " + queryUrl);

    
    axios.get(queryUrl).then(
        function (response) {
//      Used if we set another default query
            if (typeof response.data.Title === "undefined") {
              console.log("The movie " + movie + " cannot be found.");
            } else {
            console.log(" ");
            console.log("<**-------------------------------------**>");
            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Produced in: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);


            //Format the date so that it's readable.
            // var date = moment(response.data[0].datetime).format('MMMM Do YYYY, h:mm a')
            // console.log("Date of event: " + date);
            console.log("<**-------------------------------------**>");
            console.log(" ");
            }
            //console.log(JSON.stringify(response.data));

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

// do-what-it-says
function doThis() {
    console.log("<**----------------------------**>");

}
