<?php
include('../lib.php');
$qids=$_REQUEST['qids'];
$aids=$_REQUEST['aids'];
$rtime=$_REQUEST['atime'];
	
$questions=explode('_',$qids);
$answers=explode('_',$aids);
$testid=get_tid($questions[0]);
$ttime=get_ttime($testid);
$atime=$ttime-$rtime;
$unique_test=mt_rand();
/*section for counting user ball for the test*/
$ball=0;
$answer_right=0;
$answer_wrong=0;
for($j=0;$j<count($questions)-1;$j++)
{
	$type = check_qtype($questions[$j]);
	if($type == '0')// ветка для radio
	{
		$script = "select tb_answer.answer_right, 
		                  tb_question.question_price
				   from tb_answer, 
				        tb_question 
				   where tb_answer.answer_id = '".$answers[$j]."' 
				   and tb_question.question_id = tb_answer.question_id";
			_exec($script,$response);
			if($response[0]['ANSWER_RIGHT']=='0')
			{
				$answer_wrong++;
				$sql_wrong="insert into tb_user_answers(user_answer, question_id, test_id, user_id, test_dttm, unique_test) values ";
				$sql_wrong.="(".$answers[$j].",".$questions[$j].", $testid, $uid, sysdate, $unique_test)";
				_exec($sql_wrong);
			}
			else if($response[0]['ANSWER_RIGHT']=='1')
			{
				$answer_right++;
				$ball=$ball+$response[0]['QUESTION_PRICE'];
			}
			else
			{
				$answer_wrong++;
				$sql_wrong1="insert into tb_user_answers(user_answer, question_id, test_id, user_id, test_dttm, unique_test) values ";
				$sql_wrong1.="(1,".$questions[$j].", $testid, $uid, sysdate, $unique_test)";// 1 - значит не отметил ни одного
				_exec($sql_wrong1);
			}
		}
		else// ветка для check
		{
			$check_answers=explode('-',$answers[$j]);
			$mustbe = get_count_of_right($questions[$j]);
			$counter = 0;
			$key = true;
			for($l=0;$l<count($check_answers);$l++)
			{
				$script2="select tb_answer.answer_right, 
				                 tb_question.question_price 
						  from tb_answer, 
						       tb_question 
						  where tb_answer.answer_id = '".$check_answers[$l]."' 
						  and tb_question.question_id = tb_answer.question_id";
				_exec($script2,$response2);
				if($response2[0]['ANSWER_RIGHT']=='0')
				{
					$answer_wrong++;
					$sql_wrong2="insert into tb_user_answers(user_answer, question_id, test_id, user_id, test_dttm, unique_test) values ";
					$sql_wrong2.="(".$check_answers[$l].",".$questions[$j].",$testid,$uid,sysdate,$unique_test)";
					_exec($sql_wrong2);
					$key=false;
					break;
				}
				else if($response2[0]['ANSWER_RIGHT']=='1')
				{
					$counter++;
				}
				else
				{
					break;
				}
			}
			if($counter!=$mustbe)
			{
				if($key)
				{
					$answer_wrong++;
					$sql_wrong3="insert into tb_user_answers(user_answer, question_id, test_id, user_id, test_dttm, unique_test) values ";
					$sql_wrong3.="(2,".$questions[$j].",$testid,$uid,sysdate,$unique_test)";// 2 - значит косяк
					_exec($sql_wrong3);
				}
			}
			else
			{
				if($key)// чтобы когда количество верных равно, но был и неправельный среди них, следовательно уже увеличено число неверных, но при это не нужно увеличивать число верных
				{
					$answer_right++;
					$ball = $ball + get_qball($questions[$j]);
				}
			}
		}
	}
	$max=max_ball($testid);
	//$query = "insert into lk_user_ball(manid, test_id, test_date, ball) values($manid,$testid,sysdate,$ball)";
	$query="insert into tb_user_results(user_id, test_id, test_dttm, result, answers_wrong, answers_right, answers_time, unique_test) 
			values('$uid','$testid',sysdate,'$ball','$answer_wrong','$answer_right','$atime',$unique_test)";
	_exec($query);
	/*results in archive*/
	/*$student_id=get_studentid($groid,$manid);
	$archive="insert into lk_balls_archive(student_id,groid,test_id,unique_test,test_date,ball,answers_wrong,answers_right,answer_time,studyid) values('$student_id',$groid,$testid,$unique_test,sysdate,$ball,$answer_wrong,$answer_right,$atime,get_studyid())";
	$cur_archive=execq($archive);*/
	
	echo $ball.'_'.$answer_right.'_'.$answer_wrong.'_'.$max.'_'.$atime/*.':'.$str*/;
	
	/*---------------------------------------------*/
?>