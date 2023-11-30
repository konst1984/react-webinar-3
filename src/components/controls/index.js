import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {plural} from "../../utils";
import './style.css';

function Controls({onOpen, modalId, count, total}) {

  const cn = bem('Controls');

  return (
    <div className='Controls'>
      <span>В корзине: </span>
      <span className={cn('value')}>
        {count ? `${count} ${plural(count, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} /  ${total} ₽` : 'пусто'}
      </span>
      <div className={cn('action')}>
        <button onClick={() => onOpen(modalId)}>Перейти</button>
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

export default React.memo(Controls);
