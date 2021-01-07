var express = require("express");
var router = express.Router();
var request = require("request");
var iconv = require("iconv-lite");
var cheerio = require("cheerio");
var qsql = require("../mysql");
var { ssql, S_sql } = require("../mysql/ssql");
var moment = require("moment");
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
// 更新代码表
router.get("/updategulist", (req, res) => {
  // 获取http://www.txsec.com/inc1/gpdm.asp数据
  fetchData().then((data) => {
    // 利用正则处理数据
    let result = handleData(data);
    // 1.清空gulists数据表
    S_sql(ssql.table("gulists").delete(), res).then((data) => {
      S_sql(
        ssql
          .table("quser")
          .where({ name: req.session.userName })
          .update({
            gulistsupdatetime: moment().format("YYYY-MM-DD HH:mm:ss"),
          }),
        res
      ).then((data) => {
        let values = formatter(result);
        S_sql(ssql.table("gulists").addAll(result), res).then((data) => {
          res.json({
            code: 200,
            message: "添加成功",
          });
        });
      });
    });
  });
});
// 获取更新时间
router.get("/getUpdate", (req, res) => {
  S_sql(ssql.table('quser').field('gulistsupdatetime').where({name:req.session.userName}).select(),res).then(data=>{
    res.json({
      code: 200,
      data: data[0],
    });
  })
});
// 更新背景音乐的开关
router.get("/bgmusic",(req,res)=>{
  let {query} = req
  S_sql(ssql.table('quser').where({name:req.session.userName}).update({bgmusic:query.state}),res).then(()=>{
    res.json({
      code:200,
      message:'更新成功'
    })
  })
})
function fetchData() {
  return new Promise((resolve, reject) => {
    var headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36",
    };
    request.get(
      {
        url: "http://www.bestopview.com/stocklist.html",
        encoding: null, //让body 直接是buffer
        headers: headers,
      },
      (err, data) => {
        if (err) reject(err);
        var html = iconv.decode(data.body, "gb2312");
        resolve(html);
      }
    );
  });
}
function handleData(data) {
  var $ = cheerio.load(data);
  let result = [];
  $(".result li>a").each((i, elem) => {
    let obj = {};
    let temp = $(elem).text().split("(");
    obj.name = temp[0];
    obj.code = temp[1].replace(")", "");
    result.push(obj);
  });
  return result;
}
function formatter(arr) {
  let result = [];
  arr.forEach((item) => {
    let temp = [];
    temp.push(item.name);
    temp.push(item.code);
    result.push(temp);
  });
  return result;
}
module.exports = router;
