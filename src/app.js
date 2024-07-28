const express = require('express');
const {config} = require('dotenv');
const mongoose = require('mongoose')
const bookRoutes = require('./routes/book.routes');
const bodyParser = require('body-parser');
config();
//usamos express para los middlewares
const app = express();
app.use(bodyParser.json()) // paraseador de bodyes

// conexiones a base de datos:
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME});
const db = mongoose.connection;

app.use('/book', bookRoutes)



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`servidor iniciando en el puerto ${port}`);
})