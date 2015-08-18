<?php
	include('../lib.php');
	$response=0;
	$name=$_REQUEST['name'];
	$descr=$_REQUEST['descr'];  
	if(isset($name)&&isset($descr)&&isset($uid))
	{
		$response=1;
		$sql="insert into tb_test(test_name,test_descr,test_dttm,owner_id) 
			  values('$name','$descr',sysdate,$uid)";    
		_exec($sql);
	}
	echo $response;
?>