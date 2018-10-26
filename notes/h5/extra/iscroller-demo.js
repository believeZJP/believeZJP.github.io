

	var container = document.getElementById("container");
	var content = document.getElementById("content");

	// Content Generator
	var size = 400;
	var frag = document.createDocumentFragment();
	for (var row=0, cl=content.clientHeight/size; row<cl; row++) {
		elem = document.createElement("div");
		elem.className = "cell";
		elem.style.backgroundColor = row%2 > 0 ? "#ddd" : "";
		elem.innerHTML = row;
		frag.appendChild(elem);
	}
	content.appendChild(frag);

	// Initialize Scroller
	var scroller = new Scroller(render, {
		scrollingX: false,
		paging: true
	});
	
	
	// Setup Scroller

	var rect = container.getBoundingClientRect();

	scroller.setPosition(rect.left+container.clientLeft, rect.top+container.clientTop);
	scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
	
	
	// Event Handler
	
	if ('ontouchstart' in window) {
		
		container.addEventListener("touchstart", function(e) {
			// Don't react if initial down happens on a form element
			if (e.target.tagName.match(/input|textarea|select/i)) {
				return;
			}
			
			scroller.doTouchStart(e.touches, e.timeStamp);
			e.preventDefault();
		}, false);

		document.addEventListener("touchmove", function(e) {
			scroller.doTouchMove(e.touches, e.timeStamp);
		}, false);

		document.addEventListener("touchend", function(e) {
			scroller.doTouchEnd(e.timeStamp);
		}, false);
		
	} else {
		
		var mousedown = false;

		container.addEventListener("mousedown", function(e) {
			// Don't react if initial down happens on a form element
			if (e.target.tagName.match(/input|textarea|select/i)) {
				return;
			}
			
			scroller.doTouchStart([{
				pageX: e.pageX,
				pageY: e.pageY
			}], e.timeStamp);

			mousedown = true;
		}, false);

		document.addEventListener("mousemove", function(e) {
			if (!mousedown) {
				return;
			}

			scroller.doTouchMove([{
				pageX: e.pageX,
				pageY: e.pageY
			}], e.timeStamp);

			mousedown = true;
		}, false);

		document.addEventListener("mouseup", function(e) {
			if (!mousedown) {
				return;
			}

			scroller.doTouchEnd(e.timeStamp);

			mousedown = false;
		}, false);
		
	}
	
	