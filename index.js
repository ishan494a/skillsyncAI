const express = require('express');
const app = express();
const path = require('path');
const userData = require('./data.json');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended : true}));
app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, '/views'))



app.get('/', (req, res)=>{
  res.render('home')
});

app.get('/searchuser',(req, res)=>{
  const  { usertag }  = req.query;
  const data = userData[usertag];
  
  if(data){
    res.render('userdisplay', { ...data });
  } else {
    res.render('dne');
  }
});

app.get('/login', (req, res)=>{
  res.render('login')
});

app.get('/register', (req, res)=>{
  res.render('register')
});

app.get('*', (req, res)=>{
  res.render('dne')
});


app.listen(3000);