'use strict'

const Polly        = require('aws-sdk/clients/polly')
const Promise      = require('bluebird')
const getVoiceName = require('./get-voice-name')


const polly = new Polly({
  apiVersion: '2016-06-10',
  region: process.env.AWS_REGION
})

const synthesizeSpeech = Promise.promisify(polly.synthesizeSpeech, { context: polly })

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Polly.html#synthesizeSpeech-property
module.exports = async function getSpeechMarks(Text) {

  const TextType = Text.indexOf('<speak>') < 0 ? 'text' : 'ssml'

  const data = await synthesizeSpeech({
    OutputFormat: 'json',

    // https://docs.aws.amazon.com/polly/latest/dg/using-speechmarks1.html
    SpeechMarkTypes: [ 'word' ],

    TextType,

    Text,
    VoiceId: getVoiceName()
  })

  const timingObjects = data.AudioStream.toString()

  /*
  // e.g., The described word ("Hello") begins 243 milliseconds after the audio stream begins, and starts at byte 0 and ends at byte 6 of the input text.
  {"time":243,"type":"word","start":0,"end":5,"value":"Hello"}
  {"time":519,"type":"word","start":6,"end":15,"value":"miker1728"}
  {"time":4171,"type":"word","start":18,"end":19,"value":"I"}
  {"time":4337,"type":"word","start":20,"end":22,"value":"am"}
  {"time":4428,"type":"word","start":23,"end":30,"value":"Boswell"}
  {"time":5332,"type":"word","start":32,"end":36,"value":"your"}
  {"time":5518,"type":"word","start":37,"end":45,"value":"personal"}
  {"time":5992,"type":"word","start":46,"end":56,"value":"biographer"}
  */

  const timings = []
  timingObjects.split('\n').forEach(function(timing) {
    if(timing.trim().length) {
      timings.push(JSON.parse(timing))
    }
  })

  return timings
}
