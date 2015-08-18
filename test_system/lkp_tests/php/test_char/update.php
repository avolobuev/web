<?php
include('../../lib.php');
$response=0;
$cd=$_REQUEST['cd'];
$tid=$_REQUEST['tid'];
$val=$_REQUEST['val'];
if(isset($cd)&&isset($tid)&&isset($val))
{
	try
	{
		$check ="select count(*) is_any from tb_test_char where test_id = '$tid' and char_type_cd = '$cd'";
		_exec($check,$temp);
		if($temp[0]['IS_ANY']==0)
		{
			$response=1;
			$sql="insert into tb_test_char(test_id,char_type_cd,char_val,char_dttm)
				  values('$tid','$cd','$val',sysdate)";
			_exec($sql);
		}
		else
		{
			$response=1;
			$sql="update tb_test_char 
				  set char_val = '$val',
					  char_dttm = sysdate
				  where test_id = '$tid'
				  and char_type_cd = '$cd'
				  ";
			_exec($sql);
		}
	}
	catch(Exception $exp)
	{
		_log($exp->getMessage());
		$response=0;
	}
}
echo $response;
?>