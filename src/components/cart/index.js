import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Item from "../item";
import List from "../list";

function Cart({onCloseModal, list, onDelete}) {

  const cn = bem('Cart');

  const totalPrice = list.reduce((acc, item) => acc + item.price * item.quantity ,0)

  return (
    <div className='Cart'>
      <div className={cn('head')}>
        <h2>Корзина</h2>
        <button onClick={onCloseModal}>Закрыть</button>
      </div>
      <div className={cn('body')}>
        <List list={list}
              render={(item) => (
                <div key={item.code} className='List-item'>
                  <Item item={item} onClick={onDelete} actionTitle ='Удалить'>
                    <div className='Item-quantity'>{item.quantity} шт.</div>
                  </Item>
                </div>
              )}/>
      </div>
      <div className={cn('footer')}>
        <span></span>
        <span></span>
        <span>Итого</span>
        <span>{totalPrice} ₽</span>
        <span></span>
      </div>
    </div>
  )
}

Cart.propTypes = {
  onClose: PropTypes.func,
};

export default Cart;
