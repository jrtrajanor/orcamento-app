import React from 'react'

import NavbarItem from './navbaritem'
import { AuthConsumer } from '../main/provedorauth'

function NavBar(props) {

    return (

        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand">Sistema de Comissão</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home"/>
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-usuarios" label="Usuário"/> 
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-clientes" label="Clientes"/>
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-tipoitems" label="Tipo de Itens"/>
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-items" label="Itens"/>
                        <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair"/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <NavBar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
        )}
    </AuthConsumer>
)