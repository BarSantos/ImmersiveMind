/*****************************************************************************/
/*                          I M P O R T A N T E                              */
/*****************************************************************************/
var IPADDR = '192.168.1.74';
/*****************************************************************************/
/*                          I M P O R T A N T E                              */
/*****************************************************************************/


/*************VARIÁVEIS GLOBAIS ***********/
var imagem = '';
var imagemNome = '';
/******************************************/


/*------- Para criar bolinhas ----*/

$(document).ready(function(){
    
   
})

/*** Funcao criar observacoes ***/
function Observacoes(){
    var xhttp = new XMLHttpRequest();
    var sessaoID = window.sessionStorage.getItem("sessaoID");
    
    xhttp.open("GET", "http://"+IPADDR+":8080/api/observacao/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('sessaoid', sessaoID);
    
    xhttp.onreadystatechange  = function () {
                                   

                                    if (this.readyState == 4 && this.status == 200) {
                                        var fillstring = '';
                                       
                                        var resultJSON = JSON.parse(this.responseText);
                                        
                                        if(resultJSON.message != 'Error a devolver Observações'){
                                            var jsonResult = JSON.parse(resultJSON);
                                            
                                            markRadio(jsonResult[0].RECONHECIMENTO, 'reconhecimentoradio');
                                            markRadio(jsonResult[0].HUMOR, 'humorradio');
                                            markRadio(jsonResult[0].INTERESSE, 'interesseradio');
                                            markRadio(jsonResult[0].INTERACCAO, 'interaccaoradio');
                                            markRadio(jsonResult[0].NAUSEAS, 'nauseasradio');
                                            markRadio(jsonResult[0].DESEQUILIBRIOS, 'desequilibriosradio');
                                            markCheckbox(jsonResult[0].PERTURBACOES_VISUAIS, 'Olhos');
                                            document.getElementById('ObservacoesRelevantes').value = jsonResult[0].OBSERVACOES;
                                        }
                                    }
                                };
     xhttp.send();
    
    document.getElementById('addsession').onclick = function()
                                                    {
                                                        UpdateObsearvacao();
                                                    };   
    
}
   

function UpdateObsearvacao(){
     var xhttp = new XMLHttpRequest();
    var sessaoID = window.sessionStorage.getItem("sessaoID");
    
    xhttp.open("PUT", "http://"+IPADDR+":8080/api/observacao/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    var reconhecimento = checkRadios('reconhecimentoradio');
    var humor = checkRadios('humorradio');
    var interesse = checkRadios('interesseradio');
    var interaccao = checkRadios('interaccaoradio');
    var nauseas = checkRadios('nauseasradio');
    var desequilibrios = checkRadios('desequilibriosradio');
    var olhos = checkCheckbox('Olhos');
    var observacoes = document.getElementById('ObservacoesRelevantes').value;
    var cuidadorID = window.sessionStorage.getItem("email_id");

    
    var fd = "sessaoID="+sessaoID+"&reconhecimento="+reconhecimento+"&humor="+humor+"&interesse="+interesse+"&interaccao="+interaccao+"&nauseas="+nauseas+"&desequilibrios="+desequilibrios+"&perturbacoes_visuais="+olhos+"&observacoes="+observacoes+"&cuidadorID="+cuidadorID;
   
    xhttp.send(fd);
}
 /*************** RADIOS *****************/   
function checkRadios(radioName){
    
    var result;
    var radios = document.getElementsByName(radioName);
    
    for(var i=0; radios[i]; i++){
         if (radios[i].checked) {
             result = radios[i].value;
            break;
        }
    }
    
    return result;
}


function markRadio(buttonChecked, radioNome)
{
    var radios = document.getElementsByName(radioNome);
    
    for(var i=0; radios[i]; i++){
        if(radios[i].value == buttonChecked){
            radios[i].checked = true;
            break;
        }
    }
}

/************* CHECKBOXES *****************/
function checkCheckbox(checkboxName){
    
    var result = '';
    var check = document.getElementsByName(checkboxName);
    
    for(var i=0; check[i]; i++){
         if (check[i].checked) {
             result += check[i].value+';';
        }
    }
    
    return result;
}

function markCheckbox(buttonChecked, checkboxNome)
{
    var check = document.getElementsByName(checkboxNome);
    var splitbuttonChecked = buttonChecked.split(';');
    console.log(check);
    for(var i=0; check[i]; i++){
        for(var j=0; check[j]; j++){
            if(check[i].value == splitbuttonChecked[j]){
                check[i].checked = true;
                break;
            }
        }
    }
}