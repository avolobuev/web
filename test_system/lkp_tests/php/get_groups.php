<?php
	include('../lib.php');
	$sql="select distinct groid,grocode from v_vblank_study_access where prepod_id='$manid' and studyid=(select get_studyid from dual) order by grocode";
	$cur=execq($sql);
	echo '{rows:'.json_encode($cur).'}';  
?>




























