var express = require("express");
var { ssql, S_sql } = require("../mysql/ssql");
var router = express.Router();
var moment = require("moment");

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/regist", (req, res) => {
  const { body } = req;
  let param = {
    name: body.name,
    phone: body.phone,
    time: moment().format("YYYY-MM-DD HH:mm:ss"),
    password: body.password,
  };
  S_sql(ssql.table("quser").add(param), res).then((id) => {
    res.json({ message: "添加成功", code: 200 });
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
    S_sql(ssql.table('quser').field().select({name:body.name}),res).then(data=>{
      if (data.length === 0) {
        res.json({
          code: 404,
          message: "该用户不存在",
        });
      } else {
        let pass = data[0].password;
        if (pass !== body.password) {
          res.json({
            code: 401,
            message: "密码不正确",
          });
        } else {
          req.session.userName = req.body.name;
          res.json({ message: "success", code: 200,data:{
            bgmusic:data[0].bgmusic,
            name:data[0].name
          } });
        }
      }
    }) 
  }
});
router.get("/logout", (req, res) => {
  req.session.userName = null;
  res.json({
    code: 200,
  });
});

module.exports = router;
