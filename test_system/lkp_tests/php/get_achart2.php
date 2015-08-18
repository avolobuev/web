<?php
	include('../lib.php');
	$testid=$_REQUEST['testid'];
	$groid=$_REQUEST['groid'];
	$date=explode('-',$_REQUEST['date']);
	$sql="select count(ball) done,round(avg(ball),2) average, max(ball) best, min(ball) worst, groid 
            from lk_balls_archive
            where test_id='$testid'
			and groid='$groid'
            and to_char(test_date,'dd.mm.YYYY') between '".$date[0]."' and '".$date[1]."'
            group by groid";// получаю средний балл за тест для группы
	$response=execq($sql);
	$arr=array();
	$arr[0]['name']='Прошли тест';
	$arr[0]['data']=$response[0]['DONE'];
	$arr[1]['name']='Средний балл в группе';
	$arr[1]['data']=$response[0]['AVERAGE'];
	$arr[2]['name']='Лучший результат';
	$arr[2]['data']=$response[0]['BEST'];
	$arr[3]['name']='Худший результат';
	$arr[3]['data']=$response[0]['WORST'];
	echo '{rows:'.json_encode($arr).'}'; 
?>