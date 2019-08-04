import { getSetting,chooseAddress,openSetting } from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {},
  async handleChooseAddress() {
    //获取用户信息
    const res1 = await getSetting()
    const scopeAddress = res1.authSetting["scope.address"];
    if (scopeAddress === true || scopeAddress === undefined) {
      //直接调用获取用户的收获地址
      const res2 = await chooseAddress()
      console.log(res2)
    } else {
      //先打开授权页面
      const res2 = await openSetting()
      console.log(res2)
    }
    // 存入到本地存储中
  }
});
