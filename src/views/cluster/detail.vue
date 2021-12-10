<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="info">
          <div class="info-title">
            {{ cluster.name }}
          </div>
          <el-card>
            <el-row>
              <el-col :span="3" class="info-label">云厂商</el-col>
              <el-col :span="9" class="info-content">{{ cluster.provider | filterCloudProvider }}</el-col>
              <el-col :span="3" class="info-label">创建时间</el-col>
              <el-col :span="9" class="info-content">{{ cluster.create_at | formatMomentZone }}</el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="机器列表" name="instance">
          <div style="margin-bottom: 20px; float: right">
            <el-button size="medium" type="primary" :loading="downloading" @click="handleDownload">导出Excel</el-button>
          </div>
          <el-table :data="instanceList" border>
            <el-table-column align="center" label="状态">
              <template slot-scope="{row}">{{ row.status | formatInstanceStatuses }}</template>
            </el-table-column>
            <el-table-column align="center" prop="instance_id" label="机器名" />
            <el-table-column align="center" label="IP">
              <template slot-scope="{row}">
                <div v-if="row.ip_inner !== ''">
                  {{ row.ip_inner }}(内网)
                </div>
                <div v-if="row.ip_outer !== ''">
                  {{ row.ip_outer }}(公网)
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="机型">
              <template slot-scope="{row}">{{ row.instance_type }}</template>
            </el-table-column>
            <el-table-column label="所属云厂商">
              <template slot-scope="{row}">
                {{ row.provider | filterCloudProvider }}
              </template>
            </el-table-column>
            <el-table-column label="付费方式">
              <template slot-scope="{row}">
                {{ row.charge_type | parsePaidType }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="登录名">
              <template slot-scope="{row}">
                <el-tooltip effect="dark" content="点击复制" placement="bottom">
                  <span v-clipboard:copy="row.login_name" v-clipboard:success="clipboardSuccess" style="cursor: pointer">{{ row.login_name }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" label="密码">
              <template slot-scope="{row}">
                <el-tooltip effect="dark" content="点击复制" placement="bottom">
                  <span v-clipboard:copy="row.login_password" v-clipboard:success="clipboardSuccess" style="cursor: pointer">{{ row.login_password }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="instanceTotal>0" :total="instanceTotal" :page.sync="instanceListQuery.page_number" :limit.sync="instanceListQuery.page_size" @pagination="fetchData" />
        </el-tab-pane>
        <el-tab-pane label="扩缩容历史" name="el">
          <el-table v-loading="historyLoading" :data="history" size="medium" border highlight-current-row>
            <el-table-column label="执行状态" align="center">
              <template slot-scope="{row}">
                <span v-if="row.task_status === 'FAILED'" style="display: inline-block; padding: 2px 5px; background-color: red; color: white; border-radius: 10px">失败</span>
                <span v-else> {{ row.task_status | parseTaskStatusRoughly }}</span>
              </template>
            </el-table-column>
            <el-table-column label="流水号" align="center">
              <template slot-scope="{row}">
                {{ row.task_id }}
              </template>
            </el-table-column>
            <el-table-column label="执行时间" align="center">
              <template slot-scope="{ row }">
                {{ row.create_at | formatMomentZone('YYYY-MM-DD HH:mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column label="执行动作" align="center">
              <template slot-scope="{ row }">
                <div v-if="row.task_action === 'EXPAND'" class="task-action-container">
                  扩容
                  <svg class="task-action-svg">
                    <use xlink:href="#icon-upward" />
                  </svg>
                </div>
                <div v-else-if="row.task_action === 'SHRINK'" class="task-action-container">
                  缩容
                  <svg class="task-action-svg">
                    <use xlink:href="#icon-downward" />
                  </svg>
                </div>
                <div v-else>
                  未知
                </div>
              </template>
            </el-table-column>
            <el-table-column label="执行方" align="center" prop="create_by" />
            <el-table-column label="集群机器数变动" align="center">
              <template slot-scope="{row}">
                {{ row.before_instance_count }} --> {{ row.after_instance_count }}
              </template>
            </el-table-column>
            <el-table-column label="耗时" align="center">
              <template slot-scope="{ row }">
                {{ row.execute_time | parseMin }}
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="historyQuery.total>0" :total="historyQuery.total" :page.sync="historyQuery.page_number" :limit.sync="historyQuery.page_size" @pagination="fetchHistory" />
        </el-tab-pane>
        <el-tab-pane label="日志" name="log">日志</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import _ from 'lodash'
import Pagination from '@/components/Pagination'
import { instanceDescribeAll } from '@/api/instance'
import { filterStatuses } from '@/config/instance'
import clipboard from '@/directive/clipboard/index'
import { clusterDescribe } from '@/api/cluster'
import { taskDescribeAll } from '@/api/task'

export default {
  name: 'Detail',
  directives: {
    clipboard
  },
  components: { Pagination },
  data() {
    return {
      instanceList: [],
      activeName: 'info',
      instanceListQuery: {
        page_size: 10,
        page_number: 1
      },
      instanceTotal: 0,
      downloading: false,
      filterStatuses,
      cluster: {},
      history: [],
      historyQuery: {
        total: 0,
        page_size: 10,
        page_number: 1
      },
      historyLoading: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      if (this.$route.params.name !== '') {
        const res = await instanceDescribeAll('', '', '', '', this.$route.params.name, filterStatuses, this.instanceListQuery.page_number, this.instanceListQuery.page_size)
        this.instanceList = _.get(res, 'instance_list', [])
        this.instanceTotal = _.get(res, 'pager.total', 0)
        this.cluster = await clusterDescribe(this.$route.params.name)
        await this.fetchHistory()
      }
    },
    async fetchHistory() {
      this.historyLoading = true
      const res = await taskDescribeAll('', this.$route.params.name, '', this.historyQuery.page_number, this.historyQuery.page_size)
      this.history = res.task_list
      this.historyQuery = {
        total: _.get(res, 'pager.total', 0),
        page_size: _.get(res, 'pager.page_size', 10),
        page_number: _.get(res, 'pager.page_number', 1)
      }
      this.historyLoading = false
    },
    clipboardSuccess() {
      this.$message.success('复制成功')
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['机器名', '内网IP', '公网IP', '机型', '状态', '登录名', '密码']
        const filterVal = ['instance_id', 'ip_inner', 'ip_outer', 'instance_type', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'instance-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.instanceList.map(v => filterVal.map(j => _.get(v, j, '')))
    }
  }
}
</script>

<style lang="less" scoped>
  .info-title {
    font-size: 20px;
    padding: 10px;
  }
  .info-label {
    color: #7f7f7f;
    display: flex;
    flex-direction: row-reverse;
  }
  .info-content {
    color: #333333;
    padding-left: 20px;
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
</style>
