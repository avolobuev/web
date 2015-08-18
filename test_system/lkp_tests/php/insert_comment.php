<?php
include('../lib.php');
$response=0;
$comment=$_REQUEST['text'];
if(isset($comment))
{
	$response=1;
	$sql="insert into tb_review(user_id,message)
	      values($uid,'$comment')";    
	_exec($sql);
}
echo $response;
?>