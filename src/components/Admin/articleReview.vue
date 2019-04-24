<template>
  <div>
  <el-col :span="17" style="margin-top:30px">
    <div class="fixHeight">
      <el-table
        :data="tableData5"
        :default-sort = "{prop: 'review', order: 'ascending'}"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文章ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="文章标题">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="文章作者">
                <span>{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="发布时间">
                <span>{{ props.row.createDate }}</span>
              </el-form-item>
              <el-form-item label="出发地">
                <span>{{ props.row.source }}</span>
              </el-form-item>
              <el-form-item label="目的地">
                <span>{{ props.row.destination }}</span>
              </el-form-item>
              <el-form-item label="行程天数">
                <span>{{ props.row.tripDay }}</span>
              </el-form-item>
              <el-form-item label="行程费用">
                <span>{{ props.row.tripPay }}</span>
              </el-form-item>
              <el-form-item label="游记分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          align='center'
          label="文章ID"
          prop="id">
        </el-table-column>
        <el-table-column
          align='center'
          label="文章标题"
          prop="title">
        </el-table-column>
        <el-table-column
          align='center'
          sortable
          prop="review"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="mini"
              type= "info"
              v-if= "+scope.row.review === 0 ? true : false"
              @click="handleReview(scope.$index, scope.row)">{{+scope.row.review === 0 ? '&nbsp;&nbsp;待审核&nbsp;&nbsp;' : '审核通过'}}</el-button>
            <el-button
              size="mini"
              type="success"
              v-else
              @click="handleReview(scope.$index, scope.row)">{{+scope.row.review === 0 ? '&nbsp;&nbsp;待审核&nbsp;&nbsp;' : '审核通过'}}</el-button>
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
// import { setTimeout } from 'timers'
export default {
  data () {
    return {
      tableData5: [{
        id: '12987122',
        title: '冰岛游记',
        account: '徐欣奕',
        createDate: '2019-3-17 00:25:52',
        source: '上海',
        destination: '冰岛',
        tripDay: '5',
        tripPay: '123',
        category: '出境游'
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
      // 获取点赞数量
      axios.post('/api/articleAdmin', qs.stringify(params))
        .then((response) => {
          if (response.data.code === 200) {
            response.data.result.forEach(element => {
              let date = new Date(element.createDate)
              const y = date.getFullYear()
              const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + parseInt(date.getMonth() + 1)
              const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
              const h = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
              const m = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
              const s = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
              var res = y + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
              console.log(res, 'xuxy')
              element.createDate = res
            })
            response.data.result.forEach(element => {
              if (+element.category === 1) {
                element.category = '周边游'
              } else if (+element.category === 2) {
                element.category = '自驾游'
              } else if (+element.category === 3) {
                element.category = '国内游'
              } else if (+element.category === 4) {
                element.category = '国内游'
              } else {
                element.category = '其他'
              }
            })
            this.totalNum = response.data.totalNum
            this.tableData5 = response.data.result
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
    handleDetail (index, row) {
      console.log(index, row)
      this.$router.push(`/admin/articledetail/${row.id}`)
    },
    handleReview (index, row) {
      console.log(index, row)
      let params = {
        id: row.id,
        review: +row.review === 0 ? 1 : 0
      }
      axios.post('/api/articleAdmin/review', qs.stringify(params))
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
