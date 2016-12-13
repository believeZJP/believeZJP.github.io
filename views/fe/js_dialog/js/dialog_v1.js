(function(){
	function Dialog(){
		
	}
	Dialog.prototype = {
		alert: function(content){
			var boundingBox = $('<div class="dialog_boundingBox"></div>');
			boundingBox.appendTo('body');
			boundingBox.html(content);
		},
		confirm: function(){
			
		},
		prompt: function(){
			
		}
	}
	
	window.Dialog = Dialog;
	
})();
