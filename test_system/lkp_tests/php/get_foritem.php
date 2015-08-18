<?php
include('../lib.php');
$sql="select * from tb_test 
	  where owner_id='$uid' 
	  order by test_dttm";
_exec($sql,$cur);
echo '{rows:'.json_encode($cur).'}';  
?>