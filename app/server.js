const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const db = require('./models');
const userRoutes = require('./routers/userRoutes.js');
const PORT = process.env.PORT || 8080;
const app = express();
const expressSwagger=require("express-swagger-generator")(app);
const URL_BASE = "/Pedrops/v1/"


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

db.sequelize.sync();

//app.use('/api/users', userRoutes)

let options =
{
  swaggerDefinition: {
    info: {
      description: 'This application has been developed by Pedro Pedro Pérez',
      title: 'SwaggerApiPedro',
      version: '1.0.0',
    },
    host: `localhost:${PORT}`,
    basePath: `${URL_BASE}`,
    produces: [
      "application/json"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
      }
    }
  },
  basedir: __dirname,
  files: ["./routers/*.js", "./models/*.js"]
};
expressSwagger(options);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(URL_BASE,userRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

//database is user
//para saber si funciona pdgadmin4 => select * from users;