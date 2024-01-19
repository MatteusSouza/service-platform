import Menu from './components/menu';
import CustomerList from './components/customerList';
import CustomerForm from './components/customerForm';
import CustomerInfo from './components/customerInfo';
import About from './components/about';
import Panel from './components/default';

import ApiService from './services/ApiService';
import SimulatorService from './services/SimulatorService';
import UserController from './controllers/UserController';

import CustomerViewModel from './viewModel/CustomerViewModel';

const service = DEV_ENV == 'development' 
    ? new SimulatorService() 
    : new ApiService(URL + ':' + PORT);
const userController = new UserController(service);


const customerViewModel = new CustomerViewModel(userController);

const menu = new Menu(['Listar Clientes', 'Novo Cliente', 'Sobre']);
const panel = new Panel(menu.render());
const root = document.getElementById('root');
root.appendChild(panel.render());

//instancia as telas
const customerForm = new CustomerForm(customerViewModel);
const customerInfo = new CustomerInfo(customerViewModel, customerForm);
const customerList = new CustomerList(customerViewModel, customerInfo);
const about = new About();

customerList.onUpdate(async () => {
    return await userController.buscarTodosUsuarios();
});

panel.updatePanel(customerList);

// // Atualiza o componente atual com base na navegação do menu
menu.onNavigate((componentName) => {
    switch(componentName) {
        case 'Listar Clientes':
            panel.updatePanel(customerList);
            break;
        case 'Novo Cliente':
            panel.updatePanel(customerForm);
            break;
        case 'Sobre':
            panel.updatePanel(about);
            break;
    }
});

