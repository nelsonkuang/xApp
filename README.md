# xApp
A Dead Simple Hybrid App Solution base on [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)   
xApp是基于[WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)而设计并封装好的一种非常简单易用的Hybrid App的解决方案。指令式的交互方式。   

## 使用方式
1. APP与网页版共存的情况，参照[`sendToApp`](https://github.com/nelsonkuang/xApp/blob/master/sendToApp.md)的电商平台APP，如下：    
```html
<a data-href="/goods/450630" data-id="450630" class="goodslink" href="javascript:void(0);">立刻参与</a>
```  
```javascript
if(xApp.isInApp()) { // 在APP Webview中打开
   $(document).on('click','.goodslink',function(){
      var gid = $(this).attr('data-id');
      sendToApp(1, gid); // '1' 为商品详情页跳转指令, gid 为商品ID, 打开ID为 gid 的商品详情页
   });
} else { // 非APP下
   $(document).on('click','.goodslink',function(){
      var href = $(this).attr('data-href');
      window.location.href = href; // 直接打开网页链接
   });
}

```
2. Webview中h5页面加载时需要使用APP端传过来的用户GID
```javascript
xApp.ready(function(data) {
   var gId = data.gId;
   // ...
});
```
