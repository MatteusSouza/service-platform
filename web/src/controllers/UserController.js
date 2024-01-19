class UserController {
    constructor(service) {
        this.service = service;
    }

    async adicionarUsuario(nome, idade) {
        try {
            await this.service.adicionarUsuario(nome, idade);
        } catch (error) {
            throw new Error ("UserController in adicionarUsuario.\n"+error)
        }
    }

    async buscarUsuario(nome) {
        const usuario = await this.service.buscarUsuario(nome);
        return usuario;
    }

    async buscarTodosUsuarios() {
        const users = await this.service.buscarTodosUsuarios();
        return users;
    }

    async deletarUsuario(nome) {
        await this.service.deletarUsuario(nome);
        // Pode conter lógica adicional, se necessário
    }

    async editarUsuario(nome, novaIdade) {
        await this.service.editarUsuario(nome, novaIdade);
        // Pode conter lógica adicional, se necessário
    }
}

module.exports = UserController;
