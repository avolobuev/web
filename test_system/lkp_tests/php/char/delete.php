<?php
include('../../lib.php');
$response=0;
$cd=$_REQUEST['cd'];  
if(isset($cd))
{
	$response=1;
	$sql="delete tb_char_val where char_type_cd='$cd'";
	_exec($sql);
}
echo $response;
?>