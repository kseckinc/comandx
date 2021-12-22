<template>
  <div class="container">
    <div v-loading="tmpLoading" class="content">
      <div style="flex: 1">
        <el-row>
          <el-col :span="8"><div class="center-text"><div class="asterisk">*</div>集群名称</div></el-col>
          <el-col :span="16"><el-input v-model="cluster.name" placeholder="请输入集群名称" style="width: 400px" size="medium" /></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div style="height: 36px" /></el-col>
          <el-col :span="16"><div class="note">支持中文英文数字，限制20字符</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8"><div class="center-text">集群描述</div></el-col>
          <el-col :span="16"><el-input v-model="cluster.desc" :autosize="{ minRows: 4, maxRows: 4}" type="textarea" placeholder="请输入集群描述" style="width: 400px" size="medium" /></el-col>
        </el-row>
        <el-row v-show="type === 'public'" style="margin-top: 20px">
          <el-col :span="8"><div class="center-text"><div class="asterisk">*</div>云厂商</div></el-col>
          <el-col :span="16">
            <el-select v-model="provider" size="medium" placeholder="请选择云厂商" @change="changeProvider">
              <el-option v-for="p in providers" :key="p.value" :label="p.label" :value="p.value" />
            </el-select>
          </el-col>
        </el-row>
        <el-row v-show="type === 'public'" style="margin-top: 20px">
          <el-col :span="8"><div class="center-text"><div class="asterisk">*</div>云厂商账户</div></el-col>
          <el-col :span="16">
            <el-select v-model="account_key" v-load-more="loadMore" size="medium">
              <el-option v-for="(p, idx) in accounts" :key="idx" :label="p.account_name" :value="p.account">
                <span>{{ p.account_name }}({{ p.account }})</span>
              </el-option>
            </el-select>
            <el-button type="text" style="margin-left: 10px" @click="transferTo('provider')">添加云厂商账户</el-button>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="8"><div class="center-text" style="align-items: start"><div class="asterisk">*</div>机器列表</div></el-col>
          <el-col :span="16">
            <div class="insert-machine-notes">
              <i class="el-icon-info" style="color: green; font-size: 16px" />
              <div class="notes">
                1、要求录入的机器，必须可以访问公网<br>
                2、要求录入的机器之间，彼此可以访问<br>
                3、要求录入的机器最低配置为 2核2G
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 5px">
          <el-col :span="8"><div style="height: 36px" /></el-col>
          <el-col :span="10">
            <div style="display: flex; flex-direction: row">
              <div style="flex: 1; display: flex; flex-direction: row; align-items: center">
                <el-button size="mini" type="primary" @click="addItem">+ 添加机器</el-button>
                <upload-excel-component :on-success="handleUploadSuccess" :before-upload="beforeUpload" button-name="机器导入" />
                <el-button type="text" style="margin-left: 15px" @click="downloadTmp">下载EXCEL 模板</el-button>
              </div>
              <div style="display: flex; align-items: center">
                <el-button size="mini" type="primary" :disabled="testDisabled" @click="checkMachine">机器检测</el-button>
              </div>
            </div>
            <div>
              <el-table :data="machines" border size="medium" max-height="350">
                <el-table-column label="连通性检测" align="center">
                  <template slot-scope="{ row }">
                    {{ row.test || parseTest }}
                  </template>
                </el-table-column>
                <el-table-column label="序号" align="center">
                  <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column label="机器IP" align="center">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.instance_ip" size="mini" placeholder="10.0.0.1"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="登录名" align="center">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.login_name" size="mini" placeholder="请输入登录名"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="密码" align="center">
                  <template slot-scope="{ row }">
                    <el-input v-model="row.login_password" size="mini" placeholder="请输入密码"></el-input>
                  </template>
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <div style="color: rgba(231,48,34,0.73); cursor: pointer; text-decoration: underline" @click="deleteAll">全部删除</div>
                  </template>
                  <template slot-scope="scope">
                    <svg class="svg" style="cursor: pointer" @click="deleteItem(scope.$index)">
                      <use xlink:href="#icon-ashbin" />
                    </svg>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="footer">
        <div>
          <el-button size="medium" type="primary" :disabled="submitDisabled && cluster.name === ''" @click="submit">提交</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloudProviders } from '@/config/cloud'
import { cloudAccountList } from '@/api/cloud'
import { createCustomPublicCluster, createCustomPrivateCluster, clusterMachineCheck } from '@/api/cluster'
import _ from 'lodash'
import loadMore from '@/directive/el-select-load-more'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'CreateOrEditPrivate',
  components: { UploadExcelComponent },
  directives: {
    loadMore
  },
  data() {
    return {
      cluster: {
        name: '',
        desc: ''
      },
      type: '',
      provider: '',
      providers: [...cloudProviders],
      account_key: '',
      accounts: [],
      accountQuery: {
        page_number: 1,
        page_size: 50,
        total: 0
      },
      machines: [],
      tmpLoading: false,
      testDisabled: false,
      submitDisabled: true
    }
  },
  mounted() {
    this.fetchData()
    this.type = this.$route.name === 'privateClusterCreate' ? 'private' : 'public'
  },
  methods: {
    async fetchData() {
      await this.loadAccounts()
    },
    async loadMore() {
      if (this.accounts.length === this.accountQuery.total) {
        return
      }
      this.accountQuery.page_number++
      const res = await cloudAccountList('', this.provider, '', this.accountQuery.page_number, this.accountQuery.page_size)
      this.accounts = _.concat(this.accounts, ..._.get(res, 'account_list', []))
    },
    async loadAccounts() {
      const res = await cloudAccountList('', this.provider, '', this.accountQuery.page_number, this.accountQuery.page_size)
      this.accounts = _.get(res, 'account_list', [])
      this.accountQuery.total = _.get(res, 'pager.total', 0)
    },
    async changeProvider() {
      this.account_key = ''
      await this.loadAccounts()
    },
    transferTo(name) {
      this.$router.push({ name })
    },
    deleteAll() {
      this.machines = []
    },
    deleteItem(idx) {
      this.machines.splice(idx, 1)
      this.machines = [...this.machines]
    },
    addItem() {
      this.machines = [...this.machines, {
        test: '未检测',
        instance_ip: '',
        login_name: '',
        login_password: ''
      }]
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请不要上传大于1M的文件',
        type: 'warning'
      })
      return false
    },
    handleUploadSuccess({ results }) {
      this.machines = results.map(i => ({
        test: '未检测',
        instance_ip: i.instance_ip,
        login_name: i.login_name,
        login_password: i.login_password
      }))
    },
    downloadTmp() {
      this.tmpLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['instance_ip', 'login_name', 'login_password']
        excel.export_json_to_excel({
          header: tHeader,
          data: [],
          filename: 'template'
        })
        this.tmpLoading = false
      })
    },
    async checkMachine() {
      const res = await clusterMachineCheck(this.machines.map(i => ({
        ip: i.instance_ip,
        username: i.login_name,
        password: i.login_password
      })))
      if (_.get(res, 'is_all_pass', false)) {
        this.machines = this.machines.map(i => ({
          ...i,
          test: '通过'
        }))
        this.testDisabled = true
        this.submitDisabled = false
        return
      }
      const ipTestStatus = {}
      _.get(res, 'machine_list', []).forEach((i) => {
        ipTestStatus[i.ip] = i.is_pass
      })
      this.machines = this.machines.map(i => ({
        ...i,
        test: ipTestStatus[i.instance_ip] ? '通过' : '未通过'
      }))
    },
    async submit() {
      let res
      let text
      const instance_list = this.machines.map(i => ({
        instance_ip: i.instance_ip,
        login_name: i.login_name,
        login_password: i.login_password
      }))
      switch (this.type) {
        case 'public':
          res = await createCustomPublicCluster(this.cluster.name, this.cluster.desc, this.provider, instance_list)
          text = '录入成功'
          break
        case 'private':
          res = await createCustomPrivateCluster(this.cluster.name, this.cluster.desc, instance_list)
          text = '创建成功'
          break
        default:
      }
      if (res.data.code === 200) {
        this.$message.success(text)
      }
    },
    cancel() {
      if (this.type === 'public') {
        this.$router.push({ name: 'clusterList' })
      }
      if (this.type === 'private') {
        this.$router.push({ name: 'privateCluster' })
      }
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
      min-height: 600px;
      margin: 10px;
      background-color: #ffffff;
      padding: 20px;
      box-shadow: 4px 4px 5px rgba(0, 0, 0, .08);
      .note {
        padding-top: 5px;
        font-size: 13px;
        color: rgb(170, 170,170);
      }
      .insert-machine-notes {
        display: flex;
        flex-direction: row;
        .notes {
          margin-left: 5px;
          font-size: 14px;
          color: rgb(170, 170,170);
        }
      }
      .footer {
        margin-top: 10px;
        display: flex;
        justify-content: center;
      }
    }
    .center-text {
      font-size: 16px;
      height: 36px;
      display: flex;
      padding-right: 30px;
      justify-content: flex-end;
      align-items: center;
    }
    .asterisk {
      display: flex;
      align-items: center;
      padding-right: 5px;
      color: #f4516c;
    }
    .svg {
      width: 100%;
      height: 20px;
    }
  }
</style>
