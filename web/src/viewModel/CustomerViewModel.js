import ViewModel from "./ViewModel"

const databaseObservers = [];
const currUserObservers = [];
let currUser = null;

class CustomerViewModel extends ViewModel {
    constructor(userController) {
        super(userController);
    }

    async adicionar(cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, 
        personContactName, personProfession, monthlyFee, expirationDay) {
        try {
            console.log('ViewModel: Adicionar was called');
            await this.userController.adicionarUsuario(       
                cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, 
                personContactName, personProfession, monthlyFee, expirationDay
            );
            
            this.#notifyDatabaseObservers();
        } catch (error) {
            throw new Error("CustomerViewModel in Adicionar.\n" + error);
        }
    }

    async atualizar(id, cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, 
        personContactName, personProfession, monthlyFee, expirationDay) {

        try {
            console.log('ViewModel: Atualizar was called');
            
            await this.userController.editarUsuario(
                id, cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, 
                personContactName, personProfession, monthlyFee, expirationDay
            );
            
            await this.#updateCurrUser(id);
            this.#notifyDatabaseObservers();

        } catch (error) {
            console.log(error);
            throw new Error("CustomerViewModel in Atualizar.\n" + error);
        }
    }

    async buscarTodosUsuarios() {
        try {
            const users = await this.userController.buscarTodosUsuarios()
            return users;
        } catch (error) {
            return [];
        }
    }

    async deletarUsuario(id) {
        console.log('ViewModel: Deletar was called');
        await this.userController.deletarUsuario(id);
        this.#notifyDatabaseObservers();
    }

    addDatabaseObserver(callback) {
        databaseObservers.push(callback);
        this.#notifyDatabaseObservers();
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
        console.log('ViewModel: getCurrentUser was called! Vallue: ',currUser);
        return currUser;
    }

    async #updateCurrUser(id) {
        const user = await this.userController.buscarUsuario(id);
        this.setCurrentUser(user);
    }
}

export default CustomerViewModel;