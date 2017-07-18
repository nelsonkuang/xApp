(function (root, appName) {
    root.xApp = {
        ENV: { // 客户端环境
            isAndroid: function () {
                return navigator.userAgent.match(/Android/i);
            },
            isIOS: function () {
                return navigator.userAgent.match(/iPhone|iPod|iPad/i);
            },
            isMobile: function () {
                return (xApp.ENV.isAndroid() || xApp.ENV.isIOS());
            }
        },
        getAppVersion: function () { // APP输出到webview的userAgent里面的串带定义好的 yourAppName/1.1-debug 则调用方法xApp.getAppVersion('yourAppName') => '1.1-debug'
            var reg = new RegExp('(^|\/)' + appName + '\/([\w-_\.]+)(\/|$)', 'i');
            var r = navigator.userAgent.match(reg);
            if (r != null) {
                return r[2];
            }
            return null;
        },
        isInApp: function () {
            if(xApp.getAppVersion()) {
                return true;
            } else {
                return false;
            }
        },
        setupWebViewJavascriptBridge: function (callback) { // webview端发起建立与App端的桥接
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            if (xApp.ENV.isAndroid()) { // 安卓与IOS端可能会出现一边用大写一边用小写，最好沟通好都用大写或者都用小写就不用分开处理。[这里要按需修改]
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            } else {
                WVJBIframe.src = 'https://__bridge_loaded__';
            }
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
        },
        sendToApp: null, // Webview与App端交互的核心方法
        dataFromApp: null, // App共享给webview端的可用数据
        shareData: {}, // 分享到微信/QQ/..的数据设置
        ready: function (callback) { // 监听App端初始化webview是否完成，若考虑到所有的webview都是支持cookie，App端可以直接把dataFromApp数据写到cookie方便调用，就不需要执行此函数
            var __getIdTimer = setInterval(function () {
                if (xApp.dataFromApp) {
                    callback(xApp.dataFromApp);
                    clearInterval(__getIdTimer);
                }
            }, 10);
        }
    };
    // 初始化
    if (xApp.isInApp()) {
        xApp.setupWebViewJavascriptBridge(function (bridge) {
            bridge.registerHandler('WebviewBridgeReady', function (data, responseCallback) { // [需APP开发人员定义好支持接口]
                xApp.dataFromApp = xApp.ENV.isAndroid() ? JSON.parse(data) : data; // 要跟IOS及Android端沟通好能否直接输出json若否则需要进行转换。[这里要按需修改]
                // var responseData = { 'type':'','value':'' }
                // responseCallback(responseData); // 初始化完成后向APP端回传的响应数据，可选
                // 若需要在h5动态设置header头部菜单，或者要设置fixed bottom固定底部菜单，需要在这时进行设置
                // 比如，要设计头部菜单有返回、关闭和分享按钮，可以这样传参数 var responseData = [{ 'type':'setHeaderMenus','value':['back','close','share']}];
            });
            xApp.sendToApp = function (type, value, callback) { // 初始化Webview与App端交互的核心方法 [需APP开发人员定义好支持接口]
                bridge.callHandler('SendDataToApp', { 'type': type, 'value': value }, function (response) {
                    callback(response);
                })
            }
        });
    }
})(this, yourAppName);
