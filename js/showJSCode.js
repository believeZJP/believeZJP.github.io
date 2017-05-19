function showData(data) {
	document.getElementById('content').innerHTML = data;
	hljs.initHighlightingOnLoad();
}

function getFileContent(filename, async, cb) {
	$.ajax({
		type: "get",
		url: filename,
		async: async,
		dataType: "text",
		success: function(msg) {
			cb && cb(msg);
		}
	});
}