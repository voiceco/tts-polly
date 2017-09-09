'use strict'

const Polly        = require('aws-sdk/clients/polly').Presigner
const getVoiceName = require('./get-voice-name')


const polly = new Polly({
  apiVersion: '2016-06-10',
  region: process.env.AWS_REGION
})

// @param string OutputFormat   should be mp3 or pcm. defaults to mp3
module.exports = function getPollyTTSURL(Text, OutputFormat) {
  if(OutputFormat !== 'pcm')
    OutputFormat = 'mp3'

  const SampleRate = (OutputFormat === 'mp3') ? '22050' : '16000'

  const halfHourInSeconds = 30 * 60

  const TextType = Text.indexOf('<speak>') < 0 ? 'text' : 'ssml'

  // http://docs.aws.amazon.com/polly/latest/dg/API_SynthesizeSpeech.html

  // pcm is in signed 16-bit, 1 channel (mono), little-endian format
  // https://github.com/aws/aws-sdk-js/blob/master/clients/polly.d.ts#L237
  return polly.getSynthesizeSpeechUrl({
    OutputFormat,

    // Valid values for pcm are "8000" and "16000" The default value is "16000"
    // 22050 for mp3
    SampleRate,

    TextType,  // ssml | text

    Text,
    VoiceId: getVoiceName()
  }, halfHourInSeconds)
}
