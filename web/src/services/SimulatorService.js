const ServiceInterface = require('./ServiceInterface');
const Simulator = require('../api/ApiSimulator').default;
const User = require('../models/User');

class SimulatorService extends ServiceInterface {
    constructor() {
        super();
        this.simulator = new Simulator();
    }

    adicionarUsuario(nome, idade) {
        try {
            const user = new User(nome, idade);
            this.simulator.adicionar(user);
        } catch (error) {
            throw new Error("SimulatorService in adicionarUsuario.\n" + error);
        }
    }

    buscarUsuario(nome) {
        return this.simulator.buscar(nome);
    }

    buscarTodosUsuarios() {
        const users = this.simulator.buscarTodosUsuarios();
        return users;
    }

    deletarUsuario(nome) {
        this.simulator.deletar(nome);
    }

    editarUsuario(nome, novaIdade) {
        this.simulator.editar(nome, novaIdade);
    }
}

module.exports = SimulatorService;
