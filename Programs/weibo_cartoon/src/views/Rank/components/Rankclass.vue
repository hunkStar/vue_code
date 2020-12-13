<template>
  <div>
    <div class="rank_list_con" v-for="item in list" :key="item.comic_id">
      <div class="comic_horizontal_container" @click="$router.push({name: 'detailspage',query: {comic_id: item.comic_id}})">
        <div
          class="comic_cover comice_horizontal_cover"
          v-lazy="item.hcover"
          :style="`width: 144px; height: 81px; background-image: url(${item.hcover});`"
        ></div>
        <div class="comic_cover_horizontal_info">
          <div class="comic_cover_horizontal_title" style="font-size: 16px;">
            {{item.name}}
          </div>
          <div class="comic_cover_horizontal_author" style="font-size: 12px;">
            <img
              src="@/assets/images/icon001.png"
              alt=""
            />
            <template v-for="i in item.cate_list.slice(0, 3)">
              {{i.cate_cn_name}}/
            </template>
          </div>
          <div class="comic_cover_horizontal_author" style="font-size: 12px;">
            <img
              src="@/assets/images/icon002.png"
              alt=""
            />
            {{item.sina_nickname}}
          </div>
        </div>
        <div class="comic_cover_horizontal_rank" :class="`isbg-${item.rank_no < 4 ? item.rank_no : ''}`">
          <div class="rank_num" v-if="item.rank_no > 3">{{item.rank_no}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Rankclass',
  props: {
    list: {
      type: Array
    }
  }
}
</script>
<style lang="scss" scoped>
  .isbg-1 {
    background-image: url('~@/assets/images/rank_num1.6f4a3ebc.png');
  }
  .isbg-2 {
    background-image: url('~@/assets/images/rank_num2.9a307695.png');
  }
  .isbg-3 {
    background-image: url('~@/assets/images/rank_num3.8800c965.png');
  }
</style>
