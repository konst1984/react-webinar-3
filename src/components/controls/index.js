import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {formatterPrice, plural} from "../../utils";
import './style.css';

function Controls(props) {

  const cn = bem('Controls');

  return (
    <div className='Controls'>
      <span>В корзине: </span>
      <span className={cn('value')}>
        {props.countProducts ? `${props.countProducts} ${plural(props.countProducts, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} /  ${formatterPrice.format(props.totalPrice)}` : 'пусто'}
      </span>
      <div className={cn('action')}>
        <button onClick={() => props.onOpen(props.modalId)}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
  price: PropTypes.number,
  quantity: PropTypes.number
})),
  onOpen: PropTypes.func,
  modalId: PropTypes.string
};

Controls.defaultProps = {
  cart: [],
  onOpen: () => {}
}

export default Controls;
