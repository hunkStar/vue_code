<template>
  <div id="search_">
    <div class="search_header">
      <form method="get" action="javascript:void(0);">
        <div class="search_ferame">
          <span class="search_ferame_icon"></span
          ><input v-model="inputData" placeholder="请输入搜索关键字" /><span
            class="search_clear_cion"
            v-show="inputData"
            @click="inputData = '', isResult = false"
          ></span>
        </div>
      </form>
      <div class="search_fix_btn" @click="$router.back()" v-show="!inputData">
        <span>取消</span>
      </div>
      <div class="search_fix_btn" @click="handleClick(inputData.trim())" v-show="inputData">
        <span>搜索</span>
      </div>
    </div>
    <div style="display: none"><div class="load_state"><img src="//img.manhua.weibo.com/static/b/vcomic-h5/dist/img/empty.67c7b397.png" alt=""><p>未搜索到相关内容</p><!----></div></div>
    <div class="search_footer" v-if="!isResult">
      <div class="search_page" style="">
        <div class="hot_search">
          <div class="hot_serch_header">
            <div class="search_title">热门搜索</div>
            <div class="search_icon refresh" @click="refreshData"></div>
          </div>
          <ul class="hot_search_conent">
            <li class="search_label" v-for="item in hotData" :key="item.object_id">
              <a href="javascript:;" class="" @click="handleClick(item.title), inputData = item.title">
                {{item.title}}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="hot_search hosity" v-if="historySearchList.length">
        <div class="hot_serch_header">
          <div class="search_title">搜索历史</div>
          <div class="search_icon clear" @click="clearHistory"></div>
        </div>
        <ul class="hot_search_conent">
          <li class="search_label" v-for="item in historySearchList" :key="item">
            <span class="search_label_text" @click="handleClick(item), inputData = item">{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
    <searchResult v-else :list="resultData" @getMore="getMore($event)" :isShow='isShow'></searchResult>
    <div v-if="isEmpty" class="mint-toast is-placemiddle" style="padding: 10px;"><span class="mint-toast-text" style="padding-top: 0px;">搜索内容为空～</span></div>
  </div>
</template>

<script>
import { getHotsearch, getSearchResult } from '@/api/cartoon'
import searchResult from './searchResult'
export default {
  name: 'Search',
  components: {
    searchResult
  },
  data () {
    return {
      hotList: [],
      hotData: [],
      resultData: [],
      num: 12,
      inputData: '',
      isResult: false,
      isEmpty: false,
      historySearchList: this.getSearch(),
      pageNum: 2,
      isShow: false,
      isOver: false
    }
  },
  methods: {
    getHotsearch () {
      getHotsearch().then(res => {
        this.hotList = res.data
        this.hotData = this.hotList.slice(0, 12)
      })
    },
    refreshData () {
      getHotsearch().then(res => {
        this.hotList = res.data
        this.hotData = this.hotList.slice(this.num, this.num + 11)
        this.num += 12
        if (this.num >= this.hotList.length) {
          this.num = 0
        }
      })
    },
    // 滚动翻页
    getMore (e) {
      // console.log(e)
      if (this.isShow || this.isOver) return
      if (e.scrollHeight - e.scrollTop - e.clientHeight < 100) {
        this.isShow = true
        // 符合条件发起请求
        getSearchResult(this.inputData, this.pageNum).then(res => {
          // console.log(res.data.data)
          if (res.data.data.length > 0) {
            this.pageNum += 1
            this.resultData.push(...res.data.data)
            this.isShow = false
          } else {
            this.isOver = true
            this.isShow = false
          }
        })
      }
    },

    // save search data
    saveSearch (key) {
      let tmp = window.localStorage.getItem('search')
      if (!tmp) {
        tmp = []
      } else {
        tmp = JSON.parse(tmp)
      }
      if (tmp.includes(key)) return
      tmp.push(key)
      window.localStorage.setItem('search', JSON.stringify(tmp))
    },
    getSearch () {
      const tmp = window.localStorage.getItem('search')
      if (!tmp) {
        return []
      } else {
        return JSON.parse(tmp)
      }
    },
    handleClick (key) {
      this.isOver = false
      if (!key.trim()) {
        this.isEmpty = true
        setTimeout(() => {
          this.isEmpty = false
        }, 1000)
        return
      }
      this.saveSearch(key)
      this.historySearchList = this.getSearch()
      this.isResult = true
      getSearchResult(key).then(res => {
        this.resultData = res.data.data
      })
    },
    clearHistory () {
      window.localStorage.setItem('search', '')
      this.historySearchList = this.getSearch()
    }
  },
  created () {
    this.getHotsearch()
  }
}
</script>
