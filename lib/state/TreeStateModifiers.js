'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _getFlattenedTree = require('../selectors/getFlattenedTree');

var _TreeState = require('./TreeState');

var _TreeState2 = _interopRequireDefault(_TreeState);

var _nodes = require('../selectors/nodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  var node = _TreeState2.default.getNodeAt(state, index);
  var updatedNode = typeof nodeUpdate === 'function' ? nodeUpdate(node) : nodeUpdate;
  var flattenedTree = [].concat(state.flattenedTree);
  var flattenedNodeMap = flattenedTree[index];
  var parents = flattenedNodeMap.slice(0, flattenedNodeMap.length - 1);

  if ((0, _getFlattenedTree.doesChangeAffectFlattenedTree)(node, updatedNode)) {
    var numberOfVisibleDescendants = _TreeState2.default.getNumberOfVisibleDescendants(state, index);

    if ((0, _getFlattenedTree.isNodeExpanded)(updatedNode)) {
      var updatedNodeSubTree = (0, _getFlattenedTree.getFlattenedTreePaths)([updatedNode], parents);

      flattenedTree.splice.apply(flattenedTree, [index + 1, 0].concat(updatedNodeSubTree.slice(1)));
    } else {
      flattenedTree.splice(index + 1, numberOfVisibleDescendants);
    }
  }

  var tree = (0, _nodes.replaceNodeFromTree)(state.tree, _extends({}, updatedNode, { parents: parents }));

  return new _TreeState.State(tree, flattenedTree);
}, _class.deleteNodeAt = function (state, index) {
  var node = _TreeState2.default.getNodeAt(state, index);

  var flattenedTree = [].concat(state.flattenedTree);
  var flattenedNodeMap = flattenedTree[index];
  var parents = flattenedNodeMap.slice(0, flattenedNodeMap.length - 1);

  var numberOfVisibleDescendants = (0, _getFlattenedTree.nodeHasChildren)(node) ? _TreeState2.default.getNumberOfVisibleDescendants(state, index) : 0;

  flattenedTree.splice(index, 1 + numberOfVisibleDescendants);

  var tree = (0, _nodes.deleteNodeFromTree)(state.tree, _extends({}, node, { parents: parents }));

  return new _TreeState.State(tree, flattenedTree);
}, _temp);
exports.default = TreeStateModifiers;
module.exports = exports['default'];