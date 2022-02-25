import axios from 'axios'

export default axios.create({
  baseURL: 'https://cycle.symphonyenergy.com/v1/',
  // timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
});