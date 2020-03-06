const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path')
const db = require('./db/db.json')
const fs = require('fs')
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
    console.log(req.body)
    res.render('signup')
    
})

function databaseId () {
    let idMap = db.map(db => db.id)
    console.log('databaseID()')
    let newID = 0
    idMap.forEach(e => {newID = e})
    newID++
    return newID
    

}


app.put('/signup', (req, res) => {
    res.status(200)
        .send('signup')

    db.push({"id": databaseId(), "userName": req.body.userName, "password": req.body.pwd})
    fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(db, null, 5), err => {
        if (err) {
            throw err
        } else {
            console.log('signup!')
        }
    })
    console.log(req.body)
    console.log('req.body')
    console.log(res.body)
    console.log('res.body')
})

app.post('/signup', (req, res) => {
    
})

app.get('/dashboard', (req, res) => {
    
    res.render('dashboard')
})

app.get('/logBill', (req, res) => {
    res.render('addbill')
    console.log(res.body)
    console.log(req.body)
})

app.put('/logBill', (req, res) => {
    
})



app.get('/setBudget', (req, res) => {
    res.render('setbudget')

    // console.log(req.body)
    // console.log(res.body)
})

app.put('/setBudget', (req, res) => {
    console.log(req.body)
    connection.query('UPDATE user SET groceriesBudget = ?, transportationBudget = ?, diningBudget = ?, shoppingBudget = ? where userID = ?', [req.body.grocery, req.body.transportation, req.body.dining, req.body.shopping, 1], (err, data) => {
        if (err) {
            throw err
        }

        res.render('index')
    })})





app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
