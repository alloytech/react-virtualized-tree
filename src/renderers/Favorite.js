import React from 'react';
import classNames from 'classnames';

import {submitEvent} from '../eventWrappers';
import {getNodeRenderOptions, updateNode} from '../selectors/nodes';

const Favorite = ({
  onChange,
  node,
  iconsClassNameMap = {
    favorite: 'mi mi-star',
    notFavorite: 'mi mi-star-border',
  },
  children,
  index,
}) => {
  const {isFavorite} = getNodeRenderOptions(node);

  const className = classNames({
    [iconsClassNameMap.favorite]: isFavorite,
    [iconsClassNameMap.notFavorite]: !isFavorite,
  });

  const handleChange = () => onChange({...updateNode(node, {favorite: !isFavorite}), index});

  return (
    <span>
      <i tabIndex={0} onKeyDown={submitEvent(handleChange)} onClick={handleChange} className={className} />
      {children}
    </span>
  );
};

export default Favorite;
