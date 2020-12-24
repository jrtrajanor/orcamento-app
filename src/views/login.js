import React from 'react'
import { withRouter } from 'react-router-dom'
//import AuthService from '../app/service/authservice'
import AuthService from '../app/service/AuthenticationService'
import UsuarioService from '../app/service/usuarioservice'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import {mensagemErro} from '../components/toast'
import { AuthContext } from '../main/provedorauth'

class Login extends React.Component {

    constructor(props){
        super(props);
       
        this.state = {
            usernameOrEmail: '',
            password: ''
        }

        this.serviceUser = new UsuarioService();
    }

    validar = () => {
        const msg = [];

        if (!this.state.usernameOrEmail){
            msg.push('Informe um login válido!');
        }

        if (!this.state.password){
            msg.push('Informe uma senha válida!');
        }

        if (msg && msg.length > 0){
            msg.forEach(msgs => mensagemErro(msgs));

            return false;
        }

        this.entrar();
    }

    entrar = () => {

        AuthService
            .executeJwtAuthenticationService(this.state.usernameOrEmail, this.state.password)
            .then((response) => {            

            AuthService.registerSuccessfulLoginForJwt(this.state.usernameOrEmail, response.data.token);

            this.context.iniciarSessao(response.data);
            this.props.history.push('/home');
        }).catch(erro => {
            mensagemErro('Usuário ou senha inválida! '+ erro.response.data.message);
        });
    }

    render() {
        return (
            
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Usuário: *" htmlFor="userInput">
                                                <input type="email"
                                                    className="form-control"
                                                    id="userInput"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o seu usuário"
                                                    value={this.state.usernameOrEmail}
                                                    onChange={(e) => this.setState({ usernameOrEmail: e.target.value })} />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="passInput">
                                                <input type="password"
                                                    className="form-control"
                                                    id="passInput"
                                                    placeholder="Informe a senha"
                                                    value={this.state.password}
                                                    onChange={(e) => this.setState({ password: e.target.value })} />
                                            </FormGroup>
                                            <button onClick={this.validar} 
                                                    type="button" 
                                                    className="btn btn-success">
                                                    <i className= "pi pi-sign-in"></i> Entrar</button> 
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext;

export default withRouter( Login )