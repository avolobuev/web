var max = 3;
var current_image = 1;
var current_bimage = 1;

function previous()
{
    /*if(current_image == 1)
    {
        document.getElementById("preview").innerHTML = "<img class = 'shadow2' id = 'photo_" + current_image + "' src = 'img/" + current_image + ".png'/>";
        //$('#photo_' + current_image).fadeIn(2000);
    }*/
    if(current_image > 1)
    {
        current_image--;
        document.getElementById("preview").innerHTML = "<img class = 'shadow' id = 'photo_" + current_image + "' src = 'img/photo_" + current_image + "l.jpg'/>";
        $('#photo_' + current_image).fadeIn(1500);
    }
}
function next()
{
    if(current_image < max)
    {
        current_image++;
        document.getElementById("preview").innerHTML = "<img class = 'shadow' id = 'photo_" + current_image + "' src = 'img/photo_" + current_image + "l.jpg'/>";
        $('#photo_' + current_image).fadeIn(1500);     
    }
    else if(current_image == max)
    {
        //document.getElementById("preview").innerHTML = "<img class = 'shadow2' id = 'photo_" + current_image + "' src = 'img/" + current_image + ".png'/>";
        //$('#photo_' + current_image).fadeIn(2000);
    }
    else
    {

    }
}
function first()
{
    /*alert(document.getElementById("hidden").value);*/
    var hidden = document.getElementById("hidden");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    
    /*if(hidden.value == 'foto')
    {
         document.getElementById("preview").innerHTML = "<img id ='logo' class = 'logo_place' valign='middle' align = 'center' src = 'img/logo2.png'/>";
    }*/
	
    if(hidden.value == 'video')
    {
        //jwplayer("preview").remove();
		//document.getElementById("video_place").style.display = 'none';
		jwplayer().remove();
		$('#preview').bind('click',function()
		{
			$('#ibig').attr('src','img/photo_' + current_image + 'b.jpg');
			current_bimage = current_image;
			$('#big').slideDown(1000);
		});
		/*$('#ibig').attr('src','img/photo_' + current_image + 'b.jpg');
		current_bimage = current_image;
		$('#big').slideDown(1000);*/    
    }
    hidden.value = 'foto';
    
    $('#left').fadeIn(1000);
    $('#right').fadeIn(1000);
    
    current_image = 1;
    document.getElementById("preview").innerHTML = "<img class = 'shadow' id = 'photo_" + current_image + "' src = 'img/photo_" + current_image + "l.jpg'/>";
    $('#photo_' + current_image).slideDown(800);
    //current_image++;
}
function show_video()
{
    var hidden = document.getElementById("hidden");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    
    if(hidden.value == 'foto')
    {
        /*left.style.display = 'none';
        right.style.display = 'none';*/
		//document.getElementById("logo").displayed = false;
        $('#left').slideUp(1000);
        $('#right').slideUp(1000);
    }   
    
    hidden.value = 'video';
	//document.getElementById("logo").style.display = 'none';
    
    jwplayer("preview").setup({
        playlist: "http://gdata.youtube.com/feeds/api/playlists/PL9QNlUVCSq753SLxUt2pIrkoyhbsPyKa_?alt=rss",
        primary: "flash",
        width: 480,
        height: 230,
        listbar: 
        {
                position: "right",
                size: 150 
        }
    });
}
