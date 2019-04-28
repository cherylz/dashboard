import React from 'react';

function OverlayWrapper(props) {
  return <div className="overlay">{props.children}</div>;
}

export default OverlayWrapper;
