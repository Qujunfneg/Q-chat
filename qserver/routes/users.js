var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')
var { ssql, S_sql } = require("../mysql/ssql");
/* GET users listing. */
router.use(function (req, res, next) {
  if (req.session.userName) {
    next();
  } else {
    res.json({
      code: 408,
      message: "请重新登录",
    });
  }
});
router.get('/',(req,res)=>{
  S_sql(ssql.table('quser').field('bgmusci').select(),res).then(data=>{
    let result = {
      data:data,
      username:req.session.userName
    }
    res.json({
      code:200,
      data:result,
      message:'获取成功'
    })
  })
})
module.exports = router;
