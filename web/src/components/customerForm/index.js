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
const inputNome = form.elements['nome'];
const inputIdade = form.elements['idade'];

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
        console.log('\nCustomerForm: Submit called!');
        try {
            if(!edit) {
                console.log("CustomerForm: Submit: It's not an edit!");
                await this.viewModel.adicionar(inputNome.value, inputIdade.value);
            }else {
                console.log("CustomerForm: Submit: It's an Edit!")
                await this.viewModel.atualizar(inputNome.value, inputIdade.value);
            }
        } catch (error) {
            throw new Error("CustomerForm: can't submit.\n",error);
        }
    }

    loadUser(nome, idade, isEdit) {
        if (isEdit == undefined && isEdit == null) {
            edit = true
        }else {
            edit = isEdit;
        }

        if (nome != undefined && nome != null && idade != undefined && idade != null ) {
            inputNome.value = nome;
            inputIdade.value = idade;
        }
    }

    resetView() {
        console.log("CustomerForm: View reseted!");
        inputNome.value = '';
        inputIdade.value = '';
        edit = false;
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

            if (inputNome.value != '' && inputIdade.value != '') {
                this.#submit().then( res => {
                    alert(`${inputNome.value} ${msg}`)
                    this.resetView();
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
        console.log("CustomerForm: inputVerify called")
        form.querySelectorAll('input').forEach((input) => {
            if (input.value == '') {
                input.style.borderColor = 'red';
            }else {
                input.style.borderColor = '#333';
            }
        })
    }
}

export default CustomerForm;
