<?php
include('../lib.php');
$qid=$_REQUEST['qid'];
$curqid=$_REQUEST['curqid'];
$sql="select * from tb_answer 
      where question_id='$qid'";// получаю все ответы на вопрос
_exec($sql,$response);
$rand=array();
randomize_mass($rand,count($response)); // функция для изменения порядка ответов
for($i=0;$i<count($response);$i++)
{
	$arr[$i]['ANSWER_ID']=$response[$rand[$i]]['ANSWER_ID'];
	$arr[$i]['ANSWER_TEXT']=$response[$rand[$i]]['ANSWER_TEXT'];
	if($i == count($response)-1)
	{
		$text.=$arr[$i]['ANSWER_ID'].'_'.$arr[$i]['ANSWER_TEXT'].'_'.$curqid;
	}
	else
	{
		$text.=$arr[$i]['ANSWER_ID'].'_'.$arr[$i]['ANSWER_TEXT'].'_';
	}
}
echo $text;
?>