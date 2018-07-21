
/* Funcao para registar um novo cuidador para o servidor*/
function RegistaCuidador() {
    var email = document.getElementById('emailregistar').value;
    var passe = document.getElementById('passwordregistar').value;
    var primeiroNome = document.getElementById('primeironomecuidador').value;
    var ultimoNome = document.getElementById('ultimonomecuidador').value;
    var profissao = document.getElementById('profissao').value;
    
    var fd = "cuidadorID=" + email + "&password=" + passe +"&primeiroNome=" + primeiroNome + "&ultimoNome=" + ultimoNome +"&profissao=" + profissao;
   /* fd.append("cuidadorID", email);
    fd.append("password", passe);
    fd.append("primeiroNome", primeiroNome);
    fd.append("ultimoNome", ultimoNome);
    fd.append("profissao", profissao);
    */
    var xhttp = new XMLHttpRequest();
	    xhttp.open("POST", "http://localhost:8080/api/cuidadores/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange  = function () {
                                    if (this.readyState == 4 && this.status == 200) {
                                        if(JSON.parse(xhttp.responseText).message == 'Cuidador Criado')
                                        {
                                            // Cuidador criado com sucesso (Registado)
                                            document.getElementById('testee').innerHTML= JSON.parse(xhttp.responseText).message; 
                                        }
                                        else
                                        {
                                            // Deu erro a criar o cuidador
                                            document.getElementById('testee').innerHTML= JSON.parse(xhttp.responseText).message;
                                        }
                                    }
                                };
    xhttp.send(fd);


 
}

function LoginCuidador() {
    var email = document.getElementById('emaillogin').value;
    var passe = document.getElementById('passwordlogin').value;
    
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/api/cuidadores/", true);
	xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.setRequestHeader('cuidadorid', email);
    xhttp.setRequestHeader('password', passe);
    xhttp.send();
}


/************* Disable do botao quando não esta preenchido *****************/

/*----- Para o REGISTAR: -----*/

$( document ).ready(function() {
    document.getElementById('registernav').addEventListener("keyup", validateRegistar);
});


function validateRegistar(){
    if ($('#emailregistar').val().length   >   0   &&
        $('#primeironomecuidador').val().length  >   0   &&
        $('#ultimonomecuidador').val().length    >   0 &&
        $('#passwordregistar').val().length > 0) {
        $('#buttonregistar').prop("disabled", false);
    }
    else {
        $('#buttonregistar').prop("disabled", true);
    }
}

/*----- Para o LOGIN: -----*/

$( document ).ready(function() {
    document.getElementById('loginnav').addEventListener("keyup", validateLogin);
});


function validateLogin(){
    if ($('#emaillogin').val().length   >   0   &&
        $('#passwordlogin').val().length  >   0 ) {
        $('#buttonlogin').prop("disabled", false);
    }
    else {
        $('#buttonlogin').prop("disabled", true);
    }
}