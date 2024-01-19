const ServiceInterface = require('./ServiceInterface');
const Simulator = require('../api/ApiSimulator').default;
const User = require('../models/User');

class SimulatorService extends ServiceInterface {
    constructor() {
        super();
        this.simulator = new Simulator();
    }

    adicionarUsuario(
        cnpj,
        customerName,
        address,
        contactEmail,
        phoneNumber1,
        phoneNumber2,
        personContactName,
        personProfession,
        monthlyFee,
        expirationDay
        ) {
        try {
            this.simulator.adicionar(
                cnpj,
                customerName,
                address,
                contactEmail,
                phoneNumber1,
                phoneNumber2,
                personContactName,
                personProfession,
                monthlyFee,
                expirationDay);
        } catch (error) {
            throw new Error("SimulatorService in adicionarUsuario.\n" + error);
        }
    }

    buscarUsuario(id) {
        return this.simulator.buscar(id);
    }

    buscarUsuarioByCNPJ(cnpj) {
        return this.simulator.buscarCNPJ(cnpj);
    }

    buscarTodosUsuarios() {
        const users = this.simulator.buscarTodosUsuarios();
        return users;
    }

    deletarUsuario(id) {
        this.simulator.deletar(id);
    }

    editarUsuario(
        id, 
        cnpj,
        customerName,
        address,
        contactEmail,
        phoneNumber1,
        phoneNumber2,
        personContactName,
        personProfession,
        monthlyFee,
        expirationDay
        ) {

        try {
            this.simulator.editar(
                id, 
                cnpj,
                customerName,
                address,
                contactEmail,
                phoneNumber1,
                phoneNumber2,
                personContactName,
                personProfession,
                monthlyFee,
                expirationDay
                );
        } catch (error) {
            throw new Error("SimulatorService in editarUsuario.\n" + error);
        }
    }
}

module.exports = SimulatorService;
