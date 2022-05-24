'use strict';

exports.__esModule = true;
exports.FlattenedNode = exports.Node = exports.NodeState = undefined;

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var NodeState = (exports.NodeState = {
  expanded: _propTypes2.default.bool,
  deletable: _propTypes2.default.bool,
  favorite: _propTypes2.default.bool,
});

var BasicNode = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
  name: _propTypes2.default.string,
  state: _propTypes2.default.shape(NodeState),
};

var Node = (exports.Node = _extends({}, BasicNode));

Node.children = _propTypes2.default.arrayOf(_propTypes2.default.shape(Node));

var FlattenedNode = (exports.FlattenedNode = _extends({}, BasicNode, {
  deepness: _propTypes2.default.number.isRequired,
  parents: _propTypes2.default.arrayOf(
    _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  ),
}));
