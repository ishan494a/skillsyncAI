const express = require('express');
const app = express();
const path = require('path');
const userData = require('./data.json');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

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
  let generated = '';
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${apiKey}`);
  const prompt = `Respond based on a user's resume. Assume you are answering on users behalf. Keep the responses as brief as possible. Do not add unnecessary info that user didn't ask for. The message to you by the person asking about the owner of the resume is: "${message}", and the resume is provided in text format: ${pdfText}.`
  const raw = JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages" : [{
      "role": "user",
      "content": `${prompt}`,
    }
    ],
    "max_tokens" : 256
});
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("https://api.openai.com/v1/chat/completions", requestOptions)
  .then(response => response.json())
  .then(result => {
    generated = result.choices[0].message.content
    res.send({generated});
  });

});

app.post('/register',  (req, res) => {
  const { username, email, password} = req.body;
  // Encrypt password, add to database, prompt user to sign in.

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