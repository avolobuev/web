<?
define('FPDF_FONTPATH','fpdf/font/');
include('../lib.php');
include('fpdf/fpdf.php');
include('fpdf/lib/pdftable.inc.php');
/**************************************************************************/

$testid = $_REQUEST['testid'];
//$groid = $_REQUEST['groid'];
	
$testname = get_tname($testid);
//$grocode = get_grocode($groid);
$testdate = get_uadate($uid,$testid/*,$groid*/);
$sql = "select initcap(u.user_lname||' '||substr(u.user_fname,1,1)||'. '||substr(u.user_mname,1,1)||'.') as fio,
			   r.result,
			   r.answers_wrong,
			   r.answers_right,
			   r.answers_time
	  from tb_user u,
		   tb_user_results r 
	  where u.user_id = r.user_id
	  and r.test_id='$testid' 
	  order by fio";
	
	$cur = array();
	_exec($sql,$cur);
	
	//************************************************************************//

	$header = array('№','ФИО','Баллов','Верных ответов','Неверных ответов','Время ответа(мин)');
	
	$pdf = new PDFTable('P','pt','A4');
	$pdf->Open();
	$pdf->AddPage();
	$pdf->AddFont('TimesNewRomanPSMT','','times.php');
	$pdf->SetFont('TimesNewRomanPSMT','',12);
	$pdf->Cell(0,10,'Отчет по тесту: \''.$testname.'\'',0,0,'L');
	$pdf->Ln(20);
	$pdf->MultiCell(0,10,'Группа: '.$grocode,0,'L');
	$pdf->Ln(10);
	$pdf->MultiCell(0,10,'Дата проведения: '.$testdate,0,'L');
	
	$pdf->Ln(20);
	
	//---------table------------------
	
	
	$html = '<table width = "100%" border = "1"  align = "center" cols = "8">';
	$html.= '<tr><td align = "left" valign = "middle" width="20%">'.$header[0].'</td>';
	$html.= '<td align = "center" valign = "middle" >'.$header[1].'</td>';
	$html.= '<td align = "center" valign = "middle" >'.$header[2].'</td>';
	$html.= '<td align = "center" valign = "middle" >'.$header[3].'</td>';
	$html.= '<td align = "center" valign = "middle">'.$header[4].'</td>';
	$html.= '<td align = "center" valign = "middle">'.$header[5].'</td>';
	$html.= '</tr>';
	
	for($i = 0; $i < count($cur); $i++)
	{
		
		$html.= '<tr><td align = "left" valign = "middle">'.($i+1).'</td>';
		$html.= '<td align = "left" valign = "middle">'.$cur[$i]['FIO'].'</td>';
		$html.= '<td align = "center" valign = "middle">'.$cur[$i]['RESULT'].'</td>';
		$html.= '<td align = "center" valign = "middle">'.$cur[$i]['ANSWERS_RIGHT'].' </td>';
		$html.= '<td align = "center" valign = "middle">'.$cur[$i]['ANSWERS_WRONG'].'</td>';
		$html.= '<td align = "center" valign = "middle">'.$cur[$i]['ANSWER_TIME'].'</td>';
		$html.= '</tr>';
	}
	$html.= '</table>';
	$pdf->htmltable($html);
	
	$pdf->Ln(30);
	$pdf->Cell(0,10,'Провел тестирование _________________________________',0,0,'L');
	
	$rand = rand(1,300);
	$pdf->Output('otchet_'.$rand.'.pdf','D');
	
?>