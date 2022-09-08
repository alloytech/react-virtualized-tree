var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import classNames from 'classnames';

import { submitEvent } from '../eventWrappers';
import { getNodeRenderOptions, deleteNode } from '../selectors/nodes';

var Deletable = function Deletable(_ref) {
  var _classNames;

  var onChange = _ref.onChange,
      node = _ref.node,
      _ref$iconsClassNameMa = _ref.iconsClassNameMap,
      iconsClassNameMap = _ref$iconsClassNameMa === undefined ? {
    delete: 'mi mi-delete'
  } : _ref$iconsClassNameMa,
      children = _ref.children,
      index = _ref.index;

  var _getNodeRenderOptions = getNodeRenderOptions(node),
      isDeletable = _getNodeRenderOptions.isDeletable;

  var className = classNames((_classNames = {}, _classNames[iconsClassNameMap.delete] = isDeletable, _classNames));

  var handleChange = function handleChange() {
    return onChange(_extends({}, deleteNode(node), { index: index }));
  };

  return React.createElement(
    'span',
    null,
    isDeletable && React.createElement('i', { tabIndex: 0, onKeyDown: submitEvent(handleChange), onClick: handleChange, className: className }),
    children
  );
};

export default Deletable;