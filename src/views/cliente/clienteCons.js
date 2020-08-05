import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import ClienteTable from './clienteTable'

import ClienteService from '../../app/service/clienteservice'
import { mensagemErro, mensagemAlerta, mensagemSucesso } from '../../components/toast'
import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'

class ClienteCons extends React.Component {

    state = {
        id: null,
        nome: "",
        email: "",
        fone: "",
        clientes: []
    }

    constructor(props) {
        super(props);

        this.clienteService = new ClienteService();
    }

    consultar = () => {

        const filtros = {
            id: this.state.id,
            nome: this.state.nome,
            email: this.state.email,
            fone: this.state.fone,
            showConfirmDialogDel: false,
            clienteDeletar: {}
        }

        this.clienteService.consultar(filtros).then( response => {
                const lista = response.data;

                if (lista.length < 1){
                    mensagemAlerta('Nenhum cliente foi localizado.');
                    return false;
                }

                this.setState({clientes: lista});

            }).catch( error => {
                //mensagemErro(error.response.data.message);
                mensagemErro(error.response.data);
            });
    }

    editar = (id) => {
        this.props.history.push(`cadastro-clientes/${id}`);
    }

    prepararNovoCadastro = () => {
        this.props.history.push('cadastro-clientes');
    }

    abrirConfirmacaoDeletar = (cliente) => {
        this.setState({showConfirmDialogDel: true, clienteDeletar: cliente});
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialogDel: false, clienteDeletar: {}});
    }

    deletar = () => {

        this.clienteService.deletar(this.state.clienteDeletar.id).then( response => {
            const index = this.state.clientes.indexOf(this.state.clienteDeletar);
            this.state.clientes.splice(index, 1);
            this.setState({clientes: this.state.clientes, showConfirmDialogDel: false});

            mensagemSucesso('Cliente excluido com sucesso!');
        }).catch( error => {
            mensagemErro(error.response.data.titulo);
        });
    }

    render() {
        //const clientes = [{id: 1, nome: 'Junior', email: 'junior@gmail.com', fone: '48 999533667'}] 
        const confirmaDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return (
            <Card title="Consulta de clientes">
                <div className="row">
                    <div className="col-lg-12">
                        <FormGroup label="Nome: *" htmlFor="ImputNome">
                            <input type="text"
                                className="form-control"
                                placeholder="Digite o nome do cliente"
                                id="ImputNome"
                                value={this.state.nome}
                                onChange={e => this.setState({ nome: e.target.value })} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <FormGroup label="Fone: " htmlFor="ImputFone">
                            <input type="text"
                                className="form-control"
                                placeholder="Digite o fone do cliente"
                                id="ImputFone"
                                value={this.state.fone}
                                onChange={e => this.setState({ fone: e.target.value })} />
                        </FormGroup>
                    </div>

                    <div className="col-lg-6">
                        <FormGroup label="E-mail: " htmlFor="ImputEmail">
                            <input type="text"
                                className="form-control"
                                placeholder="Digite o e-mail do cliente"
                                id="ImputEmail"
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value })} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <button className="btn btn-success"
                            type="button"
                            onClick={this.consultar}>
                            <i className="pi pi-search"></i> Consultar</button>

                        <button className="btn btn-success"
                            type="button"
                            onClick={this.prepararNovoCadastro}>
                            <i className="pi pi-plus"></i> Cadastrar novo</button>                            
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <ClienteTable clientes={this.state.clientes}
                                actionEdit={this.editar}
                                actionDelete={this.abrirConfirmacaoDeletar}
                                alterarStatus={this.abrirConfirmacaoAlterarStatus} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 offset-md-6">
                    <Dialog header="Confirmação" 
                            visible={this.state.showConfirmDialogDel} 
                            style={{ width: '50vw' }}
                            footer={confirmaDialogFooter}
                            modal={true} 
                            onHide={() => this.setState({ showConfirmDialogDel: false })}>
                        Confirma a exclusão do cliente?
                    </Dialog>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(ClienteCons); 