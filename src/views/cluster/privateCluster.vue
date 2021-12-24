<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <div class="search-item">
          <span class="label">集群名</span>
          <el-input v-model="search.cluster_name" size="medium" placeholder="输入集群名称搜索" clearable style="width: 200px" @blur="fetchData" @clear="fetchData" />
        </div>
        <div class="search-item">
          <span class="label">使用方</span>
          <el-input v-model="search.usage" size="medium" placeholder="输入使用方名搜索" clearable style="width: 200px" @blur="fetchData" @clear="fetchData" />
        </div>
        <div v-show="showProvider" class="search-item">
          <span class="label">云厂商</span>
          <el-select v-model="search.provider" size="medium" @change="fetchData">
            <el-option v-for="p in providers" :key="p.value" :label="p.label" :value="p.value" />
          </el-select>
        </div>
      </div>
      <div class="buttons">
        <el-button size="medium" type="primary" @click="fetchData">查询</el-button>
        <el-button size="medium" @click="resetSearch">重置</el-button>
      </div>
    </div>
    <div class="content">
      <div class="buttons">
        <el-button size="medium" type="primary" @click="handleCreate">+创建集群</el-button>
        <el-button size="medium" disabled @click="edit">编辑</el-button>
        <el-button size="medium" :disabled="selectClusters.length < 1" @click="handleDelete">删除</el-button>
      </div>
      <div class="table">
        <el-table
          :data="clusters"
          border
          fit
          highlight-current-row
          size="medium"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="ID" prop="cluster_id" align="center" />
          <el-table-column label="集群名称" align="center">
            <template slot-scope="{ row }">
              <el-button size="medium" type="text" @click="gotoDetail(row.cluster_name)">{{ row.cluster_name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="集群机器数" prop="instance_count" align="center" />
          <el-table-column label="使用方" align="center">
            <template slot-scope="{ row }">{{ row.usage | parseUsage }}</template>
          </el-table-column>
          <el-table-column label="最后编辑人" prop="update_by" align="center"/>
          <el-table-column label="最后编辑时间" class-name="status-col" width="160" align="center">
            <template slot-scope="{row}">
              <span>
                {{ row.update_at | formatMomentZone('YYYY-MM-DD HH:mm:ss') }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="集群描述" align="center">
            <template slot-scope="{ row }">
              {{ row.desc }}
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="query.page_number" :limit.sync="query.page_size" @pagination="fetchData" />
      </div>
    </div>
  </div>
</template>

<script>
import { cloudProviders } from '@/config/cloud'
import { clusterDescribeAll, customClusterDelete } from '@/api/cluster'
import Pagination from '@/components/Pagination'
import _ from 'lodash'

export default {
  name: 'PrivateCluster',
  components: { Pagination },
  data() {
    return {
      search: {
        cluster_name: '',
        usage: '',
        provider: ''
      },
      providers: [{
        value: '',
        label: '全部'
      }, ...cloudProviders],
      selectClusters: [],
      clusters: [],
      query: {
        page_size: 10,
        page_number: 1
      },
      total: 0,
      showProvider: true,
      loading: false
    }
  },
  mounted() {
    if (this.$route.name === 'privateCluster') {
      this.search.provider = 'PrivateCloud'
      this.showProvider = false
    }
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      const res = await clusterDescribeAll(this.search.cluster_name, this.search.provider, '', this.search.usage, 'custom', this.query.page_number, this.query.page_size)
      this.clusters = _.get(res, 'cluster_list', [])
      this.query.page_number = _.get(res, 'pager.page_number', 1)
      this.total = _.get(res, 'pager.total', 0)
      this.loading = false
    },
    resetSearch() {
      this.search = {
        cluster_name: '',
        usage: '',
        provider: ''
      }
      this.fetchData()
    },
    handleCreate() {
      if (this.$route.name === 'privateCluster') {
        this.$router.push({ name: 'privateClusterCreate' })
      } else {
        this.$router.push({ name: 'publicClusterAdd' })
      }
    },
    handleSelectionChange(val) {
      this.selectClusters = val
    },
    gotoDetail(name) {
      this.$router.push({ name: 'privateClusterDetail', params: { name }})
    },
    edit() {},
    async handleDelete() {
      const res = await customClusterDelete(this.selectClusters.map(i => i.cluster_id))
      if (res.code === 200) {
        this.$message.success('删除成功')
      }
      await this.fetchData()
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px 10px 0 10px;
    background-color: rgb(240, 242, 245);
    .header {
      background-color: #ffffff;
      padding: 20px;
      box-shadow: 4px 4px 5px rgba(0, 0, 0, .08);
      display: flex;
      flex-direction: row;
      .search {
        display: flex;
        flex-basis: 100%;
        .search-item {
          display: flex;
          margin-right: 40px;
          .label {
            display: flex;
            align-items: center;
            padding: 0 20px;
          }
        }
      }
      .buttons {
        display: flex;
        width: 200px;
      }
    }
    .content {
      margin-top: 20px;
      background-color: #ffffff;
      padding: 20px;
      box-shadow: 4px 4px 5px rgba(0, 0, 0, .08);
      .buttons {
        button {
          margin-right: 40px;
        }
      }
      .table {
        margin-top: 10px;
      }
    }
  }
</style>
