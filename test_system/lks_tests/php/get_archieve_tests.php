<?php
include('../lib.php');
$sql="select t.test_name, 
			 t.test_descr,
			 ur.result, 
			 ur.answers_wrong,
			 ur.answers_right,
			 to_char(ur.test_dttm,'dd.mm.YYYY HH24:MI:SS') test_dttm
	  from tb_test t, 
		   tb_user_results ur 
	  where ur.test_id=t.test_id 
	  and ur.user_id='$uid'
	  order by ur.test_dttm";
_exec($sql,$cur);
echo '{rows:'.json_encode($cur).'}';  
?>