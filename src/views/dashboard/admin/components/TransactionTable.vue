<template>
  <el-table ref="table" :height="height" :data="list" border>
    <el-table-column label="任务名" align="center">
      <template slot-scope="scope">
        {{ scope.row.task_name }}
      </template>
    </el-table-column>
    <el-table-column label="对应集群" align="center">
      <template slot-scope="scope">
        {{ scope.row.cluster_name }}
      </template>
    </el-table-column>
    <el-table-column label="执行状态" align="center">
      <template slot-scope="scope">
        {{ scope.row.status | parseTaskStatus }}
      </template>
    </el-table-column>
    <el-table-column label="执行动作" align="center">
      <template slot-scope="scope">
        {{ scope.row.task_action | parseTaskAction }}
      </template>
    </el-table-column>
    <el-table-column label="开始执行时间" align="center">
      <template slot-scope="scope">
        {{ scope.row.create_at | formatMomentZone('YYYY-MM-DD HH:mm:ss') }}
      </template>
    </el-table-column>
    <el-table-column label="执行耗时" align="center">
      <template slot-scope="scope">
        {{ scope.row.execute_time | parseMin }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import _ from 'lodash'
import { taskList } from '@/api/task'

export default {
  data() {
    return {
      list: null,
      height: null
    }
  },
  mounted() {
    this.getHeight()
    window.onresize = () => {
      return (() => {
        this.getHeight()
      })()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await taskList()
      this.list = res.task_list
    },
    getHeight() {
      if (!_.isEmpty(this.$refs.table) && !_.isEmpty(this.$refs.table.$el)) {
        this.height = this.$refs.table.$el.parentElement.parentElement.clientHeight > 200 ? this.$refs.table.$el.parentElement.parentElement.clientHeight - 50 : 50
      }
    },
    detail() {
    }
  }
}
</script>
