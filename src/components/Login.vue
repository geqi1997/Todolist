<template>
		<div class="login-wrap">
			<div class="login-html">
				<input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">登录</label>
				<input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">注册</label>
				<div class="login-form">
					<div class="sign-in-htm">
						<div class="group">
							<label for="user" class="label">用户名</label>
							<input id="user"  v-model="account" type="text" class="input">
						</div>
						<div class="group">
							<label for="pass" class="label">密码</label>
							<input id="pass"  v-model="password" type="password" class="input" data-type="password" @keyup.enter.native="loginToDo">
						</div>
						<div class="group">
							<input type="submit" class="button" value="登录" @click="loginToDo">
						</div>
						<div class="hr"></div>
						<div class="foot-lnk">
							<a href="#forgot">忘记密码?</a>
						</div>
					</div>
					<div class="sign-up-htm">
						<div class="group">
							<label for="user" class="label">用户名</label>
							<input id="user" type="text" class="input"  v-model="user_name">
						</div>
						<div class="group">
							<label for="pass" class="label">密码</label>
							<input id="pass" type="password"  v-model="newuserpassword" class="input" data-type="password">
						</div>
						<div class="group">
							<label for="pass" class="label">重复密码</label>
							<input id="pass" type="password" class="input " v-model="newuserpassword1"  data-type="password">
						</div>
						<div class="group">
							<input type="submit" class="button" value="注册" @click="register">
						</div>
						<div class="hr"></div>
						<div class="foot-lnk">
							<label for="tab-1">注册完毕? </label>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
export default {
  data () {
    return {
      account: '',
      password: '',
      user_name:'',
      newuserpassword:'',
      newuserpassword1:''
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
    },
    register(){
 if(this.user_name==""||this.newuserpassword==""||this.newuserpassword1==""){
        alert("请输入用户名或者密码")
      }
      else{
        if(this.newuserpassword!==this.newuserpassword1)
        {
          alert("两次密码不一致")
        }
        else{
        let data={
         user_name:this.user_name,
          password:this.newuserpassword
        }
        this.$http.post('/auth/reg',data)
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: '注册成功！'
            })
            this.getUserInfo()
          } else {
            this.$message.error('注册失败！')
          }
        }, (err) => {
          this.$message.error('注册失败！')
          console.log(err)
        })
      }
      }
    }
    }
  }
</script>
<style scoped>
@import '../../static/css/styles.css';
</style>

