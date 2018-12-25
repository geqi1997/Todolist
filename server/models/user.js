const db=require('../config/db'),UserModel='../schema/user.js';
const TodolistDb=db.Todolist;
const User=TodolistDb.import(UserModel);
User.sync({force: false});
const getUserById=async function (id) {
    const userInfo=await User.findOne({
        where:{
            id:id
        }
    })
    return userInfo
}
const getUserByName=async function (name){
    const userInfo=await User.findOne({
        where:{
            user_name:name
        }
    })
    return userInfo
}
const create = async function (user) {
    let {user_name,password}=user;
    await User.create({
        user_name,
        password
    })
    return true
  }
module.exports={
    getUserById,
    getUserByName,
    create
}