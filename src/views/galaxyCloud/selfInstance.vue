<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <div class="search-item">
          <span class="label">Pod IP</span>
          <el-input v-model="search.pod_ip" size="medium" placeholder="输入IP搜索" clearable style="width: 200px" @change="fetchData" />
          <span class="label">宿主机IP</span>
          <el-input v-model="search.node_ip" size="medium" placeholder="输入IP搜索" clearable style="width: 200px" @change="fetchData" />
          <span class="label">实例组名称</span>
          <el-input v-model="search.instance_group_name" size="medium" placeholder="输入实例组名称搜索" clearable style="width: 200px" @change="fetchData" />
        </div>
      </div>
      <div class="buttons">
        <el-button size="medium" type="primary" @click="fetchData">查询</el-button>
        <el-button size="medium" @click="resetSearch">重置</el-button>
      </div>
    </div>
    <div class="content">
      <div class="buttons">
        <el-button size="medium" type="primary" @click="applyInstance">+申请实例</el-button>
        <el-button size="medium" type="primary" style="float: right" @click="fetchData">刷新</el-button>
      </div>
      <div class="table">
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          style="margin: 10px; width: calc(100% - 30px)"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="运行状态" align="center">
            <template slot-scope="{ row }">
              <span v-if="row.status === 'Running'" class="cluster-pods-status common">{{ row.status }}</span>
              <span v-else class="cluster-pods-status error">{{ row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column label="实例名" align="center">
            <template slot-scope="{row}">
              {{ row.pod_name }}
            </template>
          </el-table-column>
          <el-table-column label="IP" align="center">
            <template slot-scope="{row}">
              {{ row.pod_ip }}
            </template>
          </el-table-column>
          <el-table-column label="所属实例组" align="center">
            <template slot-scope="{row}">
              {{ row.group_name }}
            </template>
          </el-table-column>
          <el-table-column label="宿主机IP" align="center">
            <template slot-scope="{row}">
              {{ row.node_ip }}
            </template>
          </el-table-column>
          <el-table-column label="机型配置" align="center">
            <template slot-scope="{row}">
              {{ row.allocated_cpu_cores|formatPrecision(3) }}核/ {{ row.allocated_memory_gi|formatPrecision(3) }}G /{{ row.allocated_disk_gi|formatPrecision(3) }}G
            </template>
          </el-table-column>
          <el-table-column label="运行时间" align="center" prop="running_time" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="confirmDelete(scope.row)"
              >删除</el-button>
              <el-button
                type="text"
                @click="confirmRestart(scope.row)"
              >重启</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page_number" :limit.sync="listQuery.page_size" @pagination="fetchData" />
      </div>
    </div>
    <el-dialog title="提示" :visible="confirmDeleteInstanceDiglogVis" width="30%" @close="cancelDeleteInstance">
      <div style="font-size:15px;text-align:center">
        删除实例将会影响用户访问流量，确定要删除吗？
      </div>
      <div style="text-align:center;margin-top:20px">
        <el-button
          type="primary"
          @click="handleDelete()"
        >删除</el-button>
        <el-button
          @click="cancelDeleteInstance()"
        >取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible="confirmRestartInstanceDiglogVis" width="30%" @close="cancelRestartInstance">
      <div style="font-size:15px;text-align:center">
        重启实例将会影响用户访问流量，确定要重启吗？
      </div>
      <div style="text-align:center;margin-top:20px">
        <el-button
          type="primary"
          @click="handleRestart()"
        >重启</el-button>
        <el-button
          @click="cancelRestartInstance()"
        >取消</el-button>
      </div>
    </el-dialog>
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
  .common {
    background-color: #B8741A;
  }
  .error {
    background-color: #DC143C;
  }
}
</style>

<script>
import { getInstanceBySelf, instanceDelete, instanceRestart } from '@/api/galaxyCloud'
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
        pod_ip: '',
        node_ip: '',
        instance_group_name: ''
      },
      listQuery: {
        page_number: 1,
        page_size: 10
      },
      selectInstanceGroups: [],
      confirmDeleteInstanceDiglogVis: false,
      confirmRestartInstanceDiglogVis: false,
      deleteRow: null,
      restartRow: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const params = {
        ...this.search,
        ...this.listQuery
      }
      const res = await getInstanceBySelf(params)
      if (res.status === 'success') {
        this.list = _.get(res, 'pods', [])
        this.total = res.total
      } else {
        this.$message.error(res.message)
      }
      this.listLoading = false
    },
    resetSearch() {
      this.search = {
        pod_ip: '',
        node_ip: '',
        instance_group_name: ''
      }
    },
    handleSelectionChange(val) {
      this.selectInstanceGroups = val
    },

    applyInstance() {
      this.$router.push({ name: 'galaxyCloudInstanceApply' })
    },
    async handleDelete() {
      const data = {
        instance_group_id: Number(this.deleteRow.group_id),
        instance_name: this.deleteRow.pod_name
      }
      const res = await instanceDelete(data)
      if (res.status === 'success') {
        this.$message.success('删除成功')
        this.confirmDeleteInstanceDiglogVis = false
      } else {
        this.$message.error('删除失败')
      }
      await this.fetchData()
    },
    async handleRestart() {
      const data = {
        instance_group_id: Number(this.restartRow.group_id),
        instance_name: this.restartRow.pod_name
      }
      const res = await instanceRestart(data)
      if (res.status === 'success') {
        this.$message.success('重启成功')
        this.confirmRestartInstanceDiglogVis = false
      } else {
        this.$message.error('重启失败')
      }
      await this.fetchData()
    },
    confirmDelete(row) {
      this.deleteRow = row
      this.confirmDeleteInstanceDiglogVis = true
    },
    confirmRestart(row) {
      this.restartRow = row
      this.confirmRestartInstanceDiglogVis = true
    },
    cancelDeleteInstance() {
      this.confirmDeleteInstanceDiglogVis = false
    },
    cancelRestartInstance() {
      this.confirmRestartInstanceDiglogVis = false
    }
  }
}
</script>
