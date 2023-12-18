import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class ProfileState extends StoreModule {

  initState() {
      return {
        user: null,
        error: false
      }
  }

  async getUserInfo(token) {

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        method: 'GET',
        headers: {
          "X-Token": token,
          "Content-Type": "application/json"
        }
      })
      const json = await response.json()

      if (!response.ok) {
        const errorMessage = json.error.data.issues[0].message
        throw new Error(errorMessage)
      }

      this.setState({
        ...this.getState(),
        error: false,
        user: {email: json.result.email, name: json.result.profile.name, phone: json.result.profile.phone,}
      });

    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
      });
    }
  }

  resetData(){
    this.setState({
      ...this.initState(),
    })
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: false,
    });
  }
}

export default ProfileState;
