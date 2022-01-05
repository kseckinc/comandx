<template>
  <div class="history-content">
    <div>
      <el-button size="mini" type="primary" style="float: right; margin-bottom: 10px" @click="getList">刷新</el-button>
    </div>
    <div class="table">
      <el-table
        v-loading="listLoading"
        :data="historyList"
        border
        fit
        highlight-current-row
        size="medium"
      >
        <el-table-column label="流水号" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.task_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="扩缩容流程" min-width="120px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.tmpl_expand_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="执行集群" prop="bridgx_cluster" align="center" />
        <el-table-column label="执行动作" min-width="60px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.schedule_type === "expand" ? "扩容" : "缩容" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="执行机器数" width="150px" align="center">
          <template slot-scope="{ row }">
            {{ row.task_inst_cnt }}
          </template>
        </el-table-column>
        <el-table-column label="执行触发" min-width="100px" align="center">
          <template slot-scope="{ row }">
            {{ row.task_exec_type === "manual" ? "手工执行" : "自动化" }}
          </template>
        </el-table-column>
        <el-table-column label="执行方" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.task_exec_opr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="执行开始" min-width="100px" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.begin_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="执行耗时" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.time_cost }}</span>
          </template>
        </el-table-column>
        <el-table-column label="扩缩容进度" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.task_step_desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="扩缩容执行状态" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.task_status_desc === '成功'" style="color: rgb(0,168,67)">{{ row.task_status_desc }}</span>
            <span v-if="row.task_status_desc === '失败'" style="display: inline-block; background-color: #f4516c; color: white; padding: 2px 5px; border-radius: 10px">{{ row.task_status_desc }}</span>
            <span v-if="row.task_status_desc === '已创建'" style="color: rgb(0,168,67)">{{ row.task_status_desc }}</span>
            <span v-if="row.task_status_desc === '进行中'" style="color: rgb(0,168,67)">{{ row.task_status_desc }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page_num"
        :limit.sync="listQuery.page_size"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import { getHistoryList } from '@/api/service'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import _ from 'lodash'

export default {
  name: 'History',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listLoading: false,
      total: 0,
      listQuery: {
        page_size: 20,
        page_num: 1
      },
      historyList: [],
      service_name: ''
    }
  },
  mounted() {
    this.getList()
    this.service_name = this.$route.params.service_name
  },
  methods: {
    async getList() {
      this.listLoading = true
      const params = {
        service_cluster_id: this.$route.params.service_cluster_id,
        ...this.listQuery
      }
      const res = await getHistoryList(params)
      this.historyList = _.get(res, 'schedule_task_list', [])
      this.total = res.pager.total
      this.listLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
  .history-content {
    background-color: #ffffff;
    .buttons {
      button {
        margin-right: 40px;
      }
    }
  }
</style>
