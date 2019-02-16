<template>
    <div class="articleItem">
      <img class="imgItem" src="@/assets/images/Tokyo2.jpg">
      <div class="infoItem">
        <h2>冰岛5天4夜自由行</h2>
        <p>by 徐欣奕&nbsp;&nbsp;&nbsp;2018-11-27 22：30</p>
        <div class="contentItem">
              冰岛有一些独特的自然景观，如冰盖山脉，火山，温泉，瀑布，冰川，间歇泉和古代冷却的熔岩流。
          冰岛拥有20多座活火山。平均每4年发生一次火山爆发。Hekla是冰岛最活跃的火山，因此Hekla是
          冰岛常见的女性名字。冰岛没有森林。冰岛东南部的瓦特纳冰川是欧洲最大的冰川。间歇泉有时被
          称为大间歇泉，是冰岛西南部的间歇泉。这是第一次在印刷媒体中描述的间歇泉，也是现代欧洲人
          第一次发现的间歇泉。
        </div>
        <div class="bottomItem">
          <div class="left">
          <i class="iconfont">&#xe655;</i>
          <span>冰岛</span>
          </div>
          <div class="right">
            <i class="iconfont">&#xe655;</i>
            <span class="mr3">11</span>
            <i class="iconfont">&#xe655;</i>
            <span class="mr3">11</span>
            <i class="iconfont">&#xe655;</i>
            <span class="mr3">11</span>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="less" scoped>
  .articleItem{
    display: inline-flex;
    width: 100%;
    border-bottom: 2px solid #ccc;
    padding: 10px 10px 5px 0px;
    cursor: pointer;
    .imgItem{
      width: 230px;
      min-width: 230px;
      height: 160px;
    }
    .infoItem{
      text-align: left;
      margin-left: 20px;
      word-break: break-word;
      p{
        color:#ccc;
        margin: 10px 0;
      }
      .contentItem{
        height: 70px;
        font-size:17px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .bottomItem{
        width: 100%;
        height: 30px;
        line-height: 35px;
        display: inline-flex;
        .iconfont{
          line-height: 30px;
        }
        .left{
          width: 30%;
        }
        .right{
          width:70%;
          // float: right;
          text-align: right;
          .mr3{
            margin-right: 3px;
            margin-left: -3px;
          }
        }
      }
    }
  }
</style>
