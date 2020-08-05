import React from 'react'

import { withRouter } from 'react-router-dom'
import UsuarioService from '../../app/service/usuarioservice'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import UsuarioTable from './usuarioTable'
import { mensagemErro, mensagemAlerta } from '../../components/toast'

class UsuarioCons extends React.Component {
    
    state = {
        id: null,
        nome: '',
        usuario: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
        usuarios: []
    }

    constructor(props){
        super(props);
        
        this.usuarioService = new UsuarioService();
    }

    consultar = () => {

        const filtros = {
            id: this.state.id,
            nome: this.state.nome,
            usuario: this.state.usuario,
            email: this.state.email,
            
            showConfirmDialogDel: false,
            usuarioDeletar: {}
        }

        this.usuarioService.consultar(filtros).then( response => {
                const lista = response.data;

                if (lista.length < 1){
                    mensagemAlerta('Nenhum usuário foi localizado.');
                    return false;
                }

                this.setState({usuarios: lista});

            }).catch( error => {
                mensagemErro(error.response.data.message);
            });
    }

    editar = (id) => {
        this.props.history.push(`cadastro-usuarios/${id}`);
    }

    prepararNovoCadastro = () => {
        this.props.history.push('cadastro-usuarios');
    }

    abrirConfirmacaoDeletar = (usuario) => {
        this.setState({showConfirmDialogDel: true, usuarioDeletar: usuario});
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialogDel: false, usuarioDeletar: {}});
    }

    deletar = () => {
    
    }

    render() {
        return (
            <Card title="Consulta de usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset>
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Digite o nome do usuário"
                                        id="inputNome"
                                        name="nome"
                                        onChange={(e) => this.setState({ nome: e.target.value })}>
                                    </input>
                                </FormGroup>
                                
                                <button onClick={this.consultar} 
                                        type="button" 
                                        className="btn btn-success">
                                        <i className="pi pi-search"> </i> Consultar</button>
                                <button onClick={this.prepararNovoCadastro} 
                                        type="button" 
                                        className="btn btn-danger">
                                        <i className="pi pi-plus"> </i> Cadastrar novo</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <UsuarioTable usuarios={this.state.usuarios}
                                actionEdit={this.editar}
                                actionDelete={this.abrirConfirmacaoDeletar}
                            />
                        </div>
                    </div>
                </div>

            </Card>
        )
    }
}

export default withRouter( UsuarioCons )