/**
 * v2:
 * 添加确定按钮
 * 和点击按钮的回调
 *
 * v3:
 * 添加长宽的配置项，添加参数的配置
 * left，top的设置，默认居中
 * 
 * v4:
 * 统一参数的配置
 */
(function(){
	function Dialog(){
		this.cfg = {
			width: 500,
			height: 300,
			content: '',
			handle: null
		};
	}
	Dialog.prototype = {
		alert: function(cfg){
			var CFG = $.extend(this.cfg, cfg);
			var boundingBox = $('<div class="dialog-boundingBox"></div>');
			boundingBox.appendTo('body');
			boundingBox.html(CFG.content);
			
			var btn = $('<input class="dialog-confirm-btn" type="button" value="确定">');
			btn.appendTo(boundingBox);
			btn.click(function(){
				CFG.handler && CFG.handler();
				boundingBox.remove();
			});

			boundingBox.css({
				width: CFG.width + 'px',
				height: CFG.height + 'px',
				left: (CFG.x || (window.innerWidth - CFG.width)/2) + 'px',
				top: (CFG.y || (window.innerHeight - CFG.height)/2) + 'px'
			})

		},
		confirm: function(){
			
		},
		prompt: function(){
			
		}
	};
	
	window.Dialog = Dialog;
	
})();
