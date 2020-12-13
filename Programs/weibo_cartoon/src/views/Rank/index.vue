<template>
  <div class="rank_list">
    <div class="rank_list_nav">
      <HeaderType>排行榜</HeaderType>
      <div class="rank_list_title">
        <div class="list_title_item" :class="{'list_title_color': isShow === 0}" @click="isShow = 0">
          阅读榜
        </div>
        <div class="list_title_item" :class="{'list_title_color': isShow === 1}" @click="isShow = 1, getRanktwo()">
          新作榜
        </div>
        <div class="list_title_item" :class="{'list_title_color': isShow === 2}" @click="isShow = 2, getRankthree()">
          综合榜
        </div>
      </div>
    </div>
    <Loading v-if="hasLoading"></Loading>
      <div class="rank_list_box scroll">
        <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
          <Rankclass :list="oneData" v-show="isShow === 0"></Rankclass>
          <Rankclass :list="twoData" v-show="isShow === 1"></Rankclass>
          <Rankclass :list="threeData" v-show="isShow === 2"></Rankclass>
          <!-- 回到顶部 -->
          <el-backtop target=".rank_list_box" :bottom="8" :right="8">
            <div class="goTop"></div>
          </el-backtop>
        </van-pull-refresh>
      </div>
  </div>
</template>

<script>
import HeaderType from '@/components/HeaderType'
import { getRankone, getRanktwo, getRankthree } from '@/api/cartoon'
import Rankclass from './components/Rankclass'
import Loading from '@/components/Loading'
export default {
  name: 'Rank',
  components: {
    HeaderType,
    Rankclass,
    Loading
  },
  data () {
    return {
      hasLoading: true,
      isLoading: false,
      oneData: [],
      twoData: [],
      threeData: [],
      isShow: 0,
      isTwo: false,
      isThree: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    getRankone () {
      getRankone().then(res => {
        this.oneData = res.data.week
        this.hasLoading = false
      })
    },
    getRanktwo () {
      if (this.isTwo) return
      this.hasLoading = true
      getRanktwo().then(res => {
        this.twoData = res.data.week
        this.isTwo = true
        this.hasLoading = false
      })
    },
    getRankthree () {
      if (this.isThree) return
      this.hasLoading = true
      getRankthree().then(res => {
        this.threeData = res.data.week
        this.isThree = true
        this.hasLoading = false
      })
    }
  },
  created () {
    this.getRankone()
    // this.getRanktwo()
    // this.getRankthree()
  }
}
</script>
