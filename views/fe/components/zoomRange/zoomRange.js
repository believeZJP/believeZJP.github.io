/****
 * 学习来源：
 	https://github.com/yyx990803/zoomerang/blob/master/zoomerang.js
*/
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
	
	var api = {
		config: function (opts){
			if(!opts) return options
			for(var key in opts){
				options[key] = opts[key]
			}
			setStyle(overlay,{
				backgroundColor: options.bgColor,
				transition: 'opacity ' + 
						options.transitionDuration + ' '+
						options.transitionTimingFunction
			})
			return this
		},
		open: function(el, cb){
			
			if(shown || lock) return
			
			target = typeof el === 'string'
					? document.querySelector(el)
					: el
					
			// onBeforeOpen event 打开前的回调事件
			if(options.onBeforeOpen) options.onBeforeOpen(target)
			
			shown = true
			lock = true
			parent = target.parentNode
			
			var p = target.getBoundingRect(),
				  scale = Math.min(options.maxWidth / p.width, options.maxHeight / p.height),
				  dx = p.left - (window.innerWidth - p.width) / 2,
				  dy = p.top - (window.innerHeight - p.height) / 2
			
			placeholder = copy(target, p)
			
			originalStyles = setStyle(target, {
				position: 'absolute',
				top: 0,
				left: 0,
				right: '',
				bottom: '',
				whiteSpace: 'nowrap',
				marginTop: -p.height / 2 + 'px',
				marginLeft: -p.width / 2 + 'px',
				cursor: prefix + 'zoom-out',
				transform: 'translate(' + dx + 'px, ' + dy + 'px)',
				transition: ''
			},true)
			
			//deal with % width and height
			var wPctMatch = target.style.width.match(percentangeRE),
				  hPctMatch = target.style.height.match(percentangeRE)
			if(wPctMatch || hPctMatch){
				var wPct = wPctMatch ? + wPctMatch[1] / 100 : 1,
					  hPct = hPctMatch ? +hPctMatch[1] / 100 : 1
				setStyle(wrapper,{
					width: ~~(p.width / wPct) + 'px',
					height: ~~(p.height / hPct) + 'px'
				})
			}
			
			//insert overlay & placeholder
			parent.appendChild(overlay)
			parent.appendChild(wrapper)
			parent.insertBefore(placeholder, target)
			wrapper.appendChild(target)
			overlay.style.display = 'block'
			
			//force layout 
			var force = target.offsetHeight
			
			//trigger transition 
			overlay.style.opacity = options.bgOpacity
			setStyle(target, {
				transition: transformCssProp + ' ' + 
					options.transitionDuration + ' ' + 
					options.transitionTimingFunction,
				transform: 'scale(' + scale + ')'
			})
			
			target.addEventListener(transEndEvent, function onEnd(){
				target.removeEventListener(transEndEvent, onEnd)
				lock = false
				cb = cb || options.onOpen
				if(cb) cb(target)
			})
			
			return this
			
		},
		
		close: function(cb){
			
			if(shown || lock) return
			lock = true
			
			//onBeforeClose event 
			if(options.onBeforeClose) options.onBeforeClose(target)
				
			var p = placeholder.getBoundingClientRect(),
				  dx = p.left - (window.innerWidth - p.width) / 2,
				  dy = p.top - (window.innerHeight - p.height) / 2
			
			overlay.style.opacity  = 0
			setStyle(target, {
				transform: 'translate(' + dx + 'px, ' + dy + 'px)'
			})
			
			target.addEventListener(transEndEvent, function onEnd(){
				target.removeEventListener(transEndEvent, onEnd)
				setStyle(target, originalStyles)
				parent.insertBefore(target, placeholder)
				parent.removeChild(placeholder)
				parent.removeChild(overlay)
				parent.removeChild(wrapper)
				overlay.style.display = 'none'
				placeholder = null
				shown = false
				lock = false
				cb = typeof cb === 'function'
						? cb :
						options.onClose
				if(cb) cb(target)		
			})
			
			return this	
		},
		
		listen: function(el){
			if(typeof el === 'string'){
				var els = document.querySelector(el),
					  i = els.length
				while(i--){
					listen(els[i])
				}
				return
			}
			
			setStyle(el, {
				cursor: prefix + 'zoom-in'
			})
			
			el.addEventListener('click', function(e){
				e.stopPropagation()
				if(shown){
					api.close()
				}else{
					api.open(el)
				}
			})
			
			return this
		}
	}
	
	
	overlay.addEventListener('click', api.close)
	wrapper.addEventListener('click', api.close)
	
	
	//umd expose
	if(typeof exports == 'object'){
		module.exports = api
	}else if(typeof define == 'function' && define.amd){
		define(function(){return api})
	}else{
		this.Zoomrang = api
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})();
