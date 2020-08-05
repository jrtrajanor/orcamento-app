export default class Security{

    static criptografaBase64(password){
        let reverse = password.split('').reverse('').join('');
        let senhaCript = '';

        for(var i=0; i<password.length; ++i){
          senhaCript = senhaCript + password[i] + reverse[i];
        }
        
        return window.btoa(senhaCript);
    }

}