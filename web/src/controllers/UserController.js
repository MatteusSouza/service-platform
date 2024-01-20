class UserController {
    constructor(service) {
        this.service = service;
    }

    async adicionarUsuario( cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, 
            personContactName, personProfession, monthlyFee, expirationDay
        ) {
        try {
            await this.service.adicionarUsuario( cnpj, customerName, address, contactEmail, 
                phoneNumber1, phoneNumber2, personContactName, personProfession, monthlyFee, expirationDay
            );
        } catch (error) {
            throw new Error ("UserController in adicionarUsuario.\n"+error)
        }
    }

    async buscarUsuario(id) {
        const usuario = await this.service.buscarUsuario(id);
        return usuario;
    }

    async buscarUsuarioByCNPJ(cnpj) {
        const usuario = await this.service.buscarUsuarioByCNPJ(cnpj);
        return usuario;
    }


    async buscarTodosUsuarios() {
        const users = await this.service.buscarTodosUsuarios();
        return users;
    }

    async deletarUsuario(id) {
        await this.service.deletarUsuario(id);
    }

    async editarUsuario( id, cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, 
            personContactName, personProfession, monthlyFee, expirationDay
        ) {

        try {
            await this.service.editarUsuario( id, cnpj, customerName, address, contactEmail, 
                phoneNumber1, phoneNumber2, personContactName, personProfession, monthlyFee, expirationDay
            );
        } catch (error) {
            throw new Error ("UserController in editarUsuario.\n"+error);
        }
    }
}

module.exports = UserController;
