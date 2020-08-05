import React from 'react'

import UsuarioService from '../app/service/usuarioservice'
import formatter from '../../node_modules/currency-formatter'
import {AuthContext} from '../main/provedorauth'

class Home extends React.Component {
    
    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    state={
        saldo: 0.00
    }

    componentDidMount(){
        //const usuarioLogado = this.context.usuarioAutenticado;

        //this.usuarioService.obterSaldoPorUsuario(usuarioLogado.id)
        //    .then(response => { 
        //            this.setState({saldo: response.data});
        //        }
        //    ).catch(erro => {
        //        console.error(erro.response); 
        //    });
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de comissão.</p>
                <p className="lead">Sua comissão atual é de {formatter.format(this.state.saldo, {locale: 'pt-BR'}) } </p>
                <hr className="my-4"/>
                    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" 
                           href="#/cadastro-clientes" 
                           role="button">
                           <i className="pi pi-user-plus"></i> Cadastrar clientes</a> <br /> <br />
                        <a className="btn btn-danger btn-lg" 
                           href="#/cadastro-lancamentos" 
                           role="button">
                           <i className="pi pi-money-bill"></i> Realizar pedido</a>
                    </p>
          </div>
        )
    }
}

Home.contextType = AuthContext;

export default Home;