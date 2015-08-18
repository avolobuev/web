<?php
include('../lib.php');
$response=array();
$sql="select *
	      from tb_test 
		  where status_flg='O' 
		  order by test_dttm";
_exec($sql,$response);
echo '{rows:'.json_encode($response).'}';
?>