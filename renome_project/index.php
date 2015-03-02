<html>
    <head>
        <meta charset="UTF-8">
        <script type='text/javascript' src='jwplayer/jwplayer.js'></script>
        <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
        <!--<script src="http://code.jquery.com/jquery-migrate-1.1.0.js"></script>-->
        <script src="js/main.js"></script>
        <script src="js/jq.js"></script>
        <link rel='icon' href='img/logo_mini.png' type='image/x-icon'/>
        <link rel="stylesheet" type="text/css" href="css/menu.css"/>
        <title>ќбработка фото, видео, аудио</title>
    </head>

    <body>
        <input type="hidden" value="start" id="hidden"/>
        <!--<div id="bigbg" class="bigbg"/>-->
            <div id="big" class="big"></div>
            <div id="tablebig" style="display: none;top:0;left:0;position: absolute;width: 100%;height: 100%;">
                <table  align="center" width="100%" height="100%" style="">
                <tr>
                    <td align="right" valign="middle">
                        <img id="larrow" class="arrow" src="img/cursor/left_2/left_1.png"/>
                    </td>
                    <td align="center" valign="middle" style="width:550px;height: 550px;">
                        <img id="ibig" class="big_image" src=""/>
                    </td>
                    <td align="left" valign="middle">
                        <img id="rarrow" class="arrow" src="img/cursor/right_2/right_1.png"/>
                    </td>
                </tr>
            </table></div>

        <table id = 'header_table' align = 'center' width = '550px'>
            <tr>
                <td align = 'center' valign = 'top'>
                    <img src = 'img/icons/geo.png'/>
                    <br/>г. ћосква
                </td>
                <td align = 'center' valign = 'top'>
                    <img src = 'img/icons/post.png'/>
                    <br/>anischenko.iljya@me.com
                </td>
                <td align = 'center' valign = 'top'>
                    <img src = 'img/icons/phone.png'/>
                    <br/>+7(963)688-53-47
                </td>
                <td align = 'center' valign = 'top'>
                    <img src = 'img/icons/info.png'/>
                    <br/>о нас
                </td>
            </tr>
        </table><br/><br/><br/><br/>

        <table id = 'main' align = 'center'>
            <tr>
                <td  width ="70px" valign="middle" align = 'right'>
                    <img id="left" class="left" onclick="previous();" onmouseover = 'this.src = "img/cursor/left/left_2.png";' onmouseout = 'this.src = "img/cursor/left/left_1.png";' valign="middle" align = 'center' src = 'img/cursor/left/left_1.png'/>
                </td>
                <td valign="middle" align = 'center' width = '490px' height = '235px'>
                    <div id = 'preview'>
                        <img id ="logo" class = "logo_place" valign="middle" align = 'center' src = 'img/logo2.png'/>
                    </div>
                </td>
                <td width ="70px" valign="middle" align = 'left'>
                    <img id="right" class="right" onclick="next();" onmouseover = 'this.src = "img/cursor/right/right_2.png";' onmouseout = 'this.src = "img/cursor/right/right_1.png";' valign="middle" align = 'center' src = 'img/cursor/right/right_1.png'/>
                </td>
            </tr>
         </table>

         <table id = 'main2' align = 'center'>
            <tr height ="30"><td colspan = '3'></td></tr>
            <tr height ="75px" >
                <td align = 'center' id='tdfoto' valign = 'middle'>
                    <img id = "foto" src = 'img/foto/foto_1.png' class = 'resize' onclick = 'first();' onmouseover = 'this.src = "img/foto/foto_2.png"' onmouseout = 'this.src = "img/foto/foto_1.png";'/>
                </td>
                <td align = 'center' id='tdvideo' valign = 'middle'>
                    <img id = "video" src = 'img/video/video_1.png' class = 'resize' onclick = 'show_video();' onmouseover = 'this.src = "img/video/video_2.png";' onmouseout = 'this.src = "img/video/video_1.png"'/>
                </td>
                <td align = 'center' id='tdaudio' valign = 'middle'>
                    <img id = "audio" src = 'img/audio/audio_1.png' class = 'resize' onmouseover = 'this.src = "img/audio/audio_2.png"' onmouseout = 'this.src = "img/audio/audio_1.png";'/>
                </td>
            </tr>

            <tr height="100">
                <td valign = 'top'>
                    <div id = "ftriangle"></div>
                    <div id = "fsquare">
                        <p id ="ft" class ="text">
                        <br/> - коллажи, буклеты, логотипы;
                        <br/> - услуги предметного <br/>&nbsp; фотографа;
                        <br/> - дизайн и обработка;
                        </p>
                    </div>
                </td>
                <td valign = 'top'>
                    <div id = "striangle"></div>
                    <div id = "ssquare">
                        <p id ="st" class ="text">
                        - видео-подарки,приглашени€;
                        <br/>- видеорезюме,домашнее видео;
                        <br/>- учебные, документальные <br/>&nbsp; фильмы;
                        <br/>- слайд-шоу, корпоративные <br/>&nbsp; фильмы;
                        <br/>- монтаж, кодирование;
                        </p>
                    </div>
                </td>
                <td valign = 'top'>
                    <div id = "ttriangle"></div>
                    <div id = "tsquare">
                        <p id ="tt" class ="text">
                         - озвучивание, начитка;
                        <br/> - аудиореклама, аудиокниги;
                        <br/> - музыкальные подложки;
                        <br/> - нормализаци€ звука,<br/>&nbsp; кодирование;
                        <br/> - транскрибаци€;
                        </p>
                    </div>
                </td>
            </tr>
        </table>

        <div align ="center" >
            <a href='http://vk.com/smehiljya' target = '_blank'><img src = 'img/social network/vk.png'/></a>&nbsp
            <a href='https://twitter.com/smehiljya' target = '_blank'><img src = 'img/social network/twitter.png'/></a>&nbsp
            <a href='https://ru-ru.facebook.com/smehiljya' target = '_blank'><img  src = 'img/social network/facebook.png'/></a>&nbsp
            <a href='http://www.youtube.com/user/smehANDphone ' target = '_blank'><img   src = 'img/social network/y_t.png'></a>&nbsp			
        </div>					

        <img class ="author_img" src = 'img/author.png'/>
    </body>
</html>