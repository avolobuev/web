<?php
include('../lib.php');
$data=json_decode(file_get_contents('php://input'),true);
$qid=$data['QUESTION_ID'];
if(isset($qid))
{
	$response=1;
	$sql="insert into tb_answer(question_id,answer_text,answer_right) 
	      values('$qid','новый ответ','0')";    
	_exec($sql);
}
?>