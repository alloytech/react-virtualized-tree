var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { getFlattenedTreePaths, doesChangeAffectFlattenedTree, isNodeExpanded, nodeHasChildren } from '../selectors/getFlattenedTree';
import TreeState, { State } from './TreeState';
import { replaceNodeFromTree, deleteNodeFromTree } from '../selectors/nodes';

/**
 * @callback setNode
 * @param {Node} node - current node value
 * @return {Node} The updated node
 */

/**
 * Set of Tree State Modifiers
 */
var TreeStateModifiers = (_temp = _class = function TreeStateModifiers() {
  _classCallCheck(this, TreeStateModifiers);
}, _class.editNodeAt = function (state, index, nodeUpdate) {
  var node = TreeState.getNodeAt(state, index);
  var updatedNode = typeof nodeUpdate === 'function' ? nodeUpdate(node) : nodeUpdate;
  var flattenedTree = [].concat(state.flattenedTree);
  var flattenedNodeMap = flattenedTree[index];
  var parents = flattenedNodeMap.slice(0, flattenedNodeMap.length - 1);

  if (doesChangeAffectFlattenedTree(node, updatedNode)) {
    var numberOfVisibleDescendants = TreeState.getNumberOfVisibleDescendants(state, index);

    if (isNodeExpanded(updatedNode)) {
      var updatedNodeSubTree = getFlattenedTreePaths([updatedNode], parents);

      flattenedTree.splice.apply(flattenedTree, [index + 1, 0].concat(updatedNodeSubTree.slice(1)));
    } else {
      flattenedTree.splice(index + 1, numberOfVisibleDescendants);
    }
  }

  var tree = replaceNodeFromTree(state.tree, _extends({}, updatedNode, { parents: parents }));

  return new State(tree, flattenedTree);
}, _class.deleteNodeAt = function (state, index) {
  var node = TreeState.getNodeAt(state, index);

  var flattenedTree = [].concat(state.flattenedTree);
  var flattenedNodeMap = flattenedTree[index];
  var parents = flattenedNodeMap.slice(0, flattenedNodeMap.length - 1);

  var numberOfVisibleDescendants = nodeHasChildren(node) ? TreeState.getNumberOfVisibleDescendants(state, index) : 0;

  flattenedTree.splice(index, 1 + numberOfVisibleDescendants);

  var tree = deleteNodeFromTree(state.tree, _extends({}, node, { parents: parents }));

  return new State(tree, flattenedTree);
}, _temp);
export { TreeStateModifiers as default };