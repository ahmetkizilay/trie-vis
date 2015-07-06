var React = require('react');

var TrieEntry = React.createClass({

  getInitialState: function() {
    return {
      value: ''
    };
  },

  render: function() {
    return (
      <input type="text" value={this.state.value}
        onKeyDown={this._onKeyDown} onChange={this._onChange}/>
    );
  },

  _save: function() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  _onChange: function (e) {
    this.setState({
      value: e.target.value
    });
  },

  _onKeyDown: function (e) {
    if (e.keyCode === 13) {
      this._save();
    }
  }
});

module.exports = TrieEntry;
