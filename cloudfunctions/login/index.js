// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async (event, context) => {
  const { avatarUrl, nickName} = event;
  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）等信息
  const wxContext = cloud.getWXContext()
  const collection = db.collection('User')
  let user = await collection.where({
  	openid: wxContext.OPENID,
  }).get()
  if(user.data.length < 1) { // 没有注册
    const result = await collection.count();
    const total = result.total;
    const a = await collection.add({
      data: {
        joinId:getId(total + 1),
        openid: wxContext.OPENID,
        avatarUrl:avatarUrl,
        nickName:nickName,
        joinTime: new Date().getTime()
      }
    })
    user = await collection.where({
      openid: wxContext.OPENID,
    }).get()
  }
  return {
    joinId:user.data[0].joinId,
    nickName:user.data[0].nickName,
    avatarUrl:user.data[0].avatarUrl,
    joinTime:user.data[0].joinTime,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    env: wxContext.ENV,
  }
}

const getId = (id)=>{
  let strId = id + '';
  let a = 5 - strId.length;
  if(a > 0){
    while(a--){
      strId = '0' + strId
    }
  }
  return strId
}
