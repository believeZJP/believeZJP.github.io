(function(){
	/*//滑动到底部
	$('#full-btm').click(function(){
	    $('html, body').animate({scrollTop:$(document).height()}, 'slow');
	    return false;
	});
	//滑动到顶部
	$('#full-top').click(function(){
	    $('html, body').animate({scrollTop:0}, 'slow');
	    return false;
	});
	
	
	$(".btnForShow").click(function(e){
		var that = $(this);
		var parent = that.parent();
		var html = parent.find("textarea").val();
		parent.find(".show").innerHTML(html);
		
	});*/
	
	var showHtml = function(){
		var parent = this.parentElement;
//		var html = parent.querySelector("textarea").val();
//		var desc = parent.querySelector("show");
//		desc.innerHTML(html);
	}
	document.getElementsByClassName("btnForShow")[0].onclick = function(){
		var parent = this.parentElement;
		var html = parent.querySelector("textarea").value;
		var desc = parent.querySelector(".show");
		desc.innerHTML = html;
	};
	
})();
