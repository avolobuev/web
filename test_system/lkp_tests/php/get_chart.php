<?php
include('../lib.php');
$testid=$_REQUEST['testid'];
$sql="select initcap(u.user_lname||' '||substr(u.user_fname,1,1)||'. '||substr(u.user_mname,1,1)||'.') as fio,
			 r.result 
	  from tb_user u,
		   tb_user_results r 
	  where u.user_id = r.user_id
	  and r.test_id='$testid' 
	  order by fio";// получаю все ответы на вопрос
_exec($sql,$response);
$arr=array();
foreach($response as $i=>$data)
{
	$arr[$i]['fio']=$data['FIO'];
	$arr[$i]['ball']=$data['RESULT'];
}
echo '{rows:'.json_encode($arr).'}'; 
?>