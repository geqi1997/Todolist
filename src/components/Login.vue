<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       welcome
      </span>
      <el-row>
        <el-input
          v-model="account"
          placeholder="账号"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
          @keyup.enter.native="loginToDo">
        </el-input>
        <el-button type="primary" @click="loginToDo">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    loginToDo () {
      let obj = {
        name: this.account,
        password: this.password
      }
      const result = this.$http.post('/auth/user', obj)
      result.then((res) => {
        if (res.data.success) { 
          sessionStorage.setItem('demo-token', res.data.token)
          this.$message({ 
            type: 'success',
            message: '登录成功！'
          })
          this.$router.push('/todolist') 
        } else {
          this.$message.error(res.data.info) 
          sessionStorage.setItem('demo-token', null)
        }
      }, (err) => {
        console.log(err)
        this.$message.error('请求错误！')
        sessionStorage.setItem('demo-token', null) 
      })
      return result
    }
  }
}
</script>
<style scoped>
body{
    background: #DFE9FB;
  }
.login-container {
  width:350px;
  margin-left: 35%;
  margin-top: 50px;
  border: 1px solid #d3d3d3;
  box-sizing: border-box;
  padding: 10px 30px;
  border-radius: 5px;
}
  .el-button {
    width:100%;
    box-sizing: border-box;
    margin: 10px 0;
  }
 span {
  font-size: 30px;
  margin: 0;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  background-image: linear-gradient(
    to right,
    orangered,
    orange,
    gold,
    lightgreen,
    cyan,
    dodgerblue,
    mediumpurple,
    hotpink,
    orangered
  );
  background-size: 200px;
  animation: sliding 30s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@keyframes sliding {
  to {
    background-position: -2000px;
  }
}
</style>

