# tts-polly
get text-to-speech audio and speechmarks timing data from Amazon Polly.


## usage

```javascript
const tts = require('tts-polly')


// audioURL is a 22khz mp3 audio file
const [ audioURL, speechMarks ] = await tts('Here is some text I would like Polly to say.')
```

the returned speechMarks object is an array, structured like this:

```javascript

// e.g., The described word ("Hello") begins 243 milliseconds after the audio stream begins, and starts at byte 0 and ends at byte 6 of the input text.
[
  {"time":243,"type":"word","start":0,"end":5,"value":"Hello"},
  {"time":519,"type":"word","start":6,"end":15,"value":"miker1728"},
  {"time":4171,"type":"word","start":18,"end":19,"value":"I"},
  {"time":4337,"type":"word","start":20,"end":22,"value":"am"},
  {"time":4428,"type":"word","start":23,"end":30,"value":"Boswell"},
  {"time":5332,"type":"word","start":32,"end":36,"value":"your"},
  {"time":5518,"type":"word","start":37,"end":45,"value":"personal"},
  {"time":5992,"type":"word","start":46,"end":56,"value":"biographer"}
]
```

You can also specify pcm as the audio encoding.

```javascript
// audioURL is a 16khz pcm audio file
const [ audioURL, speechMarks ] = await tts('A clever sentence goes here.', 'pcm')
```
