'use strict'

const Presigner    = require('aws-sdk/clients/polly').Presigner
const getVoiceName = require('./get-voice-name')


const halfHourInSeconds = 30 * 60

const polly = new Polly({
  apiVersion: '2016-06-10',
  region: process.env.AWS_REGION
})

module.exports = function getPollyTTSSpeechMarksUrl(Text) {
  const TextType = Text.indexOf('<speak>') < 0 ? 'text' : 'ssml'

  // http://docs.aws.amazon.com/polly/latest/dg/API_SynthesizeSpeech.html
  return polly.getSynthesizeSpeechUrl({
    OutputFormat: 'json',

    // https://docs.aws.amazon.com/polly/latest/dg/using-speechmarks1.html
    SpeechMarkTypes: [ 'word' ],

    TextType,

    Text,
    VoiceId: getVoiceName()
  }, halfHourInSeconds)
}
