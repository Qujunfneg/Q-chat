var Ssql = require("node-mysql-promise");
const option = require("./config.js");
var ssql = Ssql.createConnection({
  host: option.host,
  port: option.port,
  user: option.user,
  password: option.password,
  database: option.database,
});
// 统一处理错误
function S_sql(fn, res) {
  return new Promise((resolve, reject) => {
    fn.then((data) => resolve(data)).catch((err) => {
      console.log(err);
      res.json({ code: 500, message: err.message });
    });
  });
}
exports.ssql = ssql;
exports.S_sql = S_sql;
