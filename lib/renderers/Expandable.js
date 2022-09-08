'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _eventWrappers = require('../eventWrappers');

var _nodes = require('../selectors/nodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Expandable = function Expandable(_ref) {
  var _classNames;

  var onChange = _ref.onChange,
      node = _ref.node,
      children = _ref.children,
      index = _ref.index,
      _ref$iconsClassNameMa = _ref.iconsClassNameMap,
      iconsClassNameMap = _ref$iconsClassNameMa === undefined ? {
    expanded: 'mi mi-keyboard-arrow-down',
    collapsed: 'mi mi-keyboard-arrow-right',
    lastChild: ''
  } : _ref$iconsClassNameMa;

  var _getNodeRenderOptions = (0, _nodes.getNodeRenderOptions)(node),
      hasChildren = _getNodeRenderOptions.hasChildren,
      isExpanded = _getNodeRenderOptions.isExpanded;

  var className = (0, _classnames2.default)((_classNames = {}, _classNames[iconsClassNameMap.expanded] = hasChildren && isExpanded, _classNames[iconsClassNameMap.collapsed] = hasChildren && !isExpanded, _classNames[iconsClassNameMap.lastChild] = !hasChildren, _classNames));

  var handleChange = function handleChange() {
    return onChange(_extends({}, (0, _nodes.updateNode)(node, { expanded: !isExpanded }), { index: index }));
  };

  return _react2.default.createElement(
    'span',
    { onDoubleClick: handleChange },
    hasChildren && _react2.default.createElement('i', { tabIndex: 0, onKeyDown: (0, _eventWrappers.submitEvent)(handleChange), onClick: handleChange, className: className }),
    children
  );
};

exports.default = Expandable;
module.exports = exports['default'];