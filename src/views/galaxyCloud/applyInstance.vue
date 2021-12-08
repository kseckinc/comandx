<template>
  <div class="container">
    <div class="header">
      <div class="statistic">
        合计：<span class="num">{{ rowArrList.length }}</span> 实例
      </div>
      <div>
        资源申请
      </div>
      <hr color="#80FAFF">
    </div>
    <div class="content">
      <span class="is-required" style="color: #FF4C4C; margin-left: 40px">* </span><span>Kubernetes集群</span>
      <el-select
        v-model="selectCluster"
        placeholder="请选择实例所属的Kubernetes集群"
        style="width: 400px; margin-left:10px"
      >
        <el-option
          v-for="item in galaxyClusters"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <div class="create-instance" @click="addInstance">
        <span class="plus">+</span><span class="text">新建实例组</span>
      </div>
      <div class="content-part">
        <div v-for="(item, index) in rowArrList" :key="index" class="flex-part" style="margin-top: 4px">
          <svg class="svg" style="cursor: pointer" @click="deleteInstance(index)">
            <use xlink:href="#icon-ashbin" />
          </svg>
          <p>
            <span class="index">{{ index + 1 }}</span>
            <span class="group">实例组 <el-input
              v-model="item.name"
              style="width: 180px; margin: 0 10px"
              placeholder="请输入实例组名称"
              @input="inputName(index)"
            /></span>
            <span class="input" />
            <span class="config-item">CPU <el-input
              v-model="item.cpu"
              style="width: 120px; margin: 0 10px"
              placeholder="1.000"
              @input="inputCheck(index,'cpu',item.cpu,true,false)"
              @change="inputCheck(index,'cpu',item.cpu,true,true)"
            /> 核</span>
            <span class="input" />
            <span class="config-item">内存 <el-input
              v-model="item.memory"
              style="width: 120px; margin: 0 10px"
              placeholder="1.000"
              @input="inputCheck(index,'memory',item.memory,true,false)"
              @change="inputCheck(index,'memory',item.memory,true,true)"
            /> G</span>
            <span class="input" />
            <span class="config-item">硬盘 <el-input
              v-model="item.disk"
              style="width: 120px; margin: 0 10px"
              placeholder="1.000"
              @input="inputCheck(index,'disk',item.disk,true,false)"
              @change="inputCheck(index,'disk',item.disk,true,true)"
            /> G</span>
            <span class="input" />
            <span class="config-item">数量 <el-input
              v-model="item.instance_count"
              style="width: 120px; margin: 0 10px"
              placeholder="1"
              type="number"
              @input="inputCheck(index,'instance_count',item.instance_count,false,false)"
              @change="inputCheck(index,'instance_count',item.instance_count,false,true)"
            /> 台</span>
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
import { instancGroupBatchCreate, getGalaxyClusters } from '@/api/galaxyCloud'
import _ from 'lodash'
import { checkBridgX } from '@/api/cloud'
import { checkSchedulX } from '@/api/service'

export default {
  name: 'ApplyInstance',
  data() {
    return {
      rowArrList: [],
      galaxyClusters: [],
      selectCluster: null,
      groupItem: {
        kubernetes_id: 0,
        name: '',
        cpu: '1.000',
        memory: '1.000',
        disk: '1.000',
        instance_count: '1'
      }
    }
  },
  created() {
    this.getSelectList()
    this.addInstance()
    this.test()
  },
  methods: {
    async test() {
      const bres = await checkBridgX()
      const sres = await checkSchedulX()
      console.log(bres)
      console.log(sres.code === 'ECONNREFUSED')
    },
    async getSelectList() {
      const res = await getGalaxyClusters()
      if (res.status === 'success') {
        this.galaxyClusters = _.get(res, 'clusters', [])
      } else {
        this.$message.error(res.message)
      }
    },
    deleteInstance(index) {
      if (this.rowArrList.length <= 1) {
        return
      }
      this.rowArrList.splice(index, 1)
    },
    addInstance() {
      if (this.rowArrList.length >= 100) {
        return
      }
      this.rowArrList.push({ ...this.groupItem })
    },
    async submit() {
      if (!this.selectCluster) {
        alert('未选择集群')
        return
      }

      for (let i = 0, n = this.rowArrList.length; i < n; i++) {
        const item = this.rowArrList[i]

        if (item.name === '') {
          alert('实例组名不可为空')
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
    inputName(index) {
      this.rowArrList[index].name = this.rowArrList[index].name.replace(/[^a-zA-Z0-9]/g, '')
    },
    inputCheck(index, type, count, isFloat, isChange) {
      const nCount = Number(count)
      Number.isNaN(nCount) && (count = isChange ? '1.000' : '0');
      (nCount <= 0 && isChange) && (count = '1.000')

      const fCount = count.toString().split('.')
      if (isFloat) { // 保留小数
        if (isChange) { // 修改
          if (typeof fCount[1] === 'undefined') { // 没有小数
            count += '.000'
          } else { // 有小数
            if (fCount[1].length < 3) { // 未满3位
              fCount[1].length < 2 && (fCount[1] += '00')
              fCount[1].length < 3 && (fCount[1] += '0')
            } else if (fCount[1].length >= 3) { // 已满3位
              fCount[1] = fCount[1].substring(0, 3)
            }
            count = fCount[0] + '.' + fCount[1]
          }
        } else { // 输入
          if (typeof fCount[1] !== 'undefined' && fCount[1].length >= 3) {
            fCount[1] = fCount[1].substring(0, 3)
            count = fCount[0] + '.' + fCount[1]
          }
        }
      } else { // 不保留小数
        count = parseInt(count)
      }

      this.rowArrList[index][type] = count
      // console.log(index, type, count);
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

    .num {
      display: inline-block;
      padding: 0 5px;
      color: blue;
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
    padding: 20px 0 20px 20px;
    width: 100%;
    height: calc(~"100% - 200px");

    .create-instance {
      display: flex;
      width: calc(~"100% - 65px");
      justify-content: center;
      margin: 10px 0 0 40px;
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
      margin-top: 10px;
      height: calc(~"100% - 100px");
      background: #fff;
      overflow-y: scroll;
      width: 100%;

      .svg {
        width: 40px;
        padding: 5px;
        height: 62px;
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
          box-shadow: 5px 5px 5px #b0afaf;
          display: flex;
          align-items: center;

          .index {
            width: 50px;
            box-shadow: 5px 0 5px #b0afaf;
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
