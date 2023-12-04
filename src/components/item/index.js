import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {store} from "../../index";
import {formatterPrice} from "../../utils";

function Item(props) {

  const callbacks = {
    onClick: () => {
      store.onAddItem(props.item.code);
    },
  }

  return (
    <div className='List-item'>
      <div className='Item'>
        <div className='Item-code'>{props.item.code}</div>
        <div className='Item-title'>
          {props.item.title}
        </div>
        <div className='Item-price'>{formatterPrice.format(props.item.price)}</div>
        <div className='Item-actions'>
          <button onClick={callbacks.onClick}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
};

export default React.memo(Item);
