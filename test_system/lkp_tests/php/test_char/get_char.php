<?php
include('../../lib.php');
$response=array();
$sql="select ch.char_type_cd,
			 ch.char_type_cd||'('||ch.char_descr||')' char_descr
	  from tb_char_val ch,
           tb_char_object ch_obj,
           user_objects u_obj
	  where ch.char_type_cd = ch_obj.char_type_cd
	  and ch_obj.object_id = u_obj.object_id
	  and u_obj.object_name like 'TB_TEST%'";
_exec($sql,$response);
echo '{rows:'.json_encode($response).'}';
?>