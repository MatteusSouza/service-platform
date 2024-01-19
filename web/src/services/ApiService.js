const axios = require('axios');
const ServiceInterface = require('./ServiceInterface');

class ApiService extends ServiceInterface {
    constructor(apiBaseUrl) {
        super();
        this.apiBaseUrl = apiBaseUrl;
    }

    async adicionarUsuario(nome, idade) {
        try {
            const user = { nome, idade };
            const response = await axios.post(`${this.apiBaseUrl}/usuarios`, user);
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error.message);
            throw new Error('Falha ao adicionar usuário. Por favor, tente novamente.');
        }
    }

    async buscarUsuario(nome) {
        try {
            const response = await axios.get(`${this.apiBaseUrl}/usuarios?nome=${nome}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error.message);
            throw new Error('Falha ao buscar usuário. Por favor, tente novamente.');
        }
    }

    async buscarTodosUsuarios() {
        try {
            const response = await axios.get(`${this.apiBaseUrl}/usuarios?users}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error.message);
            throw new Error('Falha ao buscar usuário. Por favor, tente novamente.');
        }
    }

    async deletarUsuario(nome) {
        try {
            await axios.delete(`${this.apiBaseUrl}/usuarios/${nome}`);
        } catch (error) {
            console.error('Erro ao deletar usuário:', error.message);
            throw new Error('Falha ao deletar usuário. Por favor, tente novamente.');
        }
    }

    async editarUsuario(nome, novaIdade) {
        try {
            const user = { nome, idade: novaIdade };
            const response = await axios.put(`${this.apiBaseUrl}/usuarios/${nome}`, user);
            return response.data;
        } catch (error) {
            console.error('Erro ao editar usuário:', error.message);
            throw new Error('Falha ao editar usuário. Por favor, tente novamente.');
        }
    }
}

module.exports = ApiService;
