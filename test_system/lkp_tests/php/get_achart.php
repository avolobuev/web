<?php

	include('../lib.php');
	$testid=$_REQUEST['testid'];
	$date=explode('-',$_REQUEST['date']);
	$sql="select groid,round(avg(ball),2) average 
            from lk_balls_archive
            where test_id='$testid' 
            and to_char(test_date,'dd.mm.YYYY') between '".$date[0]."' and '".$date[1]."'
            group by groid";// получаю средний балл за тест для группы
	$response=execq($sql);
	$arr=array();
	foreach($response as $i=>$data)
	{
		$arr[$i]['grocode']=get_grocode($data['GROID']);
		$arr[$i]['groid']=$data['GROID'];
		$arr[$i]['aball']=$data['AVERAGE'];
	}
	echo '{rows:'.json_encode($arr).'}'; 
?>