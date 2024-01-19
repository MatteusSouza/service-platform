import menuCSS from './index.css';

class Menu {
    constructor(options) {
        this.element = document.createElement('nav');
        this.element.setAttribute('id','menu');
        this.buttons = options; // this.buttons = ['lista', 'cadastro', 'sobre'];
    }

    onNavigate(callback) {
        this.callback = callback;
    }

    render() {
        const ul = document.createElement('ul');
        this.buttons.forEach((buttonName) => {
            const button = document.createElement('button');
            const li = document.createElement('li');

            button.innerText = buttonName;
            button.onclick = () => this.callback(buttonName);
            
            button.setAttribute('class', 'buttonMenu')

            li.appendChild(button);
            ul.appendChild(li);
        });
        this.element.appendChild(ul);

        // Aplica os estilos do arquivo CSS
        const style = document.createElement('style');
        style.innerHTML = menuCSS;
        document.head.appendChild(style);
        
        return this.element;
    }
}

export default Menu;