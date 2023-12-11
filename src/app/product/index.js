import React, {useCallback, useEffect, useState} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ItemProduct from "../../components/item-product";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import {useParams} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import {getProduct} from "../../utils";
import {article} from "../../store/exports";

const Product = () => {

  const store = useStore();

  const {id} = useParams();

  useEffect(() => {
    store.actions.article.load(id);
  }, [id]);

  const select = useSelector(state => ({
    currentItem: state.article?.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.currentItem?.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <ItemProduct onAdd={callbacks.addToBasket} currentItem={select.currentItem} />
    </PageLayout>
  );
};


export default Product;
