import React from 'react';
import classNames from 'classnames';

import {submitEvent} from '../eventWrappers';
import {getNodeRenderOptions, updateNode} from '../selectors/nodes';

const Expandable = ({
  onChange,
  node,
  children,
  index,
  iconsClassNameMap = {
    expanded: 'mi mi-keyboard-arrow-down',
    collapsed: 'mi mi-keyboard-arrow-right',
    lastChild: '',
  },
}) => {
  const {hasChildren, isExpanded} = getNodeRenderOptions(node);
  const className = classNames({
    [iconsClassNameMap.expanded]: hasChildren && isExpanded,
    [iconsClassNameMap.collapsed]: hasChildren && !isExpanded,
    [iconsClassNameMap.lastChild]: !hasChildren,
  });

  const handleChange = () => onChange({...updateNode(node, {expanded: !isExpanded}), index});

  return (
    <span onDoubleClick={handleChange}>
      {hasChildren && (
        <i tabIndex={0} onKeyDown={submitEvent(handleChange)} onClick={handleChange} className={className} />
      )}
      {children}
    </span>
  );
};

export default Expandable;
