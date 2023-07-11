const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // cors if required

// init express frame work
const app = express();

// to access the file in /voiceFile dir
app.use(express.static(path.join(__dirname, 'voiceFile')));

// Enable CORS for all routes
app.use(cors());

// GET request
app.get('/api/audio', (req, res) => {

  // getting the path for the audio file eg: "<rootDir>/voiceFile/jeeva.wav"
  const audioPath = path.join(__dirname, 'voiceFile', 'jeeva.wav');

  // reading the audio file
  fs.readFile(audioPath, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    // setting the header for audio response
    res.setHeader('Content-Type', 'audio/wav');
    // sending the audio file length
    res.setHeader('Content-Length', data.length);
    // sending the audio file
    res.send(data);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

