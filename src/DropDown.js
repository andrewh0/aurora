import React, {Component, PropTypes} from 'react';

class DropDown extends Component {
  static contextTypes = {
    synth: PropTypes.object
  };
  handleChange = e => {
    const {synth} = this.context;
    synth.set('oscillator', {type: e.target.value});
  };
  render() {
    const {name, values, defaultValue} = this.props;
    return (
      <select name={name} onChange={this.handleChange} selected={defaultValue}>
        {values.map(({value, label}, i) =>
          <option key={i} value={value}>{label}</option>
        )}
      </select>
    );
  }
}

export default DropDown;
