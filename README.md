# Aurora 🎹

Aurora is web-based synth that can be played with a computer keyboard and MIDI keyboard (Chrome only). It was inspired by professional software synths like [Sylenth1](https://www.lennardigital.com/sylenth1/), [Massive](https://www.native-instruments.com/en/products/komplete/synths/massive/), and [Serum](https://www.xferrecords.com/products/serum). It is intended to be a way to explore audio synthesis in a way that is accessible and fun!

This app was built on the experimental
[Web MIDI API](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess), [Tone.js](https://tonejs.github.io/), [React](https://reactjs.org/), and [Redux](https://redux.js.org/). It was designed with [Figma](https://www.figma.com/).

<img width="885" alt="aurora" src="https://user-images.githubusercontent.com/2905455/40596318-e661594c-61ee-11e8-9b28-4c4e1ce368d0.png">


## Developing locally
Clone this repo and navigate to the directory.
```
git clone git@github.com:andrewh0/aurora.git
cd aurora
```

Install dependencies with yarn and start the server.
```
yarn && yarn start
```

You can check for type errors with flow.
```
yarn run flow
```

You can format Javascript files with prettier.
```
yarn run pretty
```
