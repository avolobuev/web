<?php
	include('../lib.php');
	$sql="select date_begin,date_end,studyid from t_study where studyid >= get_studyid() order by date_begin";
	$cur=execq($sql);
	$arr=array();
	foreach($cur as $i=>$data)
	{
		$arr[$i]['semestr']=$data['DATE_BEGIN'].'-'.$data['DATE_END'];
		$arr[$i]['studyid']=$data['STUDYID'];
	}
	echo '{rows:'.json_encode($arr).'}';  
?>