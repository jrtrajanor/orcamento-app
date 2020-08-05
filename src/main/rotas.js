import React from 'react';

import Login from '../views/login'
import Home from '../views/home'
import UsuarioCons from '../views/usuario/usuarioCons'
import UsuarioCad from '../views/usuario/usuarioCad'
import ClienteCons from '../views/cliente/clienteCons'
import ClienteCad from '../views/cliente/clienteCad'
import ItemCons from '../views/item/itemCons'
import ItemCad from '../views/item/itemCad'
import TipoItemCons from '../views/tipoItem/tipoItemCons'
import TipoItemCad from '../views/tipoItem/tipoItemCad'

import { AuthConsumer } from '../main/provedorauth'
import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'

//import AuthenticatedRoute from '../app/service/AuthenticatedRoute';


function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props} ){
    return(
        <Route {...props} render={ (componentProps) => {
            if (isUsuarioAutenticado){
                return(
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname: '/login', state: { from: componentProps.location }  } } />
                )    
            }
        }}
        />
    )
}

function Rotas(props) {
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado="true" path="/consulta-usuarios" component={UsuarioCons} />
                <RotaAutenticada isUsuarioAutenticado="true" path="/cadastro-usuarios/:id?" component={UsuarioCad} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-clientes" component={ClienteCons} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-clientes/:id?" component={ClienteCad} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-tipoItems" component={TipoItemCons} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-tipoItems/:id?" component={TipoItemCad} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-items" component={ItemCons} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-items/:id?" component={ItemCad} />
            </Switch>
        </HashRouter>    
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>    
)