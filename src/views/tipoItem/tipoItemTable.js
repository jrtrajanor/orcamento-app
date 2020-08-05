import React from 'react'
import formatter from 'currency-formatter'

export default props => {

    const rows = props.tipoItems.map(tipoItems => {
        return(
            <tr key={tipoItems.id}>
                <td>{tipoItems.id}</td>
                <td>{tipoItems.descricao}</td>
                <td>{formatter.format(tipoItems.perComissao, {}) } %</td>
                <td>
                    <button className="btn btn-primary" 
                            title="Editar"
                            type="button"
                            onClick={(e) => props.actionEdit(tipoItems.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                            className="btn btn-danger"
                            onClick={(e) => props.actionDelete(tipoItems)}>
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
                    <th scope="col">Comissão</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}