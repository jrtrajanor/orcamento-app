import React from 'react'
import formatter from 'currency-formatter'

export default props => {

    const rows = props.items.map(items => {
        return(
            <tr key={items.id}>
                <td>{items.id}</td>
                <td>{items.descricao}</td>
                <td>{items.tipoItem.descricao}</td>
                <td>{formatter.format(items.vlrVenda, {locale: 'pt-BR'}) }</td>
                <td>
                    <button className="btn btn-primary" 
                            title="Editar"
                            type="button"
                            onClick={(e) => props.actionEdit(items.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                            className="btn btn-danger"
                            onClick={(e) => props.actionDelete(items)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>    
        )
    });

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Valor de venda</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}