const {Readable} = require('stream');

function createLogger(name) {

  const loggerStream = new Readable();
  loggerStream._read = () => null;

  return {
    log: (...args) => {
      console.log(...args);
      args.forEach((arg) => loggerStream.push(arg));
      loggerStream.push('<br/>\n');
    },
    stream: loggerStream
  }
}

module.exports = createLogger;