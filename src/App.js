import React, {Component} from 'react';
import PianoContainer from './Piano';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PianoContainer octaves={4} />
      </div>
    );
  }
}

export default App;
