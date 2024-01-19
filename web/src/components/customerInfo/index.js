import infoHTML from './index.html';
import infoCSS from './index.css';
import View from '../View'


const element = document.createElement('div');
element.setAttribute('id', 'customer-info');
element.innerHTML = infoHTML;

const btnEdit = element.querySelector('#btn-customer-edit');
const btnDel = element.querySelector('#btn-customer-delete');
const textGroup = element.querySelector('#text-group');
const formGroup = element.querySelector('#form-group');

const style = document.createElement('style');
style.innerHTML = infoCSS;
document.head.appendChild(style);

let custForm;
let deleteCustomer;
let id = null;


class CustomerInfo extends View{
    constructor(CustomerInfoViewModel, customerForm) {
        super(CustomerInfoViewModel);
        custForm = customerForm;        
        this.#createView();
    }

    render() {
        console.log("CustomerInfo: Rendered!");
        return element;
    }

    onDelete(callback) {
        deleteCustomer = (id) => {
            this.viewModel.deletarUsuario(id);
            callback();
        }
    }

    updateView(user) {
        element.querySelector("#form-group").appendChild(custForm.render());
        element.querySelector("#customer-cnpj").textContent = `${user.cnpj}`;
        element.querySelector("#customer-name").textContent = `${user.customerName}`;
        element.querySelector("#customer-address").textContent = `${user.address}`;
        element.querySelector("#customer-contactEmail").textContent = `${user.contactEmail}`;
        element.querySelector("#customer-phoneNumber1").textContent = `${user.phoneNumber1}`;
        element.querySelector("#customer-phoneNumber2").textContent = `${user.phoneNumber2}`;
        element.querySelector("#customer-personContactName").textContent = `${user.personContactName}`;
        element.querySelector("#customer-personProfession").textContent = `${user.personProfession}`;
        element.querySelector("#customer-monthlyFee").textContent = `${user.monthlyFee}`;
        element.querySelector("#customer-expirationDay").textContent = `${user.expirationDay}`;
        custForm.loadUser(user, true);
    }

    #editView() {
        btnDel.style.display = 'block';
        formGroup.style.display = 'block';
        textGroup.style.display = 'none'
        element.querySelector('#btn-customer-edit').textContent = "Cancelar"
    }

    #infoView() {
        btnDel.style.display = 'none';
        formGroup.style.display = 'none';
        textGroup.style.display = 'block';
        element.querySelector('#btn-customer-edit').textContent = "Editar"
    }

    resetView(){
        this.#infoView();
        custForm.resetView();
    }

    #createView() {
        btnDel.style.display = 'none';
        formGroup.style.display = 'none';

        this.viewModel.addDatabaseObserver(() => {
            console.log('CustomerInfo: Notified by databaseObserver!');
        });

        this.viewModel.addLoadedUserObserver( ()=> {
            console.log('CustomerInfo: addLoadedUserObserver called');
            const user = this.viewModel.getCurrentUser();
            id = user.id;
            console.log('CustomerInfo: currentUser ',user);
            this.updateView(user);
            this.#infoView();
        });


        btnEdit.addEventListener('click', () => {
            if (btnEdit.textContent === 'Editar') {
                this.#editView();
            } else {
                this.#infoView();
            }
        });

        btnDel.addEventListener('click', () => {
            console.log('Delete click!');
            deleteCustomer(id);
            this.#infoView();
        });
    }

}

export default CustomerInfo;