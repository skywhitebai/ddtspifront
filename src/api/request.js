import Service from '@/api/Service.js'
export default {
  login: function (data) {
    return Service.post('/account/login', data)
  },
  listAmazonAuth: function (data) {
    return Service.post('/amazonAuth/listAmazonAuth', data)
  },
  saveAmazonAuth: function (data) {
    return Service.post('/amazonAuth/saveAmazonAuth', data)
  },
  accountList: function (data) {
    return Service.post('/account/list', data)
  },
  saveAccount: function (data) {
    return Service.post('/account/save', data)
  },
  registerAccount: function (data) {
    return Service.post('/account/register', data)
  },
  deleteAccount: function (data) {
    return Service.post('/account/delete', data)
  },
  enableAccount: function (data) {
    return Service.post('/account/enableAccount', data)
  },
  resetPassword: function (data) {
    return Service.post('/account/resetPassword', data)
  },
  changePassword: function (data) {
    return Service.post('/account/changePassword', data)
  },
  departmentList: function (data) {
    return Service.post('/department/children', data)
  },
  saveDepartment: function (data) {
    return Service.post('/department/save', data)
  },
  deleteDepartment: function (data) {
    return Service.post('/department/delete', data)
  },
  bindComplaintList: function (data) {
    return Service.post('/complaint/list', data)
  },
  exportComplaints: function (data) {
    return Service.post('/complaint/export', data)
  },
  bindComplaintInfo: function (data) {
    return Service.post('/complaint/details', data)
  },
  complaintReject: function (data) {
    return Service.post('/complaint/reject', data)
  },
  complaintconClusion: function (data) {
    return Service.post('/complaint/conclusion', data)
  },
  complaintForward: function (data) {
    return Service.post('/complaint/forward', data)
  },
  complaintconDone: function (data) {
    return Service.post('/complaint/done', data)
  },
  bindArticleCategoryList: function (data) {
    return Service.post('/articleCategory/list', data)
  },
  saveArticleCategory: function (data) {
    return Service.post('/articleCategory/save', data)
  },
  bindArticleList: function (data) {
    return Service.post('/article/list', data)
  },
  saveArticle: function (data) {
    return Service.post('/article/save', data)
  },
  deleteArticle: function (data) {
    return Service.post('/article/delete', data)
  },
  getAreaInfoTree: function () {
    return Service.post('/province/areaInfoTree')
  },
  getCityStatics: function () {
    return Service.post('/complaint/cityStatics')
  },
  getCountyStatics: function (data) {
    return Service.post('/complaint/countyStatics', data)
  },
  bindExportList: function (data) {
    return Service.post('/export/list', data)
  },
  checkExport: function (data) {
    return Service.post('/export/check', data)
  },
  getTimeStatics: function () {
    return Service.post('/complaint/timeStatics')
  }
}