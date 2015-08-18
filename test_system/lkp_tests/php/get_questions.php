<?php
include('../lib.php');
$tid=$_REQUEST['test'];
$sql="select * 
      from tb_question 
	  where test_id='$tid' 
	  order by question_id";
_exec($sql,$cur);
echo '{rows:'.json_encode($cur).'}';  
?>