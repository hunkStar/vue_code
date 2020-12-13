<template>
  <div class="wrap">
    <Loading v-if="hasLoading"></Loading>
    <div class="comic" v-if="list.comic">
      <div class="nav_layout comic_nav">
        <div class="com_nav gray_nav">
          <div class="nav_content">
            <div class="nav_left" @click="$router.back()"><div class="back_btn l_con"></div></div>
            <div class="nav_middle">
              <span class="nav_title">{{list.comic.name}}</span>
            </div>
            <div class="nav_right">
              <div>
                <div class="com_fav"><span class="add_fav_btn"></span></div>
              </div>
              <div class="share_btn comic_share"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="comic_content">
       <div>
          <div>
          <div class="comic_info h_comic_info">
            <div
              class="comic_cover"
              lazy="loaded"
              :style="`background-image: url(https://img.manhua.weibo.com/${list.comic.hcover});`"
            ></div>
            <div class="mask"></div>
            <div class="comic_article ">
              <div class="comic_name">
                <span class="name">{{list.comic.name}}</span
                ><span class="pay_icon label_red_pay"></span>
              </div>
              <div class="comic_tags_hot">
                <div class="comic_tags">
                  <span class="tags" v-for="(i, index) in list.wbcomic_cate" :key="i.cate_id" :class="index + 1 === list.wbcomic_cate.length ? 'tags_last' : ''"> {{i.cate_cn_name}} </span
                  >
                </div>
                <div class="comic_hot">
                  <span class="hot_icon"></span><span>热度值：</span
                  ><span class="hot_num">{{list.comic.comic_hot_value_text}}</span>
                </div>
              </div>
            </div>
            <div class="comic_irregular_bg"></div>
          </div>
        </div>
        <div class="last_time_chapter">
          <span class="looking_chapter">暂未阅读</span>
          <div class="button_header" fontsize="24">
            <button
              type="button"
              class="comic_button"
              style="width: 88px; height: 36px; font-size: 14px;"
              @click="$router.push({name: 'readcomics', query: {chapter_id: list.chapter_list[0].chapter_id}})"
            >
              开始阅读
            </button>
          </div>
        </div>
        <div class="download_banner" v-if="isDownload">
          <div class="download_left">
            <div class="cancel_download_banner" @click="isDownload = false"></div>
            <div class="download_logo"></div>
            <div>
              <div class="banner_title">安装微博动漫APP</div>
              <p class="banner_desc">多一种陪伴</p>
            </div>
          </div>
          <div class="download_right">安装</div>
        </div>
        <div class="comic_intro">
          <div class="menu_nav">
            <div class="menu_detail" :class="isChange ? 'cur_menu' : ''" @click="isChange = true">详情</div>
            <div class="menu_catelog" :class="!isChange ? 'cur_menu' : ''" @click="isChange = false">目录</div>
          </div>
        </div>
        <div class="comic_bottom_content" v-show="isChange">
          <div class="detail_wrap">
            <div class="details">
              <div class="bold">简介</div>
              {{list.comic.description}}
            </div>
            <div class="author">
              <span class="bold">作者：</span>
              <div class="author_item">
                <div class="avatar component_avatar author_avatar">
                  <img
                    src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/default_avatar.8bc0dfd7.png"
                  />
                  <img v-if="list.new_author[0].user_avatar.substr(0,4) === 'http'"
                    :src="list.new_author[0].user_avatar"
                  />
                </div>
                <span class="author_name">{{list.new_author[0].sina_nickname}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="catalog_wrap" v-show="!isChange">
          <div>
            <ul class="catalog_list row_catalog_list">
              <li chapter_id="405772" class="catalog_ceil" v-for="item in list.chapter_list" :key="item.chapter_id">
                <div class="chapter_name lock" @click="$router.push({name: 'readcomics', query: {chapter_id: list.chapter_list[0].chapter_id}})">
                  <div class="name-box"><p class="name">{{item.chapter_name}}</p></div>
                  <span></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="comment_box" v-show="isChange">
          <div class="comment-area">
            <div class="comment-title">
              热门评论<br>
              (评论是固定的，因为这个接口数据不好筛选)
            </div>
            <div class="comment-list">
              <div class="comment-item">
                <div class="avatar-outer">
                  <div class="avatar component_avatar">
                    <img
                      src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/default_avatar.8bc0dfd7.png"
                    /><img
                      src="http://thirdqq.qlogo.cn/qqapp/1106392628/1CB7D2D3522CB91B17360320623AA8DD/100"
                    />
                  </div>
                </div>
                <div class="comment-item-content">
                  <div class="comment-nickname comment-line content-line">
                    <div class="bold">k6i1k8u</div>
                    <div class="comment-time comment-line">2020-04-30</div>
                  </div>
                  <div class="comment-content comment-line content-line">
                    按照我多年的漫画经验，下级就是女主是废灵根，没人要的那种
                  </div>
                  <div class="reply-list-box">
                    <div class="reply-list">
                      <div class="reply-item-box comment-line content-line">
                        <span class="rep-user">挽雨:</span
                        ><span class="rep-content"
                          >按照我多年的漫画经验，下级就是女主是灵根之体，所有人抢着要的那种</span
                        >
                      </div>
                      <div class="reply-item-box comment-line content-line">
                        <span class="rep-user">ink娘Z院J系71440:</span
                        ><span class="rep-content"
                          >呵，你又怎样知道，你不是作者，你也不能控制漫画，你怎么知道？还漫画经验，你又没试过，怎样知道感受呢？</span
                        >
                      </div>
                      <div class="reply-item-box comment-line content-line">
                        <span class="rep-user">恋樱曲:</span
                        ><span class="rep-content">女主是灵根之体。</span>
                      </div>
                    </div>
                    <div class="showMore comment-line">
                      共3条回复
                    </div>
                  </div>
                </div>
              </div>
              <div class="comment-item">
                <div class="avatar-outer">
                  <div class="avatar component_avatar">
                    <img
                      src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/default_avatar.8bc0dfd7.png"
                    /><img
                      src="http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoMdcWN26d2uR9mkF7HLbiauo2RGTYRrF8bvzu8cmgm0tGTicqhib9rPQwR6U5Xa2ZB1SXib1Cmyic30zQ/132"
                    />
                  </div>
                </div>
                <div class="comment-item-content">
                  <div class="comment-nickname comment-line content-line">
                    <div class="bold">可爱棉花糖485452509</div>
                    <div class="comment-time comment-line">2020-04-30</div>
                  </div>
                  <div class="comment-content comment-line content-line">
                    不靠谱，男主啥时候出来啊，等的花儿都谢了😭
                  </div>
                  <div class="reply-list-box">
                    <div class="reply-list">
                      <div class="reply-item-box comment-line content-line">
                        <span class="rep-user">殿下.48100494897:</span
                        ><span class="rep-content">唉，那我就要小叶叶了</span>
                      </div>
                      <div class="reply-item-box comment-line content-line">
                        <span class="rep-user">天天向上5110254525:</span
                        ><span class="rep-content">难道不是楚尘吗？</span>
                      </div>
                      <div class="reply-item-box comment-line content-line">
                        <span class="rep-user">宁.诺:</span
                        ><span class="rep-content">男主是楚尘昂小可爱</span>
                      </div>
                    </div>
                    <div class="showMore comment-line">
                      共3条回复
                    </div>
                  </div>
                </div>
              </div>
              <div class="comment-item">
                <div class="avatar-outer">
                  <div class="avatar component_avatar">
                    <img
                      src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/default_avatar.8bc0dfd7.png"
                    /><img
                      src="http://thirdqq.qlogo.cn/qqapp/1106392628/F5ED1F23F9659D24B57D257E67210C5C/100"
                    />
                  </div>
                </div>
                <div class="comment-item-content">
                  <div class="comment-nickname comment-line content-line">
                    <div class="bold">馊凉</div>
                    <div class="comment-time comment-line">2020-04-30</div>
                  </div>
                  <div class="comment-content comment-line content-line">
                    检验？还有人记得女主没有灵根吗？
                  </div>
                  <div class="reply-list-box">
                    <div class="reply-list">
                      <div class="reply-item-box comment-line content-line">
                        <span class="rep-user">魑嵐雪:</span
                        ><span class="rep-content">灵根之体</span>
                      </div>
                      <div class="reply-item-box comment-line content-line">
                        <span class="rep-user">小太阳48971015610:</span
                        ><span class="rep-content">是本体灵根</span>
                      </div>
                      <div class="reply-item-box comment-line content-line">
                        <span class="rep-user">此人已死小事烧纸大事招魂:</span
                        ><span class="rep-content">糸统就是灵根</span>
                      </div>
                    </div>
                    <div class="showMore comment-line">
                      共3条回复
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="comment_more">
              <button class="moreComment">更多精彩评论</button>
            </div>
          </div>
        </div>
        <!-- 回到顶部 -->
        <el-backtop target=".comic_content" :bottom="8" :right="8">
          <div class="goTop"></div>
        </el-backtop>
       </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetailsdata } from '@/api/cartoon'
import Loading from '@/components/Loading'
export default {
  name: 'detailspage',
  data () {
    return {
      hasLoading: true,
      isLoading: false,
      list: {},
      isDownload: true,
      isChange: true
    }
  },
  components: {
    Loading
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  },
  created () {
    getDetailsdata(this.$route.query.comic_id).then(res => {
      this.list = res.data
      this.hasLoading = false
    })
  }
}
</script>
<style lang="scss" scoped>
.comic_content {
  overflow-y: scroll;
}
.looking_chapter {
  font-size: 16px;
}
.back_btn {
  background-image: url('~@/assets/images/goback.png');
}
.h_comic_info .mask {
  background: -webkit-gradient(linear,0 0,0 bottom,from(transparent),to(rgba(0,0,0,.6)));
}
.add_fav_btn {
  background-image: url('~@/assets/images/add_fav.35784ea1.png');
}
.comic_share.share_btn {
  background-image: url('~@/assets/images/share_gray.d8764234.png');
}
.label_red_pay {
  background-image: url('~@/assets/images/pay.png');
}
.comic_info .comic_irregular_bg {
  background-image: url('~@/assets/images/cover_bottom.50206627.png');
}
.comic .download_banner .cancel_download_banner {
  background-image: url('~@/assets/images/delete.png');
}
.comic .download_banner .download_logo {
  background-image: url('~@/assets/images/logo.937028ab.png');
}
.hot_icon::before {
  background-image: url('~@/assets/images/hot.5adf85f9.png');
}
</style>
