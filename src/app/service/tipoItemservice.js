import ApiService from '../apiservice'

import ErroValidacao from '../exception/errovalidacao'

export default class TipoItemService extends ApiService{

    constructor(){
        super('/tipoItem');
    }

    validar(tipoItem){
        const erros = [];

        if (!tipoItem.descricao){
            erros.push('O preenchimento do campo [Descrição] é obrigatório.');
        }
        if (!tipoItem.perComissao){
            erros.push('O preenchimento do campo [Comissão] é obrigatório.');
        }else{
            if (tipoItem.perComissao < 0){
                erros.push('A comissão não pode ser negativa.');
            }
        }

        if (erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    listar(){
        return this.get('');
    }

    consultar(tipoItemFiltro){
        let filtros = `?descricao=${tipoItemFiltro.descricao}`;

        return this.get('/by'+ filtros);
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    salvar(tipoItem){
        return this.post('/', tipoItem);
    }

    atualizar(tipoItem){
console.log(tipoItem.id)        
console.log(tipoItem)        
        return this.put(`/${tipoItem.id}`, tipoItem);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }
}