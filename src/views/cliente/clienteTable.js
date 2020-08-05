import React from 'react'

export default props => {

    const rows = props.clientes.map(clientes => {
        return(
            <tr key={clientes.id}>
                <td>{clientes.id}</td>
                <td>{clientes.nome}</td>
                <td>{clientes.email}</td>
                <td>{clientes.fone}</td>
                <td>
                    <button className="btn btn-primary" 
                            title="Editar"
                            type="button"
                            onClick={(e) => props.actionEdit(clientes.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                            className="btn btn-danger"
                            onClick={(e) => props.actionDelete(clientes)}>
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
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Fone</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}