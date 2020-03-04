const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: '8080',
    user: 'root',
    password: '',
    database: 'pinchers_db'
})

connection.connect(function(err) {
    if (err) {
        console.log('error connection: ' + err.stack)
        return
    }
    console.log('connected as id ' + connection.threadId)
})
module.exports = connection;