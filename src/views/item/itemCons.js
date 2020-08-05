import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import ItemTable from './itemTable'

import ItemService from '../../app/service/itemservice'
import { mensagemErro, mensagemAlerta, mensagemSucesso } from '../../components/toast'
import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'

class ItemCons extends React.Component {

    state = {
        id: null,
        descricao: "",
        descTipo: "",
        vlrCusto: null,
        vlrVenda: null,
        tipoItem: [],
        items: []
    }

    constructor(props) {
        super(props);

        this.itemService = new ItemService();
    }

    consultar = () => {

        const filtros = {
            id: this.state.id,
            descricao: this.state.descricao,
            tipoItem: this.state.descTipo,
            showConfirmDialogDel: false,
            itemDeletar: {}
        }

        this.itemService.consultar(filtros).then( response => {
                const lista = response.data;

                if (lista.length < 1){
                    mensagemAlerta('Nenhum item foi localizado.');
                    return false;
                }

                this.setState({items: lista});

            }).catch( error => {
                mensagemErro(error.response.data);
            });
    }
    
    editar = (id) => {
        this.props.history.push(`cadastro-items/${id}`);
    }

    prepararNovoCadastro = () => {
        this.props.history.push('cadastro-items');
    }

    abrirConfirmacaoDeletar = (item) => {
        this.setState({showConfirmDialogDel: true, itemDeletar: item});
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialogDel: false, itemDeletar: {}});
    }

    deletar = () => {
        this.itemService.deletar(this.state.itemDeletar.id).then( response => {
            const index = this.state.items.indexOf(this.state.itemDeletar);
            this.state.items.splice(index, 1);
            this.setState({items: this.state.items, showConfirmDialogDel: false});

            mensagemSucesso('item excluido com sucesso!');
        }).catch( error => {
            mensagemErro(error.response.data.titulo);
        });
    }

    render() {
        const confirmaDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return (
            <Card title="Consulta de items">
                <div className="row">
                    <div className="col-lg-12">
                        <FormGroup label="Descrição: *" htmlFor="ImputDesc">
                            <input type="text"
                                className="form-control"
                                placeholder="Digite a descrição do item"
                                maxLength="100"
                                id="ImputDesc"
                                value={this.state.descricao}
                                onChange={e => this.setState({ descricao: e.target.value })} />
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
                            <ItemTable items={this.state.items}
                                actionEdit={this.editar}
                                actionDelete={this.abrirConfirmacaoDeletar}
                                alterarStatus={this.abrirConfirmacaoAlterarStatus} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação" 
                            visible={this.state.showConfirmDialogDel} 
                            style={{ width: '20%' }}
                            footer={confirmaDialogFooter}
                            modal={true} 
                            onHide={() => this.setState({ showConfirmDialogDel: false })}>
                        Confirma a exclusão do item?
                    </Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(ItemCons); 