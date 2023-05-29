require('dotenv').config()
const express = require('express');
const cors = require("cors");
const middleware = require('./middleware/index');
const mongoose  = require('mongoose')
const router = express.Router()
const gameRoutes = require('./routes/games')(router, {});

//initialize app & middleware
const app = express()
app.use(cors());
app.use('/data', gameRoutes)
app.use(middleware.decodeToken)

//db connection
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DBURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to DB')
        app.listen(process.env.PORT, process.env.IP, () => {
            console.log('App listening on port 3000')
        })
    }).catch((error) => {
        console.log('Not able to connect to DB')
    })













