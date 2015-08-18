<?php
include('../../lib.php');
$response=0;
$tid=$_REQUEST['test'];
$qtype=$_REQUEST['qtype'];
$qdescr=$_REQUEST['qdescr'];
$qball=$_REQUEST['qball'];
$qtext=$_REQUEST['qtext'];
$qtime=$_REQUEST['qtime'];
$qid=$_REQUEST['qid'];
if(isset($tid)&&isset($qtype)&&isset($qdescr)&&isset($qball)&&isset($qtext)&&isset($qtime)&&isset($qid))
{
	$response=1;
	$sql="update tb_question 
	      set question_text='$qtext',
		      question_time='$qtime',
			  question_type='$qtype',
			  question_descr='$qdescr',
			  question_price='$qball' 
		  where question_id='$qid' 
		  and test_id='$tid'";    
	_exec($sql);
}
echo $response;
?>