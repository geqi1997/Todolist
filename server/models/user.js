const db=require('../config/db'),UserModel='../schema/user.js';
const TodolistDb=db.Todolist;
const User=TodolistDb.import(UserModel);
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
module.exports={
    getUserById,
    getUserByName
}