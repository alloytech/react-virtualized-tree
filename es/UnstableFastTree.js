var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import Tree from './Tree';
import { Node } from './shapes/nodeShapes';
import TreeStateModifiers from './state/TreeStateModifiers';
import { UPDATE_TYPE } from './contants';

var UnstableFastTree = (_temp2 = _class = function (_React$Component) {
  _inherits(UnstableFastTree, _React$Component);

  function UnstableFastTree() {
    var _temp, _this, _ret;

    _classCallCheck(this, UnstableFastTree);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleChange = function (_ref) {
      var node = _ref.node,
          type = _ref.type,
          index = _ref.index;

      var nodes = void 0;

      if (type === UPDATE_TYPE.UPDATE) {
        nodes = TreeStateModifiers.editNodeAt(_this.props.nodes, index, node);
      } else {
        nodes = TreeStateModifiers.deleteNodeAt(_this.props.nodes, index);
      }

      _this.props.onChange(nodes);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  UnstableFastTree.prototype.render = function render() {
    return React.createElement(Tree, {
      nodeMarginLeft: this.props.nodeMarginLeft,
      nodes: this.props.nodes,
      onChange: this.handleChange,
      NodeRenderer: this.props.children
    });
  };

  _createClass(UnstableFastTree, [{
    key: 'nodes',
    get: function get() {
      return this.context.unfilteredNodes || this.props.nodes;
    }
  }]);

  return UnstableFastTree;
}(React.Component), _class.contextTypes = {
  unfilteredNodes: PropTypes.arrayOf(PropTypes.shape(Node))
}, _temp2);
export { UnstableFastTree as default };


UnstableFastTree.defaultProps = {
  nodeMarginLeft: 30
};