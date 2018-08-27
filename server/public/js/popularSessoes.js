/*****************************************************************************/
/*                          I M P O R T A N T E                              */
/*****************************************************************************/
var IPADDR = '192.168.1.14';
/*****************************************************************************/
/*                          I M P O R T A N T E                              */
/*****************************************************************************/


/*************VARIÁVEIS GLOBAIS ***********/
var imagem = '';
var imagemNome = '';
/******************************************/


/*------- Para criar bolinhas ----*/

$(document).ready(function(){
    
    Sessoes();
    ChamarDoentes();
    ChamarCategorias();
})

/*** Funcao criar bolinhas ***/
function Sessoes(){
    var xhttp = new XMLHttpRequest();
    var email = window.sessionStorage.getItem("email_id");
    
    xhttp.open("GET", "http://"+IPADDR+":8080/api/sessoes/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('cuidadorid', email);
    
    xhttp.onreadystatechange  = function () {
                                   

                                    if (this.readyState == 4 && this.status == 200) {
                                        var fillstring = '';
                                       
                                        var resultJSON = JSON.parse(this.responseText);
                                        
                                        if(resultJSON.message != 'Error a devolver Sessoes'){
                                            var jsonResult = JSON.parse(resultJSON);
                                            var imagePath = "images/sessionimages/";
                                            var imageName;
                                            
                                            /* Popular com doentes */
                                            for(var i=0; i<jsonResult.length; i++){
                                                if (jsonResult[i].IMAGEM)
                                                    imageName = jsonResult[i].IMAGEM;
                                                else
                                                    imageName = "bolinhas_default.png";
                                                
                                                fillstring += '<div class="col-lg-4 col-sm-6 text-center mb-4">';
                                                fillstring+= '<a class="rect_utentes" href="" data-toggle="modal" data-target="#modalContactForm" data-backdrop="static" data-keyboard="false" onclick="EditSession(this.id)" id='+jsonResult[i].SESSAO_ID+'>';
                                                fillstring += '<img class="img-fluid d-block mx-auto rect" alt=""  style="background-image: url('+imagePath+imageName+')">';
                                                if(jsonResult[i].SESSAO_NOME)
                                                    fillstring+= '<h3>'+jsonResult[i].SESSAO_NOME+'</h3></a></div>';
                                                else
                                                    fillstring+= '<h3>'+jsonResult[i].NOME+' '+i+'</h3></a></div>';
                                            }
                                        }
                                    
                                   /* console.log('Aqui supostamente e o plus');
                                    /* Sinal plus */ 
                                        fillstring+='<div class="col-lg-4 col-sm-6 text-center mb-4">';
                                        fillstring+= '<a href="" data-toggle="modal" data-target="#modalContactForm" data-backdrop="static" data-keyboard="false" onclick="AddSessionModal()">';
                                        fillstring+= '<img class="img-fluid d-block mx-auto rect_plus" style="" alt="">';
                                        fillstring+= '</a>';
                                        fillstring+= '</div>';
                                        document.getElementById("rowsessoes").innerHTML = fillstring;
 
                                    }
                                };
    xhttp.send();
}

function ChamarDoentes(){
    var xhttp = new XMLHttpRequest();
    var email = window.sessionStorage.getItem("email_id");
    
    xhttp.open("GET", "http://"+IPADDR+":8080/api/doentes/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('cuidadorid', email);
    
    xhttp.onreadystatechange  = function () {
                                   

                                    if (this.readyState == 4 && this.status == 200) {
                                        var fillstring = '';
                                       
                                        var resultJSON = JSON.parse(this.responseText);
                                        
                                        fillstring+='<option selected>- Nenhum -</option>';
                                        
                                        if(resultJSON.message != 'Erro a devolver doentes'){
                                            var jsonResult = JSON.parse(resultJSON);
                                            
                                            
                                            /* Popular com doentes nas opções do modal das sessões */
                                            for(var i=0; i<jsonResult.length; i++){
                                                fillstring+='<option id="D-'+jsonResult[i].DOENTE_ID+'">';
                                                fillstring+=jsonResult[i].PRIMEIRO_NOME+' '+jsonResult[i].ULTIMO_NOME;
                                                fillstring+='</option>';
                                            }
                                        }
                                        
                                        document.getElementById("utenteid").innerHTML = fillstring;
 
                                    }
                                };
    xhttp.send();
}

function ChamarCategorias(){
    var xhttp = new XMLHttpRequest();
    var email = window.sessionStorage.getItem("email_id");
    
    xhttp.open("GET", "http://"+IPADDR+":8080/api/categorias/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhttp.onreadystatechange  = function () {
                                   

                                    if (this.readyState == 4 && this.status == 200) {
                                        var fillstring = '<label for="inpututente">Temas dos vídeos</label>';
                                       
                                        var resultJSON = JSON.parse(this.responseText);
                                        
                                        
                                        if(resultJSON.message != 'Error a devolver Categorias'){
                                            var jsonResult = JSON.parse(resultJSON);
                                            
                                            
                                            /* Popular com doentes nas opções do modal das sessões */
                                            for(var i=0; i<jsonResult.length; i++){
                                                
                                                
                                                if(i % 2 == 0)
                                                    fillstring+='<div class="row">';
                                                
                                                
                                                    fillstring+='<div class="col-lg-6">';
                                                    fillstring+='<label class="checkbox-inline">';
                                                    fillstring+='<input type="checkbox" value=""> '+jsonResult[i].CATEGORIA;
                                                    fillstring+='</label>';
                                                    fillstring+='</div>';
                                                
                                                if(i % 2 != 0 || i == jsonResult.length-1)
                                                    fillstring+='</div>'; //Fecha a row
                                            }
                                        }
                                        
                                        document.getElementById("popularcategorias").innerHTML = fillstring;
 
                                    }
                                };
    xhttp.send();
}


/* Além de mudar para Editar Sessão,
Popula também cada caixinha correspondente a cada doente
com os respectivos dados */

function EditSession(clicked_id){
    window.sessionStorage.setItem("sessaoID", clicked_id);
    
   
    //document.getElementById('utente-titulo').innerHTML = 'Editar Sessão';
    document.getElementById('addsession').innerHTML = '<i class="fas fa-save"></i> Guardar';
    
    document.getElementById('addsession').onclick = function()
                                                    {
                                                        UpdateSession();
                                                    };   
    
    //// Mostrar botão do Apagar ////
    document.getElementById('botaoAdicionar').classList.remove('col-sm-6');
    document.getElementById('botaoCancelar').classList.remove('col-sm-6');
    
    document.getElementById('botaoAdicionar').classList.add('col-sm-4');
    document.getElementById('botaoCancelar').classList.add('col-sm-4');
    document.getElementById('botaoApagar').style.display= 'block';
    /////////////////////////////////
    
    // Aqui é necessário popular as caixas
    var xhttp = new XMLHttpRequest();
   
    var sessaoID = clicked_id;
    
    $('#addsession').prop("disabled", false);
    
    xhttp.open("GET", "http://"+IPADDR+":8080/api/sessoes/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('sessaoid', sessaoID);
    
    xhttp.onreadystatechange  = function () {
                                     if (this.readyState == 4 && this.status == 200) {
                                         var resultJSON = JSON.parse(this.responseText);
                                        
                                        if(resultJSON.message != 'Error a devolver Sessao'){
                                            var jsonResult = JSON.parse(resultJSON);
                                            document.getElementById("sessaoNome").value = jsonResult[0].SESSAO_NOME;
                                            document.getElementById('diaid').value = jsonResult[0].DIA.split('T').shift();
                                            
                                            var nomeUtente = '- Nenhum -';
                                            
                                            if(jsonResult[0].NOME) //Se tiver algum nome associado (tipo travesseiro)
                                                nomeUtente = jsonResult[0].NOME; 
                                            
                                            document.getElementById("utenteid").value = nomeUtente;
                                            var imagePath = "images/sessionimages/";
                                            var imageName;
                                            
                                            /*Se a pessoa não tiver escolhido imagem*/
                                            if (jsonResult[0].IMAGEM)
                                                    imageName = jsonResult[0].IMAGEM;
                                                else
                                                    imageName = "bolinhas_default.png";
                                            
                                            $('#img-upload').attr('style', "background-image: url('"+imagePath+imageName+"')");
                                            $('#imagelabel').val(jsonResult[0].IMAGEM);
                                            
                                            imagemNome = jsonResult[0].IMAGEM;
                                        }
                                     }
    };
   xhttp.send();
  
}

/*Função que actualiza o doente no modal*/
function UpdateSession(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://"+IPADDR+":8080/api/sessoes/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    var sessionID = window.sessionStorage.getItem("sessaoID");
    var cuidadorID = window.sessionStorage.getItem("email_id");
    
    
    var sessaoNome = document.getElementById("sessaoNome").value;
    var doenteID = document.getElementById("utenteid").value;
    var dia = document.getElementById("diaid").value;
    
    /* O que está entre aspas são os nomes do server: var sessaoID = req.body.-----> sessaoID <---- este;*/
    var fd = "sessaoID=" + sessionID + "&nomesessao=" + sessaoNome + "&doenteid=" + doenteID + "&cuidadorid=" + cuidadorid + "&dia=" + dia + "&imagem=" + imagem + "&imagename=" + imagemNome;
    
    xhttp.onreadystatechange  = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    Sessoes();  
                                    }
                            };
    xhttp.send(fd);
    resetModalSessao();
}
    
/*Função que actualiza o doente no modal*/
function DeleteSessao(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://"+IPADDR+":8080/api/sessoes/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    var sessionID = window.sessionStorage.getItem("sessaoID");
    
    var email = window.sessionStorage.getItem("email_id");
    
    var fd = "sessaoID=" + sessionID + "&cuidadorid=" + email;
    
    xhttp.onreadystatechange  = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    Sessoes();  
                                    }
                            };
    xhttp.send(fd);
    resetModalSessao();
}

/*Muda só o aspecto do modal*/
function AddSessionModal(){
    //document.getElementById('utente-titulo').innerHTML = 'Novo Utente';
    document.getElementById('addsession').innerHTML = '<i class="fas fa-plus-circle"></i> Adicionar';
}

/*********Para a opção Procurar********/

$(document).ready( function() {
    	$(document).on('change', '.btn-file :file', function() {
		var input = $(this),
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [label]);
		});

		$('.btn-file :file').on('fileselect', function(event, label) {
		    
		    var input = $(this).parents('.input-group').find(':text'),
		        log = label;
            
		    imagemNome = label;
            
		    if( input.length ) {
		        input.val(log);
		    } else {
		        if( log ) alert(log);
		    }
		});
		function readURL(input) {
		    if (input.files && input.files[0]) {
		        var reader = new FileReader();
		        
		        reader.onload = function (e) {
		            $('#img-upload').attr('style', "background-image: url(" + e.target.result + ")");    
                    imagem = e.target.result;
                }
		        
		        reader.readAsDataURL(input.files[0]);
                
               
		    }
		}

		$("#imgInp").change(function(){
		    readURL(this);
		}); 	
	});


function AddSession(){
     
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://"+IPADDR+":8080/api/sessoes/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    var cuidadorID = window.sessionStorage.getItem("email_id");
    var sessaoNome = document.getElementById("sessaoNome").value;
    var doenteID = document.getElementById("utenteid").value;
    var dia = document.getElementById("diaid").value;
    
    /* O que está entre aspas são os nomes do server: var sessaoID = req.body.-----> sessaoID <---- este;*/
    var fd = "nomesessao=" + sessaoNome + "&doenteid=" + doenteID + "&cuidadorid=" + cuidadorid + "&dia=" + dia + "&imagem=" + imagem + "&imagename=" + imagemNome;
    
    
    xhttp.onreadystatechange  = function () {
                                    if (this.readyState == 4 && this.status == 200) {
                                        Sessoes();  
                                        }
                                };
    xhttp.send(fd);
    resetModalSessao();
}

/* Depois de sair da página do modal do doente
Apaga todas as entradas - não fica em "cache" */
function resetModalSessao(){
    document.getElementById("sessaoNome").value = '';
    document.getElementById("diaid").value = '';
    document.getElementById("utenteid").value = '- Nenhum -';
    document.getElementById("360link").value = '';
    imagem = '';
    imagemNome = '';
    $('#img-upload').attr('style', "background-image: url('images/userimages/bolinhas_default.png')");
    $('#imagelabel').val('');
    document.getElementById("addsession").setAttribute("disabled", "true");
    $('#modalContactForm').modal('toggle');
    
    //// Esconder (again) botão do Apagar ////
    document.getElementById('botaoAdicionar').classList.remove('col-sm-4');
    document.getElementById('botaoCancelar').classList.remove('col-sm-4');
    
    document.getElementById('botaoAdicionar').classList.add('col-sm-6');
    document.getElementById('botaoCancelar').classList.add('col-sm-6');
    document.getElementById('botaoApagar').style.display= 'none';
    /////////////////////////////////
    window.sessionStorage.removeItem("sessaoID");
     document.getElementById('addsession').onclick = function()
                                                    {
                                                       AddSession();
                                                    }; 
    
}

/************* Disable do botao quando não esta preenchido *****************/

/*----- Para o Adicionar no botão plus: -----*/
/*
$( document ).ready(function() {
    document.getElementById('formaddsession').addEventListener("keyup", validateNewSession);
});


function validateNewPatient(){
    if ($('#prmeiroNome').val().length   >=   2   &&
        $('#ultimoNome').val().length  >=   2   &&
        $.isNumeric($('#idade').val()) &&
        $('#obs').val().length > 0) {
        $('#addpatient').prop("disabled", false);
    }
    else {
        $('#addpatient').prop("disabled", true);
    }
}
*/