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
 *v14:
 * 添加confirm方法
 * 缺点，暂时没有阻止进程执行，回调会在弹出框的同时执行，待解决。
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
			text4ConfirmBtn: '确定',
			text4CancelBtn: '取消',
			handler4CloseBtn: null,
			handler4AlertBtn: null,
			handler4ConfirmBtn: null,
			handler4CancelBtn: null
		};

	}
	// Dialog.prototype = {
	Dialog.prototype = $.extend({}, new Widget(),{
		renderUI: function () {
			var footerContent = '';
			switch (this.cfg.winType){
				case 'alert':
					footerContent = '<input type="button" value="'+this.cfg.text4AlertBtn+'" class="dialog-alert-btn">';
					break;
				case 'confirm':
					footerContent = '<input type="button" value="'+this.cfg.text4ConfirmBtn+'" class="dialog-confirm-btn">' +
									'<input type="button" value="'+this.cfg.text4CancelBtn+'" class="dialog-cancel-btn">';
					break;
			}
			this.boundingBox = $('<div class="dialog-boundingBox">'+
					'<div class="dialog-header">'+ this.cfg.title +'</div>'+
					'<div class="dialog-body">'+ this.cfg.content +'</div>'+
					'<div class="dialog-footer">'+ footerContent +'</div>'+
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
			this.boundingBox.on('click', '.dialog-alert-btn', function () {
				that.fire('alert');
				that.destory();
			}).on('click', '.dialog-closeBtn', function () {
				that.fire('close');
				that.destory();
			}).on('click', '.dialog-confirm-btn', function () {
				that.fire('confirm');
				that.destory();
			}).on('click', '.dialog-cancel-btn',function () {
				that.fire('cancel');
				that.destory();
			});
			if(this.cfg.handler4AlertBtn){
				this.on('alert', this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn){
				this.on('close', this.cfg.handler4CloseBtn);
			}
			if(this.cfg.handler4ConfirmBtn){
				this.on('confirm', this.cfg.handler4ConfirmBtn);
			}
			if(this.cfg.handler4CancelBtn){
				this.on('cancel', this.cfg.handler4CancelBtn);
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
			$.extend(this.cfg, cfg, {winType: 'alert'});
			this.render();
			return this;
		},
		confirm: function(cfg){
			$.extend(this.cfg, cfg, {winType: 'confirm'});
			this.render();
			return this;
		},
		prompt: function(){

		}
	});

	window.Dialog = Dialog;
	
})();
