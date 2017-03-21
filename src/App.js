import React, {Component} from 'react';
import PianoContainer from './Piano';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PianoContainer octaves={3} />
      </div>
    );
  }
}

export default App;
