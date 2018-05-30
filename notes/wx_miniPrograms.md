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

- ## bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。

- ## 在捕获阶段监听事件时，可以采用capture-bind、capture-catch关键字，后者将中断捕获阶段和取消冒泡阶段。


- ## dataset

在组件中可以定义数据，这些数据将会通过事件传递给 SERVICE。 书写方式： 以data-开头，多个单词由连字符-链接，不能有大写(大写会自动转成小写)如data-element-type，最终在 event.currentTarget.dataset 中会将连字符转成驼峰elementType。
```
<view data-alpha-beta="1" data-alphaBeta="2" bindtap="bindViewTap"> DataSet Test </view>
```








# 出错解决
## 1. 短信发送验证码 提示出错，
解决办法，开发者id没有权限
将开发者id添加到项目里

## 2. 引入node_modules

小程序目前不支持直接引入 node_modules , 开发者需要使用到 node_modules 时候建议拷贝出相关的代码到小程序的目录中。


# 项目中的问题

登陆成功后没有跳转, 原因是成功后没有跳转url, 登陆只在首页有, 所以没有跳转url,  

页面加载在onshow阶段, 会判断是否有cookie存在, 如果没有, 则跳转到登陆页面, 有则显示具体页面。

这里有判断cookie存在的逻辑。



# 实现功能

## 长按复制, 提示已复制
用到的API:

- wx.setClipboardData wx.getClipboardData
- wx.showToast
- data-*
- text标签设置 selectable=’true’
  只有本文在text内才可以复制其他的是不可以复制的


```
<text selectable="true" bindlongpress="copyTBL" data-copy='www.jd.com'>
      www.jd.com
    </text>
```

```
copyTBL: function (e) {
      var self = this;
      wx.setClipboardData({
        data: e.target.dataset.copy,
        success: function (res) {
          wx.showToast({
            title: '已复制',
            duration: 1000
          })
        }
      })
    }
```

## 判断当前用户登陆状态

需要设置默认的三个data值
```
isLogined: false,
fromPageLevel: 1,
jump2loginNum: 0,
```
## 微信小程序中设置cookie

  需求： 首次进入页面，显示弹框，如果不关闭，每次进入都显示。
         若用户主动关闭，则不再显示。

  解决方案：
      
      pc端设置cookie即可。

      小程序端通过wx.setStorageaSync和wx.getStorageSync来设置本地缓存。
  tips:
  
      - storage不是响应式数据，要想绑定到页面，需要在对应页面也设置变量对应到页面上。

      - storage中没有对应的key值，getStorage获取到的是空字符串。

      - storage的值在页面data中可以初始化为空，在onload的钩子中可以调用wx.getStorageAsync('key')
      根据取到的数据，如果为''的话可以设置为默认值。

      - 在绑定事件中setStorage后，storage发生变化，但是没有跟页面绑定，页面不会发生变化。
        setStorage同时，也要setData。


```
<!-- 页面中定义值，storage暂时不处理 -->
data: {
  isInfoVisiable: '',
}

<!-- 页面加载时，获取当前值，如果没有，设为默认值 -->
onLoad: function(options) {
  let infoFlag = wx.getStorageSync('isInfoVisiable')
  infoFlag = infoFlag === '' ? true : infoFlag
  this.setData({
    isInfoVisiable: infoFlag
    });
}
<!-- 绑定事件中修改storage的值，同时也要改data的值 -->
closeInfoLayer: function() {
  wx.setStorageSync('isInfoVisiable', false)
  this.setData({
    isInfoVisiable: false
  })
}
```
    


## 转发 分享 按钮
不论是右上角的转发还是点击页面内分享按钮, 调用的方法都是page里的onShareAppMessage. 

可以通过res.from 来判断转发是来自于哪里的.
```
  Page({
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  }
})

```


## 根据UI给的切图写CSS样式的rpx值
  因为在小程序中用的是rpx,

  规定屏幕宽为750rpx。

  如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，
  
  则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

  所以，如果UI的标注图是750px的宽度，则标注的是多少px，代码中就写多写rpx值
  
  eg:
```  
font-size: 24px;
line-height: 40px;

<!-- 则代码中的写法 -->
font-size: 24rpx;
line-height: 40rpx;
```

## !!!一个巨坑！！！text标签!!!!
text标签里的文字一定不要分开写，如下错误的写法。

在渲染的时候，外层的view会莫名的把高度撑宽好多。

要严格按照下面正确的写法来写。

```
// 错误的写法：
<view>
  <text class='copy-link'>


    www.try.jd.com

  </text>
</view>

// 正确的写法
<view>
  <text class='copy-link'>www.try.jd.com</text>
</view>
  
```



# 开发工具

## 问题一 图片压缩
 UI给的图片太大了，让他压缩居然说不能压了。
 
 在[tinypng.com](https://tinypng.com/)自己压缩了。

 图片转base64,[网站链接](http://imgbase64.duoshitong.com/)





# 一些理念理解

## 1. 分包加载

在app.json中可以设置subpackagees. 

加载流程：

1.首次启动时，先下载小程序主包，显示主包内的页面；

2.如果用户进入了某个分包的页面，再下载这个对应分包，下载完毕后，显示分包的页面。

## 2. 代码片段

要测试文档中某些功能时，可以建立单独的代码片段，并且分享给别人，

区别于新建一个项目

## 3. 更新机制

==异步流程==

两个关键步骤：

  Step1. 向微信后台请求新版本信息

  Step2. 从微信CDNx下载小程序代码包

这两步都是网络请求, 且强依赖, 如果没有新版信息, 就没法确定新版下载地址。

小程序的启动和更新流程是同时并发执行的。

即使拉取失败也不会影响小程序启动

由于小程序的更新是异步的，本次启动可能无法应用最新代码, 下载好的代码需要在下次启动才会执行。


==超过有效时间强制更新机制==

假如用户7天没有打开小程序, 这时会强制同步拉取新版本信息，下载, 并使用新版本启动。


### 问题 

7天内使用的用户，在第二次打开才能用上最新版本。

### 解决思路

(1) 同步更新(放弃)

    同步检查更新-同步下载新版本, 启动小程序,会非常影响用户体验

(2) 模块热替换(放弃)
    小程序运行起来后, 将新版本的js代码于页面进行热替换。

    优点：

    可以解决异步更新不能在本次启动马上更新的问题。技术角度是最好的方案。

    缺点：

    会存在新旧逻辑，页面共存问题,特别是涉及全局变量,情况会更复杂。

  (3) 缩小定时检查版本轮询机制(目前方案)

    微信客户端会定时check最近使用过的小程序是否有发布最新版.
    有, 在下次启动时会同步更新版本再打开
    可以保证新版本发布24小时内，所有小程序都是最新版本. 

(4) 异步更新+强制更新(目前方案)

    同步检查更新与模块热加载两者间的折中方案。即维持异步更新机制,
    异步下载完小程序后, 提供重启小程序的能力. 详见 wx.getUpdateManager接口。

    强制更新试用于紧急修复场景，k恶意确保发布后用户能马上用到最新版。
    缺点： 会中断用户操作, 体验不好。

    建议： 对常规更新，尽量减少试用。可以提供简单的提醒，由用户来主动触发重启操作. 强制重启前建议用showModal咨询用户意见。

## 4. 获取用户信息

# 问题

点击某个元素隐藏时，如何加动画。