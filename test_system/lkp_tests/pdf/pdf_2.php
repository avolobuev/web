<?
	define('FPDF_FONTPATH','fpdf/font/');
	include('../lib.php');
	//require_once 'fpdf/fpdf.php';
	require_once 'fpdf/lib/pdftable.inc.php';
	/**************************************************************************/
	$testid=$_REQUEST['testid'];
	$date=explode('-',$_REQUEST['date']);
	$testname=get_testname($testid);
	$sql="select initcap(v.fio) fio, v.grocode, l.ball, l.answers_wrong, l.answers_right, l.answer_time 
            from lk_balls_archive l, v_spi_student v
            where test_id = '$testid'
            and v.student_id = l.student_id
            and to_char(l.test_date,'dd.mm.YYYY') between '".$date[0]."' and '".$date[1]."'
            order by v.grocode,v.fio";
	$cur=array();
	$cur=execq($sql,true);
	$old_grocode = 'abc';
	//************************************************************************//
	$header = array('№','ФИО','Баллов','Верных ответов','Неверных ответов','Время ответа(мин)');
	
	$pdf = new PDFTable('P','pt','A4');
	$pdf->Open();
	$pdf->AddPage();
	$pdf->AddFont('TimesNewRomanPSMT','','times.php');
	$pdf->SetFont('TimesNewRomanPSMT','',12);
	$pdf->Cell(0,10,DecodeStr('Отчет по тесту: \''.$testname.'\''),0,0,'L');
	$pdf->Ln(20);
	$pdf->MultiCell(0,10,DecodeStr('За период '.$date[0].' - '.$date[1]),0,'L');
	$pdf->Ln(20);
	
	//---------table------------------
	
	
	$html = '<table width = "100%" border = "1"  align = "center" cols = "6">';
	$html.= '<tr><td align = "left" valign = "middle" width="20%">'.DecodeStr($header[0]).'</td>';
	$html.= '<td align = "center" valign = "middle" >'.DecodeStr($header[1]).'</td>';
	$html.= '<td align = "center" valign = "middle" >'.DecodeStr($header[2]).'</td>';
	$html.= '<td align = "center" valign = "middle" >'.DecodeStr($header[3]).'</td>';
	$html.= '<td align = "center" valign = "middle">'.DecodeStr($header[4]).'</td>';
	$html.= '<td align = "center" valign = "middle">'.DecodeStr($header[5]).'</td>';
	$html.= '</tr>';
	
	for($i = 0; $i < count($cur); $i++)
	{
		if($old_grocode!=$cur[$i]['GROCODE'])
		{
			$html.= '<tr><td align = "left" valign = "middle" colspan="6">'.DecodeStr('Группа: '.$cur[$i]['GROCODE']).'</td></tr>';
		}
		$html.= '<tr><td align = "left" valign = "middle">'.($i+1).'</td>';
		$html.= '<td align = "left" valign = "middle">'.DecodeStr($cur[$i]['FIO']).'</td>';
		$html.= '<td align = "center" valign = "middle">'.DecodeStr($cur[$i]['BALL']).'</td>';
		$html.= '<td align = "center" valign = "middle">'.DecodeStr($cur[$i]['ANSWERS_RIGHT']).' </td>';
		$html.= '<td align = "center" valign = "middle">'.DecodeStr($cur[$i]['ANSWERS_WRONG']).'</td>';
		$html.= '<td align = "center" valign = "middle">'.DecodeStr($cur[$i]['ANSWER_TIME']).'</td>';
		$html.= '</tr>';
		$old_grocode=$cur[$i]['GROCODE'];
	}
	$html.= '</table>';
	$pdf->htmltable($html);
	
	$pdf->Ln(30);
	$pdf->Cell(0,10,DecodeStr('Провел тестирование _________________________________'),0,0,'L');

	
	$rand = rand(1,300);
	$pdf->Output('otchet2_'.$rand.'.pdf','D');
	
?>