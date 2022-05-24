var _class2, _temp;

var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

import {getFlattenedTreePaths} from '../selectors/getFlattenedTree';
import {getNodeFromPath} from '../selectors/nodes';

export var State = function State(tree, flattenedTree) {
  _classCallCheck(this, State);

  this.flattenedTree = null;
  this.tree = null;

  this.tree = tree;
  this.flattenedTree = flattenedTree || getFlattenedTreePaths(tree);
};

export var validateState = function validateState(state) {
  if (!(state instanceof State)) {
    throw new Error(
      'Expected a State instance but got ' + (typeof state === 'undefined' ? 'undefined' : _typeof(state)),
    );
  }
};

/**
 * Immutable structure that represents the TreeState.
 */
var TreeState = ((_temp = _class2 = function TreeState() {
  _classCallCheck(this, TreeState);
}),
(_class2.getNodeAt = function(state, index) {
  validateState(state);

  var rowPath = state.flattenedTree[index];

  if (!rowPath) {
    throw Error(
      'Tried to get node at row "' +
        index +
        '" but got nothing, the tree are ' +
        state.flattenedTree.length +
        ' visible rows',
    );
  }

  return getNodeFromPath(rowPath, state.tree);
}),
(_class2.getNodeDeepness = function(state, index) {
  validateState(state);

  var rowPath = state.flattenedTree[index];

  if (!rowPath) {
    throw Error(
      'Tried to get node at row "' +
        index +
        '" but got nothing, the tree are ' +
        state.flattenedTree.length +
        ' visible rows',
    );
  }

  return rowPath.length - 1;
}),
(_class2.getNumberOfVisibleDescendants = function(state, index) {
  var _TreeState$getNodeAt = TreeState.getNodeAt(state, index),
    id = _TreeState$getNodeAt.id;

  var flattenedTree = state.flattenedTree;

  var i = void 0;

  for (i = index; i < flattenedTree.length; i++) {
    var path = flattenedTree[i];

    if (
      !path.some(function(p) {
        return p === id;
      })
    ) {
      break;
    }
  }

  return Math.max(i - 1 - index, 0);
}),
(_class2.getTree = function(state) {
  validateState(state);

  return state.tree;
}),
(_class2.createFromTree = function(tree) {
  if (!tree) {
    throw Error('A falsy tree was supplied in tree creation');
  }

  if (!Array.isArray(tree)) {
    throw Error('An invalid tree was supplied in creation');
  }

  return new State(tree);
}),
_temp);
export {TreeState as default};
