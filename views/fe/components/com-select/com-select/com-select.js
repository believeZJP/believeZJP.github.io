/****
 * 学习来源：
 	https://github.com/hernansartorio/jquery-nice-select
 	@author: believezjp
*/
(function($){
	$.fn.niceSelect = function(method){
		
		//公用方法  Methods
		if(typeof method === 'string'){
			switch (method){
				case 'update':
					var $select = $(this),
						  $dropdown = $(this).next('nice-select'),
						  open = $dropdown.hasClass('open')
						  
					if(open){
						$select.next().trigger('click')
					}
					
			}
		}
		
		
		
		
	}
	
})();
