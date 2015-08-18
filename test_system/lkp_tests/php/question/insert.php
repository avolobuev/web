<?php
include('../../lib.php');
$response=0;
$tid=$_REQUEST['test'];
$qtype=$_REQUEST['qtype'];
$qdescr=$_REQUEST['qdescr'];
$qball=$_REQUEST['qball'];
$qtext=$_REQUEST['qtext'];
$qtime=$_REQUEST['qtime'];
if(isset($tid)&&isset($qtype)&&isset($qdescr)&&isset($qball)&&isset($qtext)&&isset($qtime))
{
	$response=1;
	$sql="insert into tb_question(test_id,question_text,question_time,question_type,question_descr,question_price)
	      values('$tid','$qtext','$qtime','$qtype','$qdescr','$qball') ";    
	_exec($sql);
}
echo $response;
?>