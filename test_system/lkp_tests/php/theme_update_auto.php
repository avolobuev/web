<?php
include('../lib.php');
$data=json_decode(file_get_contents('php://input'),true);
$name=$data['TEST_NAME'];
$descr=$data['TEST_DESCR'];
$tid=$data['TEST_ID'];
$stat=$data['STATUS_FLG'];
if($stat=='да')
{
	$stat='O';
}
else
{
	$stat='P';
}
if(isset($name)&&isset($descr)&&isset($tid))
{
	$sql="update tb_test 
	      set test_name='$name',
		  test_descr='$descr',
		  test_dttm=sysdate,
		  status_flg='$stat'
		  where test_id='$tid'";
	_exec($sql);
} 
?>