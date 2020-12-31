<template>
  <div class="container">
    <div class="loginpaper"></div>
    <div class="logbox">
      <p class="loginTitle">{{isRegister?'注册':'登陆'}}</p>
      <RegistComponent v-if="isRegister" @setRegist="isRegister=!isRegister"/>
      <LoginComponent v-else @setRegist="isRegister=!isRegister"/>
    </div>
  </div>
</template>

<script>
import LoginComponent from "@/components/login/LoginComponent.vue";
import RegistComponent from "@/components/login/RegistComponent.vue";
export default {
  components: { LoginComponent, RegistComponent },
  data() {
    return {
      isRegister: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/stylevariable.scss";
.logbox {
  color: #fff;
  .loginTitle {
    padding: 10px 0;
    text-align: center;
    font-size: 24px;
  }
  position: fixed;
  border: 1px solid #88756b;
  right: 200px;
  bottom: 150px;
  width: 400px;
  border-radius: $border_radius;
}
.loginpaper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(../assets/login/login.jpg) no-repeat,
    linear-gradient(to right, #363634, #232824);
  background-size: cover;
  background-attachment: fixed;
  background-position: 50%;
  animation: bgscale 20s linear 2s infinite;
}
@keyframes bgscale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
