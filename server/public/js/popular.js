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
                                            /* Popular com doentes */
                                            for(var i=0; i<jsonResult.length; i++){
                                                fillstring += '<div class="col-lg-4 col-sm-6 text-center mb-4">';
                                                fillstring += '<img class="rounded-circle img-fluid d-block mx-auto bolitas" alt="">';
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
$(document).ready( function() {
    	$(document).on('change', '.btn-file :file', function() {
		var input = $(this),
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [label]);
		});

		$('.btn-file :file').on('fileselect', function(event, label) {
		    
		    var input = $(this).parents('.input-group').find(':text'),
		        log = label;
		    
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
		        }
		        
		        reader.readAsDataURL(input.files[0]);
		    }
		}

		$("#imgInp").change(function(){
		    readURL(this);
		}); 	
	});