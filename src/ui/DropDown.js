// @flow

import React, {Component} from 'react';
import styled from 'styled-components';

const Select = styled.select`
  display: block;
  border: 1px solid #010101;
  margin-bottom: 8px;
`;

class DropDown extends Component {
  handleChange = (e: Event & {target: HTMLInputElement}) => {
    e.target.blur();
    this.props.onChange(e.target.value);
  };
  render() {
    const {name, values, value, label} = this.props;
    return (
      <div>
        {label}
        <Select name={name} onChange={this.handleChange} value={value}>
          {values.map(({value: v, label: valueLabel}, i) =>
            <option key={i} value={v}>
              {valueLabel || v}
            </option>
          )}
        </Select>
      </div>
    );
  }
}

export default DropDown;
