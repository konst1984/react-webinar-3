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
        {props.totalPrice ? `${props.countProducts} ${plural(props.countProducts, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${formatterPrice.format(props.totalPrice)}` : 'пусто'}
      </span>
      <div className={cn('action')}>
        <button onClick={() => props.onOpen(props.modalId)}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  countProducts: PropTypes.number,
  totalPrice: PropTypes.number,
  onOpen: PropTypes.func,
  modalId: PropTypes.string
};

Controls.defaultProps = {
  onOpen: () => {}
}

export default Controls;
