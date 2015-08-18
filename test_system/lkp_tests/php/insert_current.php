<?php
	include('../lib.php');//функции
	$response=0;
	$testid=$_REQUEST['testid'];
	$groid=explode('_',$_REQUEST['groid']);
	$column_number=$_REQUEST['number'];
	if(isset($testid)&&isset($groid)&&isset($column_number))
	{
		$response=1;
		$sql_get="select l.manid,l.ball from lk_user_balls l, v_spi_student v  where l.test_id='$testid' and v.manid=l.manid and v.groid='".$groid[0]."'";
		$cur_get=execq($sql_get);
		$sql_delete="delete from lk_groups where test_id='$testid' and groid='".$groid[0]."'";
		execq($sql_delete);
		$vblid=get_vbl($groid[0], $manid);
		$contid=10;
		for($i=0;$i<count($cur_get);$i++)
		{
			$student_id=get_studentid($groid[0],$cur_get[$i]['MANID']);
			$ball=$cur_get[$i]['BALL'];
			$sql_insert="insert into student_balls(student_id,vblid,contid,nomer,ball,prepod_id,data) values('$student_id','$vblid','$contid','$column_number','$ball','$manid',to_date(sysdate,'dd.mm.YY'))";
			execq($sql_insert);
			$sql_delete2="delete from lk_user_balls where test_id = '$testid' and manid = '".$cur_get[$i]['MANID']."'";
			execq($sql_delete2);
		}
	}
	echo $response;
?>