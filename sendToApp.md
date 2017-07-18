## `sendToApp` Webview与App端交互函数的设计
```javascript
 xApp.sendToApp = function (type, value, callback)
```
 `type` 是要传给APP端的指令类型，`value` 是要传给APP端的值，`callback(response)` callback回调执行函数可以通过 `response` 响应参数来判断指令是否执行成功   

### 通用功能设计

注意：APP每增加一个页面都给其定义一个独立的 `pageId`   

指令类型Type | 功能Function | 值value | 说明Description
---|---|---|---
12 | 通用页面 跳转 | `pageId` | 跳转到页面ID为 `pageId` 的页面


### 实例：一个电商平台APP的sendToAppTypes设计   

指令类型Type | 功能Function | 值value | 说明Description
---|---|---|---
1 | 商品详情页 跳转 | `goodsId` | 跳转到商品ID为 `goodsId` 的商品详情页
2 | 设置分享内容 | `{shareTitle:"分享标题",shareDesc:"分享描述",shareUrl:"链接",shareImg:"图片地址",shareRule:"分享规则0,1,2,3...",needLogin:"是否需要登录0/1"}` | 通过js设置分享内容
3 | 分享 调起 | | 
4 | 首页 跳转 | | 
5 | 登录页 跳转 | `redirectPageId`（默认为空，重定向到入口位置） | redirectPageId登录成功后重向位置，可选。
6 | 个人中心页 跳转 | | 
7 | 我的优惠券 跳转 | | 
8 | 在线充值 跳转 | | 
9 | 支付页 跳转 | 支付参数Json格式 | `{goodsType:"商品类型",goodsAmount:"总额",orderGId:"订单流水号",...}`
10 | 分销中心首页 跳转 | | 
11 | ... | ... | ...
