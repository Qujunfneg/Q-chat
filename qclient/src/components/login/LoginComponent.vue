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
      <FormItem label="密码" prop="password">
        <Input
          v-model="formValidate.password"
          placeholder="请输入密码"
          @on-enter="handleSubmit('formValidate')"
          type="password"
        ></Input>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          :loading="loading"
          long
          @click="handleSubmit('formValidate')"
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
      loading: false,
      formValidate: {
        name: "qujf",
        password: "0000",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不得为空！",
            trigger: "blur",
          },
        ],
        password: [
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
          this.api
            .login(this.formValidate)
            .then((res) => {
              const { code, message ,data} = res.data;
              if (code !== 200) {
                this.$Message.error(message);
              } else {
                this.$controller.setItem({
                  loginFlag:true,
                  username:data.name,
                  bgmusic:data.bgmusic
                })
                this.$router.push("/");
              }
            })
            .catch((err) => {});
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
