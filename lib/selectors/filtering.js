'use strict';

exports.__esModule = true;

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

var INITIAL_FILTERED_VALUE = {nodes: [], nodeParentMappings: {}};

var filterNodes = (exports.filterNodes = function filterNodes(filter, nodes) {
  var parents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return nodes.reduce(function(filtered, n) {
    var _extends2;

    var _ref = n.children ? filterNodes(filter, n.children, [].concat(parents, [n.id])) : INITIAL_FILTERED_VALUE,
      filteredChildren = _ref.nodes,
      childrenNodeMappings = _ref.nodeParentMappings;

    return !(filter(n) || filteredChildren.length)
      ? filtered
      : {
          nodes: [].concat(filtered.nodes, [
            _extends({}, n, {
              children: filteredChildren,
            }),
          ]),
          nodeParentMappings: _extends(
            {},
            filtered.nodeParentMappings,
            childrenNodeMappings,
            ((_extends2 = {}), (_extends2[n.id] = parents), _extends2),
          ),
        };
  }, INITIAL_FILTERED_VALUE);
});
