<template>
  <div class="container">
    <introduction :content="note.content" :title="note.title"></introduction>
    <div class="galaxy-cluster-container">
      <div class="galaxy-cluster-title">
        <span style="font-size: 18px">
          星云集群
        </span>
        <div class="galaxy-cluster-button">
          <el-button size="mini" type="primary" @click="createGalaxyCluster">创建星云集群</el-button>
        </div>
      </div>
      <hr color="#80FFFF">
      <div class="galaxy-cluster-content">
        <div v-if="isNoData">
          暂无集群
        </div>
        <list-item v-for="(item, idx) in list" :key="idx" :item="item" @reload="fetchData"/>
      </div>
    </div>
  </div>
</template>

<script>
import introduction from '@/views/galaxyCloud/components/introduction'
import listItem from '@/views/galaxyCloud/components/galaxyClusterListItem'
import { clustersSummary } from '@/api/galaxyCloud'
import _ from 'lodash'

export default {
  name: 'ClusterList',
  components: {
    introduction,
    listItem
  },
  data() {
    return {
      note: {
        title: '星云集群介绍',
        content: '星云集群为平台独立定义的集群类别，其支持将任意类型物理机放入该集群，通过bridgX提供的容器化资源切割能力，向用户提供任意配置对的算力资源'
      },
      listQuery: {
        page_number: 1,
        page_size: 10
      },
      list: []
    }
  },
  computed: {
    isNoData() {
      return _.isEmpty(this.list) || this.list.length === 0
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await clustersSummary(this.listQuery.page_number, this.listQuery.page_size)
      if (res.status === 'success') {
        this.list = _.get(res, 'clusters', [])
      } else {
        this.$message.error(`获取星云集群失败: ${res.message}`)
      }
    },
    createGalaxyCluster() {
      this.$router.push({ name: 'galaxyCloudClusterCreate' })
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    margin: 10px;
    padding: 10px;
    box-shadow: 5px 5px 5px #b0afaf;
    height: 98%;
    width: calc(~"100% - 20px");
    background-color: white;
  }
  .galaxy-cluster-container {
    padding: 0 10px;
    height: 100%;
    .galaxy-cluster-content {
      height: calc(~"100% - 180px");
      overflow-y: scroll;
    }
    .galaxy-cluster-button {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
    .galaxy-cluster-title {
      height: 28px;
      display: flex;
      align-items: center;
    }
  }
</style>
