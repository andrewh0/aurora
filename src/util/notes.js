// @flow

const NOTES = [
  {
    noteName: 'C',
    color: 'white'
  },
  {
    noteName: 'C#',
    color: 'black'
  },
  {
    noteName: 'D',
    color: 'white'
  },
  {
    noteName: 'D#',
    color: 'black'
  },
  {
    noteName: 'E',
    color: 'white'
  },
  {
    noteName: 'F',
    color: 'white'
  },
  {
    noteName: 'F#',
    color: 'black'
  },
  {
    noteName: 'G',
    color: 'white'
  },
  {
    noteName: 'G#',
    color: 'black'
  },
  {
    noteName: 'A',
    color: 'white'
  },
  {
    noteName: 'A#',
    color: 'black'
  },
  {
    noteName: 'B',
    color: 'white'
  }
];

const getNoteNameFromMidi = (midiNote: number): string => {
  const octave = Math.floor(midiNote / 12);
  const name = NOTES[midiNote % 12].noteName;
  return `${name}${octave}`;
};

const getVelocityFromMidi = (midiVelocity: number): number =>
  midiVelocity / 127;

export {NOTES, getNoteNameFromMidi, getVelocityFromMidi};
