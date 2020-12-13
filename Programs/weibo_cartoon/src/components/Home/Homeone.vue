<template>
  <div class="recommend_block">
    <div class="home_recommend_header">
      <div class="home_recommend_title">{{title}}</div>
      <div class="home_recommend_more" @click="$router.push({name: 'more', query: {location_en: en, title: title}})">更多&gt;</div>
    </div>
    <div>
      <div :class="`home_recommend_comics ${myclass}`">
        <div
          class="home_recommend_comic"
          v-for="item in list"
          :key="item.extra.comic_id"
          v-lazy="item.image_ext_url"
        >
          <div class="comic_cover_container" style="width: 100%;" @click="$router.push({name: 'detailspage',query: {comic_id: item.extra.comic_id}})">
            <div
              class="comic_cover"
              :style="
                `width: 100%; background-image: url(${item.image_ext_url});`
              "
            ></div>
            <div class="comic_cover_info">
              <div class="comic_cover_titleBox">
                <div class="comic_cover_title" style="font-size: 14px;">
                  {{ item.title }}
                </div>
              </div>
              <div class="comic_cover_desc" style="font-size: 12px;">
                {{ item.watching_focus }}
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
  name: 'Homeone',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    myclass: {
      type: String
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
