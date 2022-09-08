var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

export var isNodeExpanded = function isNodeExpanded(node) {
  return node.state && node.state.expanded;
};
export var nodeHasChildren = function nodeHasChildren(node) {
  return node.children && node.children.length;
};

export var getFlattenedTree = function getFlattenedTree(nodes) {
  var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return nodes.reduce(function (flattenedTree, node) {
    var deepness = parents.length;
    var nodeWithHelpers = _extends({}, node, { deepness: deepness, parents: parents });

    if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
      return [].concat(flattenedTree, [nodeWithHelpers]);
    }

    return [].concat(flattenedTree, [nodeWithHelpers], getFlattenedTree(node.children, [].concat(parents, [node.id])));
  }, []);
};

export var getFlattenedTreePaths = function getFlattenedTreePaths(nodes) {
  var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var paths = [];

  for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var node = _ref;
    var id = node.id;


    if (!nodeHasChildren(node) || !isNodeExpanded(node)) {
      paths.push(parents.concat(id));
    } else {
      paths.push(parents.concat(id));
      paths.push.apply(paths, getFlattenedTreePaths(node.children, [].concat(parents, [id])));
    }
  }

  return paths;
};

export var doesChangeAffectFlattenedTree = function doesChangeAffectFlattenedTree(previousNode, nextNode) {
  return isNodeExpanded(previousNode) !== isNodeExpanded(nextNode);
};