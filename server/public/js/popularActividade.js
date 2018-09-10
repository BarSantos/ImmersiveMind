/*****************************************************************************/
/*                          I M P O R T A N T E                              */
/*****************************************************************************/
var IPADDR = '192.168.1.74';
/*****************************************************************************/
/*                          I M P O R T A N T E                              */
/*****************************************************************************/




$(document).ready(function(){
    
    Actividade();
    initPlayer();
})

function initPlayer()
{
    YT.Player('iframes', {
       events: {
            onStateChange: playerStateChange
       } 
    });
}

function playerStateChange(event)
{
    switch(event.data)
    {
        case YT.PlayerState.ENDED:
            console.log("Ended");
            break;
        case YT.PlayerState.PLAYING:
            console.log("Play");
            break;
        case YT.PlayerState.PAUSED:
            console.log("Pause");
            break;
    }
}

/** Activa a página depois de loaded **/
function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("allPageActivity").style.display = "block";
}

/*** Funcao popular actividade ***/
function Actividade(){
    var xhttp = new XMLHttpRequest();
    var sessaoID = window.sessionStorage.getItem("sessaoID");
    
    xhttp.open("GET", "http://"+IPADDR+":8080/api/sessoes/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('sessaoid', sessaoID);
    var sessaoNome = window.sessionStorage.getItem("sessaoNome");
    
    if(sessaoNome){
        document.getElementById("sessaoX").innerHTML = sessaoNome;  
    }
    
    xhttp.onreadystatechange  = function () {
                                   

                                    if (this.readyState == 4 && this.status == 200) {
                                        var fillstring = '';
                                       
                                        var resultJSON = JSON.parse(this.responseText);
            
                                        if(resultJSON.message != 'Error a devolver Sessao'){
                                            var jsonResult = JSON.parse(resultJSON);
                                            var nomeUtente = jsonResult[0].PRIMEIRO_NOME+' '+jsonResult[0].ULTIMO_NOME;
                                            if(jsonResult[0].PRIMEIRO_NOME)
                                                document.getElementById("utenteX").innerHTML = nomeUtente;
                                        }
                                         getCategoriasDaSessao(sessaoID);
                                    }
       
                                };
        
    xhttp.send();
}


function getCategoriasDaSessao(sessao_id){
    var xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", "http://"+IPADDR+":8080/api/categorias/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if(!sessao_id)
        sessao_id = '';
    xhttp.setRequestHeader('sessaoid', sessao_id);
    xhttp.onreadystatechange  = function () {
                    
                                    if (this.readyState == 4 && this.status == 200) {
                                       
                                        var resultJSON = JSON.parse(this.responseText);
                                        var i = 0;
                                        console.log("Result: "+resultJSON.message);
                                        if(resultJSON.message != 'Error a devolver Categorias'){
                                            var jsonResult = JSON.parse(resultJSON);
                                            
    
                                            var fillstring = '';
                                            
                                            /* Popular tabs com categorias */
                                            for(i=0; i<jsonResult.length; i++){
                                                var categoria = jsonResult[i].CATEGORIA;
                                                categoria = categoria.replace('/','');
                                                categoria = categoria.replace(/ /g, '');
                                                
                                                fillstring += '<li class="nav-item">';
                                                if (i == 0)
                                                    fillstring += '<a class="nav-link active" data-toggle="tab" href="#'+categoria+'">';
                                                else
                                                    fillstring += '<a class="nav-link" data-toggle="tab" href="#'+categoria+'">';
                                                fillstring += jsonResult[i].CATEGORIA;
                                                fillstring += '</a>';
                                                fillstring += '</li>';
                                                
                                                getVideosDaCategoria(jsonResult[i].CATEGORIA, i, '');
                                                window.alert("Categorias: "+jsonResult[i].CATEGORIA);
                                            }
                                            document.getElementById("tabsCategorias").innerHTML = fillstring;
                                            
                                        }
                                        getVideosDaCategoria('sessao'+sessao_id, i, sessao_id);
                                    showPage();
 
                                    }
                                };
    xhttp.send();
}


function getVideosDaCategoria(categoria, index, sessaoID){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://"+IPADDR+":8080/api/videos/", true);
    
    if(categoria == 'sessao'+sessaoID)
            xhttp.setRequestHeader('categoria', '');
    else
            xhttp.setRequestHeader('categoria', categoria);
    
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhttp.setRequestHeader('sessaoid', sessaoID);
    
    categoria = categoria.replace('/', '');
    categoria = categoria.replace(/ /g, '');
    
    xhttp.onreadystatechange  = function () {
                                    var fillstring = document.getElementById("tab-content").innerHTML;
                                    if (this.readyState == 4 && this.status == 200) {
                                        
                                        var resultJSON = JSON.parse(this.responseText);
                                        
                                        if(resultJSON.message != 'Error a devolver Videos'){
                                            var jsonResult = JSON.parse(resultJSON);
                                           
                                            fillstring += '<div id="'+categoria+'" class="tab-pane fade show ';
                                            if(index == 0)
                                                fillstring += 'active">';
                                            else
                                                fillstring += '">';
                                            // ----------------------------------------- //
                                            // ---------------CAROUSEL------------------ //
                                            // ----------------------------------------- //
                                           fillstring += '<div id= "carouselYT-'+categoria+'" class="carousel slide" data-ride="carousel" data-interval="false">';
                                            fillstring += '<ul class="carousel-indicators">';
                                            var fill_li = '';
                                            var fill_item = '';
                                            
                                            
                                            for(var i=0; jsonResult[i]; i+=2){
                                                    fill_li += '<li data-target="#carouselYT-'+categoria+'" ';
                                                    if(i == 0){
                                                        fill_li += 'data-slide-to="0" class="active slidecolor"></li>';
                                                        fill_item += '<div class="carousel-item carousel-item-yt active">';
                                                    }
                                                    else{
                                                        a = i-1;
                                                        fill_li += 'data-slide-to="'+a+'" class="slidecolor"></li>';
                                                        fill_item += '<div class="carousel-item carousel-item-yt">';
                                                    }
                                                    fill_item += '<div class = "row">';
                                                    fill_item += '<div class = "col-lg-6 col-md-6 col-sm-6 col-6">';
                                                     fill_item += '<a onclick="playVideo(\''+ jsonResult[i].URL_FILE +'\')">';
                                                    fill_item += '<div class = "row">'; //row imagem
                                                    fill_item += '<div class = "col-lg-12 col-md-12 col-sm-12 col-12">';
                                                    fill_item += '<img class="thumbnail_image" src="'+jsonResult[i].URL_THUMBNAIL+'">';
                                                    fill_item += '</div>';
                                                    fill_item += '</div>'; // fecha row image
                                                    fill_item += '<div class = "row">'; //row título
                                                    fill_item += '<div class = "col-lg-12 col-md-12 col-sm-12 col-12">';
                                                    fill_item += '<p></p><p class="title_video">'+jsonResult[i].VIDEO_TITLE+'</p>';
                                                    fill_item += '</div>';
                                                    fill_item += '</div>'; // fecha row título
                                                    fill_item += '</a>';
                                                    fill_item += '</div>'; //fecha col-6 - primeira coluna
                                                    fill_item += '<div class = "col-lg-6 col-md-6 col-sm-6 col-6">';
                                                    if (jsonResult[i+1]){
                                                        
                                                        fill_item += '<a onclick="playVideo(\''+ jsonResult[i+1].URL_FILE +'\')">';
                                                        fill_item += '<div class = "row">'; //row imagem
                                                        fill_item += '<div class = "col-lg-12 col-md-12 col-sm-12 col-12">';
                                                        fill_item += '<img class="thumbnail_image" src="'+jsonResult[i+1].URL_THUMBNAIL+'">';
                                                        fill_item += '</div>';
                                                        fill_item += '</div>'; // fecha row image
                                                        fill_item += '<div class = "row">'; //row título
                                                        fill_item += '<div class = "col-lg-12 col-md-12 col-sm-12 col-12">';
                                                        fill_item += '<p></p><p class="title_video">'+jsonResult[i+1].VIDEO_TITLE+'</p>';
                                                        fill_item += '</div>';
                                                        fill_item += '</div>'; // fecha row título
                                                        fill_item += '</a>';
                                                        
                                                    }
                                                    fill_item += '</div>'; //fecha col-6 - segunda coluna
                                                    fill_item += '</div>'; //fecha row
                                                    fill_item += '</div>'; //fecha carousel-item
                                                
                                                    
                                            }
                                            fillstring += fill_li;
                                            fillstring += '</ul>';
                                            fillstring += '<div class="carousel-inner">';
                                            fillstring += fill_item;
                                            fillstring += '</div>';
                                            
                                            // Controlos - setinhas esquerda e direita
                                            fillstring += '<a class="carousel-control-prev" href="#carouselYT-'+categoria+'" data-slide="prev">';
                                            fillstring += '<span class="carousel-control-prev-icon"></span>';
                                            fillstring += '</a>';
                                            fillstring += '<a class="carousel-control-next" href="#carouselYT-'+categoria+'" data-slide="next">';
                                            fillstring += '<span class="carousel-control-next-icon"></span>';
                                            fillstring += '</a>';
                                            fillstring += '</div>';
                                            
                                            
                                           var usercontent = document.getElementById("tabsCategorias").innerHTML;
                                            console.log("usercontent: "+usercontent);
                                            if (sessaoID){
                                                usercontent += '<li class="nav-item">';
                                                if(usercontent == '<li class="nav-item">')
                                                    usercontent += '<a class="nav-link active" data-toggle="tab" href="#'+categoria+'">';
                                                else
                                                    usercontent += '<a class="nav-link" data-toggle="tab" href="#'+categoria+'">';
                                                usercontent += '<i class="fas fa-heart"></i>';
                                                usercontent += '</a>';
                                                usercontent += '</li>' 
                                            }
                                            document.getElementById("tabsCategorias").innerHTML = usercontent;
                                        }
                                        document.getElementById("tab-content").innerHTML = fillstring;
                                    }
    };
   xhttp.send();                                         
}

function playVideo(urlToPlay)
{
    var toBeReplaced = 'https://www.youtube.com/watch?v=';
    var correctFormat = 'https://www.youtube.com/embed/';
    
    if(urlToPlay.indexOf(toBeReplaced) !== -1)
       urlToPlay = urlToPlay.replace(toBeReplaced,correctFormat);
    else
       urlToPlay = correctFormat + urlToPlay;
    
    document.getElementById("iframes").src = urlToPlay;
}

