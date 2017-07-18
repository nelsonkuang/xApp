# xApp
A Dead Simple Hybrid App Solution base on [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)   
xApp是基于[WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)而设计并封装好的一种非常简单易用的Hybrid App的解决方案。   

## 使用方式
1. APP与网页版共存的情况，参照[`sendToApp`](https://github.com/nelsonkuang/xApp/blob/master/sendToApp.md)的电商平台APP，如下：    
```html
<a href="/goods/450630" data-id="450630" class="goodslink">立刻参与</a>
```  
```javascript
if(xApp.isInApp()) { // 
   $(document).on('click','.goodslink',function(e){
      e.preventDefault();
      var gid = $(this).attr('data-id');
      sendToApp(1, gid);
   });
}

```
