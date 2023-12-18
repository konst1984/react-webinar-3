import StoreModule from "../module";
import {formatterItem, formatterList} from "../../utils";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CategoriesState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    }
  }

  async setCategories() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const categoryItems = formatterList(formatterItem(json.result.items))
    this.setState({
      ...this.getState(),
      categories: [{ title: "Все", value: "" } ,...categoryItems]
    });
  }
}

export default CategoriesState;
