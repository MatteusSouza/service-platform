import listHTML from './index.html';
import listCSS from './index.css';
import View from '../View';

const element = document.createElement('div');
element.setAttribute('id', 'customer-list');
element.innerHTML = listHTML;

const infoContainer = element.querySelector('#info-container');
const infoView = element.querySelector('#info-view');
const style = document.createElement('style');
style.innerHTML = listCSS;
document.head.appendChild(style);

let currentList = null;
let custInfo;

class CustomerList extends View {
    constructor(customerListViewModel, customerInfo) {
        super(customerListViewModel);
        custInfo = customerInfo;
        this.#createView();
    }

    render() {
        console.log("CustomerList: Rendered!");
        this.getUsers();
        return element;
    }

    resetView(){
        custInfo.resetView();
        infoContainer.style.display = 'none';
    }

    onUpdate(getUsers) {
        this.getUsers = () => {
            getUsers().then(users => {
                this.#populate(users);
            })
            .catch(error => {
                console.error("Erro ao obter usuários:", error);
                this.#populate([]);
            });
        }
    }

    #updateList(list) {
        const listContainer = element.querySelector('#list-container');
        if (currentList !== null) {
            listContainer.removeChild(currentList);
        }
        currentList = list;
        listContainer.appendChild(currentList);
    }

    #populate(data) {
        const list = document.createElement('div');
        list.setAttribute('id','list');

        const customers = data.slice().reverse();

        customers.forEach((customer) => {
            const title = `${customer.customerName} | ${customer.cnpj}`;
            const listItem = document.createElement('div');
            const btnOpenInfo = document.createElement('button');
            
            listItem.setAttribute('class', 'list-item');
            btnOpenInfo.setAttribute('class','btn-info');

            btnOpenInfo.innerText = title;
            btnOpenInfo.onclick = () => {
                console.log("clicou em: "+ customer.nome);
                infoContainer.querySelector('.btn-info').textContent = title;
                infoContainer.style.display = 'block';
                list.style.display = 'none';
                this.viewModel.setCurrentUser(customer);
            };

            listItem.appendChild(btnOpenInfo);
            list.appendChild(listItem);
        });

        this.#updateList(list);
    }

    #createView() {
        element.querySelector('#info-container').style.display = 'none';
        infoContainer.querySelector('.btn-info').onclick = () => {
            infoContainer.style.display = 'none';
            list.style.display = 'block';
            this.getUsers();
        }
        
        this.viewModel.addDatabaseObserver(() => {
            console.log('CustomerList: Notified by databaseObserver!');
            const title = `${this.viewModel.getCurrentUser().customerName} | ${this.viewModel.getCurrentUser().customerName}`;
            infoContainer.querySelector('.btn-info').textContent = title;
        });

        custInfo.onDelete(() => {
            infoContainer.style.display = 'none';
            list.style.display = 'block';
            // this.getUsers();
        });

        infoView.appendChild(custInfo.render());
    }

    // #
}

export default CustomerList;

