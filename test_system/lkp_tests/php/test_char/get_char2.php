<?php
include('../../lib.php');
$tid=$_REQUEST['test'];
$response=array();
$sql="select ch_test.char_type_cd,
			 ch.char_type_cd||'('||ch.char_descr||')' char_descr,
			 ch_test.char_val
	  from tb_char_val ch,
		   tb_test_char ch_test
	  where ch.char_type_cd = ch_test.char_type_cd
	  and ch_test.test_id='$tid'";
_exec($sql,$response);
if(count($response)==0)
{
	$response[0]['CHAR_TYPE_CD'] = '';
	$response[0]['CHAR_DESCR'] = '';
	$response[0]['CHAR_VAL'] = '';
	//$response[0]['TEST_ID'] = '';
}
echo '{rows:'.json_encode($response).'}';
?>