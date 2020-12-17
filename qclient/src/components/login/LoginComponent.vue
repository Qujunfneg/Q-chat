<template>
  <div class="register">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="80"
    >
      <FormItem label="用户名" prop="name">
        <Input v-model="formValidate.name" placeholder="请输入用户名"></Input>
      </FormItem>
      <FormItem label="密码" prop="passworld">
        <Input
          v-model="formValidate.passworld"
          placeholder="请输入密码"
        ></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long @click="handleSubmit('formValidate')"
          >登陆</Button
        >
      </FormItem>
    </Form>
    <p class="linkbutton">
      <a href="javascript:" @click="$emit('setRegist')">创建账号</a>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        name: "",
        passworld: "",
        phone: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不得为空！",
            trigger: "blur",
          },
        ],
        passworld: [
          {
            required: true,
            message: "密码不得为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
};
</script>
<style scoped lang="scss">
.register {
  padding: 0 10px;
  position: relative;
  .linkbutton {
    float: right;
  }
}
::v-deep .ivu-input {
  background: transparent;
  color: #fff;
  border-color: #a19797;
}
::v-deep .ivu-form .ivu-form-item-label {
  color: #e9e1da;
}

</style>
