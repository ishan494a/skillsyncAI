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
//card-body
app.post('/sendMessage', async (req, res) => {
  const { message } = req.body;
  let generated = '';
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${apiKey}`);
  const prompt = `(Response should be really brief.) Respond on behalf of the resume owner in the first person. Provide concise answers directly related to the user's inquiry about the resume. If the user asks unrelated questions, reply with a message stating that I cannot answer unrelated questions. The user's message is: '${message}', and the resume is provided in text format: ${pdfText}. Keep responses brief and avoid adding unnecessary information not requested by the user.`
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