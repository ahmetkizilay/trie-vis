var React = require('react');

var CircleSVG = React.createClass({
  render: function() {
    var strTranslate="translate(" + this.props.x + ", " + this.props.y + ")";
    return (
      <g transform={strTranslate}>
        <circle x={this.props.x} y={this.props.y} r="12"
          stroke="#F00" fill="none"/>
        <text x="0" y="0" text-anchor="middle" dy="0.3em" dx="-0.3em">{this.props.val}</text>
      </g>
    );
  }
});

module.exports = CircleSVG;
