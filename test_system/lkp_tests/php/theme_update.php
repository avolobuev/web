<?php
	include('../lib.php');
	$response=0;
	$name=$_REQUEST['name'];
	$descr=$_REQUEST['descr'];
	$tid=$_REQUEST['test'];
	if(isset($name)&&isset($descr)&&isset($tid))
	{
		$response=1;
		$sql="update tb_test 
		      set test_name='$name',
			  test_descr='$descr',
			  test_dttm=sysdate 
			  where test_id='$tid'";
		_exec($sql);
	}
	echo $response;
?>