const express = require('express');
const routerProducts = require('./products.js');
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use('/api', routerProducts);

app.get('/', (req, res) => {
    res.sendFile( __dirname +'/index.html');
});

const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});



server.on( "Error", error => console.log(`Error while listening on port ${PORT}: ${error}`) );