import React from 'react';

import moment from "moment";
import CurrencyFormat from 'react-currency-format'
import Card from '../../components/card'
import { withRouter } from 'react-router-dom'
import FormGroup from '../../components/form-group';
import { mensagemAlerta, mensagemErro, mensagemSucesso } from '../../components/toast';
import Checkbox from 'react-checkbox-component'
import ClienteService from '../../app/service/clienteservice'
import CepService from '../../app/service/cepservice'

class ClienteCad extends React.Component {
    
    state = {
        id: null,
        nome: "",
        email: "",
        fone: "",
        dtNascimento: "",
        vendedor: false,
        tpCnpjCpf: 0,
        cnpjCpf: "",
        cep: "",
        endereco: "",
        numero: null,
        atualizando: false,
        tipoDocto: [
                     {id: 0, descricao: "Não informado", tpDocto: "Nao_Informado"},
                     {id: 1, descricao: "CNPJ", tpDocto: "Cnpj"},
                     {id: 2, descricao: "CPF", tpDocto: "Cpf"}
                   ] 
    }

    constructor(){
        super();
        this.clienteService = new ClienteService();
        this.cepService = new CepService();
    }

    componentDidMount(){
        const params = this.props.match.params;

        if (params.id){
            this.clienteService.obterPorId(params.id)
                .then( response => {
                    //this.setState( {...response.data, atualizando: true} );
                    this.setState({id: response.data.id});
                    this.setState({nome: response.data.nome});
                    this.setState({email: response.data.email});
                    this.setState({fone: response.data.fone});
                    this.setState({dtNascimento: response.data.dtNascimento});
                    this.setState({dtNascimento: !this.state.dtNascimento ? '' : moment(this.state.dtNascimento).format('YYYY-MM-DD')});
                    this.setState({vendedor: response.data.vendedor});
                    this.setState({tpCnpjCpf: response.data.tpCnpjCpf});
                    this.setState({cnpjCpf: response.data.cnpjCpf});
                    this.setState({cep: response.data.cep});
                    this.setState({endereco: response.data.endereco});
                    this.setState({numero: response.data.numero});
                    this.setState({atualizando: response.data.atualizando});

                    if (this.state.tpCnpjCpf){
                        let novoArrayB = this.state.tipoDocto.filter(tipos => tipos.tpDocto.toUpperCase() === this.state.tpCnpjCpf.toUpperCase() );

                        novoArrayB.forEach(item => { 
                            this.setState({tpCnpjCpf: item.id});
                        });
                    }    
                    
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
        this.props.history.push('/consulta-clientes');
    }

    preparaSalvar = () => {
        
        const cliente = this.getDados();

        try{
            this.clienteService.validar(cliente);
        }catch(erro){
            const msgErro = erro.mensagens;

            msgErro.forEach(msg => { mensagemAlerta(msg) });

            return false;
        }

        if (this.ehNovoCadastro()){
            this.salvar(cliente);
        }else{
            this.atualizar(cliente);
        }
    }

    getDados = () => {
        const dataNasc = !this.state.dtNascimento ? '' : moment(this.state.dtNascimento).format('YYYY-MM-DD');

        if (this.ehNovoCadastro()){
            return  {nome: this.state.nome,
                     email: this.state.email,
                     fone: this.state.fone,
                     dtNascimento: dataNasc,
                     tpCnpjCpf: this.state.tpCnpjCpf,
                     cnpjCpf: this.state.cnpjCpf,
                     vendedor: this.state.vendedor,
                     cep: this.state.cep,
                     endereco: this.state.endereco,
                     numero: this.state.numero}
        }else{
            //const {id, nome, email, fone, dtNascimento, tpCnpjCpf, cnpjCpf, vendedor, cep, endereco, numero} = this.state;
            //const cliente = {id, nome, email, fone, dataNasc, tpCnpjCpf, cnpjCpf, vendedor, cep, endereco, numero};
            return  {id: this.state.id,
                     nome: this.state.nome,
                     email: this.state.email,
                     fone: this.state.fone,
                     dtNascimento: dataNasc,
                     tpCnpjCpf: this.state.tpCnpjCpf,
                     cnpjCpf: this.state.cnpjCpf,
                     vendedor: this.state.vendedor,
                     cep: this.state.cep,
                     endereco: this.state.endereco,
                     numero: this.state.numero}
        }
    }

    ehNovoCadastro = () => {
        if (this.state.id){
            return false;
        }
        return true;
    }

    salvar = (cliente) => {
        this.clienteService.salvar(cliente).then( response => {
            mensagemSucesso('Cliente cadastrado com sucesso!');
            this.props.history.push('/consulta-clientes');
        }).catch( error => {
            mensagemErro(error.response.data.titulo);
        });
    }

    atualizar = (cliente) => {
        return this.clienteService.atualizar(cliente)
            .then( response => {
                this.props.history.push('/consulta-clientes');
                mensagemSucesso('Cliente atualizado com sucesso');
            }).catch( error => {
                mensagemErro(error.response.data.titulo);
            });
    }

    toggleCheckboxChange = (newVal) => {
        this.setState({ vendedor: newVal });
    }

    handleCep(e) {
        const cep = this.state.cep;

        this.cepService.getByCep(cep).then((res) => {
            let endereco = '';

            if (res.data.logradouro)
                endereco= res.data.logradouro;
            if (res.data.bairro)
                endereco = endereco == '' ? res.data.bairro : endereco + ', '+ res.data.bairro;
            if (res.data.localidade)
                endereco = endereco == '' ? res.data.localidade : endereco + ', '+ res.data.localidade;
            if (res.data.uf)
                endereco = endereco == '' ? res.data.uf : endereco + ', '+ res.data.uf;

          this.setState({endereco: endereco});
        }).catch(erro => {
            mensagemAlerta('O serviço dos correios está temporariamente indisponível, tente novamente mais tarde!');
        })
      }

    render() {

        return (
            <Card title="Cadastro de clientes">
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
                        <FormGroup id="inputNome" label="Nome *">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Informe o nome do cliente"
                                   maxLength="100"
                                   id="inputNome"
                                   name="nome"
                                   value={this.state.nome}
                                   onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">    
                        <FormGroup id="inputEmail" label="E-mail *">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Informe o e-mail do cliente"
                                   maxLength="50"
                                   id="inputEmail"
                                   name="email"
                                   value={this.state.email}
                                   onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">
                        <FormGroup id="inputFone" label="Fone *">
                                <CurrencyFormat className="form-control text-left"
                                            id="inputFone"
                                            name="fone"
                                            placeholder="Informe o telefone do cliente"
                                            format="(##) #####-####" mask="_"
                                            value={this.state.fone} 
                                            onValueChange={(values) => {
                                                const {value} = values;
                                                this.setState({fone: value})}}/>
                        </FormGroup>
                    </div>
                    <div className="col-lg-4">    
                        <FormGroup label="Data Nascimento:" htmlFor="inputDataNasc">
                            <input type="date"
                                   className="form-control"
                                   id="inputDataNasc"
                                   name="dtNascimento"
                                   value={this.state.dtNascimento} 
                                   onChange={this.handleChange}>
                            </input>
                        </FormGroup>
                    </div>
                </div>    
                <div className="row">
                    <div className="col-lg-4">
                        <FormGroup label="Tipo documento: *" htmlFor="inputTpDocumento">
                            <select className="form-control" 
                                    id="inputTpDocumento"
                                    name="tpCnpjCpf"
                                    value={this.state.tpCnpjCpf}
                                    onChange={this.handleChange}>
                                
                                    {this.state.tipoDocto.map(tipos => (<option key={tipos.id} value={tipos.id}>{tipos.descricao}</option>))}
                            </select>
                        </FormGroup>
                    </div>

                    <div className="col-lg-4">
                        <FormGroup label={this.state.tpCnpjCpf != 0 ? 'Documento: *' : 'Documento: '} htmlFor="inputDocumento">
                            <CurrencyFormat className="form-control text-left"
                                            id="inputDocumento"
                                            name="cnpjCpf"
                                            placeholder="Informe o número do documento"
                                            format={this.state.tpCnpjCpf == 1 ? '##.###.###/####-##' : this.state.tpCnpjCpf == 2 ? '###.###.###-##' : ''} mask="_"
                                            value={this.state.cnpjCpf} 
                                            onValueChange={(values) => {
                                                const {value} = values;
                                                this.setState({cnpjCpf: value})}}
                                            disabled={this.state.tpCnpjCpf == 0} />
                         </FormGroup>
                    </div>                    
                    <div className="col-lg-2">
                        <FormGroup htmlFor="chkVendedor">
                            <div className="check-position">
                                <Checkbox id="chkVendedor"
                                          size="small" 
                                          shape="round"
                                          color="blue"
                                          isChecked={this.state.vendedor} 
                                          onChange={this.toggleCheckboxChange} />
                            
                                <label> Vendedor </label>
                            </div>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2">
                        <FormGroup id="inputCep" label="Cep: *">
                            <CurrencyFormat className="form-control text-left"
                                            id="inputCep"
                                            name="cep"
                                            placeholder="Informe o CEP"
                                            format="#####-###" mask="_"
                                            onBlur={ this.handleCep.bind(this) }
                                            value={ this.state.cep } 
                                            onValueChange={(values) => {
                                                const {value} = values;
                                                this.setState({cep: value})}}/>
                        </FormGroup>
                    </div>
                    <div className="col-lg-8">
                        <FormGroup id="inputEndereco" label="Endereço: *">
                                <input className="form-control"
                                    type="text"
                                    placeholder="Informe o endereço do cliente"
                                    maxLength="100"
                                    id="inputEndereco"
                                    name="endereco"
                                    value={this.state.endereco}
                                    onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-lg-2">    
                        <FormGroup id="inputNumero" label="Número:">
                                <input className="form-control"
                                    type="text"
                                    placeholder="Informe o número" 
                                    maxLength="10"
                                    id="inputNumero"
                                    name="numero"
                                    value={this.state.numero}
                                    onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div> 
                <div className="row">
                    <div className="col-lg-6">
                        <button className="btn btn-success"
                            onClick={this.preparaSalvar}>
                            <i className="pi pi-save"></i> Salvar</button>
                        <button className="btn btn-danger"
                            onClick={this.preparaConsultar}>
                            <i className="pi pi-arrow-left"></i> Voltar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ClienteCad);