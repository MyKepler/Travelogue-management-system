<template>
	<transition name="slideToLeft">
		<div class="container">
			<header class="chat-header">
				<i class="iconfont icon-zhinenghuagongcheng" @click="$router.push({path: '/AI'})"></i>
				<span>公共聊天室</span>
				<i class="iconfont icon-logout" @click="$router.push('/')"></i>
			</header>
			<div class="chat-content" ref="chatContent">
				<ul class="message-list">
          <p class="date">{{ nowDate }}</p>
					<li class="clearfix" v-for="(msg,index) of messages" :class="{'others': msg.from !== 'mine', 'mine': msg.from === 'mine'}" v-bind:key="index">
            <!-- <p class="date">{{ msg.date }}</p> -->
            <div class="info">
               <span class="portrait">
                <img :src="msg.portrait">
              </span>
              <div><p class="nickname">{{ msg.nickname }}</p>
              <!-- <span class="location" v-if="msg.location">{{ `[${msg.location}]` }}</span> -->
              <div class="content">{{ msg.content }}</div></div>
            </div>
            
          </li>
        </ul>
      </div>
      <footer class="chat-footer">
        <i class="iconfont icon-smile emojiBtn"
           :class="{'clickable': isShowEmoji}"
           @click="isShowEmoji = !isShowEmoji"
        ><img src="@/assets/images/emoji.png" class="emojiStyle"/></i>
        <input ref="inputBox"
               v-model="inputText"
               @keyup.enter="sendMsg"
               @focus="hideEmoji"
               placeholder="按Enter键发送"
               autofocus
        >
        <i class="sendBtn iconfont icon-icon_send_fill"
           :class="{'clickable': clickable}"
           @click="sendMsg"
        ></i>
      </footer>
      <transition name="showEmoji">
        <div class="emoji-wrap" v-show="isShowEmoji">
          <ul class="emoji-list">
            <li v-for="(item,index) of emoji" @click="inputEmoji(item)" v-bind:key="index">{{ item }}</li>
          </ul>
        </div>
      </transition>
      <transition name="showTip">
       <div class="top-tip" v-show="isShowTip">
         <span class="tip-text">{{ onlineTip }}</span>
       </div>
      </transition>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import io from 'socket.io-client'
import moment from 'moment'
import axios from 'axios'
import qs from 'qs'

// 建立socket.io通信
const socket = io.connect('http://localhost:3000')

export default {
  name: 'Chat',
  data() {
    return {
      messages: [],
      inputText: '',
      nickname: '',
      portrait: '',
      location: '',
      isShowEmoji: false,
      onlineTip: '',
      isShowTip: false,
      nowDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      emoji: ['😃','😁','😂','😧','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😙','😚','🙂','🤗','😭','🤔','😳','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','😴','😌','😛','😟','😝','😒','😓','😔','😕','🙃','🤑','😲','🙁','😖','😞','😟','😤','😢','😦'
      ]
    }
  },

  beforeRouterEnter(to, from, next) {
    if (!sessionStorage.nickname) {
      next('/')
    } else {
      next()
    }
  },

  mounted() {
    // 监听通信事件
    socket.on('online', name => {
      if (!name) {
        return
      }

      this.onlineTip = `${name}加入群聊`
      this.showTip()
    })

    socket.on('receiveMsg', data => {
      this.messages.push(data)
    })

    // 发送上线事件
    socket.emit('online', this.nickname)
  },

  created() {
    this.initInfo()

    if (sessionStorage.record_chat) {
      this.messages = JSON.parse(sessionStorage.record_chat)
    }
  },

  activated() {
    this.$nextTick(() => {
      this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
    })
  },

  methods: {
    initInfo () {
      let userId = this.$route.params.userId
      let params = {
        id: userId
      }
      axios.post('/api/changeInfo', qs.stringify(params))
        .then((response) => {
          if (response.data.result.length !== 0) {
            this.nickname = response.data.result[0].account
            this.portrait = response.data.result[0].avator
            this.location = '杭州'
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
    showTip() {
      this.isShowTip = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isShowTip = false
      }, 1500)
    },

    hideEmoji() {
      this.isShowEmoji = false
    },

    inputEmoji(emoji) {
      this.inputText += emoji
    },

    sendMsg() {
      if (!this.inputText) {
        return
      }

      socket.emit('sendMsg', {
        from: 'other',
        date: this.getTime(),
        nickname: this.nickname,
        portrait: this.portrait,
        location: this.location,
        content: this.inputText
      })

      this.pushMine()
      this.inputText = ''
      this.isShowEmoji = false
      this.$refs.inputBox.blur()
    },

    pushMine() {
      this.messages.push({
        from: 'mine',
        date: this.getTime(),
        nickname: this.nickname,
        portrait: this.portrait,
        location: this.location,
        content: this.inputText
      })
      console.log(this.messages)
    },

    getTime() {
      return moment().format('YYYY-MM-DD HH:mm:ss')
    },

    fixedBottom() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
      }, 20)
    }
  },

  computed: {
    clickable() {
      return this.inputText.length > 0
    }
  },

  watch: {
    messages: {
      handler() {
        sessionStorage.record_chat = JSON.stringify(this.messages)
        this.fixedBottom()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>

.clearfix::after {
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
  line-height: 0;
  content: '';
}

.container {
  position: relative;
  width: 100%;
  height: 600px;
  overflow-y: auto;
  background-color: #eee;
}

.submitBtn.clickable {
  background-color: #515a6e;
}

.emojiBtn, .sendBtn {
  &.clickable {
    color: #515a6e;
  }

}
.emojiStyle {
  width: 40px;
  height: 40px;
  margin-bottom: -10px;
}
//--------------------------切换动画--------------------------
.slideToBottom-enter-active, .slideToLeft-enter-active, .slideToRight-enter-active {
  transition: all .5s;
}

//从顶部滑向底部
.slideToBottom-enter {
  transform: translateY(-100%);
  opacity: 0;
}

// 从右边滑向左边
.slideToLeft-enter {
  transform: translateX(20rem);
  opacity: 0;
}

// 从左边滑向右边
.slideToRight-enter {
  transform: translateX(-20rem);
  opacity: 0;
}
/*
* @Author: NiceMing
* @Date:   2018-04-02 14:14:37
*/
.container {
  display: flex;
  flex-direction: column;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    // z-index: 10;
    height: 4rem;
    padding: 0 1rem;
    font-size: 1.8rem;
    color: #fff;
    background-color: #515a6e;
    box-shadow: 0 0 10px #515a6e;

    .iconfont {
      font-size: 2.2rem;
    }

  }

  .chat-content {
    flex: 1;
    overflow: auto;

    .message-list {
      list-style:none;
      & > li {
        padding: .5rem;
        p {
          text-align: left;
          padding-bottom: 3px;
          padding-left: 10px;
        }
      }

      li.mine {
        .info {
          flex-direction: row-reverse;
        }
        p {
          text-align: right;
          padding-right: 10px;
          padding-bottom: 3px;
        }
        .content {
          float: right;
          color: #fff;
          background-color: #515a6e;
        }

      }

      li.others {
        .content {
          float: left;
          background-color: #fee033;
        }

      }

      .date {
        font-size: 1rem;
        text-align: center;
        margin-top: 20px;
      }

      .info {
        display: flex;
        align-items: center;

        .nickname {
          margin: 0 .4rem;
          color: #333;
        }

        .location {
          font-size: 1rem;
        }

        .portrait {
          display: inline-block;
          width: 3.5rem;
          height: 3.5rem;

          & > img {
            max-width: 100%;
            border-radius: 50%;
          }

        }

      }

      .content {
        // max-width: 70%;
        margin-left: 10px;
        margin-right: 10px; 
        max-height: 250px;
        padding: .5rem 1rem;
        border-radius: 10px;
      }

    }

  }

  .chat-footer {
    display: flex;
    justify-content: space-between;
    padding: .5rem 0;
    box-shadow: 0 0 10px #ddd;
    margin-top: 20px;

    input {
      flex: 1;
      border: none;
      border-bottom: 1px solid #515a6e;
      outline: none;
      background-color: #eee;
      font-size:16px;
      line-height:38px;
    }

    i {
      margin: 0 .6rem 0;
      font-size: 2.4rem;
      transition: color .1s;
    }

  }
  .emoji-wrap {
    height: 16rem;
    overflow: auto;
    padding-left: 30px;
    .emoji-list {
      & > li {
        float: left;
        width: 12.5%;
        padding: .5rem 0;
        font-size: 2.4rem;
        text-align: center;
      }

    }
    &.showEmoji-enter-active {
      transition: all .3s;
    }
    &.showEmoji-enter, &.showEmoji-leave-to {
      transform: translate(0, 100%);
    }
  }
  .top-tip {
    position: absolute;
    top: 4rem;
    width: 100%;
    font-size: 1.4rem;
    line-height: 2rem;
    text-align: center;
    color: #fff;
    background-color: #96bcff;
    &.showTip-enter-active, &.showTip-leave-active {
      transition: all .5s;
    }

    &.showTip-enter, &.showTip-leave-to {
      transform: translate3d(0, -100%, 0);
      opacity: 0;
    }
  }
}
</style>
