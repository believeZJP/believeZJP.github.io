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
 * 订制皮肤
 *
 * v8:
 * 配置按钮文案
 *
 * v9:
 * 添加遮罩层
 * 遮罩层的添加方法：
 * 首先在body上添加一个全屏的div,然后再添加dialog,这样就不会覆盖。
 *
 * v10:
 * 弹框的拖动，需要引用jQuery ui,暂时先不引入
 */
(function(){
	function Dialog(){
		this.cfg = {
			width: 500,
			height: 300,
			content: '',
			hasCloseBtn: false,
			hasMask: true,
			isDraggable: true,
			dragHandle: null,
			skinClassName: null,
			text4AlertBtn: '确定',
			handler4CloseBtn: null,
			handler4AlertBtn: null


		};

	}
	Dialog.prototype = {
		alert: function(cfg){
			var CFG = $.extend(this.cfg, cfg),
				boundingBox = $('<div class="dialog-boundingBox">'+
						'<div class="dialog-header">'+ CFG.title +'</div>'+
						'<div class="dialog-body">'+ CFG.content +'</div>'+
						'<div class="dialog-footer"><input class="dialog-alert-btn" type="button" value="'+CFG.text4AlertBtn+'"></div>'+
					+'</div>'),
				btn = boundingBox.find('.dialog-alert-btn'),

				mask = null;

			if(CFG.hasMask){
				mask = $('<div class="dialog-mask"></div>');
				mask.appendTo('body');
			}

			boundingBox.appendTo('body');

			btn.click(function(){
				CFG.handler4AlertBtn && CFG.handler4AlertBtn();
				boundingBox.remove();
				mask && mask.remove();
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
					mask && mask.remove();
				})
			}

			if(CFG.skinClassName){
				boundingBox.addClass(CFG.skinClassName);
			}
			if(CFG.draggable){
				if(CFG.dragHandle){
					// boundingBox.draggleable({dragHandle: dragHandle});
					// boundingBox.attr('draggable',true);
				}else{
					// boundingBox.draggable();
					// boundingBox.attr('draggable',true);
				}

			}

		},
		confirm: function(){

		},
		prompt: function(){

		}
	};

	window.Dialog = Dialog;
	
})();
