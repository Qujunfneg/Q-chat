<template>
  <List>
    <ListItem>
      <ListItemMeta
        avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
        title="更新名称和代码"
        :description="description"
      />
      <template slot="action">
        <li v-if="!isProcessing" @click="start">
          <Icon type="ios-play" class="start" /><a href="javascript:">执行</a>
        </li>
        <li v-else class="processingli">
          <Icon type="ios-time-outline" class="wait" /><span class="processing"
            >执行中...</span
          >
        </li>
      </template>
      <div class="process process1"></div>
    </ListItem>
  </List>
</template>
<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      isProcessing: false,
      description: "",
    };
  },
  methods: {
    start() {
      this.$Modal.confirm({
        title: "确认要更新数据码？",
        content: "<p>建议一天更新一次数据！</p>",
        onOk: () => {
          this.isProcessing = !this.isProcessing;
          this.api.updateCode().then((res) => {
            if (res.data.code === 200) {
              this.isProcessing = false;
              this.$Message.success("更新成功");
              this.setGulistsupdatetime()
            }
          });
        },
      });
    },
    setGulistsupdatetime() {
      this.api.getUpdateTime().then((res) => {
        this.description =
          "上次更新时间：" +
          dayjs(new Date(res.data.data.gulistsupdatetime)).format(
            "YYYY-MM-DD HH-mm:ss"
          );
      });
    },
  },
  mounted() {
    this.setGulistsupdatetime()
  },
};
</script>
<style scoped lang="scss">
.start {
  border: 1px solid #8c8c8c;
  border-radius: 50%;
  padding: 1px;
  font-size: 14px;
  margin-right: 3px;
}
.wait {
  font-size: 18px;
}
.processingli {
  display: inline-block;
  width: 61px;
  white-space: nowrap;
  overflow: hidden;
  animation: processing 5s linear infinite;
  .processing {
    vertical-align: middle;
  }
}
@keyframes processing {
  0% {
    width: 61px;
  }
  25% {
    width: 70px;
  }
  50% {
    width: 74px;
  }
  75% {
    width: 70px;
  }
  100% {
    width: 61px;
  }
}
::v-deep .ivu-list-item {
  position: relative;
}
.process {
  position: absolute;
  width: 0px;
  height: 100%;
  background: red;
  opacity: 0.2;
  transition: all linear 2s;
}
</style>
