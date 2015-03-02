
$(document).ready(function()
    {
        /*part for tooltips*/
        $('#foto').hover(
            function()
            {
                $('#ftriangle').fadeIn(800);
                $('#fsquare').fadeIn(800);
                $('#ft').fadeIn(800);
		$('#tdfoto').css({'border-top':'1px solid gray','border-bottom':'1px solid gray'});
            },
            function()
            {
                $('#ftriangle').slideUp(800);
                $('#fsquare').slideUp(800);
                $('#ft').fadeOut(800);
		$('#tdfoto').css({'border-top':'0','border-bottom':'0'});
            }
        );
        $('#video').hover(
            function()
            {
                $('#striangle').fadeIn(800);
                $('#ssquare').fadeIn(800);
                $('#st').fadeIn(800);
		$('#tdvideo').css({'border-top':'1px solid gray','border-bottom':'1px solid gray'});
            },
            function()
            {
                $('#striangle').slideUp(800);
                $('#ssquare').slideUp(800);
                $('#st').fadeOut(800);
		$('#tdvideo').css({'border-top':'0','border-bottom':'0'});
            }
        );
        $('#audio').hover(
            function()
            {
                $('#ttriangle').fadeIn(800);
                $('#tsquare').fadeIn(800);
                $('#tt').fadeIn(800);
		$('#tdaudio').css({'border-top':'1px solid gray','border-bottom':'1px solid gray'});
            },
            function()
            {
                $('#ttriangle').slideUp(800);
                $('#tsquare').slideUp(800);
                $('#tt').fadeOut(800);
		$('#tdaudio').css({'border-top':'0','border-bottom':'0'});
            }
        );
        
	$('#preview').click(
            function()
            {
                if($("#hidden").val() == 'foto')
                {
                    $('#ibig').attr('src','img/photo_' + current_image + 'b.jpg');
                    current_bimage = current_image;
                    $('#big').fadeIn(800);
                    $('#tablebig').fadeIn(800);
                    $('#ibig').fadeIn(500);
                }         
           }
        );
        $('.close').click(
            function()
            {
                $('#big').fadeOut(1000);
                current_bimage = 1;
            }
        );    
        $('#rarrow').click(
            function()
            {
                //alert(current_bimage);
                if(current_bimage < max)
                {
                        current_bimage++;
                        $('#ibig').attr('src','img/photo_' + current_bimage + 'b.jpg');
                }
            }
        );
        $('#larrow').click(
            function()
            {
                //alert(current_bimage);
                if(current_bimage > 1)
                    {
                        current_bimage--;
                        $('#ibig').attr('src','img/photo_' + current_bimage + 'b.jpg');
                    }
            }
        );
        $('#larrow').hover(
            function()
            {
                $(this).attr('src','img/cursor/left_2/left_2.png');
            },
            function()
            {
                $(this).attr('src','img/cursor/left_2/left_1.png');
            }
        );   
        $('#rarrow').hover(
            function()
            {
                $(this).attr('src','img/cursor/right_2/right_2.png');
            },
            function()
            {
                $(this).attr('src','img/cursor/right_2/right_1.png');
            }
        ); 
            
        $('#big').click(
            function()
            {
                $('#big').fadeOut(800);
                $('#tablebig').fadeOut(800);
                $('#ibig').fadeOut(500);
            }
        );    
    }
);


