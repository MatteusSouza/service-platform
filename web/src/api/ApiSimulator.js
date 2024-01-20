import User from '../models/User';
// const User = require('../models/User');

class UserApiSimulator {
    constructor() {
        this.users = [
            new User(
                2,
                "33.010.204/0001-62",
                "Edificio Diamantina",
                "R. Morais e Silva, 72 - Maracanã, Rio de Janeiro - RJ, 20271-031",
                "edificio-diamantina@exemplo.com",
                "2112343344",
                "21912344433",
                "Luana Fernandes",
                "Síndica",
                1233.90,
                10
                ),
            new User(
                4,
                "33.010.204/0001-63",
                "Edificio Cristal",
                "R. Morais e Silva, 72 - Maracanã, Rio de Janeiro - RJ, 20271-031",
                "edificio-cristal@exemplo.com",
                "2112343344",
                "21912344433",
                "Luana Fernandes",
                "Síndica",
                1233.90,
                10
                )
        ];
    }

    adicionar(cnpj,customerName,address,contactEmail,phoneNumber1,phoneNumber2,personContactName,personProfession,monthlyFee,expirationDay) {
        console.log("ApiSimulator: Adicionar was called!");
        
        if(!cnpj || !customerName || !address || !contactEmail || !phoneNumber1) {
            throw new Error(`ApiSimulator: cnpj, customerName, address, contactEmail, phoneNumber, can't be null!`);
        }
        const id = this.#gerarId();
        const user = new User(id,cnpj,customerName,address,contactEmail,phoneNumber1,phoneNumber2,personContactName,personProfession,monthlyFee,expirationDay);

        const isUser = this.buscarCNPJ(user.cnpj);
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

    editar(id, cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, personContactName, personProfession, monthlyFee, expirationDay) {
        const user = this.buscar(id);
        if (!user) {
            throw new Error('O usuario não está no banco!');
        }
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


    #gerarId = () => {
        let id = this.users.length +1;
        while (this.users.find(user => user.id === id)){
            id +=1;
        }
        return id;
    }

}




export default UserApiSimulator;
