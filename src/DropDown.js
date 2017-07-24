import React, {Component} from 'react';

class DropDown extends Component {
  handleChange = e => {
    this.props.onChange(e.target.value);
  };
  render() {
    const {name, values, defaultValue, label} = this.props;
    return (
      <div>
        {label}
        <select
          name={name}
          onChange={this.handleChange}
          selected={defaultValue}>
          {values.map(({value, label}, i) =>
            <option key={i} value={value}>{label}</option>
          )}
        </select>
      </div>
    );
  }
}

export default DropDown;
