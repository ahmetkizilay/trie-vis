var React = require('react');
var TrieStore = require('../stores/TrieStore');
var TrieEntry = require('./TrieEntry.react');
var TrieSVG = require('./TrieSVG.react');
var TrieActions = require('../actions/TrieActions');

function getTrieState() {
  return {
    trie: TrieStore.getTrie()
  }
}

var TrieVisApp = React.createClass({
  getInitialState: function() {
      return getTrieState();
  },

  componentDidMount: function() {
    TrieStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TrieStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <TrieEntry onSave={this._onSave}/>
        <br />
        <TrieSVG trie={this.state.trie}/>

      </div>
    );
  },

  _onSave: function (value) {
    TrieActions.insert(value);
  },

  _onChange: function() {
    this.setState({
      trie: TrieStore.getTrie()
    });
  }
});

module.exports = TrieVisApp;
