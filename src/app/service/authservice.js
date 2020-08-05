import axios from 'axios'
import LocalStorageService from './localstorageservice'
//import ApiService from '../apiservice';
const API_URL = 'http://localhost:8080'

export const USUARIO_LOGADO = '_usuario_logado';
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_NAME_SESSION_ATTRIBUTE_TOKEN = '_token_'

class AuthService {
    
    autenticar(credenciais){
        return axios.post(`${API_URL}/login`, credenciais);
    }

    logout(){
        return axios.get(`${API_URL}/logout`);
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN, token)

        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use((config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO);
        return (usuario && usuario.id);
    }

    removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO);
    }

    logar(usuario){
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario);
    }

    obterUsuarioAutenticado(){
       return LocalStorageService.obterItem(USUARIO_LOGADO); 
    }
}

export default AuthService;