(function(){
	
	// webkit prefix helper 判断css前缀模式
	var prefix = 'WebkitAppearance' document.documentElement.style ? '-webkit-' : ''
	
	//regex 匹配百分号的正则
	var percentangeRE = /^([\d\.]+)%$/
	
	//elements 一些元素的定义
	var overlay = document.createElement('div'),
		  wrapper = document.createElement('div'),
		  target,
		  parent,
		  placeholder
	
	//state 一些状态的定义
	var shown = false
		  lock = false
		  originalStyles
		 
	// options 配置信息
	var options = {
		transitionDuration: '0.4s',
		transitionTimingFunction: 'cubic-bezier(.4,0,0,1)',
		bgColor: '#fff',
		bgOpacity: 1,
		maxWidth: 300,
		maxHeight: 300,
		onOpen: null,
		onClose: null,
		onBeforeOpen: null,
		onBeforeClose: null
	}
	
	//compatibility stuff  兼容问题  ???
	var trnas = sniffTransition(),
		transitionProp = trans.transition,
		transformProp = trans.transform,
		transformCssProp = transformProp.replace(/(.*)Transform/,'-$1-transform'),
		transEndEvent = trans.transEnd
	
	//overlay style 遮罩层的样式
	setStyle(overlay,{
		position: 'fixed',
		display: 'none',
		zIndex: 99998,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: options.bgColor,
		cursor: prefix + 'zoom-out',
		
	})
	
	//wrapper style 容器的样式
	setStyle(wrapper,{
		position: 'fixed',
		zIndex: 99999,
		top: '50%',
		left: '50%',
		width: 0,
		height: 0
	})
	
	//helpers -----通用函数
	
	/***
	 * 设置样式通用方法
	 * @param {Object} el dom元素
	 * @param {Object} styles 样式对象
	 * @param {Object} remember 是否合并以前样式
	 * 此处的remember不太明白
	 */
	function setStyle(el, styles, remember){
		checkTrans(style)
		var s = el.style,
			  original = {}
		for(var key in styles){
			if(remember){
				original[key] = s[key] || ''
			}
			s[key] = styles[key]
		}
		return original
	}
	
	function sniffTransition(){
		var ret = {},
			  trans = ['webkitTransition', 'transition', 'mozTransition'],
			  tform = ['webkitTransform', 'transform', 'mozTransform'],
			  end = {
			  	'transition': 'transitionend',
			  	'mozTransition': 'transitionend',
			  	'webkitTransition': 'webkitTransitionEnd'
			  }
		/***
		 * 如果有对应的属性，则修改样式???
		 */
		trans.some(function(prop){
			if(overlay.style[prop] !== undefined){
				ret.transition = prop
				ret.transEnd = end[prop]
				return true
			}
		})
		
		tform.some(function(prop){
			if(overlay.style[prop] !== undefined){
				ret.transform = prop
				return true
			}
		})
		return ret
	}
	
	/****
	 * 这个方法是将style的原来的取到，再重新赋值一次，意义何在，没看懂????
	 * @param {Object} styles
	 */
	function checkTrans(styles){
		var value
		if(styles.transition){
			value = styles.transition
			delete styles.transition
			styles[transitonProp] =  value
		}
		
		if(styles.transform){
			value = styles.transform
			delete styles.transform
			styles[transformProp] = value
		}
	}
	
	var stylesToCopy = [
		'position', 'display', 'float',
		'top', 'left', 'right', 'bottom',
		'marginBottom', 'marginLeft', 'marginRight',
		'marginTop', 'font', 'lineHeight', 'verticalAlign'
	]
	
	function copy (el,box){
		var styles = getComputedStyle(el),
			  ph = document.createElement('div'),
			  i = stylesToCopy.length, key
		while(i--){
			key = stylesToCopy[i]
			ph.style[key] = styles[key]
		}
		setStyle(ph,{
			visibility: 'hidden',
			width: box.width + 'px',
			height: box.height + 'px',
			display: styles.display === 'inline' ? 'inline-block' : styles.display
		})
		if(options.deepCopy){
			ph.innerHTML = el.innerHTML
		}else{
			ph.textContent = el.textContent
		}
		return ph
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})();
