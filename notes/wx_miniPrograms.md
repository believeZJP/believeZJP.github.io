# 小程序配置 app.json

pages字段 —— 用于描述当前小程序所有页面路径，这是为了让微信客户端知道当前你的小程序页面定义在哪个目录。
window字段 —— 小程序所有页面的顶部背景颜色，文字颜色定义在这里的。
tabBar  ---- 设置底部 tab 的表现
networkTimeout ----   设置网络超时时间
debug  ---- 设置是否开启 debug 模式

onLaunch: function () {
    // 小程序启动之后 触发
}


# 生命周期
*   `onLoad`: 页面加载
    *   一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
*   `onShow`: 页面显示
    *   每次打开页面都会调用一次。
*   `onReady`: 页面初次渲染完成
    *   一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
    *   对界面的设置如`wx.setNavigationBarTitle`请在`onReady`之后设置。
*   `onHide`: 页面隐藏
    *   当`navigateTo`或底部`tab`切换时调用。
*   `onUnload`: 页面卸载
    *   当`redirectTo`或`navigateBack`的时候调用。


# 开发注意事项
-  ## 关键字(需要在双引号之内)
```
<checkbox checked="{{false}}"> </checkbox>
```
特别注意：不要直接写 checked="false"，其计算结果是一个字符串，转成 boolean 类型后代表真值。

- ## wx:if vs hidden 对比v-if 和v-show
因为 wx:if 之中的模板也可能包含数据绑定，所有当 wx:if 的条件值切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。

同时 wx:if 也是惰性的，如果在初始渲染条件为 false，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。

相比之下，hidden 就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。

一般来说，wx:if 有更高的切换消耗而 hidden 有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用 hidden 更好，如果在运行时条件不大可能改变则 wx:if 较好。




# 出错解决
## 1. 短信发送验证码 提示出错，
解决办法，开发者id没有权限

## 2. 引入node_modules
小程序目前不支持直接引入 node_modules , 开发者需要使用到 node_modules 时候建议拷贝出相关的代码到小程序的目录中。