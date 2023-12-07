import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import Product from "../../app/product";
import {getProduct, numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

const URL = (id) => `/api/v1/articles/${id}?fields=_id,title,description,price,edition,madeIn(title,code),category(title)`

const ItemProduct = (props) => {

  const {id} = useParams();

  const cn = bem('Product');

  useEffect(() => {
    getProduct(URL(id))
      .then(data => props.setCurrentItem(data.result))
  }, []);


  const callbacks = {
    onAdd: () => props.onAdd(id)
  }

  if(!Object.values(props.currentItem).length){
    return  <div className={cn('card')}>Loading...</div>
  }

  const {description,madeIn: {title, code},category: {title: catTitle }, edition, price} = props.currentItem;

  return (
    <div className={cn('card')}>
      <p className={cn('text')}>{description}</p>
      <p className={cn('text')}>Страна производитель: <span className={`${cn('text')} ${cn('text_bold')}`}>{title} ({code})</span></p>
      <p className={cn('text')}>Категория: <span className={`${cn('text')} ${cn('text_bold')}`}>{catTitle}</span></p>
      <p className={cn('text')}>Год выпуска: <span className={`${cn('text')} ${cn('text_bold')}`}>{edition}</span></p>
      <p className={cn('price')}>Цена: <span>{numberFormat(price)} ₽</span></p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  );
};

ItemProduct.propTypes = {
  currentItem: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number,
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  onAdd: PropTypes.func,
  setCurrentItem: PropTypes.func
};

ItemProduct.defaultProps = {
  onAdd: () => {},
  setCurrentItem: () => {}
}


export default ItemProduct;
