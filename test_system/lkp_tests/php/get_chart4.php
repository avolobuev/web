<?php
	include('../lib.php');
	$testid=$_REQUEST['testid'];
	$sql="select v.grocode,avg(l.answer_time) average 
				from lk_user_balls l, v_spi_student v 
				where l.test_id='$testid' 
				and v.manid=l.manid 
				and v.stupen='1' 
				group by v.grocode";// получаю средний балл за тест для группы
	$response=execq($sql);
	$arr=array();
	foreach($response as $i=>$data)
	{
		$arr[$i]['grocode']=$data['GROCODE'];
		$arr[$i]['atime']=$data['AVERAGE'];
	}
	echo '{rows:'.json_encode($arr).'}'; 
?>