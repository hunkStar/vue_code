<template>
  <div class="comic_play" @scroll="handleScroll">
    <Loading v-if="hasLoading"></Loading>
    <div v-if="list.chapter">
      <div class="nav_layout com_nav_play show_nav">
      <transition name="fade" enter-active-class="fadeInDown" leave-active-class="fadeOutUp">
        <div class="com_nav gray_nav" v-if="isUp">
          <div class="nav_content">
            <div class="nav_left" @click="$router.back()"><div class="back_btn l_con"></div></div>
            <div class="nav_middle">
              <span class="nav_title"></span
              ><span class="chapter_title">
                {{list.chapter.chapter_name}} </span
              >
            </div>
            <div class="nav_right">
              <div class="toHome" @click="$router.push('/home')"></div>
              <div class="shareLight"></div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="comic_play_wrap" style="background: rgba(0, 0, 0, 0.2);">
      <div class="chapter_content">
        <div class="comic_chapter_content" style="height: 530px; width: 100%;" v-for="(item, index) in list.json_content.page" :key="item.image_id">
          <p class="chapter_content_num">{{index+1}}</p>
          <img
            class="chapter_content_img"
            :src="item.mobileImgUrl"
            v-lazy="item.mobileImgUrl"
          />
        </div>
      </div>
      <div class="bottom_menu">
        <div class="bottom_menu_item" @click="last">
          <img
            src="../../assets/images/redgolast.png"
            alt=""
          /><span>上一篇</span>
        </div>
        <div class="bottom_menu_item">
          <div>
            <div class="com_fav_no_text">
              <img
                src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/like.ee9e56c9.png"
                alt=""
              /><span>关注</span>
            </div>
          </div>
        </div>
        <div class="bottom_menu_item">
          <img
            src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/share.e3d16499.png"
            alt=""
          /><span>分享</span>
        </div>
        <div class="bottom_menu_item" @click="next">
          <img
            src="../../assets/images/redgonext.png"
            alt=""
          /><span>下一篇</span>
        </div>
      </div>
    </div>
    <transition name="fade" enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
        <div class="play_footer show_footer" v-if="isUp">
          <div class="play_footer_menu" @click="last">
            <img src="../../assets/images/golast.png" alt="" /><span>上一章</span>
          </div>
          <div class="play_footer_menu">
            <img src="../../assets/images/gomenu.png" alt="" /><span>目录</span>
          </div>
          <div class="play_footer_menu">
            <img src="../../assets/images/download.png" alt="" /><span>下载</span>
          </div>
          <div class="play_footer_menu" @click="next">
            <img src="../../assets/images/gonext.png" alt=""/><span>下一章</span>
          </div>
        </div>
    </transition>
    </div>
  </div>
</template>
<script>
import 'vue2-animate/dist/vue2-animate.min.css'
import Loading from '@/components/Loading'
import { getReaddata } from '@/api/cartoon'
export default {
  name: 'Readcomics',
  components: {
    Loading
  },
  data () {
    return {
      hasLoading: true,
      isUp: true,
      i: 0,
      list: {},
      page: [],
      num: ''
    }
  },
  methods: {
    handleScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const scroll = scrollTop - this.i
      // console.log(scrollTop)
      this.i = scrollTop
      if (scroll < 0) {
        this.isUp = true
      } else {
        this.isUp = false
      }
    },
    debounce (fn, wait) {
      let timeout = null
      return function () {
        clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
      }
    },
    getReaddata (str) {
      getReaddata(str).then(res => {
        this.list = res.data
        this.page = res.data.chapter_list
        // this.num = Number(res.data.chapter.chapter_name.substr(0, 2)) || Number(res.data.chapter.chapter_name.replace(/[^0-9]/ig, '')) + 1
        this.hasLoading = false
        if (!window.localStorage.getItem(res.data.comic.comic_id)) {
          window.localStorage.setItem(res.data.comic.comic_id, 1)
          this.num = 1
        } else {
          this.num = Number(window.localStorage.getItem(res.data.comic.comic_id))
        }
      })
    },
    next () {
      this.$router.replace({
        path: '/readcomics',
        query: {
          chapter_id: this.list.chapter_list[this.num].chapter_id
        }
      })
      this.reload()
      window.localStorage.setItem(this.list.comic.comic_id, this.num + 1)
    },
    last () {
      if (this.num === 1) return
      this.$router.replace({
        path: '/readcomics',
        query: {
          chapter_id: this.list.chapter_list[this.num - 2].chapter_id
        }
      })
      this.reload()
      window.localStorage.setItem(this.list.comic.comic_id, this.num - 1)
    }
  },
  inject: ['reload'],
  created () {
    this.getReaddata(this.$route.query.chapter_id)
  },
  mounted () {
    window.addEventListener('scroll', this.debounce(this.handleScroll, 30))
  }
}
</script>
<style lang="scss" scoped>
.nav_middle {
  font-size: 16px;
}
.back_btn {
  background-image: url("~@/assets/images/goback.png");
}
.toHome {
  background-image: url("~@/assets/images/goHome.png");
}
.shareLight {
  background-image: url("~@/assets/images/share.png");
}
</style>
