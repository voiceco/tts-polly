# tts-polly
get text-to-speech audio and speechmarks timing data from Amazon Polly.


## usage

```javascript
const tts = require('tts-polly')


// audioURL is a 22khz mp3 audio file
const [ audioURL, speechMarks ] = await tts('Here is some text I would like Polly to say.')
```

You can also specify pcm as the audio encoding.

```javascript
// audioURL is a 16khz pcm audio file
const [ audioURL, speechMarks ] = await tts('A clever sentence goes here.', 'pcm')
```
