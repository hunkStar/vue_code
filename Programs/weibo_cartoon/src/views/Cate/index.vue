<template>
  <div class="category">
    <HeaderType>分类</HeaderType>
    <Loading v-if="hasLoading"></Loading>
    <div class="cate_list filter_list highList">
      <div class="cate_list_item filter_item" :class="{'filter_active_item_red': classOne === item.cate_id}" v-for="item in classNamedata.cate_list" :key="item.cate_id" @click="classOne = item.cate_id, changeClass()">
        {{item.cate_cn_name}}
      </div>
    </div>
    <div class="showFilterLayout">
      <div class="show_filter">
        <div class="end_status_list filter_list">
          <div class="end_status_list_item filter_item" :class="{'filter_active_item_red': classTwo=== item.end_status}" v-for="item in classNamedata.end_status_list" :key="item.end_status" @click="classTwo = item.end_status, changeClass()">
            {{item.end_status_name}}
          </div>
        </div>
        <div class="pay_status_list filter_list">
          <div class="pay_status_list_item filter_item" :class="{'filter_active_item_red': classThree === item.comic_pay_status}" v-for="item in classNamedata.comic_pay_status_list" :key="item.comic_pay_status" @click="classThree = item.comic_pay_status, changeClass()">
            {{item.comic_pay_status_name}}
          </div>
        </div>
      </div>
    </div>
    <div class="category_loaded pt60">
        <div class="loadMoreWraper scroll" ref="scr" @scroll="getMore($event)">
          <div class="loadMore">
            <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
              <div class="category_comic_container">
                <div class="comic_cover_container" style="width: 185px;" v-for="item in list" :key="item.comic_id">
                  <div
                    class="comic_cover"
                    :style="`width: 185px; height: 105px; background-image: url(${item.comic_hcover});`"
                    v-lazy="item.comic_hcover"
                     @click="$router.push({name: 'detailspage',query: {comic_id: item.comic_id}})"
                  ></div>
                  <div class="comic_cover_info">
                    <div class="comic_cover_titleBox">
                      <div class="comic_cover_title" style="font-size: 14px;">
                        {{item.comic_name}}
                      </div>
                    </div>
                    <div class="comic_cover_desc" style="font-size: 12px;">
                      {{item.comic_desc}}
                    </div>
                  </div>
                </div>
              </div>
              <!-- 回到顶部 -->
              <el-backtop target=".loadMoreWraper" :bottom="8" :right="8">
                <div class="goTop"></div>
              </el-backtop>
            </van-pull-refresh>
            <div class="list_notdone" v-if="isShow">
              <img
                src="@/assets/images/circle.88c279ba.png"
                alt=""
              />
              <p>正在加载...</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getClassname, getClassdata } from '@/api/cartoon'
import HeaderType from '@/components/HeaderType'
import Loading from '@/components/Loading'
// import InfiniteLoading from 'vue-infinite-loading'
export default {
  name: 'Cate',
  data () {
    return {
      hasLoading: true,
      isLoading: false,
      isShow: false,
      classNamedata: {},
      classOne: 0,
      classTwo: 0,
      classThree: 0,
      pageNum: 1,
      list: [],
      isOver: false
    }
  },
  components: {
    HeaderType,
    Loading
    // InfiniteLoading
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    getClassname () {
      getClassname().then(res => {
        this.classNamedata = res.data
        this.hasLoading = false
      })
    },
    getClassdata (a, b, c, d) {
      getClassdata(a, b, c, d).then(res => {
        // console.log(res)
        this.list = res.data.data
      })
    },
    // 滚动翻页
    getMore (e) {
      if (this.isShow || this.isOver) return
      if (this.$refs.scr.scrollHeight - this.$refs.scr.scrollTop - this.$refs.scr.clientHeight < 100) {
        this.isShow = true
        // 符合条件发起请求
        getClassdata(this.classOne, this.classTwo, this.classThree, this.pageNum).then(res => {
          // console.log(res.data.data)
          if (res.data.data.length > 0) {
            this.pageNum += 1
            this.list.push(...res.data.data)
            this.isShow = false
          } else {
            this.isOver = true
            this.isShow = false
          }
        })
      }
    },
    changeClass () {
      this.isOver = false
      // this.getClassdata(this.classOne, this.classTwo, this.classThree, this.pageNum)
      this.$refs.scr.scrollTop = 0
      this.pageNum = 1
      this.getClassdata(this.classOne, this.classTwo, this.classThree, this.pageNum)
    }
  },
  async created () {
    await this.getClassname()
    this.getClassdata()
  }
}
</script>
