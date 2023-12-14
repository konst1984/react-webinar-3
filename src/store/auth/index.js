import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class AuthState extends StoreModule {

  initState() {
    const token = localStorage.getItem('token')
    if(token){
      this.getUserInfo(token);
      this.setState({
        ...this.getState(),
        error: false,
        token,
      });
    }else{
      return {
        token: '',
        user: null,
        error: false
      }
    }

  }

  async signIn(login, password){
     try{
       const response = await fetch('/api/v1/users/sign', {
         method: 'POST',
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           "login": login,
           "password": password
         })
       })

       const json = await response.json()

        if(!response.ok){
          const errorMessage= json.error.data.issues[0].message
          throw new Error(errorMessage)
        }

        localStorage.setItem('token', json.result.token);

       this.setState({
         ...this.getState(),
         error: false,
         token: json.result.token,
       });

      await this.getUserInfo(this.getState().token);

     }catch (e) {
       this.setState({
         ...this.getState(),
         error: e.message,
       });
     }
  }

  async signOut(){
    const token = this.getState().token;
    if(token){
      await fetch('/api/v1/users/sign',{
        method: 'DELETE',
        headers: {
          "X-Token": token,
          "Content-Type": "application/json"
        }
      })

      localStorage.removeItem('token');

      this.setState({
        ...this.initState(),
      });
    }
  }

  async getUserInfo(token){
      try{
        const response = await fetch('/api/v1/users/self?fields=*', {
          method: 'GET',
          headers: {
            "X-Token": token,
            "Content-Type": "application/json"
          }
        })
        const json = await response.json()

        if(!response.ok){
          const errorMessage= json.error.data.issues[0].message
          throw new Error(errorMessage)
        }

        this.setState({
          ...this.getState(),
          error: false,
          user: { email: json.result.email, name: json.result.profile.name,phone: json.result.profile.phone,}
        });

      }catch (e) {
        this.setState({
          ...this.getState(),
          error: e.message,
        });
      }
  }
}

export default AuthState;
