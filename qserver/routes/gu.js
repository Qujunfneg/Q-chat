var express = require("express");
var { ssql, S_sql } = require("../mysql/ssql");
var request = require("request");
var iconv = require("iconv-lite");
const puppeteer = require("puppeteer");
var router = express.Router();

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
router.get("/lists/:username", function (req, res) {
  let { params } = req;
  S_sql(
    ssql.table("gu").field().where({ username: params.username }).select(),
    res
  ).then((data) => {
    res.status(200).json({
      code: 200,
      data: data,
    });
  });
});
// 获取代码和名称的数据
router.get("/getGuInfo", (req, res) => {
  S_sql(ssql.table("gulists").field().select(), res).then((data) => {
    res.json({
      code: 200,
      data: data,
    });
  });
});
// 增加一条操作记录
router.post("/add", (req, res) => {
  let { body } = req;
  let param = {
    gname: body.gname,
    gucode: body.gucode,
    ssupportprice: body.ssupportprice,
    spressureprice: body.spressureprice,
    lsupportprice: body.lsupportprice,
    lpressureprice: body.lpressureprice,
    stopprofit: body.stopprofit,
    stoploss: body.stoploss,
    username: body.username,
    time: body.time,
    price: body.price,
    cycle: body.cycle,
    unit: body.unit,
    tip: body.tip,
  };
  S_sql(ssql.table("gu").add(param), res).then((data) => {
    res.json({
      code: 200,
      message: "添加成功",
    });
  });
});
// 删除一条记录
router.post("/delete", (req, res) => {
  let { body } = req;
  S_sql(ssql.table("gu").where({ id: body.id }).delete(), res).then(() => {
    res.json({
      code: 200,
      message: "删除成功",
    });
  });
});
// 获取股票的价格
router.get("/guInfo/:code", (req, res) => {
  (async () => {
    let {params} = req
    let userData = await S_sql(ssql.table('gu').where({id:params.code}).select(),res)
    let content = await fectData(userData[0].gucode);
    let data = {
      userData:userData[0],
      content:content
    }
    res.send(data);
  })();
});
async function fectData(code) {
  // http://quote.eastmoney.com/kcb/688277.html
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(600000);
  await page.goto(`http://quote.eastmoney.com/kcb/${code}.html`);
  let content = await page.$eval(
    "#quote-digest>table>tbody",
    (el) => el.innerText
  );
  return content;
}
module.exports = router;
