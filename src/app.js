import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import Item from "./components/item";
import CartItem from "./components/cartItem";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const[modalName, setModalName] = useState('');

  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = store.getState().totalPrice;
  const countProducts = store.getState().countProducts;

  const callbacks = {

    onShowCart: useCallback((id) => {
      setModalName(id)
    },[]),

    onCloseCart: () => {
      setModalName('')
    }
  }

  const renderItems = (data) => data.map(item => <Item key={item.code} item={item}/>)

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpen={callbacks.onShowCart} modalId='cart' totalPrice={totalPrice} countProducts={countProducts}/>
      <List
        list={list}
        renderItems={renderItems}
      />
      <Modal onClose={callbacks.onCloseCart} isOpen={'cart' === modalName}>
        <Cart list={cart} totalPrice={totalPrice}/>
      </Modal>
    </PageLayout>
  );
}

export default App;
