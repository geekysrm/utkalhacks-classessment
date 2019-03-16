// Using Algorithmia

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const ffmpeg = require("ffmpeg");
const fs = require("fs-extra");
const dotenv = require("dotenv");
const Algorithmia = require("algorithmia");

const getMaxConfidenceEmotion = require("./lib/getMaxConfidenceEmotion");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Google Cloud config:

// var vision = require('@google-cloud/vision');

// var visionClient = vision({
//   projectId: 'classessment',
//   keyFilename: './keyfile.json'
// });

// var gcsImageUri =
//   'https://www.abc.net.au/cm/lb/8176040/data/barack-obama-wiping-away-tears-during-farewell-speech-data.jpg';
// var source = {
//   gcsImageUri: gcsImageUri
// };
// var image = {
//   source: source
// };
// var type = vision.v1.types.Feature.Type.FACE_DETECTION;
// var featuresElement = {
//   type: type
// };
// var features = [featuresElement];
// var requestsElement = {
//   image: image,
//   features: features
// };
// var requests = [requestsElement];
// visionClient
//   .batchAnnotateImages({ requests: requests })
//   .then(function(responses) {
//     var response = responses[0];
//     // doThingsWith(response)
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.error(err);
//   });

// // Server static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const myCallbackFunction = () => {
  var input = {
    image: "./data/feed_1.jpg",
    numResults: 7
  };
  Algorithmia.client(process.env.ALGORITHMIA_API_KEY)
    .algo("deeplearning/EmotionRecognitionCNNMBP/1.0.1?timeout=300") // timeout is optional
    .pipe(input)
    .then(function(response) {
      let sum = 0;
      response.get().results.forEach(result => {
        const emotions = {
          Happy: 1,
          Angry: -1,
          Sad: -1,
          Disgust: -1,
          Surprise: -1,
          Neutral: 0,
          Fear: -1
        };
        const maxEmotion = JSON.parse(getMaxConfidenceEmotion(result.emotions));

        sum += maxEmotion.confidence * emotions[maxEmotion.label];
      });
      console.log(sum);
    });
};

app.get("/", (req, res) => res.send("Working"));
app.get("/test", (req, res) => {
  try {
    var process = new ffmpeg("./data/feed.mp4");
    process.then(
      function(video) {
        console.log(video.metadata.duration.raw);
        video.fnExtractFrameToJPG(
          "./data/images/",
          {
            // every_n_frames: 3,
            frame_rate: 1,
            number: 4,
            keep_pixel_aspect_ratio: true,
            keep_aspect_ratio: true
          },
          myCallbackFunction()
        );
      },
      function(err) {
        console.log("Error: " + err);
      }
    );
  } catch (e) {
    console.log(e.code);
    console.log(e.msg);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));
