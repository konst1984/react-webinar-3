import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {store} from "../../index";
import {formatterPrice} from "../../utils";

function CartItem(props) {

  const callbacks = {
    onClick: () => {
      store.deleteItem(props.item.code);
    },
  }

  return (
    <div className='CartList-item'>
      <div className='CartItem'>
        <div className='CartItem-code'>{props.item.code}</div>
        <div className='CartItem-title'>
          {props.item.title}
        </div>
        <div className='CartItem-price'>{formatterPrice.format(props.item.price)}</div>
        <div className='CartItem-quantity'>{props.item.quantity} шт</div>
        <div className='CartItem-actions'>
          <button onClick={callbacks.onClick}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    quantity: PropTypes.number
  }).isRequired,
};


export default React.memo(CartItem);
