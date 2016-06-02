<?php
$action=$_POST['action'];

if($action == 'add'){
add();
}

function add(){
	$obj =  new stdClass();
	
	$obj->a = "outer";
	$obj->b = "ier";
	echo(json_encode($obj));

	
}
?>