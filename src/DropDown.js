import React, {Component} from 'react';

class DropDown extends Component {
  handleChange = e => {
    e.target.blur();
    this.props.onChange(e.target.value);
  };
  render() {
    const {name, values, value, label} = this.props;
    return (
      <div>
        {label}
        <select name={name} onChange={this.handleChange} value={value}>
          {values.map(({value: v, label: valueLabel}, i) =>
            <option key={i} value={v}>
              {valueLabel}
            </option>
          )}
        </select>
      </div>
    );
  }
}

export default DropDown;
