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
 *
 * v13:
 *
 * Widget抽象类
 * 原生function类的问题：
 * 1）所有类继承自Object
 * 2）Object提供的帮助太少
 *
 * 将on,fire 抽象出来，抽象到Widget类中，
 *
 * 问题：
 * widget的生命周期没有统一的接口，不同的人写出的widget代码风格差别很大，不利维护
 *
 * 解决：
 * 为widget类设计统一生命周期
 *
 *
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
	// Dialog.prototype = {
	Dialog.prototype = $.extend({}, new Widget(),{
		renderUI: function () {
			this.boundingBox = $('<div class="dialog-boundingBox">'+
					'<div class="dialog-header">'+ this.cfg.title +'</div>'+
					'<div class="dialog-body">'+ this.cfg.content +'</div>'+
					'<div class="dialog-footer"><input class="dialog-alert-btn" type="button" value="'+this.cfg.text4AlertBtn+'"></div>'+
				+'</div>');
			if(this.cfg.hasMask){
				this._mask = $('<div class="dialog-mask"></div>');
				this._mask.appendTo('body');
			}
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="dialog-closeBtn">X</span>');
			}
			this.boundingBox.appendTo(document.body);
		},
		bindUI: function () {
			var that = this;
			this.boundingBox.delegate('.dialog-alert-btn','click', function () {
				that.fire('alert');
				that.destory();
			}).delegate('.dialog-closeBtn','click',function () {
				that.fire('close');
				that.destory();
			});
			if(this.cfg.handler4AlertBtn){
				this.on('alert', this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn){
				this.on('close', this.cfg.handler4CloseBtn);
			}
		},
		syncUI: function () {
			this.boundingBox.css({
				width: this.cfg.width + 'px',
				height: this.cfg.height + 'px',
				left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
				top: (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
			});
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if(this.cfg.draggable){
				if(this.cfg.dragHandle){
					// boundingBox.draggleable({dragHandle: dragHandle});
					// boundingBox.attr('draggable',true);
				}else{
					// boundingBox.draggable();
					// boundingBox.attr('draggable',true);
				}

			}
		},
		destructor: function(){
			this._mask && this._mask.remove();
		},
		alert: function(cfg){
			$.extend(this.cfg, cfg);
			this.render();
			return this;
		},
		confirm: function(){

		},
		prompt: function(){

		}
	});

	window.Dialog = Dialog;
	
})();
