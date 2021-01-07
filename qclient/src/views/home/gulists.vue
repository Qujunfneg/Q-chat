<template>
  <div class="containerR" v-loading="loading">
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
      loading: false,
      columns: [
        {
          title: "股票名称",
          key: "gname",
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: "javascript:",
                },
                style: {
                  cursor: "pointer",
                },
                on:{
                  click:()=>{
                    this.toView(params)
                  }
                }
              },
              params.row.gname
            );
          },
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
        {
          title: "操作",
          key: "action",

          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.del(params);
                    },
                  },
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                },
                "编辑"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      total: 0,
    };
  },
  mounted() {
    this.updateList();
  },
  methods: {
    updateList() {
      this.tableData = [];
      this.loading = true;
      this.api
        .getlist({ userid: "qujf" })
        .then((res) => {
          this.tableData = res.data.data;
        })
        .finally(() => (this.loading = false));
    },
    del(params) {
      this.$Modal.confirm({
        title: "确认要删除该条数据吗？",
        onOk: () => {
          this.loading = true;
          this.api
            .guDel({ id: params.row.id })
            .then((res) => {
              if (res.data.code === 200) {
                this.$Message.success("删除成功");
                this.updateList();
              }
            })
            .finally(() => (this.loading = false));
        },
        onCancle: () => {},
      });
    },
    toView(params){
      this.$router.push({path:'/guView',query:{id:params.row.id}})
    }
  },
};
</script>
<style scoped>
::v-deep .ivu-page {
  float: right;
  margin-top: 30px;
}
</style>
