<?php
 
 $url = $_GET['url'];  
 $method = $_SERVER['REQUEST_METHOD'];
//echo ("提交方式：" . $method);
$url_get = "";
if($method =="GET"){
	$data = $_GET;
	$i =0;
	foreach ($data as $key=>$val) {
		if($i == 0){}else{
			$url_get  .="&".$key."=".$val;
		}
		$i ++;
	} 
//	echo($url_get);
$url_get = $url.$url_get;
//echo("请求连接为：".$url_get);
send_curl($url_get,NULL,0);
}else{
	$data = $_POST;
//	echo("请求连接为：".$url);
   send_curl($url,$data);
}
 
/**
 * $type,1是post，0是get,默认是post提交,$show,1显示header区域内容，0不显示区域内容
 */
function send_curl($url=NULL,$data=NULL,$type=1,$show=0){
    $curl = curl_init(); // 启动一个CURL会话      
    curl_setopt($curl,CURLOPT_URL, $url); // 要访问的地址                  
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,1); //获取的信息以文件流的形式返回 
	
	
//  curl_setopt($curl, CURLOPT_FOLLOWLOCATION,0); // 使用自动跳转      
//  curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer      
//  curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环      
//  curl_setopt($curl, CURLOPT_HEADER,$show); // 显示返回的Header区域内容  
         
   /* curl_setopt($curl, CURLOPT_HTTPHEADER, array(   
        // 'Content-type:application/x-www-form-urlencoded;charset=utf-8',//登陆专用
         "Content-type:application/json;charset=utf-8",
    )); */
    // curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查      
    // curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 1); // 从证书中检查SSL加密算法是否存在      
    // curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // 模拟用户使用的浏览器      
	//  curl_setopt($curl, CURLOPT_COOKIE,$cookie);//header头部发送cookie
	//  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	//  curl_setopt($curl, CURLOPT_HEADER, true); // Get response HEADERs.

    if($type == 1){//post提交
      curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求      
      curl_setopt($curl, CURLOPT_POSTFIELDS,$data); // Post提交的数据包  
    }   
    $tmpInfo = curl_exec($curl); // 执行操作  
    if(curl_errno($curl)){      
        echo 'Errno'.curl_error($curl);      
    }      
    curl_close($curl); // 关闭CURL会话   
    echo $tmpInfo; // 返回数据    
}
?>