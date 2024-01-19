import ViewModel from "./ViewModel"

const databaseObservers = [];
const currUserObservers = [];
let usersArr = [];
let currUser = null;

class CustomerViewModel extends ViewModel {
    constructor(userController) {
        super(userController);
    }

    async adicionar(nome, idade) {
        try {
            console.log('ViewModel: Adicionar foi chamado');
            await this.userController.adicionarUsuario(nome, idade);
            this.#updateList();
            this.#notifyDatabaseObservers();
        } catch (error) {
            throw new Error("CustomerViewModel in Adicionar.\n" + error);
        }
    }

    async atualizar(nome, idade) {
        console.log('ViewModel: Atualizar foi chamado');
        await this.userController.editarUsuario(nome, idade);
        this.#updateList();
        await this.#updateCurrUser(nome);
        this.#notifyDatabaseObservers();
    }

    buscarTodosUsuarios() {
        console.log('ViewModel: BuscarUsuarios foi chamado');
        this.#updateList();
        return usersArr;
    }

    async deletarUsuario(nome) {
        console.log('ViewModel: Deletar foi chamado');
        await this.userController.deletarUsuario(nome);
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

    async #updateCurrUser(nome) {
        const user = await this.userController.buscarUsuario(nome);
        this.setCurrentUser(user);
    }
}

export default CustomerViewModel;