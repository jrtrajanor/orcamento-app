import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import TipoItemTable from './tipoItemTable'

import TipoItemService from '../../app/service/tipoItemservice'
import { mensagemErro, mensagemAlerta, mensagemSucesso } from '../../components/toast'
import {Dialog} from 'primereact/dialog'
import {Button} from 'primereact/button'

class TipoItemCons extends React.Component {

    state = {
        id: null,
        descricao: "",
        perComissao: null,
        tipoItems: []
    }

    constructor(props) {
        super(props);

        this.tipoItemService = new TipoItemService();
    }

    consultar = () => {

        const filtros = {
            id: this.state.id,
            descricao: this.state.descricao,
            showConfirmDialogDel: false,
            itemDeletar: {}
        }

        this.tipoItemService.consultar(filtros).then( response => {
                const lista = response.data;

                if (lista.length < 1){
                    mensagemAlerta('Nenhum tipo de item foi localizado.');
                    return false;
                }

                this.setState({tipoItems: lista});

            }).catch( error => {
                mensagemErro(error.response.data);
            });
    }
    
    editar = (id) => {
        this.props.history.push(`cadastro-tipoitems/${id}`);
    }

    prepararNovoCadastro = () => {
        this.props.history.push('cadastro-tipoitems');
    }

    abrirConfirmacaoDeletar = (item) => {
        this.setState({showConfirmDialogDel: true, itemDeletar: item});
    }

    cancelarDelecao = () => {
        this.setState({showConfirmDialogDel: false, itemDeletar: {}});
    }

    deletar = () => {
        this.tipoItemService.deletar(this.state.itemDeletar.id).then( response => {
            const index = this.state.tipoItems.indexOf(this.state.itemDeletar);
            this.state.tipoItems.splice(index, 1);
            this.setState({tipoItems: this.state.tipoItems, showConfirmDialogDel: false});

            mensagemSucesso('Tipo de item excluido com sucesso!');
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
            <Card title="Consulta de tipo de item">
                <div className="row">
                    <div className="col-lg-12">
                        <FormGroup label="Descrição: *" htmlFor="ImputDesc">
                            <input type="text"
                                className="form-control"
                                placeholder="Digite a descrição do tipo do item"
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
                            <TipoItemTable tipoItems={this.state.tipoItems}
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
                        Confirma a exclusão do tipo de item?
                    </Dialog>
                </div>
            </Card>
        )
    }

}

export default withRouter(TipoItemCons); 