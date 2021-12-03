<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <div class="search-item">
          <span class="label">流水号</span>
          <el-input v-model="search.id" size="medium" placeholder="请输入流水号搜索" clearable style="width: 200px" @change="fetchData" />
        </div>
      </div>
      <div class="buttons">
        <el-button size="medium" type="primary" @click="fetchData">查询</el-button>
        <el-button size="medium" @click="resetSearch">重置</el-button>
      </div>
    </div>
    <div class="content">
      <div class="table">
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          size="medium"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="执行状态" min-width="100px" align="center">
            <template slot-scope="{row}">
              {{ row.execute_status }}
            </template>
          </el-table-column>
          <el-table-column label="流水号" prop="id" align="center" />
          <el-table-column label="实例组" min-width="100px" align="center">
            <template slot-scope="{row}">
              {{ row.instance_group }}
            </template>
          </el-table-column>
          <el-table-column label="实例配置" width="150px" align="center">
            <template slot-scope="{row}">
              {{ row.cpu }}核/ {{ row.memory }}G /{{ row.disk }}G
            </template>
          </el-table-column>
          <el-table-column label="变更实例数" width="150px" align="center">
            <template slot-scope="{row}">
              {{ row.updated_instance_count }}
            </template>
          </el-table-column>
          <el-table-column label="执行耗时" width="150px" align="center">
            <template slot-scope="{row}">
              {{ row.host_time }}
            </template>
          </el-table-column>
          <el-table-column label="申请人" width="150px" align="center">
            <template slot-scope="{row}">
              {{ row.created_user_name }}
            </template>
          </el-table-column>
          <el-table-column label="申请时间" width="150px" align="center">
            <template slot-scope="{row}">
              {{ row.created_time }}
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page_number" :limit.sync="listQuery.page_size" @pagination="fetchData" />
      </div>
    </div>
  </div>
</template>

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

<script>
import { getInstanceFormList } from '@/api/galaxyCloud'
import Pagination from '@/components/Pagination'
import loadMore from '@/directive/el-select-load-more'
import _ from 'lodash'

export default {
  name: 'InstanceGroup',
  components: { Pagination },
  directives: {
    loadMore
  },
  data() {
    return {
      accounts: [],
      list: null,
      total: 0,
      listLoading: true,
      search: {
        id: ''
      },
      listQuery: {
        page_number: 1,
        page_size: 10
      },
      selectInstanceGroups: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const params = {
        ...this.listQuery,
        ...this.search

      }
      const res = await getInstanceFormList(params)
      if (res.status === 'success') {
        this.list = _.get(res, 'instance_forms', [])
        this.total = res.total
      } else {
        this.$message.error(res.message)
      }
      this.listLoading = false
    },
    resetSearch() {
      this.search = {
        name: ''
      }
    },
    handleSelectionChange(val) {
      this.selectInstanceGroups = val
    }
  }
}
</script>
