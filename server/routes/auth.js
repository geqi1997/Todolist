const auth=require('../controllers/user');
const router=require('koa-router')();
router.get('/user/:id',auth.getUserInfo);
router.post('/user',auth.postUserAuth)
router.post('/reg',auth.reg)
module.exports=router;