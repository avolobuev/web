<?php
	include('../lib.php');
	$groid=explode('_',$_REQUEST['groid']);
	$vblid=get_vbl($groid[0],$manid);
	$sql="select distinct kolvo from v_student_works_number where vblid='$vblid' and contid='10'";
	$cur=execq($sql);
	$response=$cur[0]['KOLVO'];
	echo $response;
?>