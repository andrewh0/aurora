import React, {Component} from 'react';
import {includes} from 'lodash';
import {connect} from 'react-redux';
import DropDown from '../ui/DropDown';
import Slider from '../ui/Slider';
import {updateFilter} from '../store/filter';
import {toArrayPath} from '../util/path';

const mapStateToProps = ({filter: {frequency, gain, Q, rolloff, type}}) => ({
  frequency,
  gain,
  Q,
  rolloff,
  type
});

const mapDispatchToProps = dispatch => ({dispatch});

class UnconnectedFilter extends Component {
  updateFilter = (path, value) => {
    this.props.dispatch(updateFilter(toArrayPath(path), value));
  };
  handleFilterTypeChange = value => {
    this.updateFilter('type', value);
  };
  handleFilterFrequencyChange = value => {
    this.updateFilter('frequency', value);
  };
  handleFilterQChange = value => {
    this.updateFilter('Q', value);
  };
  handleFilterRolloffChange = value => {
    this.updateFilter('rolloff', value);
  };
  handleFilterGainChange = value => {
    this.updateFilter('gain', value);
  };
  render() {
    const {type, frequency, Q, gain, rolloff} = this.props;
    return (
      <div className="filter-controls">
        <h1>Filter Controls</h1>
        <DropDown
          label="Filter Type"
          name="filter-type"
          value={type}
          values={[
            {value: 'lowpass', label: 'Low Pass'},
            {value: 'highpass', label: 'High Pass'},
            {value: 'bandpass', label: 'Band Pass'},
            {value: 'lowshelf', label: 'Low Shelf'},
            {value: 'highshelf', label: 'High Shelf'},
            {value: 'notch', label: 'Notch'},
            {value: 'allpass', label: 'All Pass'},
            {value: 'peaking', label: 'Peaking'}
          ]}
          onChange={this.handleFilterTypeChange}
        />
        <Slider
          value={frequency}
          onChange={this.handleFilterFrequencyChange}
          min={30}
          max={22000}
          step={1}
          label="Frequency"
        />
        <Slider
          value={Q}
          onChange={this.handleFilterQChange}
          min={0.1}
          max={18}
          step={0.1}
          label="Q"
        />
        {includes(['lowshelf', 'highshelf', 'peaking'], type) &&
          <Slider
            value={gain}
            onChange={this.handleFilterGainChange}
            min={-12}
            max={12}
            step={1}
            label="Gain"
          />}
        <DropDown
          label="Filter Rolloff"
          name="filter-rolloff"
          value={rolloff}
          values={[{value: -12}, {value: -24}, {value: -48}, {value: -96}]}
          onChange={this.handleFilterRolloffChange}
        />
      </div>
    );
  }
}

const Filter = connect(mapStateToProps, mapDispatchToProps)(UnconnectedFilter);

export default Filter;
