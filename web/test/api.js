const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('../src/models/User');

const app = express();
const port = 3001;

const usuarios = [
    new User("Joao",43), 
    new User("Maria",32),
    new User("Joaquina",61), 
    new User("Ricardo",33),
    new User("José",21), 
    new User("Paula",18),
    new User("Carla",21), 
    new User("Americo",32),
    new User("Barbara",22), 
    new User("Stephanie",32),
    new User("Victoria",27), 
    new User("Leonardo",32),
    new User("Marie",24), 
    new User("Antonieta",31),
];


app.use(cors());
app.use(bodyParser.json());

app.post('/usuarios', (req, res) => {
    const { nome, idade } = req.body;

    if (!nome || !idade) {
        return res.status(400).json({ error: 'Nome e idade são obrigatórios' });
    }
    const isUser = buscar(nome);
    if(isUser) {
        return res.status(400).json({ error: 'Usuario já cadastrado' });
    }

    const novoUsuario = { nome, idade };
    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario);
});

app.get('/usuarios', (req, res) => {
    const { nome } = req.query;

    if (nome) {
        const usuario = usuarios.find(user => user.nome === nome);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        return res.json(usuario);
    }

    res.json(usuarios);
});

app.delete('/usuarios/:nome', (req, res) => {
    const { nome } = req.params;
    const index = usuarios.findIndex(user => user.nome === nome);

    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    usuarios.splice(index, 1);

    res.json({ message: 'Usuário removido com sucesso' });
});

app.put('/usuarios/:nome', (req, res) => {
    const { nome } = req.params;
    const { idade } = req.body;

    const index = usuarios.findIndex(user => user.nome === nome);

    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    usuarios[index].idade = idade;

    res.json(usuarios[index]);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

buscar = (nome) => {
    return usuarios.find(user => user.nome === nome);
}