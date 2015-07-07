var React = require('react');
var Stack = require('../adt/stack');

// here building the node=link representation of the trie
function buildGraph(trie) {
  var stack = new Stack();
  var node_index = 0;
  var graph = {
    nodes: [], links: []
  };

  var node_val = {
    name: '(head)'
  };

  stack.push({
    val: trie.start,
    node_index: node_index++,
    node_val: node_val
  });
  graph.nodes.push(node_val);

  while(!stack.isEmpty()) {
    var item = stack.pop();

    if (item.val.children === null) {
      continue;
    }

    item.val.children.forEach(function (child) {
      node_val = {
        name: child.val
      };

      stack.push({
        val: child,
        node_index: node_index,
        node_val: node_val
      });

      graph.nodes.push(node_val);
      graph.links.push({
        source: item.node_index,
        target: node_index,
        value: 1
      });

      node_index += 1;
    });
  }

  return graph;
}

var visualizer = (function() {

  var nodeRadius = 5;
  var width = 960, height = 500;
  var color = d3.scale.category20();
  var d3cola = cola.d3adaptor()
        .avoidOverlaps(true)
        .size([width, height]);

  var _clear = function (el) {
    while(el.firstChild) {
      el.removeChild(el.firstChild);
    }
  };

  var _update = function (el, graph) {

    var svg = d3.select(el).attr('width', width).attr('height', height);

    graph.nodes.forEach(function (v) { v.height = v.width = 2 * nodeRadius; });

    d3cola
        .nodes(graph.nodes)
        .links(graph.links)
        .flowLayout("y", 30)
        .symmetricDiffLinkLengths(12)
        .start(10,20,20);

    // define arrow markers for graph links
    svg.append('svg:defs').append('svg:marker')
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
      .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#000');

    var path = svg.selectAll(".link")
        .data(graph.links)
      .enter().append('svg:path')
        .attr('class', 'link');

    var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("g");

    node.append("title")
        .text(function (d) { return d.name; });

    node.append('circle').attr("class", "node")
      .attr("r", nodeRadius)
      .style("fill", function (d) { return color(d.group); })

    node.append('text').text(function (d) { return d.name}).attr('x', nodeRadius).attr('y', '0.3em');

    node.call(d3cola.drag);

    d3cola.on("tick", function () {
        // path.each(function (d) {
        //     if (isIE()) this.parentNode.insertBefore(this, this);
        // });
        // draw directed edges with proper padding from node centers
        path.attr('d', function (d) {
            var deltaX = d.target.x - d.source.x,
                deltaY = d.target.y - d.source.y,
                dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                normX = deltaX / dist,
                normY = deltaY / dist,
                sourcePadding = nodeRadius,
                targetPadding = nodeRadius + 2,
                sourceX = d.source.x + (sourcePadding * normX),
                sourceY = d.source.y + (sourcePadding * normY),
                targetX = d.target.x - (targetPadding * normX),
                targetY = d.target.y - (targetPadding * normY);
            return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
        });

        node.attr("transform", function (d) {
          return "translate(" + d.x + ", " + d.y + ")";
        });
    });
  };

  return {
    clear: _clear,
    update: _update
  };
}());

var TrieSVG = React.createClass({
  componentDidMount: function() {
    this._trigD3();
  },

  componentDidUpdate: function() {
    this._trigD3();
  },

  componentWillUnmount: function() {
    visualizer.update(this.getDOMNode());
  },

  render: function() {
    return (
      <svg></svg>
    );
  },

  _trigD3: function() {
    var graph = buildGraph(this.props.trie);

    visualizer.clear(this.getDOMNode());
    visualizer.update(this.getDOMNode(), graph);
  }
});

module.exports = TrieSVG;
