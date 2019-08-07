/**
 * 获取本地存储中的购物车数据
 */
export const getStorageCart = () => {
  return wx.getStorageSync("cart");
};
/**
 * 设置购物车到本地存储中
 * @param {Object} obj 要填充的数据
 */
export const setStorageCart = obj => {
  return wx.setStorageSync("cart", obj);
};
//用户数据
export const getStorageUserInfo = ()=>{
  return wx.getStorageSync("userInfo")
};
export const setStorageUserInfo = (userInfo) => {
  return wx.setStorageSync("userInfo", userInfo);
};
//收藏
export const getStorageShouchang = ()=>{
  return wx.getStorageSync("collect")
};
export const setStorageShouchang = (collect) => {
  return wx.setStorageSync("collect", collect);
};