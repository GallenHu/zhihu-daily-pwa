import axios from 'axios';

const HOST = 'https://zhihu-daily.leanapp.cn';

export default {
  getThemes() {
    return axios.get(`${HOST}/api/v1/themes`);
  },
  getLastArticles() {
    return axios.get(`${HOST}/api/v1/last-stories`);
  },
  getContentById(id) {
    return axios.get(`${HOST}/api/v1/contents/${id}`);
  },
  getThemeContentById(id) {
    return axios.get(`${HOST}/api/v1/themes/${id}`);
  },
};
