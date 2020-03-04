const connection = require('../Config/connection')

function questionMark(num) {

    const arr = []

    for (let i = 0; i < num; i++) {
        arr.push('?')
    }
    return arr.toString();
}
const orm = {
    all: function(tableInput, cb) {
        const queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function (err ,results) {
            if (err) {
                throw err
            }
            cb(results)
        })
    },
    create: function (table, cols, vals, cb) {
        const queryString = 'INSERT INTO ' + table;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += questionMark(vals.length);
        queryString =+ ') ';

        console.log(queryString)

        connection.query(queryString, vals, function(err, results) {
            if (err) {
                throw err
            }
            cb(results)
        })
    },
    update: function(table, objColVals, condition, cb) {
        const queryString = 'UPDATE ' + table;

        queryString += ' SET ';
        queryString += objColVals(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, results) {
            if (err) {
                throw err
            }
            cb(results)
        })
    }
};

module.exports = orm;