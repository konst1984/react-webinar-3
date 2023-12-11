import React, {useCallback} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import useStore from "../../store/use-store";

const ProductLink = (props) => {

  const store = useStore();

  const cn = bem('Product-link');

  const callbacks = {
    closeModal: () => store.actions.modals.close()
  }

  return (
    <Link to= {props.path} className={cn()}  onClick={callbacks.closeModal}>
      <div>
        {props.children}
      </div>
    </Link>
  );
};

ProductLink.propTypes ={
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
  path: PropTypes.string,
}

export default ProductLink;
