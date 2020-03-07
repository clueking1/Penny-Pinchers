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

app.post('/', (req, res) => {
    console.log(req.body)
    connection.query('SELECT userID, userName, userPwd FROM user WHERE userName = ? AND userPwd = ?', [req.body.addMainUsername, req.body.addMainPassword], (err, data) => {
        console.log(data.length) 
        if (data.length === 0) {
            res.redirect('/')
        } else {
            res.redirect('/dashboard/' + JSON.stringify(data[0].userID))
        }
        
        

    })
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', (req, res) => {
    
connection.query('insert INTO user (userName, userPwd) values (?, ?)', [req.body.uname, req.body.pwd], (err, data) => {
    if (err) {
        throw err
    }
  })
    res.redirect('/');
})

app.get('/dashboard/:data', (req, res) => {
   
    connection.query('SELECT * from user WHERE userID = ?', [Number(req.params.data)] ,(err, data) => {
        if (err) {
            res.render('index')
        }

        points = {
            groceriesBudget: 0,
            transportationBudget: 0,
            diningBudget: 0,
            shoppingBudget: 0,
           
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
          
        render(data, points, req.params.data)
        
    })

    function render(data, points, num) {
        
       let totalPoints = points.groceriesBudget + points.transportationBudget + points.diningBudget + points.shoppingBudget
            
        res.render('dashboard', {
            budget: data,
            points: points,
            totalPoints,
            num
        })
    }
    
})


app.get('/logBill/:data', (req, res) => {
    let num = req.params.data
    res.render('addbill', {
        num
    })
})

app.put('/logBill/:data', (req, res) => {
    
    console.log(req.params)
    // connection.query("UPDATE user SET ?? = ? WHERE userID = ?",[req.body.cat, Number(req.body.budget), 1], (err,data) => {
    //     if (err) {
    //         throw err
    //     }
    //     console.log('success')
    // })
    connection.query("SELECT ?? FROM user WHERE userID = ?",[req.body.cat, Number(req.params.data)], (err,data) => {
        if (err) {
            throw err
        }
        
        if (data[0].groceries >= 0) {
            update('groceries', data[0].groceries)
        } else if (data[0].dining >= 0) {
            update('dining', data[0].dining)
        } else if (data[0].transportation >= 0) {
            update('transportation', data[0].transportation)
        }else {
            update('shopping', data[0].shopping)
        }
        function update(where, num) {
           let updateNum = Number(req.body.budget) + Number(num)
            connection.query("UPDATE user SET ?? = ? WHERE userID = ?",[where, Number(updateNum), Number(req.params.data)], (err,result) => {
            if (err) {
                throw err
            }
            
            console.log('success')
            res.redirect('/dashboard/' + JSON.stringify(req.params.data))
        })
        }
        
    })
   
 
})

app.get('/setBudget/:data', (req, res) => {
    let num = req.params.data
    res.render('setbudget', {
        num
    })
})

app.put('/setBudget/:data', (req, res) => {
    console.log(req.body.grocery)
    connection.query('UPDATE user SET groceriesBudget = ?, transportationBudget = ?, diningBudget = ?, shoppingBudget = ? where userID = ?', [req.body.grocery, Number(req.body.transportation), Number(req.body.dining), Number(req.body.shopping), Number(req.params.data)], (err, data) => {
        if (err) {
            throw err
        }
        res.redirect('/dashboard/' + JSON.stringify(req.params.data))
})})


app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
