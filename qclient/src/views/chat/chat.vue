<template>
  <div class="container">
11
  </div>
</template>

<script>

export default {
    mounted() {
        this.$socket.emit('online', this.$controller.getItem('username'))
    },
};
</script>

<style lang="scss" scoped>

</style>
