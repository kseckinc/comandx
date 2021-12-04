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
          <el-table-column label="ID" prop="id" align="center" />
          <el-table-column label="实例组名" min-width="100px" align="center">
            <template slot-scope="{row}">
              {{ row.name }}
            </template>
          </el-table-column>
          <el-table-column label="实例组机型" width="150px" align="center">
            <template slot-scope="{row}">
              {{ row.cpu }}核/ {{ row.memory }}G /{{ row.disk }}G
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

    <el-dialog title="实例组伸缩" :visible="dialogVisible" width="20%" @close="cancelDialog">
      <div>
        <el-form
          ref="dialogForm"
          :model="dialogForm"
          label-width="120px"
          label-position="right"
          style="margin-left:50px"
        >
          <el-form-item label="实例组名">
            <span>{{ curRowName }}</span>
          </el-form-item>
          <el-form-item label="运行实例数">
            <div>
              <el-input
                v-model="dialogForm.instance_count"
                prop="instance_count"
                style="width: 120px"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <div><el-button type="primary" @click="submitDialog">提交</el-button>
              <el-button @click="cancelDialog">取消</el-button></div>
          </el-form-item>
        </el-form>

      </div>

    </el-dialog>
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
import { getInstanceGroupList, instanceGroupDelete, instanceGroupExpandOrShrink } from '@/api/galaxyCloud'
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
      selectInstanceGroups: [],
      curRowName: '',
      curRowId: '',
      dialogVisible: false,
      dialogForm: {
        instance_count: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      const params = {
        ...this.listQuery,
        ...this.search
      }
      const res = await getInstanceGroupList(params)
      if (res.status === 'success') {
        this.list = _.get(res, 'instance_groups', [])
        this.total = res.pager.total
      } else {
        this.$message.error(res.message)
      }
      this.listLoading = false
    },
    resetSearch() {
      this.search = {
        name: ''
      }
      this.listQuery = {
        page_num: 1,
        page_size: 10
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
      const params = {
        'ids': this.selectInstanceGroups.map(i => Number(i.id))
      }
      const res = await instanceGroupDelete(params)
      if (res.data.status === 'success') {
        this.$message.success('删除成功')
      } else {
        this.$message.error('删除失败')
      }
      this.fetchData()
    },
    process(row) {
      this.curRowName = row.name
      this.curRowId = row.id
      this.dialogForm.instance_count = row.instance_count
      this.dialogVisible = true
    },
    cancelDialog() {
      this.dialogVisible = false
    },
    async submitDialog() {
      const data = {
        'instance_group_id': Number(this.curRowId),
        'count': Number(this.dialogForm.instance_count)
      }
      const res = await instanceGroupExpandOrShrink(data)
      if (res.status === 'success') {
        this.$message.success('提交成功')
        this.dialogVisible = false
        this.fetchData()
      } else {
        this.$message.error('提交失败')
      }
    }
  }
}
</script>
