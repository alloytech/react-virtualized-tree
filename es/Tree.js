var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {value: subClass, enumerable: false, writable: true, configurable: true},
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
}

import React from 'react';
import PropTypes from 'prop-types';
import {AutoSizer, List, CellMeasurerCache, CellMeasurer} from 'react-virtualized';

import {FlattenedNode} from './shapes/nodeShapes';
import TreeState, {State} from './state/TreeState';

var Tree = (function(_React$Component) {
  _inherits(Tree, _React$Component);

  function Tree() {
    var _temp, _this, _ret;

    _classCallCheck(this, Tree);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        _React$Component.call.apply(_React$Component, [this].concat(args)),
      )),
      _this)),
      (_this._cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: _this.props.fixedHeight,
        fixedHeight: _this.props.fixedHeight,
        minHeight: _this.props.fixedHeight || 20,
      })),
      (_this.getRowCount = function() {
        var nodes = _this.props.nodes;

        return nodes instanceof State ? nodes.flattenedTree.length : nodes.length;
      }),
      (_this.getNodeDeepness = function(node, index) {
        var nodes = _this.props.nodes;

        if (nodes instanceof State) {
          TreeState.getNodeDeepness(nodes, index);
        }

        return nodes instanceof State ? TreeState.getNodeDeepness(nodes, index) : node.deepness;
      }),
      (_this.getNode = function(index) {
        var nodes = _this.props.nodes;

        return nodes instanceof State
          ? _extends({}, TreeState.getNodeAt(nodes, index), {deepness: _this.getNodeDeepness({}, index)})
          : nodes[index];
      }),
      (_this.rowRenderer = function(_ref) {
        var node = _ref.node,
          key = _ref.key,
          measure = _ref.measure,
          style = _ref.style,
          NodeRenderer = _ref.NodeRenderer,
          index = _ref.index;
        var nodeMarginLeft = _this.props.nodeMarginLeft;

        return React.createElement(NodeRenderer, {
          key: key,
          style: _extends({}, style, {
            marginLeft: node.deepness * nodeMarginLeft,
            userSelect: 'none',
            cursor: 'pointer',
          }),
          node: node,
          onChange: _this.props.onChange,
          measure: measure,
          index: index,
        });
      }),
      (_this.measureRowRenderer = function(nodes) {
        return function(_ref2) {
          var key = _ref2.key,
            index = _ref2.index,
            style = _ref2.style,
            parent = _ref2.parent;
          var NodeRenderer = _this.props.NodeRenderer;

          var node = _this.getNode(index);

          return React.createElement(
            CellMeasurer,
            {cache: _this._cache, columnIndex: 0, key: key, rowIndex: index, parent: parent},
            function(m) {
              return _this.rowRenderer(
                _extends({}, m, {index: index, node: node, key: key, style: style, NodeRenderer: NodeRenderer}),
              );
            },
          );
        };
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  Tree.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
      nodes = _props.nodes,
      width = _props.width,
      scrollToIndex = _props.scrollToIndex,
      scrollToAlignment = _props.scrollToAlignment;

    return React.createElement(AutoSizer, {disableWidth: Boolean(width)}, function(_ref3) {
      var height = _ref3.height,
        autoWidth = _ref3.width;
      return React.createElement(List, {
        deferredMeasurementCache: _this2._cache,
        ref: function ref(r) {
          return (_this2._list = r);
        },
        height: height,
        rowCount: _this2.getRowCount(),
        rowHeight: _this2._cache.rowHeight,
        rowRenderer: _this2.measureRowRenderer(nodes),
        width: width || autoWidth,
        scrollToIndex: scrollToIndex,
        scrollToAlignment: scrollToAlignment,
      });
    });
  };

  return Tree;
})(React.Component);

export {Tree as default};

Tree.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        fixedHeight: PropTypes.number,
        nodes: PropTypes.arrayOf(PropTypes.shape(FlattenedNode)).isRequired,
        NodeRenderer: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        nodeMarginLeft: PropTypes.number,
        width: PropTypes.number,
        scrollToIndex: PropTypes.number,
        scrollToAlignment: PropTypes.string,
      }
    : {};
