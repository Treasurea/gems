import axios from 'axios';

axios.defaults.withCredentials = true;

// //创建一个axios实例
const service = axios.create({
  timeout: 3000,
  withCredentials: true,
});

// // 添加请求拦截器
// service.interceptors.request.use(
//   config => {
//     config.headers['Access-Control-Allow-Credentials'] = true
//     if (store.state.user.token) {
//       config.headers['x-session-token'] = store.state.user.token
//     }
//     return config
//   },
//   err => {
//     console.log(err)
//   }
// )

// service.interceptors.response.use(response => {
//   if (response.status === 200) {
//     //响应成功后
//     return Promise.resolve(response)
//   } else {
//     return Promise.reject(response)
//   }
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    return res;
  },
  (error) => {
    return (error.response && error.response.data) || {};
  },
);

// })

export default service;
