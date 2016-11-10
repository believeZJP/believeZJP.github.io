/**
 * 此文件定义一些通用的js方法，
 */

/**
 * 
 * @param timeStamp string类型或int类型，
 * @return 返回当前时区的时间格式
 * @eg:timeStamp  = 1478747912779   return 2016-11-10 11:18:32
 */
function timeStampToLocalDate(timeStamp){//将时间戳转换为本地时间
	if(!timeStamp)return "";
	if(timeStamp.length==10){
		timeStamp = timeStamp*1000;
	}
	var date = new Date(parseInt(timeStamp));
	var newTime = date.getFullYear()+"-"+setDataTimeLength(date.getMonth()+1)+"-"+setDataTimeLength(date.getDate())+" "+setDataTimeLength(date.getHours())+":"+setDataTimeLength(date.getMinutes())+":"+setDataTimeLength(date.getSeconds());
	return newTime;
};

/***
 * 根据传入的参数长度，自动前缀加0
 * @param {String} d
 * @eg: 待处理格式2016-1-9 1:8:31 分别传入1，9，1 转成 2016-01-09 01:18:31
 */
function setDataTimeLength(d){ 
	 if(String(d).length==1)return "0"+d;
	 else return d;
}
