import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export const USER_NAME_SESSION_ATTRIBUTE_TOKEN = '_token_'

const httpClient = axios.create({
    //baseURL: 'https://api-orcamento.herokuapp.com',
    //'http://localhost:8080',
    
    //headers:{'x-apikey': '59a7ad19f5a9fa0808f11931',
    //         'Access-Control-Allow-Origin' : '*',
    //         'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    //}

    //headers:{
    //    'Authorization': 'Bearer '+ sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN)
    //}
});

httpClient.interceptors.request.use(
    function(config) {
      if (sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN)) {
        config.headers["authorization"] = "Bearer " + sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN);
      }
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );

class ApiService{
    constructor(apiurl){
       this.apiurl = API_URL + apiurl;
    }

    get(url){
        const requestUrl = `${this.apiurl}${url}`;
console.log(requestUrl)      
        return httpClient.get(requestUrl);
    }

    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`;

console.log(requestUrl)                    
console.log(objeto)                    
        return httpClient.post(requestUrl, objeto);
    }

    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`;

        return httpClient.put(requestUrl, objeto);
    }

    delete(url){
        const requestUrl = `${this.apiurl}${url}`;
        return httpClient.delete(requestUrl);
    }
}

export default ApiService;