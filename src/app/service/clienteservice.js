import ApiService from '../apiservice'

import ErroValidacao from '../exception/errovalidacao'

export default class ClienteService extends ApiService{

    constructor(){
        super('/clientes');
    }

    validar(cliente){
        const erros = [];
        
        if (!cliente.nome){
            erros.push('O preenchimento do campo [Nome] é obrigatório.');
        }
        if (!cliente.email){
            erros.push('O preenchimento do campo [E-mail] é obrigatório.');
        }else if (!cliente.email.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$/) &&
                  !cliente.email.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)$/)){
            erros.push('Informe um e-mail válido.');
        }
        if (!cliente.fone){
            erros.push('O preenchimento do campo [Fone] é obrigatório.');
        }
        if (!cliente.cep){
            erros.push('O preenchimento do campo [Cep] é obrigatório.');
        }
        if (!cliente.endereco){
            erros.push('O preenchimento do campo [Endereço] é obrigatório.');
        }
        if (cliente.tpCnpjCpf != 0 && !cliente.cnpjCpf){
            erros.push('O preenchimento do campo [Número do documento] é obrigatório.');
        }  

        if (erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    consultar(ClienteFiltro){
        let filtros = `?nome=${ClienteFiltro.nome}`;

        if (ClienteFiltro.fone){
            filtros = `${filtros}&fone=${ClienteFiltro.fone}`;
        }
        if (ClienteFiltro.email){
            filtros = `${filtros}&email=${ClienteFiltro.email}`;
        }

        return this.get('/by'+ filtros);
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    salvar(cliente){
        return this.post('/', cliente);
    }

    atualizar(cliente){
        return this.put(`/${cliente.id}`, cliente);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }
}