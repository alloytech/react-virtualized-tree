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

var Favorite = function Favorite(_ref) {
  var _classNames;

  var onChange = _ref.onChange,
    node = _ref.node,
    _ref$iconsClassNameMa = _ref.iconsClassNameMap,
    iconsClassNameMap =
      _ref$iconsClassNameMa === undefined
        ? {
            favorite: 'mi mi-star',
            notFavorite: 'mi mi-star-border',
          }
        : _ref$iconsClassNameMa,
    children = _ref.children,
    index = _ref.index;

  var _getNodeRenderOptions = getNodeRenderOptions(node),
    isFavorite = _getNodeRenderOptions.isFavorite;

  var className = classNames(
    ((_classNames = {}),
    (_classNames[iconsClassNameMap.favorite] = isFavorite),
    (_classNames[iconsClassNameMap.notFavorite] = !isFavorite),
    _classNames),
  );

  var handleChange = function handleChange() {
    return onChange(_extends({}, updateNode(node, {favorite: !isFavorite}), {index: index}));
  };

  return React.createElement(
    'span',
    null,
    React.createElement('i', {
      tabIndex: 0,
      onKeyDown: submitEvent(handleChange),
      onClick: handleChange,
      className: className,
    }),
    children,
  );
};

Favorite.propTypes =
  process.env.NODE_ENV !== 'production'
    ? _extends({}, Renderer, {
        iconsClassNameMap: PropTypes.shape({
          favorite: PropTypes.string,
          notFavorite: PropTypes.string,
        }),
      })
    : {};

export default Favorite;
