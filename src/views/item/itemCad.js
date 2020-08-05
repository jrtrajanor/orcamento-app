import React from 'react';

import Card from '../../components/card'
import { withRouter } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import FormGroup from '../../components/form-group';
import { mensagemAlerta, mensagemErro, mensagemSucesso } from '../../components/toast';
import itemService from '../../app/service/itemservice'
import tipoItemService from '../../app/service/tipoItemservice'

class itemCad extends React.Component {
    
    state = {
        id: null,
        descricao: '',
        vlrCusto: 0,
        vlrVenda: 0,
        atualizando: false,
        idTipoItem: null,
        tipoItem: []
    }

    constructor(){
        super();
        this.itemService = new itemService();
        this.tipoItemService = new tipoItemService();
    }

    componentDidMount(){
        const params = this.props.match.params;
        
        if (params.id){
            this.itemService.obterPorId(params.id)
                .then( response => {
                    this.setState( {id: response.data.id} );
                    this.setState( {descricao: response.data.descricao} );
                    this.setState( {vlrCusto: response.data.vlrCusto} );
                    this.setState( {vlrVenda: response.data.vlrVenda} );
                    this.setState( {idTipoItem: response.data.tipoItem.id} );
                    this.setState( {atualizando: true} );
                        
                }).catch(error => {
                    mensagemErro(error.response.data);
                });
        }

        this.carregarTipos();
    }

    carregarTipos = () => {
        this.tipoItemService.listar().then( response => {
            this.setState({ tipoItem: response.data });
          
         }).catch(error => {
            mensagemErro(error.response.data);
         });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    }

    preparaConsultar = () => {
        this.props.history.push('/consulta-items');
    }

    preparaSalvar = () => {
        
        const item = this.getDados();

        try{
            this.itemService.validar(item);
        }catch(erro){
            const msgErro = erro.mensagens;

            msgErro.forEach(msg => { mensagemAlerta(msg) });

            return false;
        }

        this.salvar(item);
    }

    getDados = () => {
        if (this.ehNovoCadastro()){
            const item = {
                            descricao: this.state.descricao,
                            vlrCusto: this.state.vlrCusto,
                            vlrVenda: this.state.vlrVenda,
                            tipoItem:{
                                id: this.state.idTipoItem
                            }
                        }

            return item;
        }
        else{
            const item = {
                id: this.state.id,
                descricao: this.state.descricao,
                vlrCusto: this.state.vlrCusto,
                vlrVenda: this.state.vlrVenda,
                tipoItem:{
                    id: this.state.idTipoItem
                }
            }

            return item;
        }
    }

    ehNovoCadastro = () => {
        if (this.state.id){
            return false;
        }
        return true;
    }

    salvar = (item) => {
console.log(item)        

        this.itemService.salvar(item).then( response => {
            mensagemSucesso('item cadastrado com sucesso!');
            this.props.history.push('/consulta-items');
        }).catch( error => {
            mensagemErro(error.response.data.titulo);
        });
    }

    render() {

        return (
            <Card title="Cadastro de Itens">
                <div className="row">
                    <div className="col-lg-1">
                        <div className="bs-component">
                            <FormGroup label="Código" htmlFor="inputId">
                                <input className="form-control"
                                    type="text"
                                    id="inputId"
                                    name="nome"
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
                                    placeholder="Informe a descrição do item"
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
                        <FormGroup label="Tipo: *" htmlFor="inputTipo">
                            <select className="form-control" 
                                    id="inputTipo"
                                    name="idTipoItem"
                                    value={this.state.idTipoItem}
                                    onChange={this.handleChange}>
                                <option value="0">Selecione uma opção</option>
                                    {this.state.tipoItem.map(tipos => (<option key={tipos.id} value={tipos.id}>{tipos.descricao}</option>))}
                            </select>
                        </FormGroup>
                   </div>
                   <div className="col-lg-4">
                        <FormGroup id="inputVlrCusto" label="Valor de custo: *">
                            <CurrencyFormat className="form-control text-left"
                                            id="inputVlrCusto"
                                            name="vlrCusto"
                                            prefix={'R$ '}
                                            thousandSeparator={true} 
                                            decimalScale={"2"}
                                            allowNegative={false}
                                            fixedDecimalScale={true}
                                            allowEmptyFormatting={false}
                                            value={this.state.vlrCusto} 
                                            onValueChange={(values) => {
                                                const {value} = values;
                                                this.setState({vlrCusto: value})}}
                                            />
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">
                        <FormGroup id="inputVlrVenda" label="Valor de venda: *">
                            <CurrencyFormat className="form-control text-left"
                                            id="inputVlrVenda"
                                            name="vlrVenda"
                                            prefix={'R$ '}
                                            thousandSeparator={true} 
                                            //decimalSeparator={","}
                                            decimalScale={"2"}
                                            allowNegative={false}
                                            fixedDecimalScale={true}
                                            allowEmptyFormatting={false}
                                            value={this.state.vlrVenda} 
                                            onValueChange={(values) => {
                                                //const {formattedValue, value} = values;
                                                const {value} = values;
                                                this.setState({vlrVenda: value})}}
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

export default withRouter(itemCad);