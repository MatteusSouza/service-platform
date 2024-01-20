import formHTML from './index.html';
import formCSS from './index.css';
import View from '../View';

const element = document.createElement('div');
element.innerHTML = formHTML;
const style = document.createElement('style');
style.innerHTML = formCSS;
document.head.appendChild(style);

const form = element.querySelector('#customer-form');
const btnSend = form.querySelector('button');

const cnpj = form.elements['cnpj'];
const customerName = form.elements['customerName'];
const address = form.elements['address'];
const contactEmail = form.elements['contactEmail'];
const phoneNumber1 = form.elements['phoneNumber1'];
const phoneNumber2 = form.elements['phoneNumber2'];
const personContactName = form.elements['personContactName'];
const personProfession = form.elements['personProfession'];
const monthlyFee = form.elements['monthlyFee'];
const expirationDay = form.elements['expirationDay'];


let edit = false;

class CustomerForm extends View {
    constructor(customerFormViewModel) {
        super(customerFormViewModel);
        this.#createView();
    }

    render() {
        console.log("CustomerForm: rendered!");
        return element;
    }

    async #submit() {
        console.log('\nCustomerForm: Submit was called! Edit mode?', edit);
        try {
            if(!edit) {
                await this.viewModel.adicionar( 
                    cnpj.value,
                    customerName.value,
                    address.value,
                    contactEmail.value,
                    phoneNumber1.value,
                    phoneNumber2.value,
                    personContactName.value,
                    personProfession.value,
                    monthlyFee.value,
                    expirationDay.value
                    );
            }else {
                const id = this.viewModel.getCurrentUser().id;
                await this.viewModel.atualizar(
                    id,
                    cnpj.value,
                    customerName.value,
                    address.value,
                    contactEmail.value,
                    phoneNumber1.value,
                    phoneNumber2.value,
                    personContactName.value,
                    personProfession.value,
                    monthlyFee.value,
                    expirationDay.value
                );
            }
        } catch (error) {
            throw new Error("CustomerForm: can't submit.\n" + error);
        }
    }

    loadUser(user) {
        console.log("CustomerForm: LoadUser was called!");
        edit = true;
        cnpj.disabled = 'true';

        if (cnpj && customerName && address && contactEmail && phoneNumber1) {
            cnpj.value = user.cnpj;
            customerName.value = user.customerName;
            address.value = user.address;
            contactEmail.value = user.contactEmail;
            phoneNumber1.value = user.phoneNumber1;
            phoneNumber2.value = user.phoneNumber2;
            personContactName.value = user.personContactName;
            personProfession.value = user.personProfession;
            monthlyFee.value = user.monthlyFee;
            expirationDay.value = user.expirationDay;
        }

    }

    resetView() {
        console.log("CustomerForm: View reseted!");
        cnpj.value = '';
        customerName.value = '';
        address.value = '';
        contactEmail.value = '';
        phoneNumber1.value = '';
        phoneNumber2.value = '';
        personContactName.value = '';
        personProfession.value = '';
        monthlyFee.value = '';
        expirationDay.value = '';
        
        edit = false;
        cnpj.disabled = null;

        this.#inputResetColor(form);
    }

    #createView() {
        form.querySelectorAll('input').forEach((input) => {
            input.addEventListener('blur', () => {
                if (input.value == '') {
                    input.style.borderColor = 'red';
                }else {
                    input.style.borderColor = '#333';
                }
            });
        })

        btnSend.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("\nCustomerForm: btnSend EventListener has bin notified");

            const msg = edit ? "editado com sucesso!" : "cadastrado com sucesso!"

            if (
                cnpj.value != '' &&
                customerName.value != '' &&
                address.value != '' &&
                contactEmail.value != '' &&
                phoneNumber1.value != ''
                ) {
                    this.#submit().then( res => {
                    alert(`${customerName.value} ${msg}`);
                    
                    if (!edit){
                        this.resetView();
                    }
                    console.log("Still in edit mode?",edit);
                }).catch(error => {
                    alert(`Não foi possivel efetuar a operação!`)
                    console.log("CustomerForm: error.\n",error);
                })
            } else {
                this.#inputVerify(form);
            }
        },false);
    }

    #inputVerify(form) {
        console.log("CustomerForm: inputVerify was called")
        form.querySelectorAll('input').forEach((input) => {
            if(input.classList.value) {
                if (input.value == '') {
                    input.style.borderColor = 'red';
                }else {
                    input.style.borderColor = '#333';
                }
            }
        })
    }

    #inputResetColor(form) {
        form.querySelectorAll('input').forEach((input) => {
            if(input.classList.value) {
                if (input.value == '') {
                    input.style.borderColor = 'black';
                }else {
                    input.style.borderColor = 'black';
                }
            }
        })
    }
}

export default CustomerForm;
