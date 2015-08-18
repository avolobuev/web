<?php
include('../lib.php');
$page=$_REQUEST['page'];
$start=$_REQUEST['start'];
$limit=$_REQUEST['limit'];
$sql="select user_id,
             review_id,
			 message,
			 to_char(dttm,'dd.mm.YYYY HH24:MI:SS') dat 
	  from tb_review 
	  order by dttm desc";
_exec($sql,$cur);
$arr=array();
for($i=$start,$j=0;$i<($limit*$page);$i++,$j++)
{
	if($cur[$i]['REVIEW_ID']==NULL)
	{
		break;
	}
	$arr[$j]['REVIEW_ID']=$cur[$i]['REVIEW_ID'];
	$arr[$j]['MESSAGE']=$cur[$i]['MESSAGE'];
	$arr[$j]['DTTM']=$cur[$i]['DAT'];
	$arr[$j]['FIO']=get_ufio($cur[$i]['USER_ID']);
}
echo '{rows:'.json_encode($arr).',total:'.count($cur).'}';  
?>