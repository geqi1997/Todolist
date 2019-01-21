<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}" class="bg">
      <el-button size="small" @click="logout">注销</el-button>
      <span >
        欢迎：{{name}}！你的待办事项是：
      </span>
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first" >
          <el-col :xs="24">
            <template v-if="!Done">
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status == false" :key="index">
                  <span class="item no-finished">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" class="finish-item" type="primary" @click="update(index)">完成</el-button>
                    <el-button class="remove-item" size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template> 
            </template>
            <div v-else-if="Done">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="count > 0">
            <template v-for="(item, index) in list">
              <div class="todo-list" v-if="item.status == true" :key="index">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" class="restore-item" type="primary" @click="update(index)">还原</el-button>
                </span>
              </div>
            </template> 
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>

</template>
<script>
import jwt from 'jsonwebtoken'
import { userInfo } from 'os'
import api from '../api/index.js'
export default {
  created () {
    const userInfo = this.getUserInfo()
    if (userInfo !== null) {
      this.id = userInfo.id
      this.name = userInfo.name
    } else {
      this.id = ''
      this.name = ''
    }
    this.getTodolist()
  },
  data () {
    return {
      name: '',
      todos: '',
      activeName: 'first',
      list: [],
      count: 0,
      id: ''
    }
  },
  computed: {
    Done () {
      let count = 0
      let lists=this.list
      let length = lists.length
      for (let i in lists) {
      lists[i].status === 1 ? count++  : count 
      }
      this.count = count
      if (count === length || length === 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
        logout(){
            this.$confirm('确认退出？')
            .then(_ => {
               this.$router.push({
                   path:'./Login.vue'
               })
            })
        },
    addTodos () {
      if (this.todos === '') {
        return false
      }
      let obj = {
        status: false,
        content: this.todos,
        id: this.id
      }
     api.addtodos(obj)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '创建成功！'
            })
            this.getTodolist()
          } else {
            this.$message.error('创建失败！')
          }
        }, (err) => {
          this.$message.error('创建失败！')
          console.log(err)
        })
      this.todos = ''
    },
    update (index) {
    let id=this.id
    let lists=this.list
     api.updatetodos(id,lists[index].id,lists[index].status)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '任务状态更新成功！'
            })
            this.getTodolist()
          } else {
            this.$message.error('任务状态更新失败！')
          }
        }, (err) => {
          this.$message.error('任务状态更新失败！')
          console.log(err)
        })
    },
    remove (index) {
      let id = this.id
      let lists = this.list
      api.deletetodos(id,lists[index].id)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '任务删除成功！'
            })
            this.getTodolist()
          } else {
            this.$message.error('任务删除失败！')
          }
        }, (err) => {
          this.$message.error('任务删除失败！')
          console.log(err)
        })
    },
    getUserInfo () {
      const token = sessionStorage.getItem('demo-token')
      if (token !== null && token !== 'null') {
        let decode = jwt.decode(token)
        return decode
      } else {
        return null
      }
    },
    getTodolist () {
      let id = this.id
     api.gettodos(id)
        .then((res) => {
          if (res.status === 200) {
            this.list = res.data.result
          } else {
            this.$message.error('获取列表失败！')
          }
        }, (err) => {
          this.$message.error('获取列表失败！')
          console.log(err)
        })
      return api.gettodos(this.id)
    }
  }
}
</script>
<style scoped lang="scss">
.content{
  position: fixed;
  margin-top: 50px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  color:#ddd;
  background: url("../../static/img/preview.jpg")no-repeat;
  background-size: cover;
}
.bg{
  margin-top:100px; 
}
.el-input {
  margin: 20px auto;
}
.todo-list {
  width: 100%;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  text-align: left;
  .item {
  font-size: 20px;
  &.finished {
  text-decoration: line-through;
}
}
}
.pull-right {
  float: right;
}
</style>
