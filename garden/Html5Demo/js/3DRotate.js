$(function(){
	// 这初始化容器中指定的元素，在这种情况下，旋转木马.
	$("#carousel1").CloudCarousel({			
		xPos:450,
		yPos:110,
		buttonLeft: $('#leftBtn'),
		buttonRight: $('#rightBtn'),
		altBox: $("#alt-text"),
		titleBox: $("#title-text")		
//		FPS:30,
//		reflHeight:86,
//		reflGap:2,
//		yRadius:40,
//		autoRotateDelay: 1200,
//		speed:0.2,
//		mouseWheel:true,
//		bringToFront:true
	});	
});
