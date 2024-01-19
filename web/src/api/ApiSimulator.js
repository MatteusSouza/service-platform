import User from '../models/User';
// const User = require('../models/User');

class UserApiSimulator {
    constructor() {
        this.users = [
            new User(
                1,
                "33.010.204/0001-62",
                "Condominio Diamantina",
                "R. Morais e Silva, 72 - Maracanã, Rio de Janeiro - RJ, 20271-031",
                "edificio-diamantina.example@gmail.com",
                "2112343344",
                "21912344433",
                "Luana Fernandes",
                "Síndica",
                1233.90,
                10
            )
        ];
    }

    adicionar(        
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
        const id = this.users.length +1;
        const user = new User(
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
            expirationDay);
        console.log("ApiSimulator: Adicionar called!");

        const isUser = this.buscarCNPJ(user.cnpj);
        console.log(isUser);
        if (isUser) {
            throw new Error(`ApiSimulator: O usuario ${user.cnpj} já está no banco!`);
        }
        this.users.push(user);
        return user
    }

    buscar(id) {
        return this.users.find(user => user.id === id);
    }

    buscarCNPJ(cnpj) {
        return this.users.find(user => user.cnpj === cnpj);
    }

    buscarTodosUsuarios() {
        return this.users;
    }

    deletar(id) {
        const user = this.buscar(id);
        if (!user) {
            throw new Error(`O usuario não está no banco!`)
        }
        const pos = this.users.indexOf(user);
        this.users.splice(pos,1);
    }

    editar(
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
        expirationDay) {
        const user = this.buscar(id);
        if (!user) {
            throw new Error('O usuario não está no banco!');
        }
        // user.idade = novaIdade;
        user.cnpj = cnpj
        user.customerName = customerName;
        user.address = address;
        user.contactEmail = contactEmail;
        user.phoneNumber1 = phoneNumber1;
        user.phoneNumber2 = phoneNumber2;
        user.personContactName = personContactName;
        user.personProfession = personProfession;
        user.monthlyFee = monthlyFee;
        user.expirationDay = expirationDay;
    }
}

export default UserApiSimulator;

// const res = api.adicionar(
//     "33.010.204/0001-62",
//     "Condominio Diamantina",
//     "R. Morais e Silva, 72 - Maracanã, Rio de Janeiro - RJ, 20271-031",
//     "edificio-diamantina.example@gmail.com",
//     "(21)1234-3344",
//     "(21)91234-4433",
//     "Luana Fernandes",
//     "Síndica",
//     1233.90,
//     10);
