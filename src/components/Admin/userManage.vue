<template>
  <div>
  <el-col :span="17" style="margin-top:30px">
    <div class="fixHeight">
      <el-table
        :data="tableData"
        :default-sort = "{prop: 'state', order: 'ascending'}"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="用户姓名">
                <span>{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ props.row.telephone }}</span>
              </el-form-item>
              <el-form-item label="城市">
                <span>{{ props.row.city }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.gender === 1 ? '男' : props.row.gender === 2 ? '女' : '不详' }}</span>
              </el-form-item>
              <el-form-item label="签名">
                <span>{{ props.row.motto }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          align='center'
          label="用户ID"
          prop="id">
        </el-table-column>
        <el-table-column
          align='center'
          label="用户姓名"
          prop="account">
        </el-table-column>
        <el-table-column
          align='center'
          sortable
          prop="state"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type= "info"
              v-if= "+scope.row.state === 0 ? true : false"
              @click="handleReview(scope.$index, scope.row)">{{+scope.row.state === 0 ? '禁用' : '正常'}}</el-button>
            <el-button
              size="mini"
              type="success"
              v-else
              @click="handleReview(scope.$index, scope.row)">{{+scope.row.state === 0 ? '禁用' : '正常'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="mypagination"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="totalNum">
    </el-pagination>
  </el-col>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'

export default {
  data () {
    return {
      tableData: [{
        id: '',
        account: '',
        telephone: '',
        city: '',
        gender: '',
        motto: '',
        state: ''
      }],
      currentPage: 1,
      totalNum: 0
    }
  },
  methods: {
    init () {
      let params = {
        currentPage: this.currentPage,
        pageSize: 10
      }
      // 获取用户
      axios.post('/api/userAdmin', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.totalNum = response.data.totalNum
            this.tableData = response.data.result
          } else {
            this.$message({
              type: 'error',
              message: '网络故障，请稍后重试！',
              duration: 3000
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '网络故障，请稍后重试！',
            duration: 3000
          })
        })
    },
    handleReview (index, row) {
      console.log(index, row)
      let params = {
        id: row.id,
        state: +row.state === 0 ? 1 : 0
      }
      axios.post('/api/userAdmin/review', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            this.$message({// notify
              type: 'success',
              message: '审核成功!',
              duration: 3000
            })
            setTimeout(() => {
              this.init()
            }, 10)
          } else {
            this.$message({
              type: 'error',
              message: '网络故障，请稍后重试！',
              duration: 3000
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            type: 'error',
            message: '网络故障，请稍后重试！',
            duration: 3000
          })
        })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.init()
    }
  },
  mounted: function () {
  },
  created () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
  .fixHeight {
    min-height: 560px;
  }
  .mypagination {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
