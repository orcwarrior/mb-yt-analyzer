const youtubedl = require('youtube-dl');
const fs = require('fs');

function downloadYoutubeVideo(videoId, logger = console) {
  logger.log(`Downloading YT: ${videoId}...`);

  const video = youtubedl(`https://www.youtube.com/watch?v=${videoId}`, ['-f', '22']);
  const dstFile = `./videos/${videoId}.mp4`;
  _attachListeners(video);
  video.pipe(fs.createWriteStream(dstFile));

  return new Promise((resolve, reject) => {

    video.on('end', function end() {
      logger.log("Video downloaded!");
      resolve({dstFile});
    });
  });



  function _attachListeners(video) {
    let vidSize = 0;
    video.on('info', (info) => {
      logger.log(`Video downloading: ${info.title}, ${info.filename}`);
      logger.log(`<img src="${info.thumbnail}" width="200px" height="200px" />`);
      vidSize = info.size;
    });

    let pos = 0;
    video.on('data', function data(chunk) {
      'use strict';
      pos += chunk.length;

      // `size` should not be 0 here.
      if (vidSize) {
        const percent = (pos / vidSize * 100).toFixed(2);
        process.stdout.cursorTo(0);
        process.stdout.clearLine(1);
        process.stdout.write(percent + '%');
      }
    });
  }
}


module.exports = downloadYoutubeVideo;