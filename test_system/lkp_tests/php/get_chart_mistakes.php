<?php
	include('../lib.php');
	$testid=$_REQUEST['testid'];
	$sql="select count(question_id) mistakes, question_id
				from lk_user_answers
				where test_id='$testid'
				group by question_id
				order by mistakes desc";// получаю все ответы на вопрос
	$response=execq($sql);
	$arr=array();
	foreach($response as $i=>$data)
	{
		$arr[$i]['mistakes']=$data['MISTAKES'];
		$arr[$i]['question']=get_questiondescr($data['QUESTION_ID']);
		$arr[$i]['question_text']=get_questiontext($data['QUESTION_ID']);
	}
	echo '{rows:'.json_encode($arr).'}'; 
?>