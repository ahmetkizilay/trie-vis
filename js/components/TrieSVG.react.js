var React = require('react');
var CircleSVG = require('./CircleSVG.react');

var TrieSVG = React.createClass({
  render: function() {
    var curX = 0;
    var curY = 15;
    var circles = [];
    var latestDepth = 0;
    this.props.trie.traverse_depth(function(item) {
      if (item.depth > 0) {
        curX += 25;
        if (item.depth <= latestDepth) {
          curY += 25;
          curX -= (latestDepth - item.depth + 1) * 25;
        }
        latestDepth = item.depth;
        circles.push(<CircleSVG x={curX} y={curY} val={item.val}/>);
      }
    });

    return (
      <svg>{circles}</svg>
    );

  }
});

module.exports = TrieSVG;
