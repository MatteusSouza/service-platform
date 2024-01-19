import defaultHTML from './index.html';
import defaulCSS from './index.css';


const style = document.createElement('style');
style.innerHTML = defaulCSS;
document.head.appendChild(style);

class Panel {
    constructor(menu) {
        this.element = document.createElement('div');
        this.element.innerHTML = defaultHTML;

        const menuContainer = this.element.querySelector('#menu-container');
        menuContainer.appendChild(menu);
        
        this.panel = this.element.querySelector('#panel');
        this.currentComponent = null;
    }

    updatePanel(component) { 
        if (this.currentComponent != null) {
            this.panel.removeChild(this.currentComponent.render());
            this.currentComponent.resetView();
        }
        this.currentComponent = component;
        this.panel.appendChild(this.currentComponent.render());
    }

    render() {
        return this.element;
    }
}

export default Panel;