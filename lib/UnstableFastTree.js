'use strict';

exports.__esModule = true;
exports.default = undefined;

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

var _nodeShapes = require('./shapes/nodeShapes');

var _TreeStateModifiers = require('./state/TreeStateModifiers');

var _TreeStateModifiers2 = _interopRequireDefault(_TreeStateModifiers);

var _contants = require('./contants');

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

var UnstableFastTree = ((_temp2 = _class = (function(_React$Component) {
  _inherits(UnstableFastTree, _React$Component);

  function UnstableFastTree() {
    var _temp, _this, _ret;

    _classCallCheck(this, UnstableFastTree);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        _React$Component.call.apply(_React$Component, [this].concat(args)),
      )),
      _this)),
      (_this.handleChange = function(_ref) {
        var node = _ref.node,
          type = _ref.type,
          index = _ref.index;

        var nodes = void 0;

        if (type === _contants.UPDATE_TYPE.UPDATE) {
          nodes = _TreeStateModifiers2.default.editNodeAt(_this.props.nodes, index, node);
        } else {
          nodes = _TreeStateModifiers2.default.deleteNodeAt(_this.props.nodes, index);
        }

        _this.props.onChange(nodes);
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  UnstableFastTree.prototype.render = function render() {
    return _react2.default.createElement(_Tree2.default, {
      nodeMarginLeft: this.props.nodeMarginLeft,
      nodes: this.props.nodes,
      onChange: this.handleChange,
      NodeRenderer: this.props.children,
    });
  };

  _createClass(UnstableFastTree, [
    {
      key: 'nodes',
      get: function get() {
        return this.context.unfilteredNodes || this.props.nodes;
      },
    },
  ]);

  return UnstableFastTree;
})(_react2.default.Component)),
(_class.contextTypes = {
  unfilteredNodes: _propTypes2.default.arrayOf(_propTypes2.default.shape(_nodeShapes.Node)),
}),
_temp2);
exports.default = UnstableFastTree;

UnstableFastTree.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        extensions: _propTypes2.default.shape({
          updateTypeHandlers: _propTypes2.default.object,
        }),
        nodes: _propTypes2.default.shape({
          flattenedTree: _propTypes2.default.arrayOf(
            _propTypes2.default.arrayOf(
              _propTypes2.default.oneOf([_propTypes2.default.number, _propTypes2.default.string]),
            ),
          ).isRequired,
          tree: _propTypes2.default.arrayOf(_propTypes2.default.shape(_nodeShapes.Node)).isRequired,
        }),
        onChange: _propTypes2.default.func,
        children: _propTypes2.default.func.isRequired,
        nodeMarginLeft: _propTypes2.default.number,
        width: _propTypes2.default.number,
        scrollToId: _propTypes2.default.number,
      }
    : {};

UnstableFastTree.defaultProps = {
  nodeMarginLeft: 30,
};
module.exports = exports['default'];
