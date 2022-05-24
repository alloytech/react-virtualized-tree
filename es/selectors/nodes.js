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

import {createSelector} from 'reselect';
import omit from 'lodash.omit';
import findIndex from 'lodash.findindex';

import {UPDATE_TYPE} from '../contants';

export {getFlattenedTree} from './getFlattenedTree';

export var getNodeRenderOptions = createSelector(
  function(node) {
    return (node.state || {}).expanded;
  },
  function(node) {
    return (node.state || {}).favorite;
  },
  function(node) {
    return (node.state || {}).deletable;
  },
  function(node) {
    return node.children;
  },
  function(expanded, favorite, deletable) {
    var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    return {
      hasChildren: !!children.length,
      isExpanded: !!expanded,
      isFavorite: !!favorite,
      isDeletable: !!deletable,
    };
  },
);

var FLATTEN_TREE_PROPERTIES = ['deepness', 'parents'];

var NODE_OPERATION_TYPES = {
  CHANGE_NODE: 'CHANGE_NODE',
  DELETE_NODE: 'DELETE_NODE',
};

var NODE_CHANGE_OPERATIONS = {
  CHANGE_NODE: function CHANGE_NODE(nodes, updatedNode) {
    return nodes.map(function(n) {
      return n.id === updatedNode.id
        ? omit(_extends({}, updatedNode, n.children && {children: [].concat(n.children)}), FLATTEN_TREE_PROPERTIES)
        : n;
    });
  },
  DELETE_NODE: function DELETE_NODE(nodes, updatedNode) {
    return nodes.filter(function(n) {
      return n.id !== updatedNode.id;
    });
  },
};

export var replaceNodeFromTree = function replaceNodeFromTree(nodes, updatedNode) {
  var operation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NODE_OPERATION_TYPES.CHANGE_NODE;

  if (!NODE_CHANGE_OPERATIONS[operation]) {
    return nodes;
  }

  var parents = updatedNode.parents;

  if (!parents.length) {
    return NODE_CHANGE_OPERATIONS[operation](nodes, updatedNode);
  }

  var parentIndex = findIndex(nodes, function(n) {
    return n.id === parents[0];
  });
  var preSiblings = nodes.slice(0, parentIndex);
  var postSiblings = nodes.slice(parentIndex + 1);

  return [].concat(
    preSiblings,
    [
      _extends(
        {},
        nodes[parentIndex],
        nodes[parentIndex].children
          ? {
              children: replaceNodeFromTree(
                nodes[parentIndex].children,
                _extends({}, updatedNode, {parents: parents.slice(1)}),
                operation,
              ),
            }
          : {},
      ),
    ],
    postSiblings,
  );
};

export var deleteNodeFromTree = function deleteNodeFromTree(nodes, deletedNode) {
  return replaceNodeFromTree(nodes, deletedNode, NODE_OPERATION_TYPES.DELETE_NODE);
};

export var updateNode = function updateNode(originalNode, newState) {
  return {
    node: _extends({}, originalNode, {
      state: _extends({}, originalNode.state, newState),
    }),
    type: UPDATE_TYPE.UPDATE,
  };
};

export var deleteNode = function deleteNode(node) {
  return {
    node: node,
    type: UPDATE_TYPE.DELETE,
  };
};

export var addNode = function addNode(node) {
  return {
    node: node,
    type: UPDATE_TYPE.ADD,
  };
};

export var getRowIndexFromId = function getRowIndexFromId(flattenedTree, id) {
  return findIndex(flattenedTree, function(node) {
    return node.id === id;
  });
};

/**
 * Gets a node in the original tree from a provided path.
 *
 * @param {number|string[]} path - The id path to the node
 * @param {Object[]} tree - The Original tree
 */
export var getNodeFromPath = function getNodeFromPath(path, tree) {
  var node = void 0;
  var nextLevel = tree;

  if (!Array.isArray(path)) {
    throw new Error('path is not an array');
  }

  var _loop = function _loop(i) {
    var id = path[i];

    var nextNode = nextLevel.find(function(n) {
      return n.id === id;
    });

    if (!nextNode) {
      throw new Error('Could not find node at ' + path.join(','));
    }

    if (i === path.length - 1 && nextNode.id === id) {
      node = nextNode;
    } else {
      nextLevel = nextNode.children;
    }
  };

  for (var i = 0; i < path.length; i++) {
    _loop(i);
  }

  if (!node) {
    throw new Error('Could not find node at ' + path.join(','));
  }

  return node;
};
