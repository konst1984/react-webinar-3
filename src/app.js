import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";
import Item from "./components/item";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const[modalName, setModalName] = useState('');
  const[cart, setCart] = useState([]);

  const list = store.getState().list;

  const callbacks = {
    onDeleteItem: (code) => {
      const index = cart.findIndex(item => item.code === code);
      setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
    },

    onAddItem: useCallback((code, quantity = 1) => {
      let Item = store.getItem(code);
      let newCart =[];
      const itemIndex = cart.findIndex(item => item.code === code);
      if (itemIndex > -1) {
        const newItem = {...cart[itemIndex], quantity: cart[itemIndex].quantity + quantity};
        newCart = cart.slice();
        newCart.splice(itemIndex,1,newItem);
      } else {
        newCart = [...cart, {...Item, quantity}]
      }
      setCart(newCart)
    }, [cart]),

    onShowCart: useCallback((id) => {
      setModalName(id)
    },[]),

    onCloseCart: () => {
      setModalName('')
    }
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity ,0)

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls onOpen={callbacks.onShowCart} modalId='cart' count={cart.length} total={totalPrice}/>
      <List
        list={list}
        render={(item) => (
          <div key={item.code} className='List-item'>
            <Item item={item} onClick={callbacks.onAddItem} actionTitle ='Добавить'/>
          </div>
        )}
      />
      <Modal onClose={callbacks.onCloseCart} isOpen={'cart' === modalName}>
        <Cart list={cart} onDelete={callbacks.onDeleteItem}/>
      </Modal>
    </PageLayout>
  );
}

export default App;
