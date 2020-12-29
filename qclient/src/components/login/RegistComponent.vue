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
        ></Input>
      </FormItem>
      <FormItem label="手机号码" prop="phone">
        <Input
          v-model="formValidate.phone"
          placeholder="请输入手机号码"
        ></Input>
      </FormItem>
      <FormItem>
        <Button
          :loading="loading"
          type="primary"
          long
          @click="handleSubmit('formValidate')"
          >注册</Button
        >
      </FormItem>
    </Form>
    <p class="linkbutton">
      已有账号，点击 <a href="javascript:" @click="$emit('setRegist')">登录</a>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if(value.length<2){
        callback(new Error("用户名的长度不得小于两位！"));
      }else{
        callback()
      }
    };
     const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(value.length<4){
        callback(new Error("密码的长度不得小于两位！"));
      }else{
        callback()
      }
    };
     const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if(value.length<11){
        callback(new Error("请输入正确的手机号码"));
      }else if((/^1[3456789]d{9}$/.test(value))){
        callback(new Error("请输入正确的手机号码"))
      }else{
        callback()
      }
    };
    return {
      formValidate: {
        name: "",
        password: "",
        phone: "",
      },
      ruleValidate: {
        name: [
          {
            required: true,
            validator: validateName,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            validator: validatePhone,
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.api
            .regist(this.formValidate)
            .then((res) => {
              if (res.data.code === 200) {
                this.message.success(res.data.message);
              }
              this.loading = false;
            })
            .catch(() => (this.loading = false));
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
