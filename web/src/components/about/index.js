import View from '../View';

class About extends View {
    constructor() {
        super();
        this.element = document.createElement('div');
    }

    render() {
        // Carrega o conteúdo do arquivo HTML
        this.element.innerHTML = `
            <!-- Conteúdo do arquivo index.html -->
            <div id="about">
                <p id='text'>
                    Breve explicação sobre a abordagem utilizada no projeto.
                </p>
            <button id="toggleBtn">Esconder</button>
            </div>
        
        `;

        // Aplica os estilos do arquivo CSS
        const style = document.createElement('style');
        style.innerHTML = `
            #about {
                max-width: 400px;
                margin: 20px auto;
            }
            
            #toggleBtn {
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);

        this.element.querySelector('#toggleBtn').addEventListener('click', () => {
            const aboutElement = this.element.querySelector('#text');
            if (aboutElement.style.display === 'none') {
                aboutElement.style.display = 'block';
                this.element.querySelector('#toggleBtn').textContent = "Esconder"
                
            } else {
                aboutElement.style.display = 'none';
                this.element.querySelector('#toggleBtn').textContent = "Mostrar"
            }
        });

        return this.element;
    }
}

export default About;
