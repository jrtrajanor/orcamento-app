import axios from 'axios';

const httpClient = axios.create({
   
    //headers:{'x-apikey': '59a7ad19f5a9fa0808f11931',
    //         'Access-Control-Allow-Origin' : '*',
    //         'Access-Control-Allow-Methods' : 'GET'
    //}

});


class CepService{
    constructor(apiurl){
       this.apiurl = 'https://viacep.com.br/ws/';
    }

    getByCep(cep){
        const requestUrl = `${this.apiurl}${cep}/json`;

        return httpClient.get(requestUrl);
    }

}

export default CepService;    