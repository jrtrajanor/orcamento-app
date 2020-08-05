import ApiService from '../apiservice'

import ErroValidacao from '../exception/errovalidacao'

export default class ItemService extends ApiService{

    constructor(){
        super('/items');
    }

    validar(item){
        const erros = [];
        
        if (!item.descricao){
            erros.push('O preenchimento do campo [Descrição] é obrigatório.');
        }
        if (!item.vlrCusto){
            erros.push('O preenchimento do campo [Valor de custo] é obrigatório.');
        }else{
            if (!item.vlrCusto < 0){
                erros.push('O preenchimento do campo [Valor de custo] não pode ser negativo.');
            }    
        }
        if (!item.vlrVenda){
            erros.push('O preenchimento do campo [Valor de venda] é obrigatório.');
        }else{
            if (!item.vlrVenda < 0){
                erros.push('O preenchimento do campo [Valor de venda] não pode ser negativo.');
            }
        }
        if (item.vlrCusto && item.vlrVenda){
            if (item.vlrCusto > item.vlrVenda){
                erros.push('O Valor de custo não pode ser maior que o preço de venda.');
            }  
        }

        if (item.tipoItem.id <= 0){
            erros.push('O preenchimento do campo [Tipo do item] é obrigatório.');
        }

        if (erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    consultar(ItemFiltro){
        let filtros = `?descricao=${ItemFiltro.descricao}`;

        return this.get('/by'+ filtros);
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    salvar(item){
        return this.post('/', item);
    }

    atualizar(item){
        return this.put(`/${item.id}`, item);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }
}