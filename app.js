//Express errors
require('express-async-errors')

//Env data
require('dotenv').config()

//App
const express = require('express')
const app = express()

//Import routes
const userRoute = require('./routes/userRoute.js')

//Extract data from requests
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes middleware
const authToken = require('./middlewares/authToken.js')

//Publics


//Extra securites import
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

//Routes
app.use('/api/v1/users', userRoute)

//Middlewares import
const errorHandler = require('./middlewares/errorHandler.js')
const notFound = require('./middlewares/notFound.js')

//Middlewares
app.use(errorHandler)
app.use(notFound)

//Security 
app.set('trust proxy', 1)
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100
}))

//Start setup
const port = process.env.PORT || 3000;
const {connectDB} = require('./db/connectDB.js')

const start = async () => {
  try {
    const connection = await connectDB();
    app.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  } catch (error) {
    console.error('The was something wrong when trying to connect to DB:', error);
  }
};

start()

