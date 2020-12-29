<template>
  <div class="layout">
    <Layout>
      <Header>
        <v-header></v-header>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{ background: '#fff' }">
          <v-slide-mneu></v-slide-mneu>
        </Sider>
        <Layout :style="{ padding: '24px 24px 24px' }">
          <Content
            :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
          >
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import vHeader from "../components/v-header";
import vSlideMneu from "../components/v-slidemenu";
export default {
  components: { vHeader, vSlideMneu },
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
::v-deep .ivu-layout.ivu-layout-has-sider {
  width: 100vw;
  height: calc(100vh - 64px);
}

.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
::v-deep .ivu-layout-header {
  padding: 0 50px 0 24px;
}
</style>
