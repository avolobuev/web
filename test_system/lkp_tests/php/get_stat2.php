<?php
	include('../lib.php');
	$testid=$_REQUEST['testid'];//да
	$man=explode('_',$_REQUEST['manid']);
	$date=$_REQUEST['date'];
	$script="select user_answer as answer_id, 
	                question_id
			 from tb_user_answers
			 where test_id='$testid' 
			 and to_char(test_dttm,'dd.mm.YYYY')='$date'
			 and user_id='".$man[0]."'";
	_exec($script,$cur);
	$arr=array();
	foreach($cur as $i=>$data)
	{
		if($data['ANSWER_ID']=='1')
		{
			$arr[$i]['UANSWER_TEXT']='ни одного ответа!';
			$arr[$i]['QUESTION_TEXT']=get_qtext($data['QUESTION_ID']);
			$arr[$i]['QUESTION_TYPE']='Один из...';
			$ranswer = get_rightanswers($data['QUESTION_ID']);
			$arr[$i]['RANSWER_TEXT']=$ranswer[0]['ANSWER_TEXT'];
		}
		else if($data['ANSWER_ID']=='2')
		{
			$arr[$i]['UANSWER_TEXT']='ни одного ответа!';
			$arr[$i]['QUESTION_TEXT']=get_qtext($data['QUESTION_ID']);
			$arr[$i]['QUESTION_TYPE']='Несколько из...';
			$ranswers=get_rightanswers($data['QUESTION_ID']);
			$str='';
			for($j=0;$j<count($ranswers);$j++)
			{
				$str.=$ranswers[$j]['ANSWER_TEXT'].';';
			}
			$arr[$i]['RANSWER_TEXT']=$str;
		}
		else
		{
			$arr[$i]['UANSWER_TEXT']=get_atext($data['ANSWER_ID']);
			$arr[$i]['QUESTION_TEXT']=get_qtext($data['QUESTION_ID']);
			$arr[$i]['QUESTION_TYPE']=get_qtype($data['QUESTION_ID']);
			$qtype=get_qtype($data['QUESTION_ID']);
			if($qtype=='0')
			{
				$arr[$i]['QUESTION_TYPE']='Один из...';
				$ranswer=get_rightanswers($data['QUESTION_ID']);
				$arr[$i]['RANSWER_TEXT']=$ranswer[0]['ANSWER_TEXT'];
			}
			else
			{
				$arr[$i]['QUESTION_TYPE']='Несколько из...';
				$ranswers=get_rightanswers($data['QUESTION_ID']);
				$counter++;
				$str='';
				for($j=0;$j<count($ranswers);$j++)
				{
					$str.=$ranswers[$j]['ANSWER_TEXT'].';';
				}
				$arr[$i]['RANSWER_TEXT']=$str;
			}
		}
	}
	echo '{rows:'.json_encode($arr).'}'; 
?>