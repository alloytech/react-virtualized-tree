'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var DefaultGroupRenderer = function DefaultGroupRenderer(_ref) {
  var _onChange = _ref.onChange,
    groups = _ref.groups,
    selectedGroup = _ref.selectedGroup;

  return _react2.default.createElement(
    'select',
    {
      className: 'tree-group',
      onChange: function onChange(_ref2) {
        var value = _ref2.target.value;

        _onChange(value);
      },
      value: selectedGroup,
    },
    Object.keys(groups).map(function(g) {
      return _react2.default.createElement('option', {key: g, value: g}, groups[g].name);
    }),
  );
};

exports.default = DefaultGroupRenderer;
module.exports = exports['default'];
