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

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {submitEvent} from '../eventWrappers';
import {getNodeRenderOptions, updateNode} from '../selectors/nodes';
import {Renderer} from '../shapes/rendererShapes';

var Expandable = function Expandable(_ref) {
  var _classNames;

  var onChange = _ref.onChange,
    node = _ref.node,
    children = _ref.children,
    index = _ref.index,
    _ref$iconsClassNameMa = _ref.iconsClassNameMap,
    iconsClassNameMap =
      _ref$iconsClassNameMa === undefined
        ? {
            expanded: 'mi mi-keyboard-arrow-down',
            collapsed: 'mi mi-keyboard-arrow-right',
            lastChild: '',
          }
        : _ref$iconsClassNameMa;

  var _getNodeRenderOptions = getNodeRenderOptions(node),
    hasChildren = _getNodeRenderOptions.hasChildren,
    isExpanded = _getNodeRenderOptions.isExpanded;

  var className = classNames(
    ((_classNames = {}),
    (_classNames[iconsClassNameMap.expanded] = hasChildren && isExpanded),
    (_classNames[iconsClassNameMap.collapsed] = hasChildren && !isExpanded),
    (_classNames[iconsClassNameMap.lastChild] = !hasChildren),
    _classNames),
  );

  var handleChange = function handleChange() {
    return onChange(_extends({}, updateNode(node, {expanded: !isExpanded}), {index: index}));
  };

  return React.createElement(
    'span',
    {onDoubleClick: handleChange},
    hasChildren &&
      React.createElement('i', {
        tabIndex: 0,
        onKeyDown: submitEvent(handleChange),
        onClick: handleChange,
        className: className,
      }),
    children,
  );
};

Expandable.propTypes =
  process.env.NODE_ENV !== 'production'
    ? _extends({}, Renderer, {
        iconsClassNameMap: PropTypes.shape({
          expanded: PropTypes.string,
          collapsed: PropTypes.string,
          lastChild: PropTypes.string,
        }),
      })
    : {};

export default Expandable;
