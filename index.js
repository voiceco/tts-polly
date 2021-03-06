'use strict'

const getPollyTTSM   = require('./get-polly-tts-speechmarks')
const getPollyTTSURL = require('./get-polly-tts-url')
//const redis          = require('redis')


module.exports = async function tts(text, encoding, cache=true) {
  const [ audioURL, speechMarks ] = await Promise.all([
    getPollyTTSURL(text, encoding),
    getPollyTTSM(text)
  ])

  if (cache === true) {
    // TODO: handle implement cacheing
  }

  return [ audioURL, speechMarks ]
}
