<template>
  <div class="container">
    <div class="header" style="font-size: 30px;">
      资源申请
    </div>
    <div>
      <span>星云集群</span>
      <el-select
        v-model="selectCluster"
        placeholder="请选择实例所属的星云集群"
        style="width: 400px"
      >
        <el-option
          v-for="item in galaxyClusters"
          :key="item.Id"
          :label="item.Name"
          :value="item.Id"
        />
      </el-select>
    </div>
    <div class="content-part" align="center">
      <div v-for="(item, index) in rowArrList" :key="index" class="flex-part" style="margin-top: 4px">
        <i v-if="rowArrList.length >= 2" class="el-icon-delete" @click="deleteInstance(index)" />
        <p>
          <span>{{ index + 1 }}</span>
          <span>实例组 <el-input v-model="item.name" style="width: 180px" placeholder="请输入实例名" /></span>
          <span class="input" />
          <span>CPU <el-input v-model="item.cpu" style="width: 120px" placeholder="0.000" />核</span>
          <span class="input" />
          <span>内存 <el-input v-model="item.memory" style="width: 120px" placeholder="0.000" /> G</span>
          <span class="input" />
          <span>硬盘 <el-input v-model="item.disk" style="width: 120px" placeholder="0.000" /> G</span>
          <span class="input" />
          <span>数量 <el-input v-model="item.count" style="width: 120px" placeholder="0" /> 台</span>
        </p>
      </div>
      <div class="buttons" align="center"><el-button
        size="medium"
        type="primary"
        @click="addInstance"
      >添加实例组
      </el-button></div>
    </div>
    <div class="buttons" align="center" style="margin-top:100px">
      <el-button
        size="medium"
        type="primary"
        @click="submit"
      >提 交</el-button>
      <el-button
        size="medium"
        @click="cancel"
      >取 消</el-button>
    </div>
  </div>
</template>

<script>
import { getGalaxyClusters } from '@/api/galaxyCloud'
import _ from 'lodash'

export default {
  name: 'ApplyInstance',
  //   directives: { waves },
  data() {
    return {
      rowArrList: [
        {
          name: '',
          cpu: '',
          memory: '',
          disk: '',
          count: ''
        }
      ],
      galaxyClusters: [],
      selectCluster: null
    }
  },
  created() {
    this.getSelectList()
  },
  methods: {
    async getSelectList() {
      const res = await getGalaxyClusters()
      if (res.Status === 'success') {
        this.galaxyClusters = _.get(res, 'Clusters', [])
      } else {
        this.$message.error(res.Message)
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
      this.rowArrList.push({
        name: '',
        cpu: '',
        memory: '',
        disk: '',
        count: ''
      })
    },
    submit() {

    },
    cancel() {

    }

  }
}
</script>

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
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: row;
  }
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
}
</style>
