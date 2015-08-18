<?php
	include('../lib.php');
	$response=0;
	$qids=explode(',',$_REQUEST['qid']);
	$second_test=$_REQUEST['second_test'];
	if(isset($second_test)&&isset($qids))
	{
		if(check_qid($qids[0],$second_test)==0)
		{
			for($i=0;$i<count($qids);$i++)
			{
				$sql_q="select * from tb_question where question_id='".$qids[$i]."'";
				_exec($sql_q,$cur_q);
				$insert_q="insert into tb_question(test_id,question_text,question_time,question_type,question_descr,question_price) 
				values('$second_test','".$cur_q[0]['QUESTION_TEXT']."','".$cur_q[0]['QUESTION_TIME']."','".$cur_q[0]['QUESTION_TYPE']."','".$cur_q[0]['QUESTION_DESCR']."',".$cur_q[0]['QUESTION_PRICE'].")";
				_exec($insert_q);
				$get_new_qid="select sq_question.currval from dual";
				_exec($get_new_qid,$new_qid);
				$sql_a="select * from tb_answer where question_id='".$qids[$i]."'";
				_exec($sql_a,$cur_a);
				for($j=0;$j<count($cur_a);$j++)
				{
					$insert_a="insert into tb_answer(question_id,answer_text,answer_right) 
					values('".$new_qid[0]['CURRVAL']."','".$cur_a[$j]['ANSWER_TEXT']."','".$cur_a[$j]['ANSWER_RIGHT']."')";
					_exec($insert_a);
				}
			}
			$response=1;
		}
		else
		{
			$response=2;
		}
	}
	echo $response;
?>