<?php
	include('../lib.php');
	$response=0;
	$qid=$_REQUEST['qid'];  
	if(isset($qid))
	{
		$response=1;
		$sql="delete tb_question where question_id='$qid' ";
		_exec($sql);
	}
	echo $response;
?>