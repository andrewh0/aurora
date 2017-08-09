import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Oscillator from './modules/Oscillator';
import Filter from './modules/Filter';

class SynthControl extends Component {
  static contextTypes = {
    synth: PropTypes.object,
    filter: PropTypes.object
  };

  state = {
    osc: _.merge(
      {},
      this.context.synth.get(),
      this.context.synth.get(['oscillator.spread', 'oscillator.count']) // HACK
    ),
    filter: this.context.filter.get()
  };

  updateSynth = (path, value) => {
    const {synth} = this.context;
    const {osc} = this.state;
    synth.set(path, value);
    this.setState({osc: _.set(osc, path, value)});
  };

  updateFilter = (path, value) => {
    const {filter: contextFilter} = this.context;
    const {filter: stateFilter} = this.state;
    contextFilter.set(path, value);
    this.setState({filter: _.set(stateFilter, path, value)});
  };

  render() {
    const {osc, filter} = this.state;

    return (
      <div>
        <Oscillator osc={osc} updateSynth={this.updateSynth} />
        <Filter filter={filter} updateFilter={this.updateFilter} />
      </div>
    );
  }
}

export default SynthControl;
