import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import { handleRegister } from './controllers/register.js';
import { handleProfileGet } from './controllers/profile.js';
import { handleApiCall, handleImage } from './controllers/image.js';
import { handleSignin } from './controllers/signin.js';

 const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '123456',
      database : 'smartbrain'
    }
});


const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req,res)=>{
    db('users')
    .returning('*')
    .then(data=>res.send(data))
})

app.post('/signin', handleSignin(db,bcrypt))
app.post('/register',(req,res)=>{handleRegister(req,res,db,bcrypt)} )
app.get('/profile/:id', (req,res)=>{handleProfileGet(req,res,db,bcrypt)})
app.put('/image',(req,res)=>{handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{handleApiCall(req,res)})

app.listen('3000', ()=>{
    console.log('app is running on port 3000');
})

