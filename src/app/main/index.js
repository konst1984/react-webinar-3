import React, {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import PaginationButton from "../../components/pagination-button";
const LIMIT = 10;
function Main() {

  const store = useStore();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const skip = (currentPage - 1) * LIMIT;
    store.actions.catalog.load(LIMIT, skip);
  }, [currentPage]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение страницы
    switchCurrentPage: useCallback((num) => setCurrentPage(num),[] )
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
    pagination: useCallback((item, index) => {
      return  <PaginationButton key={index} currentPage={currentPage} switchCurrentPage={callbacks.switchCurrentPage} item={item}/>
    }, [currentPage]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination totalPages={Math.ceil(select.count/LIMIT)} renderItem={renders.pagination} currentPage={currentPage}/>
    </PageLayout>

  );
}

export default memo(Main);
