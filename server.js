const express = require("express");
const exphbs = require("express-handlebars");


const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
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