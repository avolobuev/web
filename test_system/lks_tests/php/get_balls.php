<?php
include('../lib.php');
$sql="select test_id, 
             test_name, 
			 test_descr,
			 test_dttm 
			 from lk_tests 
			 where test_id = '1'";// возможно ошибка
_exec($sql,$cur);
echo '{rows:'.json_encode($cur).'}';  
?>