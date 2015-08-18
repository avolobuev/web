<?php
	include('../lib.php');
	$testid=$_REQUEST['testid'];
	$groid=$_REQUEST['groid'];
	$sql="select dispersia('$testid','$groid') dispersia from dual";// получаю средне-квадратичное отклонени от мат.ожидания
	$response=execq($sql);
	echo $response[0]['DISPERSIA'];
?>