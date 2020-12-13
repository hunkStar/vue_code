let vm = new Vue({
    el: "#app",
    data: {
        keywords: "",
        songs: [], // 歌曲列表
        songUrl: "",
        mvUrl: "", //视频 url
        coverUrl: "", //封面
        lyrics: "", //歌词
        lyricArr: [],
        isVedioPlaying: false, // 视频是否在播放
        isAudioPlaying: false, // 音频是否在播放
        hotComments: [], // 热门评论
        colorIndex: 0
    },

    mounted() {
        // 初始化 加载默认的 热门歌曲数据，并且渲染第一首歌的封面和留言
        axios.get("/search", {
                params: {
                    keywords: "李荣浩",
                },
            })
            .then((res) => {
                // console.log(res);
                this.songs = res.result.songs;

                // this.isAudioPlaying = true;
                let id = this.songs[0].id; //默认是第一首歌

                // 获取歌曲
                axios.get("/song/url", {
                    params: {
                        id: id
                    }
                }).then((res) => {
                    this.songUrl = res.data[0].url;
                });

                // 获取封面
                axios.get("/song/detail", {
                        params: {
                            ids: id
                        }
                    }).then((res) => {
                        // console.log(res);
                        this.coverUrl = res.songs[0].al.picUrl;
                    })
                    .catch((err) => console.log(err));

                //获取歌词
                axios.get("/lyric", {
                        params: {
                            id: id
                        }
                    }).then((res) => {
                        // console.log(res);
                        // console.log(res.lrc.lyric.split(/[\n]/));
                        this.lyricArr = res.lrc.lyric.split(/[\n]/);
                    })
                    .catch((err) => console.log(err));

                // 获取热门评论
                axios.get("/comment/hot?type=0", {
                    params: {
                        id: id
                    }
                }).then((res) => {
                    // console.log(res);
                    this.hotComments = res.hotComments
                });

            })
            .catch((err) => console.log(err));
    },

    methods: {
        // 开启和关闭播放按钮
        handleAudioPause: function() {
            this.isAudioPlaying = false;
        },
        play: function() {
            this.isAudioPlaying = true;
        },

        // 关闭视频播放窗口
        closeMV: function() {
            this.isVedioPlaying = false;
            this.$refs.vedio.pause(); // 手动将视频停止
        },

        // 播放视频
        playMV: function(mvid) {
            this.isAudioPlaying = false; // 停止音频播放的标志位
            this.isVedioPlaying = true; // 视频正在播放
            this.$refs.audio.pause(); // 停止音频的播放
            axios
                .get("/mv/url", {
                    params: {
                        id: mvid
                    }
                }).then((res) => {
                    // console.log(res);
                    this.mvUrl = res.data.url;
                })
                .catch((err) => console.log(err));
        },

        // 播放歌曲
        playAudio: function(songId, index) {
            // 正在播放音频中
            this.isAudioPlaying = true;

            this.$refs.playActive[this.colorIndex].style.color = "#f1f1f1";
            this.$refs.playActive[this.colorIndex].style.fontWeight = 'normal';
            this.colorIndex = index;

            this.$refs.playActive[index].style.color = "red";
            this.$refs.playActive[index].style.fontWeight = 700;


            // 获取歌曲的 url
            axios.get("/song/url", {
                params: {
                    id: songId,
                },
            }).then((res) => {
                // console.log(res);
                this.songUrl = res.data[0].url;
            });

            // 获取封面
            axios.get("/song/detail", {
                    params: {
                        ids: songId
                    }
                }).then((res) => {
                    // console.log(res);
                    this.coverUrl = res.songs[0].al.picUrl;
                })
                .catch((err) => console.log(err));

            //获取歌词
            axios.get("/lyric", {
                    params: {
                        id: songId
                    }
                }).then((res) => {
                    console.log(res.lrc.lyric.split(/[\n]/));
                    this.lyricArr = res.lrc.lyric.split(/[\n]/);
                })
                .catch((err) => console.log(err));

            // 获取歌曲的评论
            axios.get("/comment/hot?type=0", {
                params: {
                    id: songId
                }
            }).then(res => {
                // console.log(res);
                this.hotComments = res.hotComments;
            });
        },

        // 搜索歌曲
        handleSearch: function() {
            console.log("搜索歌曲开始：keywords", this.keywords);
            axios
                .get("/search", {
                    params: {
                        keywords: this.keywords,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    this.songs = res.result.songs;
                })
                .catch((err) => console.log(err));
        },

    }
});