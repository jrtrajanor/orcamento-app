import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

import NavbarItem from './navbaritem'
import { AuthConsumer } from '../main/provedorauth'

function NavBar(props) {

    return (
        
        
        <Navbar bg="primary" expand="lg" className="fixed-top navbar-dark bg-primary">
            <div className="container">
            <Navbar.Brand bg="light" href="#home">Sistema de comissão</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav invisible" className= {props.isUsuarioAutenticado ? "visible" : "invisible"}/>
            
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home"/>
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-usuarios" label="Usuário"/> 
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-clientes" label="Clientes"/>
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-tipoitems" label="Tipo de Itens"/>
                    <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-items" label="Itens"/>
                    <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair"/>
                </Nav>
            </Navbar.Collapse>
            </div>
        </Navbar>
        
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <NavBar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
        )}
    </AuthConsumer>
)