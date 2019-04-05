<template>
<div>
  <span class="search-span">地点搜索</span>
  <el-input class="search" v-model="searchResult" id="search" @blur="searchByStationName"></el-input>
  <div id="myMap" v-bind:style="mapStyle"></div></div>
</template>

<script>
import BMap from 'BMap'
export default {
  name: 'BMapComponent',
  data () {
    return {
      searchResult: '杭州市',
      mapStyle: {
        width: '100%',
        height: `${this.mapHeight}px`
      },
      map: null,
      longitude: 120.021525,
      latitude: 30.298227
    }
  },
  watch: {
    isChangeArea: {
      handler () {
        this.setNewPoint(this.longitude, this.latitude)
      }
    }
  },
  props: {
    isChangeArea: {
      type: Boolean,
      default: false
    },
    // 地图在该视图上的高度
    mapHeight: {
      type: Number,
      default: 350
    },
    // // 经度
    // longitude: {
    //   type: Number,
    //   default: 120.021525
    // },
    // // 纬度
    // latitude: {
    //   type: Number,
    //   default: 30.298227
    // },
    description: {
      type: String,
      default: '杭州师范大学'
    },
    isEdit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setMap () {
      // 创建地图实例
      this.map = new BMap.Map('myMap')
      // 创建点坐标
      const point = new BMap.Point(this.longitude, this.latitude)
      // 初始化地图，设置中心点坐标和地图级别
      this.map.centerAndZoom(point, 15)
      // 创建标注
      const marker = new BMap.Marker(point)
      // 将标注添加到地图中
      this.map.addOverlay(marker)
      // 左上角，添加比例尺、缩放平移控件
      const topLeftControl = new BMap.ScaleControl({ anchor: 'BMAP_ANCHOR_TOP_RIGHT' })
      const topLeftNavigation = new BMap.NavigationControl()
      this.map.addControl(topLeftControl)
      this.map.addControl(topLeftNavigation)
      // 开启鼠标滚轮缩放
      this.map.enableScrollWheelZoom(true)
      if (this.isEdit) {
        this.map.addEventListener('click', (e) => {
          const Point = e.point
          this.setNewPoint(Point.lng, Point.lat)
          this.searchResult = e.currentTarget.Og
          this.$emit('location', this.searchResult)
        })
      }
    },
    setNewPoint (lng, lat) {
      // 在地图上定位到某点
      this.map.clearOverlays()
      const newPoint = new BMap.Point(lng, lat)
      const Marker = new BMap.Marker(newPoint) // 创建标注
      this.map.addOverlay(Marker) // 将标注添加到地图中
      this.map.panTo(newPoint)
    },
    // 通过搜索框内的地名获取坐标，并在地图上显示标注
    searchByStationName () {
      var myGeo = new BMap.Geocoder()
      let searchResult = this.searchResult
      myGeo.getPoint(searchResult, (point) => {
        console.log(point)
        if (point) {
          let lng = JSON.stringify(point.lng)
          let lat = JSON.stringify(point.lat)
          this.longitude = lng
          this.latitude = lat
          this.setNewPoint(lng, lat)
          this.$emit('location', this.searchResult)
        } else {
          this.$message({// notify
            type: 'error',
            message: '未找到该地区(╥﹏╥)!',
            showClose: true
          })
        }
      })
    }
  },
  mounted () {
    this.setMap()
  }
}
</script>
<style lang="less" scoped>
.search-span {
  font-size: 16px;
}
.search {
  width: 40%;
  margin-bottom: 20px;
  margin-top: -100px;
}
</style>
