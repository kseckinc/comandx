<template>
  <div v-if="show" class="introduction-container">
    <div>
      <i class="el-icon-close" style="float: right; color: #8c939d" @click="disappear" />
      <div class="introduction-title">
        <i class="el-icon-info" style="font-size: 20px; color: #00B7FF" /><span class="text">Kubernetes集群介绍</span>
      </div>
    </div>
    <div class="introduction-content">
      Kubernetes集群为平台独立定义的集群类别，其支持将任意类型物理机放入该集群，通过bridgX提供的容器化资源切割能力，向用户提供任意配置对的算力资源
    </div>
    <div class="introduction-no-more-show">
      <span @click="noMoreShow">
        不再显示
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true
    }
  },
  mounted() {
    const storage = window.localStorage
    const res = storage.getItem('galaxy-cloud-introduce')
    if (res === 'no') {
      this.show = false
    }
  },
  methods: {
    disappear() {
      this.show = false
    },
    noMoreShow() {
      const storage = window.localStorage
      storage.setItem('galaxy-cloud-introduce', 'no')
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.introduction-container {
  padding: 10px;
  background-color: rgb(230, 247, 255);
  margin: 10px;
  border-radius: 5px;
  border: 2px solid rgb(145, 213, 255);
  .introduction-title {
    padding: 10px;
    .text {
      font-size: 18px;
      margin-left: 10px;
      color: rgb(137,146, 149);
    }
  }
  .introduction-content {
    padding: 0 0 0 37px;
  }
  .introduction-no-more-show {
    padding: 10px 0 0 37px;
    color: blue;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
