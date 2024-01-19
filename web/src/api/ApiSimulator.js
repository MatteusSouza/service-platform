import User from '../models/User';

class UserApiSimulator {
    constructor() {
        this.users = [
            new User("Joao",43), 
            new User("Maria",32),
            new User("Joaquina",61), 
            new User("Ricardo",33),
            new User("José",21), 
            new User("Paula",18),
            new User("Carla",21), 
            new User("Americo",32),
            new User("Barbara",22), 
            new User("Stephanie",32),
            new User("Victoria",27), 
            new User("Leonardo",32),
            new User("Marie",24), 
            new User("Antonieta",31),
        ];
    }

    adicionar(user) {
        console.log("ApiSimulator: Adicionar called!")
        const isUser = this.buscar(user.nome);
        if (isUser) {
            throw new Error(`ApiSimulator: O usuario ${user.nome} já está no banco!`);
        }
        this.users.push(user); 
    }

    buscar(nome) {
        return this.users.find(user => user.nome === nome);
    }

    buscarTodosUsuarios() {
        return this.users;
    }

    deletar(nome) {
        const user = this.buscar(nome)
        if (!user) {
            throw new Error(`O usuario ${nome} Não está no banco!`)
        }
        const pos = this.users.indexOf(user);
        this.users.splice(pos,1);
    }

    editar(nome, novaIdade) {
        const user = this.buscar(nome);
        if (!user) {
            throw new Error('O usuario não está no banco!');
        }
        user.idade = novaIdade;
    }
}

export default UserApiSimulator;
