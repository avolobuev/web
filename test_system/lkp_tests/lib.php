<?php
/*
	u - user(s)
	a - answer(s)
	q - question(s)
	ua - user's answer(s)
	t - test(s)
	
*/
include('lib/lib.php');
//user
$uid = '2';
function get_ufio($id)// возвращает ФИО пользователя, по его идентификатору
{
	$response=array();
	$sql="select initcap(user_lname||' '||substr(user_fname,1,1)||'. '||substr(user_mname,1,1)||'.') as fio
		from tb_user
		where user_id='$id'";
	_exec($sql,$response);
	return $response[0][0];  
}
function get_uresult($uid,$tid)// возвращает результат пользователя за тест
{
	$response=array();
	$sql="select result 
		from tb_user_results 
		where user_id='$uid' 
		and test_id='$tid'";
	_exec($sql,$response); 
	if($response==NULL)
	{
		$answer='-/-';
	}
	else
	{
		$answer=$response[0][0];
	}
	return $answer;
}
function get_uright($uid,$tid)// возвращает число верных ответов за тест для пользователя
{
	$response=array();
	$sql="select answers_right 
		from tb_user_results 
		where user_id='$uid' 
		and test_id='$tid'";
	_exec($sql,$response);  
	if($response==NULL)
	{
		$answer='-';
	}
	else
	{
		$answer=$response[0][0];
	}
	return $answer;
}
function get_uwrong($uid,$tid)// возвращает число неверных ответов за тест для пользователя
{
	$response=array();
	$sql="select answers_wrong 
		from tb_user_results 
		where user_id='$uid' 
		and test_id='$tid'";
	_exec($sql,$response);  
	if($response==NULL)
	{
		$answer='-';
	}
	else
	{
		$answer=$response[0][0];
	}
	return $answer;
}
function get_utime($uid,$tid)// возвращает время, затраченное на ответы для пользователя
{
	$response=array();
	$sql="select answers_time 
		from tb_user_results 
		where user_id='$uid' 
		and test_id='$tid'";
	_exec($sql,$response);  
	if($response==NULL)
	{
		$answer='-';
	}
	else
	{
		$answer=$response[0][0];
	}
	return $answer;
}
function get_uadate($uid,$tid)// возвращает дату теста, пройденного пользователем
{
	$response=array();
	$sql="select to_char(test_dttm,'dd.mm.YYYY') test_dttm
		from tb_user_results 
		where user_id='$uid' 
		and test_id='$tid'";
	_exec($sql,$response);  
	return $response[0][0];
}

//******************************************************
//test
function get_tname($id)
{
	$response=array();
	$sql="select test_name 
		from tb_test
		where test_id='$id'";
	_exec($sql,$response);
	return $response[0][0]; 
}

//answer
function get_atext($id)// возвращает ответ на вопрос, по его идентификатору
{
	$response=array();
	$sql="select answer_text
		from tb_answer
		where answer_id='$id'";
	_exec($sql,$response);
	return $response[0][0];  
}

function get_rightanswers($qid)
{
	$sql="select answer_text 
	      from tb_answer 
		  where question_id='$qid' 
		  and answer_right='1'";
	_exec($sql,$cur);
	return $cur;
}

//******************************************************
//question
function get_qtext($id)
{
	$response=array();
	$sql="select question_text
		from tb_question
		where question_id='$id'";
	_exec($sql,$response);
	return $response[0][0];  
}
function get_qdescr($id)
{
	$response=array();
	$sql="select question_descr
		from tb_question
		where question_id='$id'";
	_exec($sql,$response);
	return $response[0][0];  
}
function get_qtype($id)
{
	$response=array();
	$sql="select question_type
		from tb_question
		where question_id='$id'";
	_exec($sql,$response);
	return $response[0][0];  
}
function check_qid($qid,$tid)
{
	$temp = array();
	$sql="select question_id 
		from tb_question 
		where test_id='$tid' 
		and question_id='$qid'";
	_exec($sql,$temp);
	if(count($temp)==0)
	{
		$response=0;
	}
	else
	{
		$response=1;
	}
	return $response;
}
//******************************************************
?>