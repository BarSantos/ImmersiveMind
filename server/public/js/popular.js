/*****************************************************************************/
/*                          I M P O R T A N T E                              */
/*****************************************************************************/
var IPADDR = '192.168.1.74';
/*****************************************************************************/
/*                          I M P O R T A N T E                              */
/*****************************************************************************/




/*------- Para criar bolinhas ----*/

$(document).ready(function(){
    
    Bolinhas();
})

/*** Funcao criar bolinhas ***/
function Bolinhas(){
    var xhttp = new XMLHttpRequest();
    var email = window.sessionStorage.getItem("email_id");
    
    xhttp.open("GET", "http://"+IPADDR+":8080/api/doentes/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('cuidadorid', email);
    
    xhttp.onreadystatechange  = function () {
                                   

                                    if (this.readyState == 4 && this.status == 200) {
                                        var fillstring = '';
                                       
                                        var resultJSON = JSON.parse(this.responseText);
                                        
                                        if(resultJSON.message != 'Erro a devolver doentes'){
                                            var jsonResult = JSON.parse(resultJSON);
                                            var imagePath = "images/userimages/";
                                            var imageName;
                                            
                                            /* Popular com doentes */
                                            for(var i=0; i<jsonResult.length; i++){
                                                if (jsonResult[i].IMAGE)
                                                    imageName = jsonResult[i].IMAGE;
                                                else
                                                    imageName = "bolinhas_default.png";
                                                
                                                fillstring += '<div class="col-lg-4 col-sm-6 text-center mb-4">';
                                                fillstring += '<img class="rounded-circle img-fluid d-block mx-auto bolitas" alt=""  style="background-image: url('+imagePath+imageName+')">';
                                                fillstring+= '<h3>'+jsonResult[i].PRIMEIRO_NOME+' '+jsonResult[i].ULTIMO_NOME+'</h3></div>';
                                            }
                                        }
                                    
                                   /* console.log('Aqui supostamente e o plus');
                                    /* Sinal plus */ 
                                        fillstring+='<div class="col-lg-4 col-sm-6 text-center mb-4">';
                                        fillstring+= '<a href="" data-toggle="modal" data-target="#modalContactForm">'
                                        fillstring+= '<img class="rounded-circle img-fluid d-block mx-auto bolitas_plus" style="" alt="">';
                                        fillstring+= '</a>'
                                        fillstring+= '</div>';
                                        document.getElementById("rowbolinhas").innerHTML = fillstring;
 
                                    }
                                };
    xhttp.send();
}

/*********Para a opção Procurar********/
var imagem = '';
var imagemNome = '';
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


function AddPatient(){
     
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://"+IPADDR+":8080/api/doentes/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    var primeiroNome = document.getElementById("prmeiroNome").value;
    var ultimoNome = document.getElementById("ultimoNome").value;
    var idade = document.getElementById("idade").value;
    var observacao = document.getElementById("obs").value;
    var email = window.sessionStorage.getItem("email_id");
    
    var fd = "primeiroNome=" + primeiroNome + "&ultimoNome=" + ultimoNome + "&idade=" + idade + "&observacao=" + observacao + "&cuidadorID=" + email + "&imagem=" + imagem + "&imagename=" + imagemNome;
    
    window.alert("Thi is the image " +imagem);
    window.alert("Thi is the image name " +imagemNome);
    
    xhttp.onreadystatechange  = function () {
                                    if (this.readyState == 4 && this.status == 200) {   
                                        var resultJSON = JSON.parse(this.responseText);
                                        if(resultJSON.message == 'Error in LogIn')
                                        {
                                            // O cuidador provavelmente nao existe na BD
                                            $("#myModal").modal();
                                            
                                        }
                                        else{
                                            
                                            var jsonResult = JSON.parse(resultJSON);
                        
                                            window.sessionStorage.setItem("email_id", jsonResult[0].EMAIL_ID); 
                                            window.sessionStorage.setItem("primeiro_nome", jsonResult[0].PRIMEIRO_NOME);
                                            window.sessionStorage.setItem("ultimo_nome", jsonResult[0].ULTIMO_NOME);
                                            location.href = "frontpage";
                                        }
                                    }
                                };
    
    
    xhttp.send(fd);
    imagem = '';
    imagemNome = '';
}
