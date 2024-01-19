import ViewModel from "./ViewModel"

const databaseObservers = [];
const currUserObservers = [];
let usersArr = [];
let currUser = null;

class CustomerViewModel extends ViewModel {
    constructor(userController) {
        super(userController);
    }

    async adicionar(
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
            console.log('ViewModel: Adicionar foi chamado');
            await this.userController.adicionarUsuario(       
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
            this.#updateList();
            this.#notifyDatabaseObservers();
        } catch (error) {
            throw new Error("CustomerViewModel in Adicionar.\n" + error);
        }
    }

    async atualizar(
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
            console.log('ViewModel: Atualizar foi chamado');
            await this.userController.editarUsuario(
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
            this.#updateList();
            await this.#updateCurrUser(id);
            this.#notifyDatabaseObservers();
        } catch (error) {
            console.log(error);
            throw new Error("CustomerViewModel in Atualizar.\n" + error);
        }
    }

    buscarTodosUsuarios() {
        console.log('ViewModel: BuscarUsuarios foi chamado');
        this.#updateList();
        return usersArr;
    }

    async deletarUsuario(id) {
        console.log('ViewModel: Deletar foi chamado');
        await this.userController.deletarUsuario(id);
        this.#updateList();
        this.#notifyDatabaseObservers();
    }

    addDatabaseObserver(callback) {
        databaseObservers.push(callback);
    }

    #notifyDatabaseObservers() {
        databaseObservers.forEach((callback) => {
            callback();
        })
    }

    addLoadedUserObserver(callback) {
        currUserObservers.push(callback);
    }

    setCurrentUser(user) {
        console.log("ViewModel: setCurrentUser was called! Value: ", user)
        currUser = user;
        currUserObservers.forEach((callback) => {
            callback();
        })        
    }

    
    getCurrentUser() {
        console.log('ViewModel: getCurrentUser called! Vallue: ',currUser);
        return currUser;
    }

    #updateList() {
        this.userController.buscarTodosUsuarios().then(users => {
            usersArr = users;
        })
        .catch(error => {
            console.error("Erro ao obter usuários:", error);
            usersArr = [];
        });
    }

    async #updateCurrUser(id) {
        const user = await this.userController.buscarUsuario(id);
        this.setCurrentUser(user);
    }
}

export default CustomerViewModel;