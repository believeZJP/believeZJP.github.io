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
 *
 * v9:
 * 添加遮罩层
 * 遮罩层的添加方法：
 * 首先在body上添加一个全屏的div,然后再添加dialog,这样就不会覆盖。
 *
 * v10:
 * 弹框的拖动，需要引用jQuery ui,暂时先不引入
 *
 * v11:
 * 自定义事件
 * 本质：观察者模式
 * 优点：跳出原生事件的限制，提高封装的抽象层级
 * 将事件抽象出来，不是绑定到某个按钮或div上，而是绑定到组件层上。
 *
 * v12:
 * 连缀语法
 * return this；
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
		this.handlers = {};

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

				mask = null,
				that = this;

			if(CFG.hasMask){
				mask = $('<div class="dialog-mask"></div>');
				mask.appendTo('body');
			}

			boundingBox.appendTo('body');

			btn.click(function(){
				boundingBox.remove();
				mask && mask.remove();
				that.fire('alert');
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
					boundingBox.remove();
					mask && mask.remove();
					that.fire('close');
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

			if(CFG.handler4AlertBtn){
				this.on('alert', CFG.handler4AlertBtn);
			}
			if(CFG.handler4CloseBtn){
				this.on('close', CFG.handler4CloseBtn);
			}

			return this;

		},
		confirm: function(){

		},
		prompt: function(){

		},
		on: function(type, handler){//绑定事件,可以绑定多个事件
			if(typeof this.handlers[type] == 'undefined'){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire: function(type, data){//触发事件
			if(this.handlers[type] instanceof  Array){
				var handlers = this.handlers[type];
				for(var i=0,il=handlers.length; i<il;i++){
					handlers[i](data);
				}
			}

		}
	};

	window.Dialog = Dialog;
	
})();
