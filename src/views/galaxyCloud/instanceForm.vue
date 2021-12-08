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
          style="margin: 10px; width: calc(100% - 30px)"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="执行状态" align="center">
            <template slot-scope="{ row }">
              <span v-if="row.execute_status === 'NORMAL'" class="cluster-nodes-status normal">{{ row.execute_status }}</span>
              <span v-else class="cluster-nodes-status error">{{ row.execute_status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="流水号" prop="id" align="center" />
          <el-table-column label="所属集群" align="center">
            <template slot-scope="{row}">
              {{ row.cluster_name }}
            </template>
          </el-table-column>
          <el-table-column label="实例组" align="center">
            <template slot-scope="{row}">
              {{ row.instance_group }}
            </template>
          </el-table-column>
          <el-table-column label="实例配置" align="center">
            <template slot-scope="{row}">
              {{ row.cpu }}核/ {{ row.memory }}G /{{ row.disk }}G
            </template>
          </el-table-column>
          <el-table-column label="变更实例数" align="center">
            <template slot-scope="{row}">
              <div v-if="row.opt_type === 'EXPAND'" class="task-action-container">
                {{ row.updated_instance_count }}
                <svg class="task-action-svg">
                  <use xlink:href="#icon-upward" />
                </svg>
              </div>
              <div v-else-if="row.opt_type === 'SHRINK'" class="task-action-container">
                {{ row.updated_instance_count }}
                <svg class="task-action-svg">
                  <use xlink:href="#icon-downward" />
                </svg>
              </div>
              <div v-else>
                {{ row.updated_instance_count }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="执行耗时" align="center">
            <template slot-scope="{row}">
              {{ row.host_time/1000 }}秒
            </template>
          </el-table-column>
          <el-table-column label="申请人" align="center">
            <template slot-scope="{row}">
              {{ row.created_user_name }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="{row}">
              {{ row.created_time*1000 | formatMoment('YYYY-MM-DD HH:mm:ss') }}
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
        .cluster-pods-status {
    color: white;
    padding: 2px 10px;
    border-radius: 5px;
  }
  .normal {
    background-color: #2cb81a;
  }
  .common {
    background-color: #B8741A;
  }
  .error {
    background-color: #DC143C;
  }
    .task-action-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .task-action-svg {
      height: 18px;
      width: 18px;
    }
  }
}
</style>

<script>
import { getInstanceFormList } from '@/api/galaxyCloud'
import Pagination from '@/components/Pagination'
import _ from 'lodash'

export default {
  name: 'InstanceGroup',
  components: { Pagination },
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
        this.total = res.pager.total
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
