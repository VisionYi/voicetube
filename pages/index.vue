<template>
  <div class="container">
    voicetube
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  async fetch () {
    const response = await this.$api.getVideoList()
    console.log('response', response)
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
