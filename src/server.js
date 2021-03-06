const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        // host: 'postgresql-asymmetrical-69593',
        //         // user: 'sachinjadhav',
        //         // password: '',
        //         // database: 'smart-brain'
        host: process.env.DATABASE_URL,
        ssl:true,
    }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> { res.send('This is Working') });
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

//const PORT = process.env.PORT || '3002';
const PORT = process.env.NODE_ENV || '3002';
app.listen( PORT, ()=> {
  console.log(`app is running on port ${PORT}`);
})
