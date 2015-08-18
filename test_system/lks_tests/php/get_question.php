<?php
include('../lib.php');
$test=$_REQUEST['testid'];
$sql="select * 
      from tb_question
      where test_id='$test' ";// получаю все вопросы теста
_exec($sql,$response);
$rand=array();
randomize_mass($rand,count($response));// функция для изменения порядка вопросов
for($i=0;$i<count($response);$i++)
{
	$arr[$i]['QUESTION_ID']=$response[$rand[$i]]['QUESTION_ID'];
	$arr[$i]['QUESTION_TEXT']=$response[$rand[$i]]['QUESTION_TEXT'];
	$arr[$i]['QUESTION_TYPE']=$response[$rand[$i]]['QUESTION_TYPE'];
	$arr[$i]['QUESTION_TIME']=$response[$rand[$i]]['QUESTION_TIME'];
	$arr[$i]['QUESTION_PRICE']=$response[$rand[$i]]['QUESTION_PRICE'];
}
echo '{rows:'.json_encode($arr).'}'; 
?>