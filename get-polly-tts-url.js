'use strict'

const Polly        = require('aws-sdk/clients/polly').Presigner
const getVoiceName = require('./get-voice-name')


const polly = new Polly({
  apiVersion: '2016-06-10',
  region: process.env.AWS_REGION
})

module.exports = function getPollyTTSURL(Text) {
  const halfHourInSeconds = 30 * 60

  const TextType = Text.indexOf('<speak>') < 0 ? 'text' : 'ssml'

  // http://docs.aws.amazon.com/polly/latest/dg/API_SynthesizeSpeech.html

  // pcm is in signed 16-bit, 1 channel (mono), little-endian format
  // https://github.com/aws/aws-sdk-js/blob/master/clients/polly.d.ts#L237
  return polly.getSynthesizeSpeechUrl({
    OutputFormat: 'mp3',  // mp3, pcm

    // Valid values for pcm are "8000" and "16000" The default value is "16000"
    // 22050 for mp3
    SampleRate: '22050',

    TextType,  // ssml | text

    Text,
    VoiceId: getVoiceName()
  }, halfHourInSeconds)
}
