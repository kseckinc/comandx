<template>
  <div class="container">
    <div class="header">
      <div>
        资源申请
      </div>
    </div>
    <div class="content" style="padding-left: 0">
      <span class="is-required" style="color: #FF4C4C; margin-left:30px">* </span><span>Kubernetes集群</span>
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
      <div v-show="showAvailable" class="statistic">
        可用资源：
        <span class="num">{{ (dataCluster.all_cpu_cores - dataCluster.free_cpu_cores).toFixed(fixed) }}</span> 核 |
        <span class="num">{{ (dataCluster.all_memory_gi - dataCluster.free_memory_gi).toFixed(fixed) }}</span> G |
        <span class="num">{{ ((dataCluster.all_disk_gi - dataCluster.free_disk_gi) / 1024).toFixed(fixed) }}</span> T
      </div>
      <div style="overflow: hidden;margin-top: 10px;">
        <el-button size="medium" type="primary" style="float:left;margin-left: 40px;" @click="addInstance">
          <span class="plus">+</span><span class="text">新建实例组</span>
        </el-button>
        <div class="statistic" style="height: 40px;line-height: 40px">
          总计：
          <span class="num">{{ rowArrList.length }}</span> 实例 |
          <span class="num">{{ showAddCount.cpu.toFixed(fixed) }}</span> 核 |
          <span class="num">{{ showAddCount.memory.toFixed(fixed) }}</span> G |
          <span class="num">{{ showAddCount.disk.toFixed(fixed) }}</span> T
        </div>
      </div>
      <div style="overflow: hidden">
        <div class="tips">
          <i>!</i>提示：用户可设定实例组密码，在获取到实例后使用用户名:root和密码，SSH访问pod实例
        </div>
      </div>
      <div class="content-part">
        <div v-for="(item, index) in rowArrList" :key="index" class="flex-part" style="margin-top: 4px">
          <svg class="svg" style="cursor: pointer" @click="deleteInstance(index)">
            <use xlink:href="#icon-ashbin" />
          </svg>
          <p>
            <span class="index">{{ index + 1 }}</span>
            <span class="group" style="flex-basis: 19%;">实例组 <el-input
              v-model="item.name"
              style="width: 150px; margin: 0 10px"
              placeholder="支持英文和数字"
              @input="inputName(index)"
            /></span>
            <span class="input" />
            <span class="config-item" style="flex-basis: 12%">CPU <el-input
              v-model="item.cpu"
              style="width: 80px; margin: 0 10px"
              placeholder="1.000"
              @input="inputCheck(index,'cpu',item.cpu,true,false)"
              @change="inputCheck(index,'cpu',item.cpu,true,true)"
            /> 核</span>
            <span class="input" />
            <span class="config-item" style="flex-basis: 12%">内存 <el-input
              v-model="item.memory"
              style="width: 80px; margin: 0 10px"
              placeholder="1.000"
              @input="inputCheck(index,'memory',item.memory,true,false)"
              @change="inputCheck(index,'memory',item.memory,true,true)"
            /> G</span>
            <span class="input" />
            <span class="config-item" style="flex-basis: 12%">硬盘 <el-input
              v-model="item.disk"
              style="width: 80px; margin: 0 10px"
              placeholder="1.000"
              @input="inputCheck(index,'disk',item.disk,true,false)"
              @change="inputCheck(index,'disk',item.disk,true,true)"
            /> G</span>
            <span class="input" />
            <span class="config-item" style="flex-basis: 12%">数量 <el-input
              v-model="item.instance_count"
              style="width: 80px; margin: 0 10px"
              placeholder="1"
              type="number"
              @input="inputCheck(index,'instance_count',item.instance_count,false,false)"
              @change="inputCheck(index,'instance_count',item.instance_count,false,true)"
            /> 台</span>
            <span class="input" />
            <span class="config-item" style="flex-basis: 13%">密码 <el-input
              v-model="item.ssh_pwd"
              style="width: 110px; margin: 0 10px"
              placeholder="请输入密码"
              type="password"
              @input="inputPassword(index)"
              @focus="passwordIn"
              @blur="passwordOut"
            /></span>
            <span class="input" />
            <span class="config-item" style="flex-basis: 20%;">合计
              <span>{{ (item.cpu * item.instance_count).toFixed(fixed) }}</span> 核 |
              <span>{{ (item.memory * item.instance_count).toFixed(fixed) }}</span> G |
              <span>{{ (item.disk * item.instance_count / 1024).toFixed(fixed) }}</span> T
            </span>
          </p>
        </div>
      </div>
      <div class="buttons" align="center"><el-button
        size="medium"
        type="primary"
        @click="addInstance"
      >添加实例组
      </el-button></div>
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
        cpu: '',
        memory: '',
        disk: ''
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
        // TODO：可能加入提交验证

        item.kubernetes_id = this.selectCluster
        item.instance_count = Number(item.instance_count)
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
      this.rowArrList[index].name = this.rowArrList[index].name.replace(/[^a-zA-Z0-9]/g, '')
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
        count = parseInt(count).toString()
      }

      this.rowArrList[index][type] = count
      // console.log(index, type, count)

      this.changeData()
    },
    inputPassword(index) {
      let password = this.rowArrList[index].ssh_pwd
      password = password.replace(/[^a-zA-Z0-9]/g, '')
      password = password.substring(0, 6)
      this.rowArrList[index].ssh_pwd = password
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
      this.showAddCount.disk = disk / 1024
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
    margin-right: 35px;

    .num {
      display: inline-block;
      padding: 0 2px;
      color: #409EFF;
    }
  }

  .tips {
    width: 670px;
    margin: 20px 0 0 40px;
    height: 20px;
    line-height: 20px;
    color: #777777;
    float: left;
    font-size: 14px;

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
<<<<<<< HEAD
  .content-part {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    padding: 20px;
    .flex-part {
        display: flex;
        align-items: center;
        i {
            margin-right: 4px;
        }
        >p {
           padding: 10px 0;
            border: 1px solid #ccc;
            display: flex;
            align-items: center;
            >span:not(.input) {
                margin: 0 10px;
            }
        }
    }
    .input{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        border-right: 1px solid #6097b8;
        margin-right: 4px;
    }
}
  .content {
    padding: 10px 0 20px;
    width: 100%;
    height: calc(~"100% - 200px");

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

    .content-part {
      height: calc(~"100% - 100px");
      background: #fff;
      overflow-y: scroll;
      width: 100%;

      .svg {
        width: 35px;
        height: 62px;
        margin-right: 5px;
      }

      .flex-part {
        width: 100%;
        display: flex;
        align-items: center;

        i {
          margin-right: 4px;
        }

        > p {
          width: calc(~"100% - 50px");
          border: 1px solid #ccc;
          box-shadow: 5px 5px 5px #e7e7e7;
          display: flex;
          align-items: center;

          .index {
            width: 20px;
            box-shadow: 5px 0 5px #e7e7e7;
            height: 82px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #ccc;
          }

          .group {
            flex-basis: 24%;
            margin-left: 20px;
          }

          .config-item {
            flex-basis: 19%;
            display: flex;
            justify-content: center;
            align-items: center;

            span {
              padding: 0 5px;
              color: #409EFF;
            }
          }
        }
      }

      .input {
        display: inline-block;
        height: 60px;
        line-height: 40px;
        border-right: 1px solid #80FAFF;
        // margin-right: 4px;
        margin: 0 10px;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
