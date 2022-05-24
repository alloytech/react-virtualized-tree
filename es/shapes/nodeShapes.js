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

import PropTypes from 'prop-types';

export var NodeState = {
  expanded: PropTypes.bool,
  deletable: PropTypes.bool,
  favorite: PropTypes.bool,
};

var BasicNode = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string,
  state: PropTypes.shape(NodeState),
};

export var Node = _extends({}, BasicNode);

Node.children = PropTypes.arrayOf(PropTypes.shape(Node));

export var FlattenedNode = _extends({}, BasicNode, {
  deepness: PropTypes.number.isRequired,
  parents: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
});
