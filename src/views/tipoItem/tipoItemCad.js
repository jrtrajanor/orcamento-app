import React from 'react';

import Card from '../../components/card'
import { withRouter } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import FormGroup from '../../components/form-group';
import { mensagemAlerta, mensagemErro, mensagemSucesso } from '../../components/toast';
import tipoItemService from '../../app/service/tipoItemservice'

class tipoItemCad extends React.Component {
    
    state = {
        id: null,
        descricao: "",
        perComissao: 0,
        atualizando: false
    }

    constructor(){
        super();
        this.tipoItemService = new tipoItemService();
    }

    componentDidMount(){
        const params = this.props.match.params;
        
        if (params.id){
            this.tipoItemService.obterPorId(params.id)
                .then( response => {
                    this.setState( {...response.data,  atualizando: true} );

                }).catch(error => {
                    mensagemErro(error.response.data);
                });
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }

    preparaConsultar = () => {
        this.props.history.push('/consulta-tipoitems');
    }

    preparaSalvar = () => {
        
        const tipoItem = this.getDados();

        try{
            this.tipoItemService.validar(tipoItem);
        }catch(erro){
            const msgErro = erro.mensagens;

            msgErro.forEach(msg => { mensagemAlerta(msg) });

            return false;
        }

        if (this.ehNovoCadastro())
            this.salvar(tipoItem);
        else
            this.atualizar(tipoItem);
    }

    getDados = () => {
        const {id, descricao, perComissao} = this.state;
        const tipoItem = {id, descricao, perComissao};

        return tipoItem;
    }

    ehNovoCadastro = () => {
        if (this.state.id){
            return false;
        }
        return true;
    }

    salvar = (tipoItem) => {
        
        this.tipoItemService.salvar(tipoItem).then( response => {
            mensagemSucesso('Tipo de item cadastrado com sucesso!');
            this.props.history.push('/consulta-tipoItems');
        }).catch( error => {
            mensagemErro(error.response.data.titulo);
        });
    }

    atualizar = (tipoItem) => {
        return this.tipoItemService.atualizar(tipoItem)
            .then( response => {
                this.props.history.push('/consulta-tipoItems');
                mensagemSucesso('Tipo de item atualizado com sucesso!');
            }).catch( error => {
                mensagemErro(error.response.data.titulo);
                mensagemErro(error.response.data);
            });
    }

    render() {

        return (
            <Card title="Cadastro de tipo de itens">
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
                        <div className="bs-component">
                            <FormGroup id="inputDesc" label="Descricão *">
                                <input className="form-control"
                                    type="text"
                                    placeholder="Informe a descrição do tipo do item"
                                    maxLength="100"
                                    id="inputDesc"
                                    name="descricao"
                                    value={this.state.descricao}
                                    onChange={this.handleChange} />
                            </FormGroup>
                        </div>    
                    </div>
                </div>
                <div className="row">
                   <div className="col-lg-4">
                        <FormGroup id="inputVlrCusto" label="Percentual de comissão: *">
                            <CurrencyFormat className="form-control text-left"
                                            id="inputPerComissao"
                                            name="perComissao"
                                            prefix={'% '}
                                            thousandSeparator={true} 
                                            decimalScale={"2"}
                                            allowNegative={false}
                                            fixedDecimalScale={true}
                                            allowEmptyFormatting={false}
                                            value={this.state.perComissao} 
                                            onValueChange={(values) => {
                                                const {value} = values;
                                                this.setState({perComissao: value})}}
                                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <button className="btn btn-success"
                            onClick={this.preparaSalvar}>
                            <i className="pi pi-save"></i> {this.state.id ? 'Atualizar' : 'Salvar'} </button>
                        <button className="btn btn-danger"
                            onClick={this.preparaConsultar}>
                            <i className="pi pi-arrow-left"></i> Voltar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(tipoItemCad);