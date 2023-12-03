import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const index = this.state.cart.findIndex(item => item.code === code);
    const newCart = [...this.state.cart.slice(0, index), ...this.state.cart.slice(index + 1)]
    this.setState({
      ...this.state,
      cart: newCart,
      totalPrice: newCart.reduce((acc, item) => acc + item.price * item.quantity ,0),
      countProducts: newCart.length
    })
  };

  /**
   * Нахождение элемента по коду
   * @param code
   */
  getItem(code) {
    return this.state.list.find(item => item.code === code)
  }

  /**
   * Добавление товара в корзину по коду
   * @param code,
   * @param quantity
   */
  onAddItem(code,quantity = 1) {
    let Item = this.getItem(code);
    let newCart  = [];
    const itemIndex = this.state.cart.findIndex(item => item.code === code);
    if (itemIndex > -1) {
      newCart  = this.state.cart.map(item => item.code === code ? {...item, quantity: item.quantity + 1} : item)
    } else {
      newCart = [...this.state.cart, {...Item, quantity}]
    }
    this.setState({
      ...this.state,
      cart: newCart,
      totalPrice: newCart.reduce((acc, item) => acc + item.price * item.quantity ,0),
      countProducts: newCart.length
    })
  }

}

export default Store;
