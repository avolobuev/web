<?php
	include('../lib.php');
	$response=0;
	$test=$_REQUEST['testid'];
	$groids=$_REQUEST['groups']; // массив
	$script="select * from lk_groups where test_id='$test' and groid in($groids)";
	$cur=execq($script);
	$ids=explode(',',$groids);
	if(isset($test)&&isset($groids))
	{
		if(count($cur)==0)
		{
			$response=1;
			for($i=0;$i<count($ids);$i++)
			{
				$sql="insert into lk_groups(test_id,groid) values('$test','".$ids[$i]."')";
				execq($sql);
			}
		}
		else
		{
			$response=2;
		}
	}
	echo $response;
?>