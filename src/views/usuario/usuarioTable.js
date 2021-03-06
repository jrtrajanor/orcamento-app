import React from 'react'
import { Table } from 'react-bootstrap'

export default props => {

    const rows = props.usuarios.map(usuarios => {
        return(
            <tr key={usuarios.id}>
                <td>{usuarios.id}</td>
                <td>{usuarios.nome}</td>
                <td>{usuarios.usuario}</td>
                <td>{usuarios.email}</td>
                <td>
                    <button className="btn btn-primary" 
                            title="Editar"
                            type="button"
                            onClick={(e) => props.actionEdit(usuarios.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                            className="btn btn-danger"
                            onClick={(e) => props.actionDelete(usuarios)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>    
        )
    });

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Usuário</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    )
}