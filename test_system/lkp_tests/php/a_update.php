<?php
include('../lib.php');
$data=json_decode(file_get_contents('php://input'),true);
$aid=$data['ANSWER_ID'];
$text=$data['ANSWER_TEXT'];
$qid=$data['QUESTION_ID'];
$aright=$data['ANSWER_RIGHT'];
if($aright=='да')
{
	$aright=1;
}
else
{
	$aright=0;
}
if(isset($aid)&&isset($text)&&isset($qid)&&isset($aright))
{
	$response=1;
	$sql="update tb_answer 
		  set answer_text='$text',
		      answer_right='$aright' 
		  where answer_id='$aid'";    
	_exec($sql);
}
?>