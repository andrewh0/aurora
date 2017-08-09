import React, {Component} from 'react';

class Slider extends Component {
  state = {
    value: this.props.value
  };
  handleChange = e => {
    this.props.onChange(+e.target.value);
    this.setState({value: +e.target.value});
  };
  render() {
    const {min, max, step, label, value} = this.props;
    return (
      <div>
        {label}
        <input
          onChange={this.handleChange}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
        />
        {this.state.value}
      </div>
    );
  }
}

export default Slider;
