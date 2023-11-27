const express = require('express');
const app = express();
const path = require('path');
const userData = require('./data.json');
const bodyParser = require('body-parser');
const axios = require('axios');

let currentUser;
let pdfText;
const apiKey = "";

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname, '/views'))

app.post('/sendMessage', async (req, res) => {
  const { message } = req.body;
  const prompt = `You are a personalized chatbot that answers questions on the resume owner's behalf. Use the message sent to use and respond based on users resume. Heres the message: ${message}, here's the resume in text format: ${pdfText}`;
  console.log(message, currentUser);
  // console.log('Generated text from OpenAI:', generatedText);
});

app.get('/', (req, res)=>{
  res.render('home')
});

app.get('/searchuser',(req, res)=>{
  const  { usertag }  = req.query;
  currentUser = usertag;
  const data = userData[usertag];
  pdfText = data.pdftotext;
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