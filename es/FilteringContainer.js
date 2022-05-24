var _class, _temp;

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

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import classNames from 'classnames';

import DefaultGroupRenderer from './filtering/DefaultGroupRenderer';
import {Node} from './shapes/nodeShapes';
import {filterNodes} from './selectors/filtering';

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
        ? filterNodes(groups[selectedGroup].filter, nodes)
        : {nodes: nodes, nodeParentMappings: {}};

    var _ref2 = filterTerm
        ? filterNodes(indexSearch(filterTerm, relevantNodes.nodes), relevantNodes.nodes)
        : relevantNodes,
      filteredNodes = _ref2.nodes,
      nodeParentMappings = _ref2.nodeParentMappings;

    return React.createElement(
      'div',
      {className: 'tree-filter-container'},
      React.createElement(
        'div',
        {className: classNames('tree-lookup-input', {group: !!groups})},
        React.createElement('input', {
          value: filterText,
          onChange: this.handleFilterTextChange,
          placeholder: 'Search...',
        }),
        React.createElement('i', {'aria-hidden': 'true', className: 'mi mi-11 mi-search'}),
        groups &&
          React.createElement(GroupRenderer, {
            groups: groups,
            selectedGroup: selectedGroup,
            onChange: onSelectedGroupChange,
          }),
      ),
      treeRenderer({nodes: filteredNodes, nodeParentMappings: nodeParentMappings}),
    );
  };

  return FilteringContainer;
})(React.Component)),
(_class.childContextTypes = {
  unfilteredNodes: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
}),
(_class.defaultProps = {
  debouncer: debounce,
  groupRenderer: DefaultGroupRenderer,
  indexSearch: indexByName,
}),
_temp);
export {FilteringContainer as default};

FilteringContainer.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        children: PropTypes.func.isRequired,
        debouncer: PropTypes.func,
        groups: PropTypes.object,
        selectedGroup: PropTypes.string,
        groupRenderer: PropTypes.func,
        onSelectedGroupChange: PropTypes.func,
        indexSearch: PropTypes.func,
      }
    : {};
