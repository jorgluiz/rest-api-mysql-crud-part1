let mysql = require("mysql")

const connMySQL = () => {
   return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234567",
        database: "testdb"
   })
}

module.exports = connMySQL()