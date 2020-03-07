const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path')
const orm = require('./Config/orm.js')

const app = express();

const PORT = process.env.PORT || 8080;
//app.use(express.static(path.join(__dirname, '/Public')));

app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', (req, res) => {
  orm.create("user", ["userName", "userPwd"], [req.body.uname , req.body.pwd])
  res.render('signup');
  console.log(req.body);
  
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.get('/logBill', (req, res) => {
    res.render('addbill')
})

app.get('/setBudget', (req, res) => {
    res.render('setbudget')
})

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

