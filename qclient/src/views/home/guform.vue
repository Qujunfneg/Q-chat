<template>
  <div class="containerR" v-loading="loading">
    <Breadcrumb>
      <BreadcrumbItem to="/gulists">列表</BreadcrumbItem>
      <BreadcrumbItem>新增</BreadcrumbItem>
    </Breadcrumb>
    <Divider />
    <Form
      :model="formItem"
      ref="formValidate"
      :rules="ruleValidate"
      :label-width="100"
      style="width:600px"
    >
      <FormItem label="名称" prop="gucode">
        <Select v-model="formItem.gucode" filterable>
          <Option
            :value="item.code"
            v-for="item in gucodeLists"
            :key="item.code"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="短期支撑位">
        <InputNumber
          :max="10000"
          style="width:240px"
          :min="1"
          v-model="formItem.ssupportprice"
          :step="0.01"
        ></InputNumber>
      </FormItem>
      <FormItem label="短期压力位">
        <InputNumber
          :max="10000"
          style="width:240px"
          :min="1"
          v-model="formItem.spressureprice"
          :step="0.01"
        ></InputNumber>
      </FormItem>
      <FormItem label="长期支撑位">
        <InputNumber
          :max="10000"
          style="width:240px"
          :min="1"
          v-model="formItem.lsupportprice"
          :step="0.01"
        ></InputNumber>
      </FormItem>
      <FormItem label="长期压力位">
        <InputNumber
          :max="10000"
          style="width:240px"
          :min="1"
          v-model="formItem.lpressureprice"
          :step="0.01"
        ></InputNumber>
      </FormItem>
      <FormItem label="止盈">
        <InputNumber
          :max="10000"
          style="width:240px"
          :min="1"
          v-model="formItem.stopprofit"
          :step="0.01"
        ></InputNumber>
      </FormItem>
      <FormItem label="止损">
        <InputNumber
          :max="10000"
          style="width:240px"
          :min="1"
          v-model="formItem.stoploss"
          :step="0.01"
        ></InputNumber>
      </FormItem>
      <FormItem label="购买价格">
        <InputNumber
          :max="10000"
          style="width:240px"
          :min="1"
          v-model="formItem.price"
          :step="0.01"
        ></InputNumber>
      </FormItem>
      <FormItem label="购买时间" prop="time">
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 200px"
          v-model="formItem.time"
        ></DatePicker>
      </FormItem>
      <FormItem label="计划周期">
        <Input v-model="formItem.cycle">
          <Select v-model="formItem.unit" slot="append" style="width: 70px">
            <Option value="d">天</Option>
            <Option value="m">月</Option>
            <Option value="y">年</Option>
          </Select>
        </Input>
      </FormItem>
      <FormItem label="描述">
        <Input
          v-model="formItem.tip"
          type="textarea"
          :rows="4"
          placeholder="Enter something..."
        />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submitForm('formValidate')"
          >确认</Button
        >
        <Button style="margin-left: 8px" @click="$router.push('/')">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      loading:false,
      formItem: {
        gname: "",
        gucode: "",
        ssupportprice: 0,
        spressureprice: 0,
        lsupportprice: 0,
        lpressureprice: 0,
        stopprofit: 0,
        stoploss: 0,
        price: 0,
        time: "",
        cycle: "",
        unit: "d",
        tip: "",
      },
      gucodeLists: [],
      avbdok: false,
      ruleValidate: {
        gucode: [
          { required: true, message: "股票名称不得为空", trigger: "change" },
        ],
        time: [
          { required: true,type: 'date', message: "购买时间不得为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.avbdok = true;
          let param = this.formItem;
          param.username = sessionStorage.getItem("username");
          param.gname = this.gucodeLists.filter(
            (item) => item.code === param.gucode
          )[0].name;
          param.time = dayjs(param.time).format("YYYY-MM-DD HH:mm:ss");
          this.loading=true
          this.api.guAdd(param).then((res) => {
            if (res.data.code === 200) {
              this.$Message.success("添加成功");
              this.$router.push("/");
            }
          }).finally(()=>this.loading=false);
        }
      });
    },
  },
  mounted() {
    //   获取列表
    this.api.getGuInfo().then((res) => {
      this.gucodeLists = res.data.data;
    });
    setTimeout(()=>{
      this.loading=false
    },1000)
  },
  beforeRouteLeave(to, from, next) {
    if (!this.avbdok) {
      this.$Modal.confirm({
        title: "确认离开吗？",
        content: "<p>现在离开数据将不会保存，确认要离开吗？</p>",
        onOk: () => {
          next();
        },
        onCancle: () => {
          next(false);
        },
      });
    } else {
      next();
    }
  },
};
</script>
