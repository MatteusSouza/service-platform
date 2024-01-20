const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('../src/models/User');

const app = express();
const port = 3001;

const usuarios = [
    new User(
        2,
        "33.010.204/0001-62",
        "Edificio Diamantina",
        "R. Morais e Silva, 72 - Maracanã, Rio de Janeiro - RJ, 20271-031",
        "edificio-diamantina@exemplo.com",
        "2112343344",
        "21912344433",
        "Luana Fernandes",
        "Síndica",
        1233.90,
        10
        ),
    new User(
        4,
        "33.010.204/0001-63",
        "Edificio Cristal",
        "R. Morais e Silva, 72 - Maracanã, Rio de Janeiro - RJ, 20271-031",
        "edificio-cristal@exemplo.com",
        "2112343344",
        "21912344433",
        "Luana Fernandes",
        "Síndica",
        1233.90,
        10
        )
];


app.use(cors());
app.use(bodyParser.json());

app.use(function (req, res, next) {
  console.log(`\n\n${req.method} ${req.url}`)
  console.log('Request body:', req.body)
  var send = res.send
  res.send = function(body) {
    console.log('Response body:', body)
    return send.call(this, body)
  }
  next()
})


/* 
//To add delay to the response
const delay = 200;
app.use(function (req, res, next) {setTimeout(next, delay)})
*/


//adicionar
app.post('/users', (req, res) => {
    const { cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, personContactName, personProfession, monthlyFee, expirationDay } = req.body;
    
    if (!cnpj || !customerName || !address || !contactEmail || !phoneNumber1) {
        return res.status(400).json({ error: "cnpj, customerName, address, contactEmail, phoneNumber, can't be null!" });
    }
    const isUser = buscarCNPJ(cnpj);
    if(isUser) {
        return res.status(400).json({ error: 'Usuario já cadastrado' });
    }

    let id = gerarId();
    const newUser = new User(id, cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, personContactName, personProfession, monthlyFee, expirationDay );
    usuarios.push(newUser);
    
    res.status(201).json(newUser);
});

//Buscar todos os usuarios;
app.get('/users', (req, res) => {
    res.json(usuarios);
});

//Buscar usuario por id
app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const usuario = buscarId(parseInt(id));
    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.json(usuario);
});

//Buscar usuario por cnpj  "/" = "%2F" 
app.get('/users/cnpj/:cnpj', (req, res) => {
    const { cnpj } = req.params;
    const usuario = buscarCNPJ(cnpj);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.json(usuario);
});

app.delete('/users/:id', async(req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(user => user.id === parseInt(id));
    
    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    usuarios.splice(index, 1);

    res.json({ message: 'Usuário removido com sucesso' });
});

app.put('/users/:id', (req, res) => {
    
    const { id } = req.params;
    const { cnpj, customerName, address, contactEmail, phoneNumber1, phoneNumber2, personContactName, personProfession, monthlyFee, expirationDay } = req.body;

    const index = usuarios.findIndex(user => user.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const user = usuarios[index];
    user.cnpj = cnpj;
    user.customerName = customerName;
    user.address = address;
    user.contactEmail = contactEmail;
    user.phoneNumber1 = phoneNumber1;
    user.phoneNumber2 = phoneNumber2;
    user.personContactName = personContactName;
    user.personProfession = personProfession;
    user.monthlyFee = monthlyFee;
    user.expirationDay = expirationDay;    

    res.json(usuarios[index]);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


buscarId = (id) => {
    return usuarios.find(user => user.id === id);
}

buscarCNPJ = (cnpj) => {
    return usuarios.find(user => user.cnpj === cnpj);
}

gerarId = () => {
    let id = usuarios.length +1;
    while (buscarId(id)){
        id +=1;
    }
    return id;
}