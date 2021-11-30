<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <div class="search-item">
          <span class="label">实例组名称</span>
          <el-input v-model="search.name" size="medium" placeholder="输入实例组名称搜索" clearable style="width: 200px" @change="fetchData" />
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
        <el-button size="medium" :disabled="selectInstanceGroups.length !== 1" @click="reboot">重启</el-button>
        <el-button size="medium" :disabled="selectInstanceGroups.length < 1" @click="handleDelete">删除</el-button>
      </div>
      <div class="table">
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          fit
          highlight-current-row
          size="medium"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="ID" prop="Id" align="center" />
          <el-table-column label="实例组名" min-width="100px" align="center">
            <template slot-scope="{row}">
              {{ row.Name }}
            </template>
          </el-table-column>
          <el-table-column label="实例组机型" width="150px" align="center">
            <template slot-scope="{row}">
              {{ row.Cpu }}核/ {{ row.Memory }}G /{{ row.Disk }}G
            </template>
          </el-table-column>
          <el-table-column label="运行实例数" width="150px" align="center">
            <template slot-scope="{row}">
              {{ row.instance_count }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="process(scope.row)"
              >扩缩容</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page_number" :limit.sync="listQuery.page_size" @pagination="fetchData" />
      </div>
    </div>
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
  }
</style>

<script>
import { getGalaxyClusters, galaxyCloudDelete } from '@/api/galaxyCloud'
import Pagination from '@/components/Pagination'
import loadMore from '@/directive/el-select-load-more'
import _ from 'lodash'

export default {
  name: 'InstanceGroup',
  components: { Pagination },
  directives: {
    loadMore
  },
  data() {
    return {
      accounts: [],
      list: null,
      total: 0,
      listLoading: true,
      search: {
        name: ''
      },
      listQuery: {
        page_number: 1,
        page_size: 10
      },
      selectInstanceGroups: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const res = await getGalaxyClusters()
      if (res.Status === 'success') {
        this.list = _.get(res, 'Clusters', [])
      } else {
        this.$message.error(res.Message)
      }
      this.listLoading = false
    },
    resetSearch() {
      this.search = {
        name: ''
      }
    },
    handleSelectionChange(val) {
      this.selectInstanceGroups = val
    },

    applyInstance() {
      this.$router.push({ name: 'galaxyCloudInstanceApply' })
    },
    async reboot() {

    },
    async handleDelete() {
      const res = await galaxyCloudDelete(this.selectInstanceGroups.map(i => i.Id))
      if (res.data.Status === 'success') {
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
      this.fetchData()
    }
  }
}
</script>
