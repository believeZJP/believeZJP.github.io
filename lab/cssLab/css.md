# 这里放置demo里用到的css属性

1. [按钮划动样式](1-button.html)

::before

translateY

data-*

content

nth-child


2. [方块旋转加载动画](2-retangle-rotating.html)

@keyframes https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes

animation-duration https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration

rotateY https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateY

nth-child https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child

z-index https://developer.mozilla.org/en-US/docs/Web/CSS/z-index

::before https://developer.mozilla.org/en-US/docs/Web/CSS/::before

::after https://developer.mozilla.org/en-US/docs/Web/CSS/::after


3. [对角线条纹边框动画效果](3-diagonal-strip-border-effects.html)
            
            
linear-gradient https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient

box-shadow https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow

@keyframes https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes

background-size https://developer.mozilla.org/en-US/docs/Web/CSS/background-size

background-position https://developer.mozilla.org/en-US/docs/Web/CSS/background-position

lorem ipsum https://lipsum.com/


实现瀑布流

滚动条监听事件
用window.onscroll()来做滚动条监听事件，调用函数 check_csroll(parent, content)实现监听事件操作的具体方法
在函数中首先同样的获得所有的图片，以及用dcontent[dcontent.length - 1].offsetTop;最后一张图片距顶的距离
用document.documentElement.scrollTop || document.body.scrollTop;
获得滚动条滚动的距离，||其中有两种不同的方法可供选择是为了兼容不同的浏览器
用document.documentElement.clientHeight || document.body.clientHeight;获得当前设备屏幕的高度
用last_content_height < scroll_top + page_height 判断当最后一张图片到顶的距离<滚动条的距离+屏幕的高度时返回true



动态加载图片
得到上一讲返回来的true之后，就可以用JavaScript执行在Html DOM中创建元素节点，然后追加元素节点,将Json字符串中的图片数据源动态添加到页面中

在函数中用for循环历遍Json字符串中的所有图片
在for循环中首先获取id="container"的整个大的div容器
创建class="box"的div子节点，将子节点作为根元素用parent.appendChild();方法添加到id="container"的div容器中

创建class="box_img"的div子节点，将子节点作为根元素用parent.appendChild();方法添加到class="box"的div中

创建图片子节点document.createElement("img");设置图片的路径
src = "../images/" + img_data.data[i].src;将图片节点作为根元素用parent.appendChild();方法添加到class="boximg"的div中
不断地循环Json字符串中的所有图片，将有图片都加载到页面中
