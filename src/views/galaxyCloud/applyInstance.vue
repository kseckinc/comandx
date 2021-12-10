<template>
  <div class="container">
    <div class="header">
      <div>
        资源申请
      </div>
    </div>
    <div class="content" style="padding-left: 0">
      <span class="is-required" style="color:#FF4C4C;">* </span><span>Kubernetes集群</span>
      <el-select
        v-model="selectCluster"
        placeholder="请选择实例所属的Kubernetes集群"
        style="width: 400px; margin-left:10px"
        @change="selectChange"
      >
        <el-option
          v-for="item in galaxyClusters"
          :key="item.cluster_id"
          :label="item.cluster_name"
          :value="item.cluster_id"
        />
      </el-select>
      <div v-show="showAvailable" class="statistic" style="line-height:40px">
        可用资源：
        <span class="num">{{ Number(dataCluster.free_cpu_cores).toFixed(fixed) }}</span> 核 |
        <span class="num">{{ Number(dataCluster.free_memory_gi).toFixed(fixed) }}</span> G |
        <span class="num">{{ Number(dataCluster.free_disk_gi).toFixed(fixed) }}</span> G
      </div>
      <div style="overflow:hidden;margin-top:15px;width:100%;">
        <el-button size="medium" type="primary" style="float:left;" @click="addInstance">
          <span class="plus">+</span><span class="text">新建实例组</span>
        </el-button>
        <div class="statistic" style="height:40px;line-height:40px">
          总计：
          <span class="num">{{ rowArrList.length }}</span> 实例 |
          <span class="num">{{ showAddCount.cpu.toFixed(fixed) }}</span> 核 |
          <span class="num">{{ showAddCount.memory.toFixed(fixed) }}</span> G |
          <span class="num">{{ showAddCount.disk.toFixed(fixed) }}</span> G
        </div>
      </div>
      <div class="box-table">
        <div class="tips">
          <i>!</i>提示：用户可设定实例组密码，在获取到实例后使用用户名:root和密码，SSH访问pod实例
        </div>
        <el-table :data="rowArrList" border>
          <el-table-column align="center" width="50px">
            <template slot-scope="{ $index }">
              {{ $index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="实例组" align="center">
            <template slot-scope="{ $index,row }">
              <el-input
                v-model="row.name"
                style="width:100%;"
                placeholder="支持小写英文和数字"
                @input="inputName($index)"
              />
            </template>
          </el-table-column>
          <el-table-column label="CPU（核）" align="center">
            <template slot-scope="{ $index,row }">
              <el-input
                v-model="row.cpu"
                style="width:100%;"
                placeholder="精度支持3位小数"
                @input="inputCheck($index,'cpu',row.cpu,true,false)"
                @change="inputCheck($index,'cpu',row.cpu,true,true)"
              />
            </template>
          </el-table-column>
          <el-table-column label="内存（G）" align="center">
            <template slot-scope="{ $index,row }">
              <el-input
                v-model="row.memory"
                style="width:100%;"
                placeholder="精度支持3位小数"
                @input="inputCheck($index,'memory',row.memory,true,false)"
                @change="inputCheck($index,'memory',row.memory,true,true)"
              />
            </template>
          </el-table-column>
          <el-table-column label="硬盘（G）" align="center">
            <template slot-scope="{ $index,row }">
              <el-input
                v-model="row.disk"
                style="width:100%;"
                placeholder="精度支持3位小数"
                @input="inputCheck($index,'disk',row.disk,true,false)"
                @change="inputCheck($index,'disk',row.disk,true,true)"
              />
            </template>
          </el-table-column>
          <el-table-column label="数量（个）" align="center">
            <template slot-scope="{ $index,row }">
              <el-input
                v-model="row.instance_count"
                style="width:100%;"
                placeholder="精度支持整数"
                @input="inputCheck($index,'instance_count',row.instance_count,false,false)"
                @change="inputCheck($index,'instance_count',row.instance_count,false,true)"
              /></template>
          </el-table-column>
          <el-table-column label="密码" align="center">
            <template slot-scope="{ $index,row }">
              <el-input
                v-model="row.ssh_pwd"
                type="password"
                style="width:100%;"
                placeholder="最大长度6位"
                maxlength="6"
                @input="inputPassword($index)"
                @focus="passwordIn"
                @blur="passwordOut"
              />
            </template>
          </el-table-column>
          <el-table-column label="合计" align="center" width="100px">
            <template slot-scope="{ row }">
              <span style="color:#409EFF;">{{ (row.cpu * row.instance_count).toFixed(fixed) }}</span> 核<br>
              <span style="color:#409EFF;">{{ (row.memory * row.instance_count).toFixed(fixed) }}</span> G<br>
              <span style="color:#409EFF;">{{ (row.disk * row.instance_count).toFixed(fixed) }}</span> G
            </template>
          </el-table-column>
          <el-table-column align="center" width="50px">
            <template slot-scope="{ $index }">
              <svg
                class="svg"
                style="cursor:pointer;width:30px;height:30px;margin-top:5px;"
                @click="deleteInstance($index)"
              >
                <use xlink:href="#icon-ashbin" />
              </svg>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="buttons">
      <el-button
        size="medium"
        type="primary"
        @click="submit"
      >提 交
      </el-button>
      <el-button
        size="medium"
        @click="cancel"
      >取 消
      </el-button>
    </div>
  </div>
</template>

<script>
import { instancGroupBatchCreate, clustersSummary } from '@/api/galaxyCloud'
import _ from 'lodash'

export default {
  name: 'ApplyInstance',
  data() {
    return {
      rowArrList: [],
      galaxyClusters: [],
      selectCluster: null,
      showAvailable: false,
      showAddCount: {
        cpu: 0,
        memory: 0,
        disk: 0
      },
      groupItem: {
        kubernetes_id: 0,
        name: '',
        cpu: '1.000',
        memory: '1.000',
        disk: '1.000',
        instance_count: '1',
        ssh_pwd: ''
      },
      dataCluster: {
        cluster_id: '', // id
        cluster_name: '', // 名称
        all_cpu_cores: '', // 所有cpu数量
        free_cpu_cores: '', // 已经分配cpu数量
        all_memory_gi: '', // 集群内存总数
        free_memory_gi: '', // 已经分配内存
        all_disk_gi: '', // 磁盘大小
        free_disk_gi: '' // 已经分配磁盘大小
      },
      fixed: 3
    }
  },
  created() {
    this.getSelectList()
    this.addInstance()
  },
  methods: {
    async getSelectList() {
      const res = await clustersSummary(1, 50, '', '')
      if (res.status === 'success') {
        this.galaxyClusters = _.get(res, 'clusters', [])
      } else {
        this.$message.error(res.message)
      }
    },
    deleteInstance(index) {
      if (this.rowArrList.length <= 0) return
      this.rowArrList.splice(index, 1)

      this.changeData()
    },
    addInstance() {
      if (this.rowArrList.length >= 100) {
        return
      }
      this.rowArrList.push({ ...this.groupItem })

      this.changeData()
    },
    async submit() {
      if (!this.selectCluster) {
        this.$message('未选择K8s集群')
        return
      }

      if (this.rowArrList.length === 0) {
        this.$message('未添加实例组')
        return
      }

      for (let i = 0, n = this.rowArrList.length; i < n; i++) {
        const item = this.rowArrList[i]

        if (item.name === '') {
          this.$message('实例组名不可为空')
          return
        }

        if (item.ssh_pwd === '') {
          this.$message('密码不可为空')
          return
        }

        item.kubernetes_id = this.selectCluster
        item.instance_count = Number(item.instance_count)
      }

      if (this.showAddCount.cpu > Number(this.dataCluster.free_cpu_cores)) {
        this.$message('CPU总计超过可用数值')
        return
      }
      if (this.showAddCount.memory > Number(this.dataCluster.free_memory_gi)) {
        this.$message('内存总计超过可用数值')
        return
      }
      if (this.showAddCount.disk > Number(this.dataCluster.free_disk_gi)) {
        this.$message('硬盘总计超过可用数值')
        return
      }

      const res = await instancGroupBatchCreate(this.rowArrList)
      if (res.data.status === 'success') {
        this.$message.success('创建成功')
        this.$router.push({ name: 'galaxyCloudInstanceGroup' })
      } else {
        this.$message.error('创建失败')
      }
    },
    cancel() {
      this.rowArrList = []
    },
    async selectChange() {
      if (!this.selectCluster) {
        this.showAvailable = false
        for (const key in this.dataCluster) this.dataCluster[key] = ''
        return
      }

      this.showAvailable = true
      this.dataCluster = this.galaxyClusters.find(v => {
        return v.cluster_id === this.selectCluster
      })
    },
    inputName(index) {
      this.rowArrList[index].name = this.rowArrList[index].name.replace(/[^a-z0-9]/g, '')
    },
    inputCheck(index, type, count, isFloat, isChange) {
      let nCount = Number(count)

      if (isChange && (Number.isNaN(nCount) || nCount <= 0)) {
        count = '1'
        nCount = 1
      }

      if (isFloat) {
        const fCount = count.toString().split('.')
        if (isChange || (fCount.length > 1 && fCount[1].length > this.fixed)) count = nCount.toFixed(3).toString()
      } else {
        count !== '' && (count = parseInt(count).toString())
      }

      this.rowArrList[index][type] = count
      // console.log(index, type, count)

      this.changeData()
    },
    inputPassword(index) {
      this.rowArrList[index].ssh_pwd = this.rowArrList[index].ssh_pwd.replace(/[^a-zA-Z0-9]/g, '')
    },
    passwordIn(event) {
      event.target.type = 'text'
    },
    passwordOut(event) {
      event.target.type = 'password'
    },
    changeData() {
      let cpu = 0
      let memory = 0
      let disk = 0

      this.rowArrList.forEach((v) => {
        cpu += v.cpu * v.instance_count
        memory += v.memory * v.instance_count
        disk += v.disk * v.instance_count
      })

      this.showAddCount.cpu = cpu
      this.showAddCount.memory = memory
      this.showAddCount.disk = disk
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  height: 98%;
  width: calc(~"100% - 20px");
  margin: 10px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.08);

  .header {
    padding: 10px;
    font-size: 20px;
  }

  .statistic {
    float: right;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
    margin-right: 10px;

    .num {
      display: inline-block;
      padding: 0 2px;
      color: #409EFF;
    }
  }

  .tips {
    width: 100%;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
    color: #777777;
    font-size: 14px;
    border: 1px solid #EBEEF5;
    border-bottom: none;
    padding: 0 5px;

    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 10px;
      border: 2px solid #ff0000;
      color: #ff0000;
      font-size: 12px;
      line-height: 18px;
      border-radius: 50%;
      text-align: center;
      font-style: normal;
      font-weight: bolder;
    }
  }

  .content {
    padding: 10px 0 20px;
    width: 100%;
    height: calc(~"100% - 100px");

    .create-instance {
      display: flex;
      width: calc(~"100% - 65px");
      justify-content: center;
      margin: 15px 35px;
      padding: 10px;
      border: 2px dashed #80FAFF;
      border-radius: 5px;
      color: #8080ff;
      font-size: 16px;
      cursor: pointer;

      .plus {
        display: inline-block;
        padding: 0 10px;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
  }

  .box-table {
    height: calc(~'100% - 100px');
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
