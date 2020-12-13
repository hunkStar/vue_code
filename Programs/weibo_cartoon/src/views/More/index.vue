<template>
  <div class="view-more">
    <HeaderType style="border-bottom: 0.02667rem solid #e6e6e6;">{{title}}</HeaderType>
    <Loading v-if="hasLoading"></Loading>
    <div class="list_loaded scroll">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <div class="com-item" v-for="item in list[message]" :key="item.extra.comic_id">
          <div class="item-cover" @click="$router.push({name: 'detailspage',query: {comic_id: item.extra.comic_id}})">
            <div
              class="comic_cover"
              v-lazy="item.extra.hcover"
              :style="`background-image: url(${item.extra.hcover});`"
            ></div>
          </div>
          <div class="item-info">
            <p class="info-title">{{item.extra.name}}</p>
            <p class="info-author">
              <span class="author-name">作者：{{item.extra.sina_nickname}}</span>
            </p>
            <p class="info-content">{{item.extra.watching_focus}}</p>
          </div>
        </div>
        <!-- 回到顶部 -->
        <el-backtop target=".list_loaded" :bottom="8" :right="8">
          <div class="goTop"></div>
        </el-backtop>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import { getMoredata } from '@/api/cartoon'
import HeaderType from '@/components/HeaderType'
import Loading from '@/components/Loading'
export default {
  name: 'More',
  data () {
    return {
      hasLoading: true,
      isLoading: false,
      list: [],
      message: '',
      title: ''
    }
  },
  components: {
    HeaderType,
    Loading
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    getMessage () {
      this.message = this.$route.query.location_en
      this.title = this.$route.query.title
    },
    getMoredata (str) {
      getMoredata(str).then(res => {
        this.list = res.data
        this.hasLoading = false
      })
    }
  },
  async created () {
    await this.getMessage()
    this.getMoredata(this.message)
  }
}
</script>
