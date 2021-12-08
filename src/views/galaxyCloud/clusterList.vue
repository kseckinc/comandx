<style>
.el-dialog__footer {
  padding: 0;
}
</style>
<template>
  <div class="container">
    <!--    <introduction :content="note.content" :title="note.title" />-->
    <!--    <div v-load-more="loadMore" class="galaxy-cluster-container">-->
    <!--      <div class="galaxy-cluster-title">-->
    <!--        <span style="font-size: 18px">-->
    <!--          Kubernetes集群-->
    <!--        </span>-->
    <!--        <div class="galaxy-cluster-button">-->
    <!--          <el-button size="mini" type="primary" @click="createGalaxyCluster">创建Kubernetes集群</el-button>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <hr color="#80FFFF">-->
    <!--      <div class="galaxy-cluster-content">-->
    <!--        <div v-if="isNoData">-->
    <!--          暂无集群-->
    <!--        </div>-->
    <!--        <list-item v-for="(item, idx) in list" :key="idx" :item="item" @reload="fetchData" />-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="clusters-header">
      <div class="clusters-search">
        <div class="label" style="margin-left: 15px">ID</div>
        <el-input v-model="search.id" size="medium" style="width: 200px" placeholder="输入集群ID进行匹配" clearable @blur="fetchData" />
        <div class="label">集群名称</div>
        <el-input v-model="search.cluster_name" size="medium" style="width: 200px" placeholder="输入集群名称进行匹配" clearable @blur="fetchData" />
      </div>
      <div class="clusters-button">
        <el-button size="medium" type="primary" @click="fetchData">查询</el-button>
        <el-button size="medium" style="margin-right: 20px" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="clusters-list">
      <div class="buttons">
        <el-button size="medium" type="primary" style="margin-left: 10px" @click="createGalaxyCluster">+创建集群</el-button>
<!--        <el-button size="medium" style="margin-left: 40px" disabled>编辑</el-button>-->
<!--        <el-button size="medium" disabled>删除</el-button>-->
      </div>
      <el-table v-loading="loading" :data="list" border style="margin: 10px; width: calc(100% - 30px)">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="状态" align="center" width="90px">
          <template slot-scope="{ row }">
            <span class="status">{{ row.status | generateClusterStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="cluster_id" align="center" width="90px" />
        <el-table-column label="集群名称" align="center">
          <template slot-scope="{ row }">
            <span style="color: blue; cursor: pointer" @click="clusterInfo(row.cluster_name)"> {{ row.cluster_name }} </span>
          </template>
        </el-table-column>
        <el-table-column label="CPU(已用/全部)" align="center" min-width="130px">
          <template slot-scope="{ row }">
            <span style="color:#B8741A">{{ (row.all_cpu_cores - row.free_cpu_cores) | formatPrecision(3) }}核</span><span class="division">/</span>{{ row.all_cpu_cores | formatPrecision(3) }}核
          </template>
        </el-table-column>
        <el-table-column label="内存(已用/全部)" align="center" min-width="130px">
          <template slot-scope="{ row }">
            <span style="color:#B8741A">{{ (row.all_memory_gi - row.free_memory_gi) | formatPrecision(3) }}G</span><span class="division">/</span>{{ (row.all_memory_gi) | formatPrecision(3) }}G
          </template>
        </el-table-column>
        <el-table-column label="本地存储(已用/全部)" align="center" min-width="130px">
          <template slot-scope="{ row }">
            <span style="color:#B8741A">{{ (row.all_disk_gi - row.free_disk_gi) | formatPrecision(3) }}G</span><span class="division">/</span>{{ row.all_disk_gi | formatPrecision(3) }}G
          </template>
        </el-table-column>
        <el-table-column label="集群机器" align="center" min-width="130px">
          <template slot-scope="{ row }">
            <span style="cursor: pointer" @click="routeTo('galaxyCloudClusterNodeList', row.cluster_id)"><span style="color: blue; display: inline-block; margin-right: 5px">{{ row.master_count }}</span> master <span style="color: blue; display: inline-block; margin:0 5px">{{ row.work_count }}</span> worker</span>
          </template>
        </el-table-column>
        <el-table-column label="集群实例数" align="center">
          <template slot-scope="{ row }">
            <span style="color: blue; cursor: pointer" @click="routeTo('galaxyCloudClusterPodList', row.cluster_id)">{{ row.pod_count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
<!--            <span style="color: blue; cursor: pointer; margin-right: 5px">日志</span>-->
            <span style="color: #D9001B; cursor: pointer" @click="showDelete(row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="query.total>0" :total="query.total" :page.sync="query.page_number" :limit.sync="query.page_size" @pagination="fetchData" />
    </div>
    <el-dialog :visible.sync="warningVisible" width="30%">
      <div slot="title" class="warning-title">
        警告！！
      </div>
      <div style="text-indent:2rem;color: black">
        删除Kubernetes集群会清除所有实例及部署的服务，集群内的公有云服务器也将在当天24点释放
      </div>
      <div style="text-indent:2rem;margin-top: 1.5rem;color: black">
        确定要删除Kubernetes集群吗？？
      </div>
      <div slot="footer" class="warning-footer">
        <div style="color: #D9001B" @click="deleteGCluster(cluster.cluster_id)">删除</div>
        <div @click="cancel">取消</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { clusterDelete, clustersSummary } from '@/api/galaxyCloud'
import _ from 'lodash'

export default {
  name: 'ClusterList',
  components: {
    Pagination
  },
  data() {
    return {
      loading: false,
      note: {
        title: 'Kubernetes集群介绍',
        content: 'Kubernetes集群为平台独立定义的集群类别，其支持将任意类型物理机放入该集群，通过bridgX提供的容器化资源切割能力，向用户提供任意配置的算力资源'
      },
      search: {
        id: '',
        cluster_name: ''
      },
      cluster: {
        cluster_id: null
      },
      query: {
        page_number: 1,
        page_size: 10,
        total: 0
      },
      list: [],
      warningVisible: false
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
      this.loading = true
      const res = await clustersSummary(this.query.page_number, this.query.page_size, this.search.id, this.search.cluster_name)
      this.query = {
        page_number: _.get(res, 'page_number', 1),
        page_size: _.get(res, 'page_size', 50),
        total: _.get(res, 'total', 0)
      }
      if (res.status === 'success') {
        this.list = _.get(res, 'clusters', [])
      } else {
        this.$message.error(`获取Kubernetes集群失败: ${res.message}`)
      }
      this.loading = false
    },
    clusterInfo(name) {
      this.$router.push({ name: 'clusterInfo', params: { name }})
    },
    createGalaxyCluster() {
      this.$router.push({ name: 'galaxyCloudClusterCreate' })
    },
    routeTo(name, clusterId) {
      this.$router.push({ name, params: { clusterId }})
    },
    showDelete(cluster) {
      this.cluster = { ...cluster }
      this.warningVisible = true
    },
    async deleteGCluster(id) {
      const res = await clusterDelete(id)
      if (res.status === 'success') {
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
      this.warningVisible = false
      await this.fetchData()
    },
    cancel() {
      this.warningVisible = false
    },
    reset() {
      this.search = {
        id: '',
        name: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    padding: 10px;
    height: 98%;
    width: 100%;
    .clusters-header {
      box-shadow: 4px 4px 5px rgba(0, 0, 0, .08);
      display: flex;
      background-color: white;
      flex-direction: row;
      padding: 10px 0;
      .clusters-search {
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: center;
        .label {
          margin: 0 15px 0 30px;
        }
        .clusters-button {
          width: 200px;
        }
      }
    }
    .clusters-list {
      box-shadow: 4px 4px 5px rgba(0, 0, 0, .08);
      margin-top: 10px;
      padding: 10px 0;
      background-color: white;
      width: 100%;
      height: calc(~"100% - 60px");
    }
  }
  .clusters {
    background-color: white;
    margin: 10px;
    height: calc(~"98% - 150px");
  }
  .status {
    display: inline-block;
    font-size: 12px;
    padding: 5px;
    color: white;
    background: rgb(184, 116, 26);
    border-radius: 5px;
    margin-top: 10px;
  }
  .division {
    display: inline-block;
    padding: 0 5px;
  }
  .warning-title {
    color: #D9001B;
    font-weight: bolder;
  }
  .warning-footer {
    display: flex;
    flex-direction: row;
    div {
      display: flex;
      flex-basis: 50%;
      justify-content: center;
      align-items: center;
      border: 1px solid black;
      padding: 10px 0;
      cursor: pointer;
    }
  }
  .galaxy-cluster-container {
    padding: 0 10px;
    height: calc(~"100% - 120px");
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
