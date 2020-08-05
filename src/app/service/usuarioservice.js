import ApiService from '../apiservice'
import ErroValidacao from '../exception/errovalidacao'

class UsuarioService extends ApiService{
    
    constructor(){
        super('/usuarios');
    }

    Listar(){
        return this.get('/listar');
    }

    consultar(usuarioFiltro){
        let filtros = `?nome=${usuarioFiltro.nome}`;

        if (usuarioFiltro.usuario){
            filtros = `${filtros}&usuario=${usuarioFiltro.usuario}`;
        }
        if (usuarioFiltro.email){
            filtros = `${filtros}&email=${usuarioFiltro.email}`;
        }

        return this.get('/by'+ filtros);
    }

    obterPorId(id){
        return this.get(`/${id}`);
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    ListarRoles(){
        return this.get('/permissoes');
    }

    salvar(usuario){
        return this.post('', usuario);
    }

    atualizar(usuario){
        return this.put(`/${usuario.id}/`, usuario);
    }

    validar(usuario){
        const erros = [];

        if (!usuario.nome){
            erros.push("O campo nome é obrigatório.");
        }

        if (!usuario.usuario){
            erros.push("O campo usuário é obrigatório.");
        }

        if (!usuario.fone){
            erros.push("O campo fone é obrigatório.");
        }

        if (!usuario.email){
            erros.push("O campo e-mail é obrigatório.");
        }else if ( !usuario.email.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$/) &&
                   !usuario.email.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)$/)){
            erros.push("Informe um e-mail válido.");
        }

        if (!usuario.senha || !usuario.senhaRepeticao){
            erros.push("Infome a senha duas vezes para validação.");
        }else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push("As senhas não estão iguais.");
        }

       if (erros && erros.length > 0){
            throw new ErroValidacao(erros);
       }
    }
}

export default UsuarioService;