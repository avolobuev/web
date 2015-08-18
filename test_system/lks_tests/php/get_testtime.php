<?php
include('../lib.php');
$test_id=$_REQUEST['test'];
$sql="select sum(question_time) test_time 
      from tb_question 
	  where test_id='$test_id'";// возможно ошибка
_exec($sql,$cur);
echo $cur[0]['TEST_TIME'];  
?>