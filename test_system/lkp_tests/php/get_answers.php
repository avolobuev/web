<?php
include('../lib.php');
$qid=$_REQUEST['qid'];
$sql="select answer_id,
			 question_id,
			 answer_text,
			 decode(answer_right,'0','нет','1','да') as answer_right 
	  from tb_answer 
	  where question_id='$qid' 
	  order by answer_id";
_exec($sql,$cur);
echo '{rows:'.json_encode($cur).'}';  
?>