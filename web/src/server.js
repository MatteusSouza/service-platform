const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/src', express.static(path.join(__dirname)));

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.path}`);
    next();
});

app.listen(3000, () => console.log('Server is running on port 3000'));