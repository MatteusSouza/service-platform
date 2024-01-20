const axios = require('axios');
const ServiceInterface = require('./ServiceInterface');

class ApiService extends ServiceInterface {
    constructor(apiBaseUrl) {
        super();
        this.apiBaseUrl = apiBaseUrl;
    }

    async adicionarUsuario(cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, 
            personContactName, personProfession, monthlyFee, expirationDay
        ) {
        try {
            const user = { cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, personContactName, personProfession, monthlyFee, expirationDay };
            const response = await axios.post(`${this.apiBaseUrl}/users`, user);
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error.message);
            throw new Error('Falha ao adicionar usuário. Por favor, tente novamente.');
        }
    }

    async buscarUsuario(id) {
        try {
            const response = await axios.get(`${this.apiBaseUrl}/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error.message);
            throw new Error('Falha ao buscar usuário. Por favor, tente novamente.');
        }
    }

    async buscarTodosUsuarios() {
        try {
            const response = await axios.get(`${this.apiBaseUrl}/users?users}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error.message);
            throw new Error('Falha ao buscar usuário. Por favor, tente novamente.');
        }
    }

    async deletarUsuario(id) {
        try {
            await axios.delete(`${this.apiBaseUrl}/users/${id}`);
        } catch (error) {
            console.error('Erro ao deletar usuário:', error.message);
            throw new Error('Falha ao deletar usuário. Por favor, tente novamente.');
        }
    }

    async editarUsuario(id, cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, 
            personContactName, personProfession, monthlyFee, expirationDay
        ) {
        try {
            const user = {id, cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, 
                personContactName, personProfession, monthlyFee, expirationDay
            };
            const response = await axios.put(`${this.apiBaseUrl}/users/${id}`, user);
            return response.data;
        } catch (error) {
            console.error('Erro ao editar usuário:', error.message);
            throw new Error('Falha ao editar usuário. Por favor, tente novamente.');
        }
    }
}

module.exports = ApiService;
