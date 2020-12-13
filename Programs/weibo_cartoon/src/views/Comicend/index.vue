<template>
  <div class="end_list">
    <HeaderType>完结</HeaderType>
    <Loading v-if="hasLoading"></Loading>
    <div class="end_list_box scroll">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <div class="end_list_item" v-for="item in list" :key="item.extra.comic_id">
          <div class="comic_cover_container" style="width: 100%;" @click="$router.push({name: 'detailspage',query: {comic_id: item.extra.comic_id}})">
            <div
              class="comic_cover"
              v-lazy="item.extra.hcover"
              :style="`width: 100%; height: 211px; background-image: url(${item.extra.hcover});`"
            ></div>
            <div class="comic_cover_info">
              <div class="comic_cover_titleBox">
                <div class="comic_cover_label">
                  <div class="works_label label_bg_orange" :class="`label_bg_${color[item.cate_list[0].cate_id]}`">
                    <span class="works_label_text">{{item.cate_list[0].cate_cn_name}}</span>
                  </div>
                </div>
                <div class="comic_cover_title" style="font-size: 16px;">
                  {{item.extra.name}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 回到顶部 -->
        <el-backtop target=".end_list_box" :bottom="8" :right="8">
          <div class="goTop"></div>
        </el-backtop>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import HeaderType from '@/components/HeaderType'
import { getComicend } from '@/api/cartoon'
import Loading from '@/components/Loading'
export default {
  name: 'Comicend',
  components: {
    HeaderType,
    Loading
  },
  data () {
    return {
      hasLoading: true,
      isLoading: false,
      list: [],
      color: {
        5: 'orange',
        2: 'blue',
        12: 'black',
        8: 'pink',
        15: 'yellow',
        9: 'green'
      }
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    getComicend () {
      getComicend().then(res => {
        this.list = res.data.ending_works_list
        this.hasLoading = false
      })
    }
  },
  created () {
    this.getComicend()
  }
}
</script>
