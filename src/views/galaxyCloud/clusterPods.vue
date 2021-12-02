<template>
  <div class="container">
    <cluster-info />
    <div class="cluster-pods">
    </div>
  </div>
</template>

<script>
import clusterInfo from '@/views/galaxyCloud/components/clusterInfo'
export default {
  name: 'ClusterPods',
  components: {
    clusterInfo
  }
}
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    height: 98%;
    width: calc(~"100% - 20px");
  }
  .cluster-pods {
    background-color: white;
    margin: 10px;
    height: calc(~"98% - 150px");
  }
</style>
