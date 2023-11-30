import React from "react";
import PropTypes from "prop-types";
import './style.css';

const Overlay = ({children}) => {
  return (
    <div className="Overlay">
      {children}
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node
}

export default Overlay;
