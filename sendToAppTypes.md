### `sendToApp` Webview与App端交互函数的设计
```javascript
 xApp.sendToApp = function (type, value, callback)
```

实例：一个电商平台APP的sendToAppTypes设计   

类型Type | 功能Function | 值value | 说明Description
---|---|---|---
1 | 商品详情页 跳转 | goodsId | 跳转到商品ID为 `goodsId` 的商品详情页
2 | 设置分享内容 | `{shareTitle:"分享标题",shareDesc:"分享描述",shareUrl:"链接",shareImg:"图片地址",shareRule:"分享规则0,1,2,3...",needLogin:"是否需要登录0/1"}` | 通过js设置分享内容
3 | 分享 调起 | | 
4 | 首页 跳转 | | 
5 | 登录页 跳转 | `redirectPageId`（默认为空，重定向到入口位置） | redirectPageId登录成功后重向位置，可选
6 | 个人中心页 跳转 | | 
7 | 我的优惠券 跳转 | | 
8 | 在线充值 跳转 | | 
9 | 支付页 跳转 | 支付参数Json格式 | `{goodsType:"商品类型",goodsAmount:"总额",orderGId:"订单流水号",...}`
