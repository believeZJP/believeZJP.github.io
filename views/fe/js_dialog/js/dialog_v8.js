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
 *
 * v5:
 * 修改整体布局为title,body, footer
 * 添加title参数
 *
 * v6:
 * 添加关闭按钮和对应的回调事件
 *
 * v7:
 * 定制皮肤
 *
 * v8:
 * 配置按钮文案
 */
(function(){
	function Dialog(){
	}
	this.cfg = {
		width: 500,
		height: 300,
		content: '',
		hasCloseBtn: false,
		// handle: null,
		skinClassName: null,
		text4AlertBtn: '确定',
		handler4CloseBtn: null,
		handler4AlertBtn: null


	};
	Dialog.prototype = {
		alert: function(cfg){
			var CFG = $.extend(this.cfg, cfg);
			var boundingBox = $('<div class="dialog-boundingBox">'+
					'<div class="dialog-header">'+ CFG.title +'</div>'+
					'<div class="dialog-body">'+ CFG.content +'</div>'+
					'<div class="dialog-footer"><input class="dialog-alert-btn" type="button" value="'+CFG.text4AlertBtn+'"></div>'+

				+'</div>');
			boundingBox.appendTo('body');
			// boundingBox.html(CFG.content);

			var btn = boundingBox.find('.dialog-alert-btn');
			btn.appendTo(boundingBox);
			btn.click(function(){
				CFG.handler4AlertBtn && CFG.handler4AlertBtn();
				boundingBox.remove();
			});

			boundingBox.css({
				width: CFG.width + 'px',
				height: CFG.height + 'px',
				left: (CFG.x || (window.innerWidth - CFG.width)/2) + 'px',
				top: (CFG.y || (window.innerHeight - CFG.height)/2) + 'px'
			});

			if(CFG.hasCloseBtn){
				var closeBtn = $('<span class="dialog-closeBtn">X</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function () {
					CFG.handler4CloseBtn && CFG.handler4CloseBtn();
					boundingBox.remove();
				})
			}

			if(CFG.skinClassName){
				boundingBox.addClass(CFG.skinClassName);
			}

		},
		confirm: function(){

		},
		prompt: function(){

		}
	};

	window.Dialog = Dialog;
	
})();
