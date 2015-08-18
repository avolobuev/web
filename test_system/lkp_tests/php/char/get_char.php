<?php
include('../../lib.php');
$response=array();
$sql="select char_type_cd,
			 char_descr,
			 to_char(char_dttm,'dd.mm.YYYY HH24:MI:SS') as char_dttm
	  from tb_char_val";
_exec($sql,$response);
echo '{rows:'.json_encode($response).'}';
?>