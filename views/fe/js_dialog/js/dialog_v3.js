/**
 * v2:
 * 添加确定按钮
 * 和点击按钮的回调
 *
 * v3:
 * 添加长宽的配置项，添加参数的配置
 * left，top的设置，默认居中
 * 
 *
 */
(function(){
	function Dialog(){
		this.cfg = {
			width: 500,
			height: 300
		};
	}
	Dialog.prototype = {
		alert: function(content, handler, cfg){
			var boundingBox = $('<div class="dialog-boundingBox"></div>');
			boundingBox.appendTo('body');
			boundingBox.html(content);
			
			var btn = $('<input class="dialog-confirm-btn" type="button" value="确定">');
			btn.appendTo(boundingBox);
			btn.click(function(){
				handler && handler();
				boundingBox.remove();
			});

			$.extend(this.cfg, cfg);
			boundingBox.css({
				width: this.cfg.width + 'px',
				height: this.cfg.height + 'px',
				left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
				top: (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
			})

		},
		confirm: function(){
			
		},
		prompt: function(){
			
		}
	}
	
	window.Dialog = Dialog;
	
})();
