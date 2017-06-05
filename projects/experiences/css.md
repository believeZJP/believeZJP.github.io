###Welcome to use MarkDown

# CSS 技巧

## css恶作剧

`
	*{
	    cursor: none!important;
	}
`
---
## 简单的文字模糊效果
`
	p {
	    color: transparent;
	    text-shadow: #111 0 0 5px;
	}
`
---

## 垂直居中
`
	.center-vertical {
	    position: relative;
	    top: 50%;
	    transform: translateY(-50%);
	}
	/*之前用的时候页面会发生跳动，从0%跳动到-50%*/
`
---

##　实时编辑CSS
	通过设置style标签的display:block样式可以让页面的style标签显示出来，并且加上contentEditable属性后可以让样式成为可编辑状态，更改后的样式效果也是实时更新呈现的。此技巧在IE下无效。拥有此技能者，逆天也！
`
	<!DOCTYPE html>
	<html>
	    <body>
	        <style style="display:block" contentEditable>
	        	body { color: blue }
	        </style>
	    </body>
	</html>
`
---

##　CSS中也可以做简单运算
	通过CSS中的calc方法可以进行一些简单的运算，从而达到动态指定元素样式的目的。
`
	.container{
		background-position: calc(100% - 50px) calc(100% - 20px);
	}
`



# JS JavaScript篇

## 用js生成随机字符串
	利用Math.random和toString生成随机字符串，来自前一阵子看到的一篇博文。这里的技巧是利用了toString方法可以接收一个基数作为参数的原理，这个基数从2到36封顶。如果不指定，默认基数是10进制。略屌！    

`
	function generateRandomAlphaNum(len) {
	    var rdmString = "";
	    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
	    return rdmString.substr(0, len);
	}
`
---

##　不声明第三个变量的值交换
	我们都知道交换两个变量值的常规做法，那就是声明一个中间变量来暂存。但鲜有人去挑战不声明中间变量的情况，下面的代码给出了这种实现。蛮有创意 的。
`
	var a=1,b=2;a=[b,b=a][0];
`



