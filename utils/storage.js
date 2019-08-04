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
  wx.setStorageSync("cart", obj);
};
