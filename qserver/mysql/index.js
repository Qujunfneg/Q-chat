// const mysql = require("mysql");
const option = require("./config.js");
var mysql = require("mysql");
class Qsql {
  constructor() {
    this.reset()
  }
  reset(){
    this.db = mysql.createConnection({
      host: option.host,
      port: option.port,
      user: option.user,
      password: option.password,
      database: option.database,
      multipleStatements:true
    });
  }
  connect() {
    this.db.connect((err) => {
      if (err) {
        throw new Error("Error connecting: " + err.stack);
        return;
      }
    });
  }
  sql(sql,values=[]) {
    this.reset()
    this.connect()
    return new Promise((resolve, reject) => {
      this.db.query(sql,[values], function (error, results, fields) {
        if (error) reject(error) ;
        resolve(results);
      });
      this.db.end();
    });
  }
}
module.exports = new Qsql()
