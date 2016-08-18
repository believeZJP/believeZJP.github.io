<?php
	define("ROOT_PATH", dirname(__FILE__));//upload的目录
define("DS", DIRECTORY_SEPARATOR);//目录分割符


function upload(){
	if(!empty($_FILES['file']['name'])){
		$ext = explode('/',$_FILES['file']['type'][1]);//扩展名
		$base = ROOT_PATH.ds.'uploads';//基本目录
		$date = date('Ymd');
		$datedir = $base.DS.$date;
		if(!is_dir($datedir)){
			mkdir($datedir);
		]
		$filename = .date('Ymd').'/'.rand(10000000, 99999999).'.'.$ext;//防止文件重复，修改文件名
		$destfile = $base.DS.$filename;
		move_uploaded_file($_FILES['file'][tmp_name], $destfile);//把临时文件移到目标地址
		$url = '../uploads/'.$filename;
		echo '<a target="_blank" href="'.$url.">Uploaded File</a> ';
		exit;
	}
}
	
	
?>