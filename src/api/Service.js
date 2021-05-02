import axios from 'axios'  //引入axios
//下面这两个不一定需要引入，看你项目需要拦截的时候做什么操作，但是一般都需要引入store
import store from '@/store/index'  //引入store
import router from '@/router'  //引入router
import cookieUtil from "../common/js/utils/cookieUtil.js";
import domain from './domain.js'
const ConfigBaseURL = domain.web //默认路径，这里也可以使用env来判断环境
let instance = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  headers: {
    //'Content-Type': 'application/json;charset=UTF-8'
  }
})
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  var token = cookieUtil.getCookie("loginToken");
  if (token !== '') {
    config.headers.common["loginToken"] = token;
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// http response 拦截器
instance.interceptors.response.use(
  response => {
    debugger
    console.log("response.data.code:" + response.data.code);
    //拦截响应，做统一处理 
    if (response.data.code) {
      console.log(response.data.code);
      switch (response.data.code) {
        case 401:
          store.state.isLogin = false
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return response.data
  },
  //接口错误状态处理，也就是说无响应时的处理
  error => {
    if (error.response.data.message === "未登录或登录超时,请重新登录") {
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    debugger
    var responseErro = {
      code:"",
      message:""
    }
    responseErro.code=error.response.data.status;
    responseErro.message=error.response.data.error;
    return responseErro // 返回接口返回的错误信息
  })
export default instance;