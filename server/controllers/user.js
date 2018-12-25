const user = require('../models/user.js');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');

const getUserInfo = async function (ctx) {
  const id = ctx.params.id 
  const result = await user.getUserById(id) 
  ctx.body = result 
}

const postUserAuth = async function (ctx) {
  const data = ctx.request.body 
  const userInfo = await user.getUserByName(data.name)
  if (userInfo != null) { 
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false, 
        info: '密码错误！'
      }
    } else {
     const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'vue-koa-demo'  
      const token = jwt.sign(userToken, secret) 
      ctx.body = {
        success: true,
        token: token 
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在！' 
    }
  }
}
const reg=async (ctx)=>{
 
 let data=ctx.request.body
 const doc=await user.getUserByName(data.user_name)
 if(doc){
  ctx.body={
    success:false,
    info:'已经注册了'
  }
 }
 else{
 const salt = bcrypt.genSaltSync();
const hash=bcrypt.hashSync(data.password, salt)
data.password=hash;
 await user.create(data);
 const newUser=await user.getUserByName(data.user_name)
 const userToken = {
  name:newUser.user_name,
  id: newUser.id
}
const secret = 'vue-koa-demo'  
const token = jwt.sign(userToken, secret,{expiresIn: '1h'}) 
ctx.body = {
  success: true,
  token: token 
}
}}

module.exports = {
    getUserInfo,
    postUserAuth,
    reg
  }
