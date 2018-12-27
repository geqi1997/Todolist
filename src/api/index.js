import axios from 'axios'
export default {
  login (data) {
    return axios.post('/auth/user', data)
  },
  reg (data) {
    return axios.post('/auth/reg', data)
  },
  addtodos (data) {
    return axios.post('/api/todolist', data)
  },
  updatetodos (userId, id, status) {
    return axios.put('/api/todolist/' + userId + '/' + id + '/' + status)
  },
  deletetodos (userId, id) {
    return axios.delete('/api/todolist/' + userId + '/' + id)
  },
  gettodos (data) {
    return axios.get('/api/todolist/' + data)
  }

}
