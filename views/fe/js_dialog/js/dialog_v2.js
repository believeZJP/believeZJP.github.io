/**
 * 添加确定按钮
 * 和点击按钮的回调
 */
(function(){
	function Dialog(){
		
	}
	Dialog.prototype = {
		alert: function(content, handler){
			var boundingBox = $('<div class="dialog-boundingBox"></div>');
			boundingBox.appendTo('body');
			boundingBox.html(content);
			
			var btn = $('<input class="dialog-confirm-btn" type="button" value="确定">');
			btn.appendTo(boundingBox);
			btn.click(function(){
				handler && handler();
				boundingBox.remove();
			});
		},
		confirm: function(){
			
		},
		prompt: function(){
			
		}
	}
	
	window.Dialog = Dialog;
	
})();
