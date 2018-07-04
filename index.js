const express = require('express');

const ytDownloader = require('./yt-downloader');
const logger = require('./logger');

const APP_PORT = 4001;
const app = express();

app.get('/analise/:youtube_id', async (req, res) => {
  const requestStart = new Date();
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  const {youtube_id} = req.params;
  const ytLogger = logger(`yt-analise-${youtube_id}`);
  ytLogger.stream.pipe(res);
  ytLogger.log(`Analizyng: ${youtube_id}`);
  const youtubeFile = await ytDownloader(youtube_id, ytLogger);
  ytLogger.log(`Finished! ${youtubeFile}`);
  ytLogger.log(`Processing taken ${requestStart - new Date()}ms.`);
  res.end('<br/>-finish-')
});

app.listen(APP_PORT);