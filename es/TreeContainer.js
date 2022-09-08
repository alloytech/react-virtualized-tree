var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _DEFAULT_UPDATE_TYPES, _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import Tree from './Tree';
import { UPDATE_TYPE } from './contants';
import { getFlattenedTree } from './selectors/getFlattenedTree';
import { deleteNodeFromTree, replaceNodeFromTree, getRowIndexFromId } from './selectors/nodes';
import { Node } from './shapes/nodeShapes';
import { createSelector } from 'reselect';

var DEFAULT_UPDATE_TYPES = (_DEFAULT_UPDATE_TYPES = {}, _DEFAULT_UPDATE_TYPES[UPDATE_TYPE.DELETE] = deleteNodeFromTree, _DEFAULT_UPDATE_TYPES[UPDATE_TYPE.UPDATE] = replaceNodeFromTree, _DEFAULT_UPDATE_TYPES);

var getExtensions = createSelector(function (e) {
  return e;
}, function () {
  var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _extensions$updateTyp = extensions.updateTypeHandlers,
      updateTypeHandlers = _extensions$updateTyp === undefined ? {} : _extensions$updateTyp;


  return {
    updateTypeHandlers: _extends({}, DEFAULT_UPDATE_TYPES, updateTypeHandlers)
  };
});

var TreeContainer = (_temp2 = _class = function (_React$Component) {
  _inherits(TreeContainer, _React$Component);

  function TreeContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, TreeContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleChange = function (_ref) {
      var node = _ref.node,
          type = _ref.type;

      var updatedNodes = getExtensions(_this.props.extensions).updateTypeHandlers[type](_this.nodes, node);

      _this.props.onChange(updatedNodes);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TreeContainer.prototype.render = function render() {
    var flattenedTree = getFlattenedTree(this.props.nodes);
    var rowIndex = getRowIndexFromId(flattenedTree, this.props.scrollToId);
    return React.createElement(Tree, {
      fixedHeight: this.props.fixedHeight,
      nodeMarginLeft: this.props.nodeMarginLeft,
      nodes: flattenedTree,
      onChange: this.handleChange,
      NodeRenderer: this.props.children,
      scrollToIndex: rowIndex,
      scrollToAlignment: this.props.scrollToAlignment,
      width: this.props.width
    });
  };

  _createClass(TreeContainer, [{
    key: 'nodes',
    get: function get() {
      return this.context.unfilteredNodes || this.props.nodes;
    }
  }]);

  return TreeContainer;
}(React.Component), _class.contextTypes = {
  unfilteredNodes: PropTypes.arrayOf(PropTypes.shape(Node))
}, _temp2);
export { TreeContainer as default };


TreeContainer.defaultProps = {
  nodeMarginLeft: 30
};