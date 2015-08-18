<?php
	include('../lib.php');
	$response=0;
	$tid=$_REQUEST['test'];  
	if(isset($tid))
    {
		$response=1;
		$sql="delete tb_test where test_id='$tid'";
		_exec($sql);
	}
	echo $response;
?>