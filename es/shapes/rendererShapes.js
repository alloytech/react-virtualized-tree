import PropTypes from 'prop-types';

import { FlattenedNode } from './nodeShapes';

export var Renderer = {
  measure: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  node: PropTypes.shape(FlattenedNode),
  index: PropTypes.number.isRequired
};