(function(axios) {
    // 配置基本的url
    axios.defaults.baseURL = "https://apimusic.linweiqin.com";
    // 配置返回的拦截器
    axios.interceptors.response.use(
        function(response) {
            return response.data;
        },
        function(err) {
            return Promise.reject(err);
        }
    );
})(axios);