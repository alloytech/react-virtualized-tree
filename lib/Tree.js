'use strict';

exports.__esModule = true;
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactVirtualized = require('react-virtualized');

var _nodeShapes = require('./shapes/nodeShapes');

var _TreeState = require('./state/TreeState');

var _TreeState2 = _interopRequireDefault(_TreeState);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

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
      (_this._cache = new _reactVirtualized.CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: _this.props.fixedHeight,
        fixedHeight: _this.props.fixedHeight,
        minHeight: _this.props.fixedHeight || 20,
      })),
      (_this.getRowCount = function() {
        var nodes = _this.props.nodes;

        return nodes instanceof _TreeState.State ? nodes.flattenedTree.length : nodes.length;
      }),
      (_this.getNodeDeepness = function(node, index) {
        var nodes = _this.props.nodes;

        if (nodes instanceof _TreeState.State) {
          _TreeState2.default.getNodeDeepness(nodes, index);
        }

        return nodes instanceof _TreeState.State ? _TreeState2.default.getNodeDeepness(nodes, index) : node.deepness;
      }),
      (_this.getNode = function(index) {
        var nodes = _this.props.nodes;

        return nodes instanceof _TreeState.State
          ? _extends({}, _TreeState2.default.getNodeAt(nodes, index), {deepness: _this.getNodeDeepness({}, index)})
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

        return _react2.default.createElement(NodeRenderer, {
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

          return _react2.default.createElement(
            _reactVirtualized.CellMeasurer,
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

    return _react2.default.createElement(_reactVirtualized.AutoSizer, {disableWidth: Boolean(width)}, function(_ref3) {
      var height = _ref3.height,
        autoWidth = _ref3.width;
      return _react2.default.createElement(_reactVirtualized.List, {
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
})(_react2.default.Component);

exports.default = Tree;

Tree.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        fixedHeight: _propTypes2.default.number,
        nodes: _propTypes2.default.arrayOf(_propTypes2.default.shape(_nodeShapes.FlattenedNode)).isRequired,
        NodeRenderer: _propTypes2.default.func.isRequired,
        onChange: _propTypes2.default.func.isRequired,
        nodeMarginLeft: _propTypes2.default.number,
        width: _propTypes2.default.number,
        scrollToIndex: _propTypes2.default.number,
        scrollToAlignment: _propTypes2.default.string,
      }
    : {};
module.exports = exports['default'];
