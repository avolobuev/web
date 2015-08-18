<?php

	include('../lib.php');

	$testid = $_REQUEST['testid'];//да
	$man = explode('_',$_REQUEST['manid']);
	$date = $_REQUEST['date'];
	$response = 0;
	
	//$sql = "select ball, answers_right, answers_wrong, test_date from lk_user_balls where test_id = '$testid' and manid = '".$man[0]."'";

	/*wrong answers for*/
	
	$script = "select ua.answer_id,a.answer_text, ua.question_id, q.question_descr
				from lk_user_answers ua, lk_answers a, lk_questions q
				where ua.manid = '".$man[0]."' 
				and ua.test_id = '$testid'
				and to_char(ua.test_date,'dd.mm.YYYY') = '$date'
				and a.answer_id = ua.answer_id 
				and a.answer_right = '0' 
				and ua.question_id = q.question_id";
	
	$cur = execq($script, true);
	
	if($cur!= NULL)
	{
		//echo $cur[0]['BALL'].'_'.$cur[0]['ANSWERS_RIGHT'].'_'.$cur[0]['ANSWERS_WRONG'].'_'.$cur[0]['TEST_DATE'];
		echo $cur[0]['ANSWER_TEXT'].'_'.$cur[0]['QUESTION_DESCR'];
	}
	else
	{
		echo $response;
	}
?>