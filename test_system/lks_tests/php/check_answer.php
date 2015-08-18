<?php
include('../lib.php');
$aid=$_REQUEST['aid'];
$sql="select answer_right 
             from tb_answer 
			 where answer_id='$aid'";// получаю все ответы на вопрос
_exec($sql,$cur);
if($cur[0]['ANSWER_RIGHT']==0)
{
	$response=0;
}
else if($cur[0]['ANSWER_RIGHT']==1)
{
	$response=1;
}
else
{
	$response=2;
}
echo $response;
?>