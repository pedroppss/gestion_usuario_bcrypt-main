const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./models')
const userRoutes = require('./routers/userRoutes')


const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

db.sequelize.sync();

app.use('/api/users', userRoutes)


app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

//database is user
//para saber si funciona pdgadmin4 => select * from users;