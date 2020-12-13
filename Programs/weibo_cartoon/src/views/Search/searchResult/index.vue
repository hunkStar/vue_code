<template>
  <div class="search_result">
    <div class="loadMoreWraper scroll" ref="scr" @scroll="$emit('getMore', $event.srcElement)">
      <div class="loadMore">
        <div class="search_list" v-for="item in list" :key="item.comic_id">
          <a href="javascript:;" class=""
            ><div class="searchList" @click="$router.push({name: 'detailspage',query: {comic_id: item.comic_id}})">
              <div class="search_list_img">
                <div
                  class="comic_cover"
                  v-lazy="item.cover"
                  :style="`background-image: url(${item.cover});`"
                ></div>
              </div>
              <div class="search_list_delete">
                <h4 class="sarchList_title">
                  <font color="red"></font>{{item.name}}
                </h4>
                <div class="sina_nickname">{{item.sina_nickname}}</div>
                <div class="sina_nickname">
                  <span v-for="i in item.cates" :key="i.cate_id">{{i.cate_name}} \</span>
                </div>
              </div>
            </div></a
          >
        </div>
        <div class="load_more" style="" v-if="isShow">
          <img
            src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/circle.88c279ba.png"
            alt=""
          />
          <p>正在加载...</p>
          <!---->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'searchResult',
  props: {
    list: {
      type: Array
    },
    isShow: {
      default () {
        return false
      }
    }
  }
}
</script>
