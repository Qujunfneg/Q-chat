<template>
  <div>
    <Button
      type="primary"
      icon="md-add"
      style="margin-bottom:12px"
      @click="$router.push('add')"
      >添加记录</Button
    >
    <Table stripe border :columns="columns" :data="tableData"></Table>
    <Page
      :total="total"
      show-sizer
      show-elevator
      show-total
      :current="current"
      @on-change="pageChange"
    />
  </div>
</template>
<script>
import list from "@/mixin/list";
import moment from "moment";
export default {
  mixins: [list],
  data() {
    return {
      columns: [
        {
          title: "股票名称",
          key: "gname",
        },
        {
          title: "股票代码",
          key: "gucode",
        },
        {
          title: "短期支撑位",
          key: "ssupportprice",
        },
        {
          title: "短期压力位",
          key: "spressureprice",
        },
        {
          title: "长期支撑位",
          key: "lsupportprice",
        },
        {
          title: "长期压力位",
          key: "lpressureprice",
        },
        {
          title: "止盈",
          key: "stopprofit",
        },
        {
          title: "止损",
          key: "stoploss",
        },
        {
          title: "购买价位",
          key: "price",
        },
        {
          title: "购买时间",
          key: "time",
          render: (h, params) => {
            return h(
              "span",
              moment(params.row.time).format("YYYY-MM-DD HH:mm:ss")
            );
          },
        },
        {
          title: "计划周期",
          key: "cycle",
          render: (h, params) => {
            let dobj = {
              d: "天",
              m: "月",
              y: "年",
            };

            return h("span", params.row.cycle + dobj[params.row.unit]);
          },
        },
      ],
      tableData: [],
      total: 0,
    };
  },
  mounted() {
    this.api.getlist({ userid: "qujf" }).then((res) => {
      this.tableData = res.data.data;
    });
  },
};
</script>
<style scoped>
::v-deep .ivu-page {
  float: right;
  margin-top: 30px;
}
</style>
