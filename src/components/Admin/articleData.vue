<template>
  <div>
    <div style="width: 78%;float:right;height:300px;-webkit-tap-highlight-color: transparent; user-select: none; position: relative;" id="echartss"></div>
    <div style="width: 78%;float:right;height:300px;-webkit-tap-highlight-color: transparent; user-select: none; position: relative;" id="echartss2"></div>
  </div>
</template>
<script>
// 先要导入依赖的实例
import echarts from 'echarts'
import axios from 'axios'
export default {
  // 在echarts_option中写东西就行了，官方文档直接下这里就可以自己玩了
  data () {
    return {
      echarts1_option: {
        // 需要的话下面内容copy到主体代码块即可
        backgroundColor: '#F5F5F5',
        // 标题
        title: {
          text: '游记分类统计',
          // subtext: '更新于' + this.nowdate,
          x: 'center'
        },
        // 弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: 'item', // 以具体项目触发弹窗
          /*
          内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
          value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示
          */
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例，选择要显示的项目
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 200,
          top: 20,
          bottom: 20,
          data: ['周边游', '境内游', '国际游'] // 注意要和数据的name相对应
        },
        // 工具箱
        toolbox: {
          show: true, // 显示工具箱
          right: 200,
          feature: {
            dataView: {show: true}, // 以文字形式显示数据
            restore: {show: true}, // 还原
            // dataZoom:{show:true}, // 区域缩放
            saveAsImage: {show: true} // 保存图片
            // magicType:{type:['line','bar']}//动态数据切换，数据显示可以在该规定内容中切换显示方式，
          }
        },
        // 数据
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 335, name: '周边游'},
              {value: 310, name: '境内游'},
              {value: 274, name: '国际游'}
            ].sort(function (a, b) { return a.value - b.value }),
            // roseType: 'radius', // 角度和半径展现百分比，'area'只用半径展现
            // label: { // 饼图图形的文本标签
            //   normal: { // 下同，normal指在普通情况下样式，而非高亮时样式
            //     textStyle: {
            //       color: 'rgba(255, 255, 255, 0.3)'
            //     }
            //   }
            // },
            // labelLine: { // 引导线样式
            //   normal: {
            //     lineStyle: {
            //       color: 'rgba(255, 255, 255, 0.3)'
            //     },
            //     smooth: 0.5, // 0-1，越大越平滑弯曲
            //     length: 10, // 从块到文字的第一段长
            //     length2: 20 // 拐弯到文字的段长
            //   }
            // },
            itemStyle: { // 图例样式
              emphasis: {
                // color: '#97413c',
                shadowBlur: 50, // 阴影模糊程度
                shadowColor: 'rgba(0, 0, 0, 0.5)'// 阴影颜色，一般黑
              }
            },
            animationType: 'scale', // 初始动画效果，scale是缩放，expansion是展开
            animationEasing: 'elasticOut', // 初始动画缓动效果
            animationDelay: function (idx) { // 数据更新动画时长，idx限定了每个数据块从无到有的速度
              return Math.random() * 200
            }
          }
        ]
      },
      echarts2_option: {
        // 需要的话下面内容copy到主体代码块即可
        backgroundColor: '#F5F5F5',
        // 标题
        title: {
          text: '用户性别统计',
          // subtext: '更新于' + this.nowdate,
          x: 'center'
        },
        // 弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: 'item', // 以具体项目触发弹窗
          /*
          内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
          value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示
          */
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例，选择要显示的项目
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 200,
          top: 20,
          bottom: 20,
          data: ['男', '女', '保密'] // 注意要和数据的name相对应
        },
        // 工具箱
        toolbox: {
          show: true, // 显示工具箱
          right: 200,
          feature: {
            dataView: {show: true}, // 以文字形式显示数据
            restore: {show: true}, // 还原
            // dataZoom:{show:true}, // 区域缩放
            saveAsImage: {show: true} // 保存图片
            // magicType:{type:['line','bar']}//动态数据切换，数据显示可以在该规定内容中切换显示方式，
          }
        },
        // 数据
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 335, name: '男'},
              {value: 310, name: '女'},
              {value: 274, name: '保密'}
            ].sort(function (a, b) { return a.value - b.value }),
            // roseType: 'radius', // 角度和半径展现百分比，'area'只用半径展现
            // label: { // 饼图图形的文本标签
            //   normal: { // 下同，normal指在普通情况下样式，而非高亮时样式
            //     textStyle: {
            //       color: 'rgba(255, 255, 255, 0.3)'
            //     }
            //   }
            // },
            // labelLine: { // 引导线样式
            //   normal: {
            //     lineStyle: {
            //       color: 'rgba(255, 255, 255, 0.3)'
            //     },
            //     smooth: 0.5, // 0-1，越大越平滑弯曲
            //     length: 10, // 从块到文字的第一段长
            //     length2: 20 // 拐弯到文字的段长
            //   }
            // },
            itemStyle: { // 图例样式
              emphasis: {
                // color: '#97413c',
                shadowBlur: 50, // 阴影模糊程度
                shadowColor: 'rgba(0, 0, 0, 0.5)'// 阴影颜色，一般黑
              }
            },
            animationType: 'scale', // 初始动画效果，scale是缩放，expansion是展开
            animationEasing: 'elasticOut', // 初始动画缓动效果
            animationDelay: function (idx) { // 数据更新动画时长，idx限定了每个数据块从无到有的速度
              return Math.random() * 200
            }
          }
        ]
      }
    }
  },
  // 挂载前初始化echarts实例
  mounted: function () {
    // 基于准备好的dom，初始化echarts实例
    // let myChart = echarts.init(document.getElementById('echartss'))
    // // 绘制图表，this.echarts1_option是数据
    // myChart.setOption(this.echarts1_option)
    // // 基于准备好的dom，初始化echarts实例
    // let myChart2 = echarts.init(document.getElementById('echartss2'))
    // // 绘制图表，this.echarts1_option是数据
    // myChart2.setOption(this.echarts2_option)
  },
  methods: {
    init () {
      const thisdate = new Date()
      const Y = thisdate.getFullYear()
      const M = thisdate.getMonth()
      const D = thisdate.getDate()
      const H = thisdate.getHours()
      const N = thisdate.getMinutes()
      const S = thisdate.getSeconds()
      this.echarts1_option.title.subtext = '更新于' + ' ' + Y + '-' + M + '-' + D + ' ' + H + ':' + N + ':' + S
      this.echarts2_option.title.subtext = '更新于' + ' ' + Y + '-' + M + '-' + D + ' ' + H + ':' + N + ':' + S
      axios.post('/api/dataAdmin')
        .then((response) => {
          if (response.data.code === 200) {
            console.log(response.data)
            this.echarts1_option.series[0].data = [
              {value: response.data.result[0].num, name: '周边游', itemStyle: { color: '#FFD39B' }},
              {value: response.data.result[1].num, name: '境内游', itemStyle: { color: '#EE799F' }},
              {value: response.data.result[2].num, name: '国际游', itemStyle: { color: '#DBDBDB' }}
            ].sort(function (a, b) { return a.value - b.value })
            let myChart = echarts.init(document.getElementById('echartss'))
            // 绘制图表，this.echarts1_option是数据
            myChart.setOption(this.echarts1_option)
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
      axios.post('/api/dataAdmin/gender')
        .then((response) => {
          if (response.data.code === 200) {
            console.log(response.data)
            this.echarts2_option.series[0].data = [
              {value: response.data.result[0].num, name: '男', itemStyle: { color: '#91D5DB' }},
              {value: response.data.result[1].num, name: '女', itemStyle: { color: '#DEF2A7' }},
              {value: response.data.result[2].num, name: '保密', itemStyle: { color: '#BF86AE' }}
            ].sort(function (a, b) { return a.value - b.value })
            let myChart2 = echarts.init(document.getElementById('echartss2'))
            // 绘制图表，this.echarts1_option是数据
            myChart2.setOption(this.echarts2_option)
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
    }
  },
  created () {
    this.init()
  }
}
</script>
