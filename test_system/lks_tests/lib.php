<?php
include('lib/lib.php');
//$manid = GetClientManid();
//$manid = $_SESSION['manid'];
$uid='4';
function get_tname($id)
{
	$response=array();
	$sql="select test_name 
		from tb_test
		where test_id='$id'";
	_exec($sql,$response);
	return $response[0][0]; 
}
function get_ttime($tid)
{
	$sql="select round(sum(question_time)/60) test_time 
	      from tb_question 
		  where test_id='$tid'";
	_exec($sql,$cur);
	return $cur[0]['TEST_TIME'];
}
function get_rightanswers($qid)
{
	$sql="select answer_id 
	      from tb_answer 
		  where question_id='$qid' 
		  and answer_right='1'";
	_exec($sql,$cur);
	return $cur;
}
function get_tid($qid)
{
	$sql="select test_id 
	      from tb_question 
		  where question_id='$qid'";
	_exec($sql,$cur);
	return $cur[0]['TEST_ID'];
}
function check_answer($aid)
{
	$sql="select answer_right 
	      from tb_answer 
		  where answer_id='$aid'";
	_exec($sql,$cur);
	return $cur[0]['ANSWER_RIGHT'];
}
function check_qtype($qid)
{
	$sql="select question_type 
	      from tb_question 
		  where question_id='$qid'";
	_exec($sql,$cur);
	return $cur[0]['QUESTION_TYPE'];
}
function get_qid($aid)
{
	$sql="select question_id 
	      from tb_answer 
		  where answer_id='$aid'";
	_exec($sql,$cur);
	return $cur[0]['QUESTION_ID'];
}
function max_ball($tid)
{
	$sql="select sum(question_price) max_ball 
	      from tb_question 
		  where test_id='$tid'";
	_exec($sql,$cur);
	return $cur[0]['MAX_BALL'];
}
function get_count_of_right($qid)
{
	$sql="select count(answer_right) rcount 
	      from tb_answer 
		  where question_id='$qid' 
		  and answer_right='1'";
	_exec($sql,$cur);
	return $cur[0]['RCOUNT'];
}
function get_qball($qid)
{
	$sql="select question_price 
	      from tb_question 
		  where question_id='$qid'";
	_exec($sql,$cur);
	return $cur[0]['QUESTION_PRICE'];
}
function get_tdone($tid,$user_id)
{
	$sql="select result_id 
	      from tb_user_results 
		  where test_id = '$tid' 
		  and user_id = '$user_id'";
	_exec($sql,$cur);
	return $cur[0]['RESULT_ID'];
}
function randomize_mass(&$mass,$cnt) 
{
	for($i=0;$i<$cnt;) 
	{
		$rv=rand(0,$cnt-1);
		for($j=0;$j<$i;$j++) 
		{
			if($mass[$j]==$rv) 
			{
				$rv=-1;
				break;
			}
		}
		if($rv!=-1) 
		{
			$mass[$i]=$rv;
			$i++;
		}
	}
}
?>