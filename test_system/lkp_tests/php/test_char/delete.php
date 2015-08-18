<?php
include('../../lib.php');
$response=0;
$tid=$_REQUEST['tid']; 
$cd=$_REQUEST['cd'];  
if(isset($cd)&&isset($tid))
{
	$response=1;
	$sql="delete tb_test_char where char_type_cd='$cd' and test_id = '$tid'";
	_exec($sql);
}
echo $response;
?>