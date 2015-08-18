<?php
include('../lib.php');
$tid=$_REQUEST['test'];
$sql="select * from tb_question 
	  where test_id='$tid' 
      order by question_descr";
_exec($sql,$cur);
$arr=array();
foreach($cur as $i=>$data)
{
	$arr[$i]['QUESTION_ID']=$data['QUESTION_ID'];
	$arr[$i]['QUESTION_DESCR']=$data['QUESTION_DESCR'];
}
echo '{rows:'.json_encode($arr).'}';  
?>