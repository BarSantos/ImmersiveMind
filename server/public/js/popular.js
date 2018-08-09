/*------- Para criar bolinhas ----*/

$(document).ready(function(){
    
    Bolinhas();
})

/*** Funcao criar bolinhas ***/
function Bolinhas(){
    var xhttp = new XMLHttpRequest();
    var email = window.sessionStorage.getItem("email_id");
    
    xhttp.open("GET", "http://localhost:8080/api/doentes/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('cuidadorid', email);
    
    xhttp.onreadystatechange  = function () {
                                   

                                    if (this.readyState == 4 && this.status == 200) {
                                        var fillstring = '';
                                       
                                        var resultJSON = JSON.parse(this.responseText);
                                        
                                        if(resultJSON.message != 'Erro a devolver doentes'){
                                            var jsonResult = JSON.parse(resultJSON);
                                            /* Popular com doentes */
                                            for(var i=0; i<jsonResult.length; i++){
                                                fillstring += '<div class="col-lg-4 col-sm-6 text-center mb-4">';
                                                fillstring += '<img class="rounded-circle img-fluid d-block mx-auto" src="http://placehold.it/200x200" alt="">';
                                                fillstring+= '<h3>'+jsonResult[i].PRIMEIRO_NOME+' '+jsonResult[i].ULTIMO_NOME+'</h3></div>';
                                            }
                                        }
                                    
                                   /* console.log('Aqui supostamente e o plus');
                                    /* Sinal plus */ 
                                        fillstring+='<div class="col-lg-4 col-sm-6 text-center mb-4">';
                                        fillstring+= '<a href="#">'
                                        fillstring+= '<img class="rounded-circle img-fluid d-block mx-auto" src="images/resize.png" alt="">';
                                        fillstring+= '<h3>Fafá de Belém</h3></a>'
                                        fillstring+= '</div>';
                                        document.getElementById("rowbolinhas").innerHTML = fillstring;
 
                                    }
                                };
    xhttp.send();
}