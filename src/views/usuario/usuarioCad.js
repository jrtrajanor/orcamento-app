import React from 'react'
import {withRouter} from 'react-router-dom'
import moment from "moment";

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import UsuarioService from '../../app/service/usuarioservice'
import SecurityService from '../../app/service/utils/security'
import {mensagemSucesso, mensagemErro, mensagemAlerta} from '../../components/toast'

class UsuarioCad extends React.Component {
    
    state = {
        id: null,
        nome: '',
        usuario: '',
        email: '',
        dataNascimento: moment(new Date()).format(),
        fone: '',
        senha: '', // '$2a$10$Q9PcauiZfRbf1xVXKcNYL.utjk7gehNIeK/PhmW5ewpbmlOIwcDZy',
        senhaRepeticao: '',
        atualizando: false,
        selectedOptionRole: null,
        roles: []
    }

    constructor(props){
        super(props);
        this.usuarioService = new UsuarioService();
    }

    componentDidMount(){
        const params = this.props.match.params;
        
        if (params.id){
            this.usuarioService.obterPorId(params.id)
                .then( response => {

                    this.setState( {...response.data, atualizando: true} );
                    this.setState({dataNascimento: moment(this.state.dataNascimento).format('YYYY-MM-DD')});

                    response.data.roles.forEach(role => {
                        this.setState( { selectedOptionRole: role.id } );
                    })

                }).catch(error => {
                    mensagemErro(error.response.data);
                });
        }

        this.carregarRoles();
    }

    carregarRoles = () => {
        this.usuarioService.ListarRoles().then( response => {
            this.setState({ roles: response.data });
          
         }).catch(error => {
            mensagemErro(error.response.data);
         });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }

    handleChangeRole = (event) => {
        this.setState({ roles: event.target.value });
    };

    preparaSalvar= () => {
        const usuario = this.getDados();

        try{
            this.usuarioService.validar(usuario);
        }catch(error){
            const msgsErro = error.mensagens;
            msgsErro.forEach(msg => mensagemAlerta(msg));
            return false;
        }

        if (this.ehNovoCadastro()){
            this.salvar(usuario);
        }else{
            this.atualizar(usuario);
        }    
    }

    getDados = () => {
        if (this.ehNovoCadastro()){
            const {id, nome, usuario, email, dataNascimento, fone, senha, senhaRepeticao} = this.state
            const usuarios = {id, nome, usuario, email, dataNascimento, fone, senha, senhaRepeticao}

            return usuarios;
        }
        else{
            const {nome, usuario, email, dataNascimento, fone, senha, senhaRepeticao} = this.state
            const usuarios = {nome, usuario, email, dataNascimento, fone, senha, senhaRepeticao}

            return usuarios;
        }
    }

    ehNovoCadastro = () => {
        if (this.state.id){
            return false;
        }
        return true;
    }

    salvar = (usuario) => {
        const dataNasc = moment(this.state.dataNascimento).format('YYYY-MM-DD');

        this.usuarioService.salvar({
             usuario: this.state.usuario,
             nome: this.state.nome,
             email: this.state.email,
             dataNascimento: dataNasc,
             fone: this.state.fone,
             senha: SecurityService.criptografaBase64(this.state.senha),
             roles:[{
                 id: this.state.selectedOptionRole
             }]
         }).then( response => {
                mensagemSucesso("Usuário cadastrado com sucesso!");
                this.prepareConsultarUser();     
         }).catch(error => {
            mensagemErro(error.response.data.titulo);
            mensagemErro(error.response.data);
            mensagemErro(error.response.message);
         });
    }

    atualizar = (usuario) =>{
        const dataNasc = moment(this.state.dataNascimento).format('YYYY-MM-DD');
        
        this.usuarioService.atualizar({
             id: this.state.id,
             usuario: this.state.usuario,
             nome: this.state.nome,
             email: this.state.email,
             dataNascimento: dataNasc,
             fone: this.state.fone,
             senha: SecurityService.criptografaBase64(this.state.senha),
             roles:[{
                 id: this.state.selectedOptionRole
             }]
        }).then( response => {
            mensagemSucesso("Usuário atualizado com sucesso!");
            this.prepareConsultarUser();
        }).catch(error => {
            mensagemErro(error.response.data.titulo);
            mensagemErro(error.response.data);
            mensagemErro(error.response.message);
        });
    }

    prepareConsultarUser = () => {
        this.props.history.push('/consulta-usuarios');
    }

    render() {
        
        return (
            <Card title={this.state.atualizando ? 'Atualizando usuário' : 'Cadastro de usuário'} >
                <div className="row">
                    <div className="col-lg-1">
                        <div className="bs-component">
                            <FormGroup label="Código" htmlFor="inputId">
                                <input className="form-control"
                                    type="text"
                                    id="inputId"
                                    name="id"
                                    value={this.state.id} disabled />
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text"
                                   className="form-control"
                                   id="inputNome"
                                   name="nome"
                                   value={this.state.nome}
                                   onChange={this.handleChange}>
                            </input>
                        </FormGroup>
                        <FormGroup label="Usuario: *" htmlFor="inputUsuario">
                            <input type="text"
                                   className="form-control"
                                   id="inputUsuario"
                                   name="usuario"
                                   value={this.state.usuario}
                                   onChange={this.handleChange}>
                            </input>
                        </FormGroup>
                        <FormGroup label="E-mail: *" htmlFor="inputEmail">
                            <input type="text"
                                    className="form-control"
                                    id="inputEmail"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}>
                            </input>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">                    
                    <div className="col-lg-4">
                        <FormGroup label="Fone:" htmlFor="inputFone">
                            <input type="text"
                                   className="form-control"
                                   id="inputFone"
                                   name="fone"
                                   value={this.state.fone}
                                   onChange={this.handleChange}>
                            </input>
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">    
                        <FormGroup label="Data Nascimento:" htmlFor="inputDataNasc">
                            <input type="date"
                                   className="form-control"
                                   id="inputDataNasc"
                                   name="dataNascimento"
                                   value={this.state.dataNascimento} 
                                   onChange={this.handleChange}>
                            </input>
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">
                        <FormGroup label="Permissão: *" htmlFor="inputRole">
                            <select className="form-control" 
                                    id="inputRole"
                                    name="selectedOptionRole"
                                    value={this.state.selectedOptionRole}
                                    onChange={this.handleChange}>
                                <option value="0">Selecione uma opção</option>
                                    {this.state.roles.map(role => (<option key={role.id} value={role.id}>{role.nome}</option>))}
                            </select>    
                        </FormGroup>
                   </div>
                </div>
                <div className="row">    
                    <div className="col-lg-6">
                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                            <input type="password"
                                   className="form-control"
                                   id="inputSenha"
                                   name="senha"
                                   value={this.state.senha}
                                   onChange={this.handleChange}>
                            </input>
                        </FormGroup>
                    </div>
                    <div className="col-lg-6">
                        <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                            <input type="password"
                                   className="form-control"
                                   id="inputRepitaSenha"
                                   name="senhaRepeticao"
                                   value={this.state.senhaRepeticao}
                                   onChange={this.handleChange}>
                            </input>
                        </FormGroup>
                    </div>
                </div>
                
                <div className="row">
                    <button onClick={this.preparaSalvar} 
                            type="button" 
                            className="btn btn-success">
                            <i className="pi pi-save"> </i> Salvar</button>
                    <button onClick={this.prepareConsultarUser} 
                            type="button" 
                            className="btn btn-danger">
                            <i className="pi pi-arrow-left"> </i> Voltar</button>
                </div>
            </Card>
        )
    }
}

export default withRouter( UsuarioCad )