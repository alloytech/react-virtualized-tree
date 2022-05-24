'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DefaultGroupRenderer = require('./filtering/DefaultGroupRenderer');

var _DefaultGroupRenderer2 = _interopRequireDefault(_DefaultGroupRenderer);

var _nodeShapes = require('./shapes/nodeShapes');

var _filtering = require('./selectors/filtering');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {value: subClass, enumerable: false, writable: true, configurable: true},
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
}

var indexByName = function indexByName(searchTerm) {
  return function(_ref) {
    var name = _ref.name;

    var upperCaseName = name.toUpperCase();
    var upperCaseSearchTerm = searchTerm.toUpperCase();

    return upperCaseName.indexOf(upperCaseSearchTerm.trim()) > -1;
  };
};

var FilteringContainer = ((_temp = _class = (function(_React$Component) {
  _inherits(FilteringContainer, _React$Component);

  function FilteringContainer(props) {
    _classCallCheck(this, FilteringContainer);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      filterText: '',
      filterTerm: '',
    };

    _this.getChildContext = function() {
      return {unfilteredNodes: _this.props.nodes};
    };

    _this.handleFilterTextChange = function(e) {
      var filterText = e.target.value;

      _this.setState({filterText: filterText});

      _this.setFilterTerm();
    };

    _this.setFilterTerm = props.debouncer(_this.setFilterTerm, 300);
    return _this;
  }

  FilteringContainer.prototype.setFilterTerm = function setFilterTerm() {
    this.setState(function(ps) {
      return {filterTerm: ps.filterText};
    });
  };

  FilteringContainer.prototype.render = function render() {
    var _state = this.state,
      filterTerm = _state.filterTerm,
      filterText = _state.filterText;
    var _props = this.props,
      nodes = _props.nodes,
      treeRenderer = _props.children,
      groups = _props.groups,
      selectedGroup = _props.selectedGroup,
      GroupRenderer = _props.groupRenderer,
      onSelectedGroupChange = _props.onSelectedGroupChange,
      indexSearch = _props.indexSearch;

    var relevantNodes =
      groups && selectedGroup && groups[selectedGroup]
        ? (0, _filtering.filterNodes)(groups[selectedGroup].filter, nodes)
        : {nodes: nodes, nodeParentMappings: {}};

    var _ref2 = filterTerm
        ? (0, _filtering.filterNodes)(indexSearch(filterTerm, relevantNodes.nodes), relevantNodes.nodes)
        : relevantNodes,
      filteredNodes = _ref2.nodes,
      nodeParentMappings = _ref2.nodeParentMappings;

    return _react2.default.createElement(
      'div',
      {className: 'tree-filter-container'},
      _react2.default.createElement(
        'div',
        {className: (0, _classnames2.default)('tree-lookup-input', {group: !!groups})},
        _react2.default.createElement('input', {
          value: filterText,
          onChange: this.handleFilterTextChange,
          placeholder: 'Search...',
        }),
        _react2.default.createElement('i', {'aria-hidden': 'true', className: 'mi mi-11 mi-search'}),
        groups &&
          _react2.default.createElement(GroupRenderer, {
            groups: groups,
            selectedGroup: selectedGroup,
            onChange: onSelectedGroupChange,
          }),
      ),
      treeRenderer({nodes: filteredNodes, nodeParentMappings: nodeParentMappings}),
    );
  };

  return FilteringContainer;
})(_react2.default.Component)),
(_class.childContextTypes = {
  unfilteredNodes: _propTypes2.default.arrayOf(_propTypes2.default.shape(_nodeShapes.Node)).isRequired,
}),
(_class.defaultProps = {
  debouncer: _lodash2.default,
  groupRenderer: _DefaultGroupRenderer2.default,
  indexSearch: indexByName,
}),
_temp);
exports.default = FilteringContainer;

FilteringContainer.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        children: _propTypes2.default.func.isRequired,
        debouncer: _propTypes2.default.func,
        groups: _propTypes2.default.object,
        selectedGroup: _propTypes2.default.string,
        groupRenderer: _propTypes2.default.func,
        onSelectedGroupChange: _propTypes2.default.func,
        indexSearch: _propTypes2.default.func,
      }
    : {};
module.exports = exports['default'];
