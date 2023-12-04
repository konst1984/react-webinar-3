import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import List from "../list";
import CartItem from "../cartItem";
import {formatterPrice} from "../../utils";
import './style.css';

function Cart({onCloseModal, list,totalPrice}) {

  const cn = bem('Cart');

  const renderItems = (data) => data.map(item => <CartItem key={item.code} item={item}/>)

  return (
    <div className='Cart'>
      <div className={cn('head')}>
        <h2>Корзина</h2>
        <button onClick={onCloseModal}>Закрыть</button>
      </div>
      <div className={cn('body')}>
        <List list={list} renderItems={renderItems}/>
      </div>
      <div className={cn('footer')}>
        <span className={cn('footer__total')}>Итого</span>
        <span>{formatterPrice.format(totalPrice)}</span>
        <span></span>
      </div>
    </div>
  )
}

Cart.propTypes = {
  onCloseModal: PropTypes.func,
  totalPrice: PropTypes.number,
  list:PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }))
};

Cart.defaultProps = {
  list: [],
  onCloseModal: () => {},
  totalPrice: 0
}

export default Cart;
