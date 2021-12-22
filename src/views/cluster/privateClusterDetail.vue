<template>
  <div class="container">
    <div class="content">
      <el-row>
        <el-col :span="8"><div class="text key">集群名称</div></el-col>
        <el-col :span="12"><div class="text value">{{ cluster.name }}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="text key">集群描述</div></el-col>
        <el-col :span="12"><div class="text value">{{ cluster.decs }}</div></el-col>
      </el-row>
      <el-row v-show="cluster.provider !== 'PrivateCloud'">
        <el-col :span="8"><div class="text key">云厂商</div></el-col>
        <el-col :span="12"><div class="text value">{{ cluster.provider }}</div></el-col>
      </el-row>
      <el-row v-show="cluster.provider !== 'PrivateCloud'">
        <el-col :span="8"><div class="text key">云厂商账户</div></el-col>
        <el-col :span="12"><div class="text value">{{ cluster.account_key }}</div></el-col>
      </el-row>
      <el-row style="margin-top: 7px">
        <el-col :span="8"><div class="text key" style="align-items: start">机器列表</div></el-col>
        <el-col :span="12">
          <el-table v-load-more="loadMore" border :data="machines" size="mini" max-height="400">
            <el-table-column label="序号" align="center" width="60">
              <template slot-scope="scope">{{ scope.$index }}</template>
            </el-table-column>
            <el-table-column label="IP" prop="instance_ip" />
            <el-table-column label="登录名" prop="login_name" />
            <el-table-column label="密码" prop="login_password" />
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { customClusterDetail } from '@/api/cluster'
import { customList } from '@/api/instance'
import loadMore from '@/directive/el-table/loadMore'
import _ from 'lodash'
export default {
  name: 'PrivateClusterDetail',
  directives: {
    loadMore
  },
  data() {
    return {
      cluster: {
        name: '',
        desc: '',
        provider: '',
        account_key: ''
      },
      machines: [],
      query: {
        page_size: 50,
        page_number: 1,
        total: 0
      }
    }
  },
  mounted() {
    if (this.$route.params.name !== '') {
      this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      this.cluster = await customClusterDetail('', this.$route.params.name)
      const res = await customList(this.$route.params.name, this.query.page_number, this.query.page_size)
      this.machines = _.get(res, 'instance_list', [])
      this.query.total = _.get(res, 'pager.total', 0)
    },
    async loadMore() {
      if (this.machines.length === this.query.total) {
        return
      }
      this.query.page_number++
      const res = await customList(this.$route.params.name, this.query.page_number, this.query.page_size)
      this.machines = _.concat(this.machines, _.get(res, 'instance_list', []))
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    .content {
      display: flex;
      flex-direction: column;
      height: 98%;
      margin: 10px;
      min-height: 600px;
      background-color: #ffffff;
      padding: 20px;
      box-shadow: 4px 4px 5px rgba(0, 0, 0, .08);
    }
  }
  .text {
    font-size: 16px;
    height: 36px;
    display: flex;
    align-items: center;
  }
  .key {
    padding-right: 30px;
    justify-content: flex-end;
    color: rgb(170, 170,170);
  }
  .value {
    justify-content: flex-start;
  }
</style>
