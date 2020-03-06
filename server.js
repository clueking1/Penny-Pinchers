const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path')
const connection = require('./Config/connection')

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

app.get('/dashboard', (req, res) => {
    connection.query('SELECT * from user WHERE userID = ?', [1] ,(err, data) => {
        if (err) {
            throw err
        }

        

        console.log(data)
        res.render('dashboard', {
            budget: data,
            points: data
        })
    })
    
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
