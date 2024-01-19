class ServiceInterface {
    async adicionarUsuario(nome, idade) {}
    async buscarUsuario(nome) {}
    async buscarTodosUsuarios() {}
    async deletarUsuario(nome) {}
    async editarUsuario(nome, novaIdade) {}
}

module.exports = ServiceInterface;
