import React from 'react';
import classNames from 'classnames';

import {submitEvent} from '../eventWrappers';
import {getNodeRenderOptions, deleteNode} from '../selectors/nodes';

const Deletable = ({
  onChange,
  node,
  iconsClassNameMap = {
    delete: 'mi mi-delete',
  },
  children,
  index,
}) => {
  const {isDeletable} = getNodeRenderOptions(node);

  const className = classNames({
    [iconsClassNameMap.delete]: isDeletable,
  });

  const handleChange = () => onChange({...deleteNode(node), index});

  return (
    <span>
      {isDeletable && (
        <i tabIndex={0} onKeyDown={submitEvent(handleChange)} onClick={handleChange} className={className} />
      )}
      {children}
    </span>
  );
};

export default Deletable;
