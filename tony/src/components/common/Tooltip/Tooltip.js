import React from 'react';
import {
  InlineNotification,
} from 'carbon-components-react';

const Tooltip = ({ title, subtitle, kind, onCloseButtonClick }) => {
  return (
    <>
      <InlineNotification
        title={title}
        subtitle={subtitle}
        kind={kind}
        onCloseButtonClick={onCloseButtonClick}
      />
    </>
  )
}

export default Tooltip;