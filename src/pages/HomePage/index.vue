
<template>
<div class="content">
  <nav-header></nav-header>
  <el-row>
    <div class="carousel">
      <!-- 首页轮播 -->
        <transition-group tag='ul' class="clearfix slide" name='image'>
            <li v-for='(image,index) in img' :key='index' v-show='index===mark'>
                <a><img :src="image"></a>
            </li>
        </transition-group>
        <div class="bullet">
            <span v-for='(item,index) in img'
                  :key="item.id"
                  :class="{'active':index===mark}"
                  @click='change(index)'></span>
        </div>
    </div>
  </el-row>
</div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
export default {
  data () {
    return {
      mark: 0,
      timer: null,
      img: ['http://upload-images.jianshu.io/upload_images/3360875-5625658440cb542d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
        'http://upload-images.jianshu.io/upload_images/3360875-b70e9d81d26e2a27.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
        'http://upload-images.jianshu.io/upload_images/3360875-dc724649454c2ddc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
        'http://upload-images.jianshu.io/upload_images/3360875-d2148a1bb7ea9d21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
      ]
    }
  },
  components: {
    NavHeader
  },
  methods: {
    change (i) {
      this.mark = i
    },
    autoPlay () {
      this.mark++
      if (this.mark === 4) {
        this.mark = 0
      }
    },
    play () {
      setInterval(this.autoPlay, 4000)
    }
  },
  created () {
    this.play()
  }
}
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
}
.content {
  margin-top: -58px;
  background-color: #f5f5f5;
}
.clearfix {
  content: '';
  clear: both;
  display: block;
}

.carousel {
  width: 1000px;
  height: 450px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.slide {
  width: 1000px;
  height: 450px;
  padding: 0;
}

li {
  position: absolute
}

img {
  width: 1000px;
  height: 450px;
}

.bullet {
  width: 100%;
  position: absolute;
  bottom: 10px;
  margin: 0 auto;
  text-align: center;
  z-index: 10;
}

span {
  width: 7px;
  height: 7px;
  border: 1px solid;
  background: white;
  display: inline-block;
  margin-right: 10px;
  border: 1px solid white;
  border-radius: 50%;
}

.active {
  background: rgb(44, 44, 44);
}

.image-enter-active {
  transform: translateX(0);
  transition: all 1s ease;
}

.image-leave-active {
  transform: translateX(-100%);
  transition: all 1s ease;
}

.image-enter {
  transform: translateX(100%)
}

.image-leave {
  transform: translateX(0)
}
</style>
