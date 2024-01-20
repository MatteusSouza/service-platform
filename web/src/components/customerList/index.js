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
        this.#updateList()
        return element;
    }

    resetView(){
        console.log("CustomerList: resetView was called!");
        custInfo.resetView();
        infoContainer.style.display = 'none';
    }

    #updateList() {
        this.viewModel.buscarTodosUsuarios().then(users => {
            this.#populateDivList(users);
        });
    }

    #updateListContainer(list) {
        const listContainer = element.querySelector('#list-container');
        if (currentList !== null) {
            listContainer.removeChild(currentList);
        }
        currentList = list;
        listContainer.appendChild(currentList);
    }

    #populateDivList(data) {
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
                console.log("Clicked on: "+ customer.customerName);
                infoContainer.querySelector('.btn-info').textContent = title;
                infoContainer.style.display = 'block';
                list.style.display = 'none';
                this.viewModel.setCurrentUser(customer);
            };

            listItem.appendChild(btnOpenInfo);
            list.appendChild(listItem);
        });

        this.#updateListContainer(list);
    }

    #createView() {
        element.querySelector('#info-container').style.display = 'none';
        
        //closeInfo
        infoContainer.querySelector('.btn-info').onclick = () => {
            infoContainer.style.display = 'none';
            list.style.display = 'block';
            this.#updateList()
        }
        
        this.viewModel.addDatabaseObserver(() => {
            console.log('CustomerList: Notified by databaseObserver!');
            
            const currUser = this.viewModel.getCurrentUser();
            if (currUser) {
                const title = `${this.viewModel.getCurrentUser().customerName} | ${this.viewModel.getCurrentUser().customerName}`;
                infoContainer.querySelector('.btn-info').textContent = title;
            }
        });

        custInfo.onDelete(() => {
            infoContainer.style.display = 'none';
            list.style.display = 'block';
            this.#updateList();
        });

        infoView.appendChild(custInfo.render());
    }

}

export default CustomerList;

