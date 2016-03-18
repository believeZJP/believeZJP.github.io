(function($){
	var privateFun = function(){//私有方法
		
	}
	
	var PageSwitch = (function(){
		function PageSwitch(element,options){
			this.settings = $.extend(true,$.fn.PageSwitch.default,options || {});
			this.element = element;
			this.init();
		}
		PageSwitch.prototype = {
			init : function(){//外部可以调用的方法
//			$("div").PageSwitch("init");//这样就可以调用init方法。
				
			}
		}
		return PageSwitch;
	})();
	$.fn.PageSwitch = function(options){
		return this.each(function(){
			var me = $(this),
				 instance = me.data("PageSwitch");
			if(!instance){
				instance = new PageSwitch(me,options);
				me.data("PageSwitch",instance);
			}
			
			if($.type(options)=== "string") return instance[options]();
		});
	}
	
	$.fn.PageSwitch.default = {
		selectors : {
			sections : ".sections",
			section : "section",
			page : "page",
			active : "active"
		},
		index : 0,
		easing : "ease",
		duration : 500,
		loop : false,
		pagination : true,
		keyboard : true,
		direction : "vertical",
		callback : ""
	}
	//在页面中的父级元素添加data属性，可以直接在插件内部初始化插件，而不用在页面中通过js来调用该插件
	/**
	 * //普通
	 * <script type="text/javascript">
			$("#container").PageSwitch();
		</script>
		//特殊
	 * <div id="container" data-PageSwitch>
	 * 
	 * $(function(){
	 *		$("[data-PageSwitch]").PageSwitch();//
	 *	});
	 * 
	 */
	/*$(function(){
		$("[data-PageSwitch]").PageSwitch();//
	});*/
	
	
	
	
	
	
	
	
})(jQuery);
