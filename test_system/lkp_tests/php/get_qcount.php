<?php
	include('../lib.php');
	$tid=$_REQUEST['test'];
	$sql="select sum(question_price) qsum,
	      count(question_id) qcount,
		  sum(question_time) qtime 
		  from tb_question 
		  where test_id='$tid' 
		  group by test_id";
	$cur=array();
	_exec($sql,$cur);
	//$script="select l.groid,v.grocode from lk_groups l,v_spi_groups v where l.test_id='$test' and l.groid=v.groid";
	/*$response=execq($script);
	for($i=0;$i<count($response);$i++)
	{
		$text.=$response[$i]['GROCODE'].";";
	}*/
	echo $cur[0]['QSUM'].'_'.$cur[0]['QCOUNT'].'_'.$cur[0]['QTIME']/*."_".$text*/;
?>