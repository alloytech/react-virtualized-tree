'use strict';

exports.__esModule = true;
exports.Renderer = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nodeShapes = require('./nodeShapes');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Renderer = (exports.Renderer = {
  measure: _propTypes2.default.func,
  onChange: _propTypes2.default.func.isRequired,
  node: _propTypes2.default.shape(_nodeShapes.FlattenedNode),
  index: _propTypes2.default.number.isRequired,
});
