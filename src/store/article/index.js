import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      item:{},
    }
  }

  async load(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=_id,title,description,price,edition,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      item: json.result
    }, 'Загружен товар из АПИ');
  }
}

export default Article;
