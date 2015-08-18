<?php
include('../../lib.php');
$response=array();
$sql="select sub.char_type_cd,
			 sub.char_descr,
			 listagg(sub.object_name,',') within group(order by sub.object_name) as objects
	  from
	  (
		select ch.char_type_cd,
             ch.char_descr,
             ch_obj.object_id,
             decode(substr(u_obj.object_name,1,instr(u_obj.object_name,'_',2,2)-1),'TB_ANSWER','Ответ','TB_QUESTION','Вопрос','TB_GROUP','Группа','TB_USER','Пользователь','TB_TEST','Тест') object_name
		from tb_char_val ch,
            tb_char_object ch_obj,
            user_objects u_obj
		where ch.char_type_cd = ch_obj.char_type_cd
		and ch_obj.object_id = u_obj.object_id
	  ) sub
	  group by sub.char_type_cd,
			   sub.char_descr";
_exec($sql,$response);
echo '{rows:'.json_encode($response).'}';
?>