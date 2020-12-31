<template>
  <div class="box">
    <h4 style="float:left;color:#fff">Welcome To My Community</h4>
    <ul class="header-contenet">
      <li @click="usrSet"><Icon type="md-contacts" />qujf</li>
      <li @click="logout"><Icon type="md-exit" />退出</li>
    </ul>
    <Modal
      v-model="modal"
      title="辅助设置"
      @on-ok="ok"
      @on-cancel="modal = false"
    >
      <div>
        <h5>网页背景音乐</h5>
        <div style="margin-left:16px">
          <ul>
            <li>
              开启/关闭：
              <i-switch size="large" v-model="musicOff" @on-change="setMusic">
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
              </i-switch>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      modal: false,
      musicOff: true,
    };
  },
  methods: {
    logout() {
      this.api.logout().then((res) => {
        if (res.data.code === 200) {
          this.$controller.clear();
          this.$router.push("/login");
        }
      });
    },
    setMusic(val) {
      this.$eventBus.$emit("setMusic", val);
      let param = val?'1':'0'
      this.api.setBgMusic(param).then(res=>{
        if(res.data.code===200){
          this.$controller.setItem({bgmusic:param})
        }
      })
    },
    usrSet() {
      this.modal = true;
    },
    ok() {},
  },
  mounted() {
    this.musicOff = this.$controller.getItem("bgmusic") !== "0"
    
  },
};
</script>
<style scoped lang="scss">
.box::after {
  clear: both;
  overflow: hidden;
  color: #fff;
}
.header-contenet {
  float: right;
  color: #ffffff;
  font-size: 16px;
  li {
    margin: 0 0 0 20px;
  }
}
ul li {
  display: inline-block;
  cursor: pointer;
}
</style>
