<template>
  <div class="recommend_block">
    <div class="home_recommend_header">
      <div class="home_recommend_title">{{title}}</div>
      <div class="home_recommend_more" @click="$router.push({name: 'more', query: {location_en: en, title: title}})">更多&gt;</div>
    </div>
    <div>
      <div class="home_recommend_comics threeColumn">
        <div class="home_recommend_comic" v-for="item in list" :key="item.info_id" v-lazy="item.image_ext_url">
          <div class="comic_horizontal_container" @click="$router.push({name: 'detailspage',query: {comic_id: item.extra.comic_id}})">
            <div
              class="comic_cover comice_horizontal_cover"
              :style="`width: 100%; background-image: url(${item.image_ext_url});`"
            ></div>
            <div class="comic_cover_horizontal_info">
              <div
                class="comic_cover_horizontal_title"
                style="font-size: 16px;"
              >
                {{item.title}}
              </div>
              <div
                class="comic_cover_horizontal_author"
                style="font-size: 12px;"
              >
                <img
                  src="@/assets/images/icon001.png"
                  alt=""
                />
                <template v-for="i in item.cate_list.slice(0, 3)">{{i.cate_cn_name}}、</template>
              </div>
              <div
                class="comic_cover_horizontal_author"
                style="font-size: 12px;"
              >
                <img
                  src="@/assets/images/icon002.png"
                  alt=""
                />
                {{item.sina_nickname}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Hometwo',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String
    },
    en: {
      type: String
    }
  }
}
</script>
