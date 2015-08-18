<?php
	include('../lib.php');
	$testid=$_REQUEST['testid'];
	$sql="select max(count(question_id)) maxm
				from lk_user_answers
				where test_id='$testid'
				group by question_id";
	$response=execq($sql);
	echo $response[0]['MAXM'];
?>