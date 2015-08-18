<?php
	include('../lib.php');
	$testid=$_REQUEST['testid'];
	$sql="select v.grocode,sum(l.answers_right) sum_right, 
					sum(l.answers_wrong) sum_wrong,
					round((sum(l.answers_right)/ (sum(l.answers_wrong) + sum(l.answers_right))) * 100) proc_right,
					round((sum(l.answers_wrong)/ (sum(l.answers_wrong) + sum(l.answers_right))) * 100) proc_wrong 
					from lk_user_balls l, v_spi_student v 
					where l.test_id = '$testid' and v.manid = l.manid and v.stupen = '1' group by v.grocode";// получаю средний балл за тест для группы
	$response=execq($sql);
	$arr=array();
	foreach($response as $i=>$data)
	{
		$arr[$i]['grocode']=$data['GROCODE'];
		$arr[$i]['sright']=$data['SUM_RIGHT'];
		$arr[$i]['swrong']=$data['SUM_WRONG'];
		$arr[$i]['pright']=$data['PROC_RIGHT'];
		$arr[$i]['pwrong']=$data['PROC_WRONG'];
	}
	echo '{rows:'.json_encode($arr).'}'; 
?>