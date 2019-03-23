<template>
<div>
  <span class="search-span">地点搜索</span>
  <el-input class="search" v-model="searchResult" id="search"></el-input>
  <div id="myMap" v-bind:style="mapStyle"></div></div>
</template>

<script>
import BMap from 'BMap'
export default {
  name: 'BMapComponent',
  data () {
    return {
      searchResult: '北京市',
      mapStyle: {
        width: '100%',
        height: `${this.mapHeight}px`
      },
      map: null
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
    // 经度
    longitude: {
      type: Number,
      default: 116.404
    },
    // 纬度
    latitude: {
      type: Number,
      default: 39.915
    },
    description: {
      type: String,
      default: '天安门'
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
      // 左上角，添加比例尺
      const topLeftControl = new BMap.ScaleControl({ anchor: 'BMAP_ANCHOR_TOP_RIGHT' })
      // 左上角，添加默认缩放平移控件
      const topLeftNavigation = new BMap.NavigationControl()
      // 添加控件和比例尺
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
        // let searchListen = document.getElementById('search')
        // searchListen.addEventListener('blur', (e) => {
        //   var myGeo = new BMap.Geocoder()
        //   // 将地址解析结果显示在地图上,并调整地图视野
        //   let searchResult = this.searchResult
        //   myGeo.getPoint(searchResult, function (point) {
        //     let lng = JSON.stringify(point).lng
        //     let lat = JSON.stringify(point).lat
        //     this.setNewPoint(lng, lat)
        //   })
        // })
      }
    },
    setNewPoint (lng, lat) {
      // 在地图上定位到某点
      this.map.clearOverlays()
      const newPoint = new BMap.Point(lng, lat)
      const Marker = new BMap.Marker(newPoint) // 创建标注
      this.map.addOverlay(Marker) // 将标注添加到地图中
      this.map.panTo(newPoint)
    }
    // searchByStationName () {
    //   var myGeo = new BMap.Geocoder()
    //   // 将地址解析结果显示在地图上,并调整地图视野
    //   let searchResult = this.searchResult
    //   myGeo.getPoint(searchResult, function (point) {
    //     let lng = JSON.stringify(point).lng
    //     let lat = JSON.stringify(point).lat
    //     this.longitude = lng
    //     this.latitude = lat
    //   })
    // }
  },
  mounted () {
    this.setMap()
  }
}
</script>
<style lang="less" scoped>
.search-span {
  font-size: 16px;
  // font-weight: bold;
  // font-family:'Courier New', Courier, monospace;
}
.search {
  width: 40%;
  margin-bottom: 20px;
  margin-top: -100px;
}
</style>
