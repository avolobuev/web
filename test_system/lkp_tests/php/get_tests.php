<?php
include('../lib.php');
$response=array();
$sql="select test_id,
			 test_name,
			 test_descr,
			 test_dttm,
			 decode(status_flg,'P','нет','O','да') as status_flg
      from tb_test 
	  where owner_id='$uid'
	  and status_flg = 'O'
	  order by test_dttm";
_exec($sql,$response);
echo '{rows:'.json_encode($response).'}';
?>