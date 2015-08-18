<?php
include('../../lib.php');
$response=array();
$sql="select object_id,
			 decode(substr(object_name,1,instr(object_name,'_',2,2)-1),'TB_ANSWER','Ответ','TB_QUESTION','Вопрос','TB_GROUP','Группа','TB_USER','Пользователь','TB_TEST','Тест') object_name
	  from user_objects
	  where object_type = 'TABLE'
	  and object_name like '%_CHAR'
	  order by object_name";
_exec($sql,$response);
echo '{rows:'.json_encode($response).'}';
?>