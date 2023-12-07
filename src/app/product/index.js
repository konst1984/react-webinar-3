import React, {useCallback, useState} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemProduct from "../../components/item-product";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

const Product = () => {

  const store = useStore();
  const [currentItem, setCurrentItem] = useState({})

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={currentItem?.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ItemProduct onAdd={callbacks.addToBasket} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
    </PageLayout>
  );
};


export default Product;
