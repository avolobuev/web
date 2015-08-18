<?php
include('../lib.php');
$response=0;
$aid=$_REQUEST['answer'];  
if(isset($aid))
{
	$response=1;
	$sql="delete tb_answer where answer_id='$aid'";
	_exec($sql);
}
echo $response;
?>