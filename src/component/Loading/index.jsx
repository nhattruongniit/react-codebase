import React from 'react';

/* === import material ui === */
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading({...props}) {
  const { showLoading } = props;

  return (
    <div className={showLoading ? 'c-loading' : 'u-hidden'}>
      <CircularProgress className="c-loading__center" />
    </div>
  );
}

export default Loading;