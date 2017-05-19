function showData(data) {
	document.getElementById('content').innerHTML = data;
	hljs.initHighlightingOnLoad();
}

function getFileContent(filename, async, cb) {
	$.ajax({
		type: "get",
		url: filename+'?v='+new Date().getTime(),
		async: async,
		dataType: "text",
		success: function(msg) {
			cb && cb(msg);
		}
	});
}