<template>
  <div class="page-home">
    <!-- 头部 -->
    <div class="nav_layout home_nav">
      <div class="com_nav border">
        <div class="nav_content">
          <div class="nav_left">
            <img src="@/assets/images/logo.png" alt />
          </div>
          <div class="nav_middle"></div>
          <div class="nav_right">
            <div class="nav_switch_gender female_btn"></div>
            <div class="nav_serach" @click="$router.push('/search')"></div>
            <div to="/mine" class="nav_mine" @click="$router.push('/mine')"></div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="hasLoading"></Loading>
    <div class="home_content_loaded scroll">
      <!-- 下拉树新 -->
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <!-- 轮播图 -->
        <div class="swipeContainer">
          <div class="swipe_wrap">
            <swiper class="mint-swipe" v-if="swiperData.length > 0">
              <swiper-item
                class="swiper-item"
                v-for="item in swiperData"
                :key="item.extra.comic_id"
                v-lazy="item.image_ext_url"
              >
                <img :src="item.image_ext_url" alt=""/>
              </swiper-item>
            </swiper>
          </div>
        </div>
        <!-- 导航栏 -->
        <div class="home_menu">
          <div class="home_menu_item" @click="$router.push('/daypub')">
            <img src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/daypub.7d71503a.png" alt=""/>
            <p>放送表</p>
          </div>
          <div class="home_menu_item" @click="$router.push('/cate')">
            <img src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/catelog.3cfb4bb6.png" alt=""/>
            <p>分类</p>
          </div>
          <div class="home_menu_item" @click="$router.push('/rank')">
            <img src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/rank.bfd0ebb0.png" alt=""/>
            <p>榜单</p>
          </div>
          <div class="home_menu_item" @click="$router.push('/comicend')">
            <img src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/ending.932e7864.png" alt=""/>
            <p>完结</p>
          </div>
        </div>
        <!-- 主体部分 -->
        <homeone :list="workGood" :myclass="`threeClassic`" :en="list_en[1]" :title="list_location[1]"></homeone>
        <homeone :list="workPopular" :myclass="`fourClassic`" :en="list_en[2]" :title="list_location[2]"></homeone>
        <hometwo :list="workNew" :en="list_en[3]" :title="list_location[3]"></hometwo>
        <homeone :list="workHot" :myclass="`fourClassic`" :en="list_en[4]" :title="list_location[4]"></homeone>
        <homeone :list="workRecomm" :myclass="`threeClassic`" :en="list_en[5]" :title="list_location[5]"></homeone>
        <homeone :list="workWeek" :myclass="`threeRow`" :en="list_en[6]" :title="list_location[6]"></homeone>
        <!-- 回到顶部 -->
        <el-backtop target=".home_content_loaded" :bottom="8" :right="8">
          <div class="goTop"></div>
        </el-backtop>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/Swiper'
import { getHome } from '@/api/cartoon'
import { Homeone, Hometwo } from '@/components/Home'
import Loading from '@/components/Loading'
export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperItem,
    Homeone,
    Hometwo,
    Loading
  },
  data () {
    return {
      isLoading: false,
      hasLoading: true,
      // homeData: {},
      swiperData: [],
      goodWork: [],
      popularWork: [],
      location_list: [],
      newWork: [],
      hotWork: [],
      recommWork: [],
      weekWork: []
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },

    getHome () {
      getHome().then(res => {
        this.swiperData = res.data.h5_recommend_female_rotation_map
        this.goodWork = res.data.h5_recommend_female_fine_works.slice(0, 3)
        this.popularWork = res.data.h5_recommend_female_popular_works.slice(0, 4)
        this.location_list = res.data.location_list
        this.newWork = res.data.h5_recommend_female_new_arrival.slice(0, 3)
        this.hotWork = res.data.h5_recommend_female_hot_serial.slice(0, 2)
        this.recommWork = res.data.h5_recommend_female_xiaobian_recommend.slice(0, 3)
        this.weekWork = res.data.h5_recommend_female_week_recommend.slice(0, 3)
        this.hasLoading = false
      })
    }
  },
  // 下面这些计算属性纯属多此一举了，但我不想改了
  computed: {
    workWeek () {
      return this.weekWork.map(item => {
        return {
          info_id: item.info_id,
          title: item.title,
          watching_focus: item.extra.watching_focus,
          image_ext_url: item.image_ext_url,
          extra: item.extra
        }
      })
    },
    workGood () {
      return this.goodWork.map(item => {
        return {
          info_id: item.info_id,
          title: item.title,
          watching_focus: item.extra.watching_focus,
          image_ext_url: item.image_ext_url,
          extra: item.extra
        }
      })
    },
    workPopular () {
      return this.popularWork.map(item => {
        return {
          info_id: item.info_id,
          title: item.title,
          watching_focus: item.extra.watching_focus,
          image_ext_url: item.image_ext_url,
          extra: item.extra
        }
      })
    },
    workNew () {
      return this.newWork.map(item => {
        return {
          info_id: item.info_id,
          title: item.title,
          sina_nickname: item.extra.sina_nickname,
          cate_list: item.cate_list,
          image_ext_url: item.image_ext_url,
          extra: item.extra
        }
      })
    },
    workHot () {
      return this.hotWork.map(item => {
        return {
          info_id: item.info_id,
          title: item.title,
          watching_focus: item.extra.watching_focus,
          image_ext_url: item.image_ext_url,
          extra: item.extra
        }
      })
    },
    workRecomm () {
      return this.recommWork.map(item => {
        return {
          info_id: item.info_id,
          title: item.title,
          watching_focus: item.extra.watching_focus,
          image_ext_url: item.image_ext_url,
          extra: item.extra
        }
      })
    },
    list_location () {
      return this.location_list.map(item => {
        return item.location_cn
      })
    },
    list_en () {
      return this.location_list.map(item => {
        return item.location_en
      })
    }
  },

  created () {
    this.getHome()
  }
}
</script>

<style lang="scss" scoped>
.page-home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav_layout {
    width: 100%;
    height: 44px;
    .border {
      border-bottom: 1px solid #e6e6e6;
    }
    .com_nav {
      width: 100%;
      height: 44px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .nav_content {
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        color: #333;
        .nav_left {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 44px;
          img {
            width: 87px;
            height: 24px;
            margin-left: 16px;
          }
        }
        .nav_middle {
          flex: 1;
          line-height: 44px;
        }
        .nav_right {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 44px;
          .nav_switch_gender {
            width: 44px;
            height: 44px;
            background-image: url("~@/assets/images/girl.8907d75c.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .nav_serach {
            width: 44px;
            height: 44px;
            background-image: url("~@/assets/images/search.15e76af5.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .nav_mine {
            width: 44px;
            height: 44px;
            background-image: url("~@/assets/images/mine.01301e95.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }

  .home_content_loaded {
    overflow-y: auto;
    flex: 1;
    .swipeContainer {
      padding-top: 8px;
      .swipe_wrap {
        width: 343px;
        height: 214px;
        margin: 0 16px;
        .mint-swipe {
          width: 343px;
          height: 214px;
          border-radius: 8px;
          overflow: hidden;
          .swiper-item {
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 214px;
            }
          }
        }
      }
    }
    .home_menu {
      display: flex;
      padding: 16px;
      justify-content: space-between;
      img {
        width: 60px;
      }
      p {
        line-height: 24px;
        text-align: center;
        color: #333;
        font-size: 14px;
      }
    }
  }
}
</style>

<style lang="scss">
.home_recommend_title::before {
  position: absolute;
  top: 11px;
  left: 0;
  content: "";
  width: 22px;
  height: 22px;
  background: url("../../assets/images/default_avatar.8bc0dfd7.png");
  background-size: cover;
  background-position: 50%;
  background-repeat: no-repeat;
}
// @import "@/assets/styles/home.scss";
</style>
