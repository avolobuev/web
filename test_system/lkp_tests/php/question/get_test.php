<?php
include('../../lib.php');
$response=array();
$sql="select test_id,
			 test_name
      from tb_test 
	  where owner_id='$uid'
	  and status_flg='O'
	  order by test_dttm";
_exec($sql,$response);
echo '{rows:'.json_encode($response).'}';
?>