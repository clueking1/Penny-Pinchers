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
    connection.query('SELECT * from user WHERE userID = ?', [4] ,(err, data) => {
        if (err) {
            throw err
        }
        console.log(data)
        points = {
            groceriesBudget: 0,
            transportationBudget: 0,
            diningBudget: 0,
            shoppingBudget: 0
        }
        if (data[0].groceries > 0) {
          let number =  data[0].groceries / data[0].groceriesBudget * 100
          let finalPoints = 100 - number
          
          points.groceriesBudget = Math.round(finalPoints)
        } else {
            points.groceriesBudget = 100
        }

        if (data[0].transportation > 0) {
            let number =  data[0].transportation / data[0].transportationBudget * 100
            let finalPoints = 100 - number
            points.transportationBudget = Math.round(finalPoints)
          } else {
              points.transportationBudget = 100
          }
        
          if (data[0].dining > 0) {
            let number =  data[0].dining / data[0].diningBudget * 100
            let finalPoints = 100 - number
            points.diningBudget = Math.round(finalPoints)
          } else {
              points.diningBudget = 100
          }

          if (data[0].shopping > 0) {
            let number =  data[0].shopping / data[0].shoppingBudget * 100
            let finalPoints = 100 - number
            points.shoppingBudget = Math.round(finalPoints)
          } else {
              points.shoppingBudget = 100
          }

        render(data, points)
        
    })

    function render(data, points) {
        console.log(points)
        res.render('dashboard', {
            budget: data,
            points: points
        })
    }
    
})

app.get('/logBill', (req, res) => {
    
    res.render('addbill')
})

app.put('/logBill', (req, res) => {
    console.log(req)
    connection.query("UPDATE user SET ?? = ? WHERE userID = ?",[req.body.cat, Number(req.body.budget), 1], (err,data) => {
        if (err) {
            throw err
        }
        console.log('success')
    })
})

app.get('/setBudget', (req, res) => {
    res.render('setbudget')
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
