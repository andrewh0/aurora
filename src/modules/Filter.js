import React, {Component} from 'react';
import _ from 'lodash';
import DropDown from '../ui/DropDown';
import Slider from '../ui/Slider';

class Filter extends Component {
  updateFilter = (path, value) => {
    this.props.updateFilter(path, value);
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
    const {filter} = this.props;
    return (
      <div className="filter-controls">
        <h1>Filter Controls</h1>
        <DropDown
          label="Filter Type"
          name="filter-type"
          value={filter.type}
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
          value={filter.frequency}
          onChange={this.handleFilterFrequencyChange}
          min={30}
          max={22000}
          step={1}
          label="Frequency"
        />
        <Slider
          value={filter.Q}
          onChange={this.handleFilterQChange}
          min={0.1}
          max={18}
          step={0.1}
          label="Q"
        />
        {_.includes(['lowshelf', 'highshelf', 'peaking'], filter.type) &&
          <Slider
            value={filter.gain}
            onChange={this.handleFilterGainChange}
            min={-12}
            max={12}
            step={1}
            label="Gain"
          />}
        <DropDown
          label="Filter Rolloff"
          name="filter-rolloff"
          value={filter.rolloff}
          values={[{value: -12}, {value: -24}, {value: -48}, {value: -96}]}
          onChange={this.handleFilterRolloffChange}
        />
      </div>
    );
  }
}

export default Filter;
