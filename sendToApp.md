## `sendToApp` Webview与App端交互函数的设计
```javascript
 xApp.sendToApp = function (type, value, callback)
```
 `type` 是要传给APP端的指令类型，`value` 是要传给APP端的值，`callback(response)` callback回调执行函数可以通过 `response` APP回传的响应参数来判断指令是否执行成功   

### 通用功能设计

注意：APP每增加一个页面都给其定义一个独立的 `pageId`   

指令类型Type | 功能Function | 值value | 说明Description
---|---|---|---
912 | 通用页面 **跳转** | `pageId` | 跳转到页面ID为 `pageId` 的页面
967 | 分享内容 **设置** | `{shareTitle:"分享标题",shareDesc:"分享描述",shareUrl:"链接",shareImg:"图片地址",shareRule:"分享规则0,1,2,3...",needLogin:"是否需要登录0/1"}` | 通过js设置分享内容
917 | 分享 **调起** | | 
910 | Webview **创建并打开** | `link` | 创建新的Webview并打开指定链接 `link`
913 | Webview **关闭** | | 
114 | APP原生普通提示框 **调起** | `msg` | 提示`msg`信息
119 | APP原生警告提示框 **调起** | `msg` | 提示`msg`信息
120 | APP原生失败提示框 **调起** | `msg` | 提示`msg`信息
520 | APP原生成功提示框 **调起** | `msg` | 提示`msg`信息
... | ... | ... | ...

   

### 实例：一个电商平台APP的sendToAppTypes设计   

指令类型Type | 功能Function | 值value | 说明Description
---|---|---|---
1 | 商品详情页 **跳转** | `goodsId` | 跳转到商品ID为 `goodsId` 的商品详情页
2 | 首页 **跳转** | | 
3 | 登录页 **跳转** | `redirectPageId`（默认为空，重定向到入口位置） | redirectPageId登录成功后重向位置，可选。
4 | 个人中心页 **跳转** | | 
5 | 我的优惠券 **跳转** | | 
6 | 在线充值 **跳转** | | 
7 | 支付页 **跳转** | 支付参数Json格式 | `{goodsType:"商品类型",goodsAmount:"总额",orderGId:"订单流水号",...}`
8 | 分销中心首页 **跳转** | | 
9 | 搜索页 **跳转** | `keywords` | 搜索关键词`keywords`，可选
10 | 商品分类页 **跳转** | `channelId` | 商品分类ID`channelId`，可选
11 | ... | ... | ...
