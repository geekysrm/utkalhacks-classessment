// Using Algorithmia

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const ffmpeg = require('ffmpeg');
const dotenv = require('dotenv');
const Algorithmia = require('algorithmia');

const getMaxConfidenceEmotion = require('./lib/getMaxConfidenceEmotion');
const uploadImage = require('./lib/uploadImage');

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

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

app.get('/', (req, res) => res.send('Working'));

const myCallbackFunction = async (req, res) => {
  try {
    const uploadedImageUrl = await uploadImage('./data/images/feed_1.jpg');
    await console.log(uploadedImageUrl);
    await console.log('Hellooooooooo');

    const input = {
      image: uploadedImageUrl,
      numResults: 7
    };

    await Algorithmia.client(process.env.ALGORITHMIA_API_KEY)
      .algo('deeplearning/EmotionRecognitionCNNMBP/1.0.1?timeout=300') // timeout is optional
      .pipe(input)
      .then(function(response) {
        let sum = 0;
        response.get().results.forEach(result => {
          const emotions = {
            Happy: 2,
            Angry: -1,
            Sad: -1,
            Disgust: -1,
            Surprise: -1,
            Neutral: 1,
            Fear: -1
          };
          const maxEmotion = JSON.parse(
            getMaxConfidenceEmotion(result.emotions)
          );
          console.log(maxEmotion.label);
          console.log(maxEmotion.confidence);
          sum += maxEmotion.confidence * emotions[maxEmotion.label];
        });
        sum = sum / response.get().results.length;
        res.json({ sum, number_of_students: response.get().results.length });
      });
  } catch (e) {
    console.log(e);
  }
};

app.get('/test', (req, res) => {
  try {
    var process = new ffmpeg('./data/feed.flv');
    process.then(
      video => {
        console.log(video.metadata.duration.raw);
        video.fnExtractFrameToJPG(
          './data/images/',
          {
            frame_rate: 1,
            number: 4,
            keep_pixel_aspect_ratio: true,
            keep_aspect_ratio: true
          },
          myCallbackFunction(req, res)
        );
      },
      function(err) {
        console.log('Error: ' + err);
      }
    );
  } catch (e) {
    console.log(e.code);
    console.log(e.msg);
  }
});

app.get('/upload', (req, res) => {
  const cloudinary = require('cloudinary');

  cloudinary.config({
    cloud_name: 'marvellous',
    api_key: '635633423554395',
    api_secret: '_Zrw18PrULBIZvWcCCpF4mjujho'
  });

  cloudinary.v2.uploader.upload('./data/images/feed_1.jpg', (error, result) => {
    console.log(result);
    const uploadedUrl = result.url;
    console.log(uploadedUrl);
    // reject(error);
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));
