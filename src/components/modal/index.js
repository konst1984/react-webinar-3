import React, {cloneElement} from "react";
import PropTypes from "prop-types";
import {createPortal} from "react-dom";
import Overlay from "../overlay";
import './style.css';

function Modal({children, isOpen, onClose}) {

  if (!isOpen) return null;

  return  createPortal(<Overlay>{cloneElement(children, {onCloseModal: onClose})}</Overlay>,document.body)
}

Modal.propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default Modal;
