var express = require("express");
var qsql = require("../mysql");
var router = express.Router();
var moment = require("moment");

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/regist", (req, res) => {
  const { body } = req;
  let sql = `INSERT INTO quser(\`name\`,phone,time,password) values ('${
    body.name
  }','${body.phone}','${moment().format("YYYY-MM-DD HH:mm:ss")}','${
    body.password
  }')`;
  qsql
    .sql(sql)
    .then((data) => {
      res.json({ message: "添加成功", code: 200 });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        code: 500,
        message: err.sqlMessage,
      });
    });
});
router.post("/login", (req, res) => {
  const { body } = req;
  if (req.session.userName) {
    res.json({
      code: 200,
      message: "您已经登录过了",
    });
  } else {
    let sql = `SELECT * FROM quser WHERE \`name\`='${body.name}'`;
    qsql
      .sql(sql)
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          res.json({
            code: 404,
            message: "该用户不存在",
          });
        } else {
          let pass = data[0].PASSWORD;
          if (pass !== body.password) {
            res.json({
              code: 401,
              message: "密码不正确",
            });
          } else {
            req.session.userName = req.body.name;
            res.json({ message: "success", code: 200 });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          code: 500,
          message: err.sqlMessage,
        });
      });
  }
});
router.get("/logout", (req, res) => {
  req.session.userName = null;
  res.json({
    code: 200,
  });
});

module.exports = router;
