const mysql = require('mysql');
const crypto = require('crypto');
var Q = require("q");


const connection = mysql.createConnection
				({
					host		: 'localhost',
					user		: 'immersivemind',
					insecureAuth: true,
					database	: 'IMMERSIVEMIND'	 
				});

connection.connect();

function hashPassword(password)
{
	var hash = crypto.createHash('sha256');
	hash.update(password);
	return hash.digest('hex');
}

/*
*	Esta função faz queies simples
*	devolve uma PROMISE que fica num 
*	estado de RESOLVIDA se tudo estiver
*	bem ou é REJEITADA cc
*/
function makeQuery(query, arguments)
{
	var defer = Q.defer();
	connection.query(query, arguments,function (err, result)
									  {
							 		  	if(err || result.length <= 0)
								 			defer.reject();
							 			else
								 			defer.resolve(JSON.stringify(result));
							 		  });
	return defer;
}

/*
*	Esta função verifica se o cuidador 
* 	está logged in, caso esteja devolve
*	TRUE, caso não esteja devolve FALSE
*/

function checkIfCuidadorIsLogged(cuidadorID)
{
	var checkQuery = "SELECT * "
					+"FROM CUIDADORES "
					+"WHERE LOGGED_IN = TRUE "
					+"AND EMAIL_ID = ?";
	
	var defer = makeQuery(checkQuery, cuidadorID);
	
	return defer.promise;
}

/*
*	Esta função é responsavel por 
*	criar cuidadores, como parametros
* 	é lhe dado o EMAIL_ID e a PASSWORD
* 	que o cuidador quiser.
*	
*	devolve uma PROMISE que fica num 
*	estado de RESOLVIDA se tudo estiver
*	bem ou é REJEITADA cc
*/ 
exports.createCuidador = function (email, passe, primeiroNome, ultimoNome, profissao)
{
	
	var insertQuery = "INSERT INTO CUIDADORES SET ?";  
	var toInsert = {EMAIL_ID: (email): null ? email,
					PRIMEIRO_NOME: (primeiroNome): null ? primeiroNome,
					ULTIMO_NOME: ultimoNome,
					PROFISSAO: profissao,
					PASSWORD: hashPassword(passe),
					LOGGED_IN: false};
			
	var defer =  makeQuery(insertQuery, toInsert);
	return defer.promise;
}

/*
*	Esta função é responsavel por 
*	fazer o login, como parametros
* 	é lhe dado o EMAIL_ID que pode
*	ser o nome do cuidador e a PASSWORD
* 	do respectivo cuidador
*	
*	devolve uma PROMISE que fica num 
*	estado de RESOLVIDA se tudo estiver
*	bem ou é REJEITADA cc
*/ 

exports.cuidadorLogin = function (cuidadorID, password)
{	
	var defer = Q.defer();
		
	var logQuery = "SELECT * "  
				   +"FROM CUIDADORES "
				   +"WHERE PASSWORD = ? "
				   +"AND EMAIL_ID = ? ";
				   
	var toCheck = [hashPassword(password), cuidadorID];
	connection.query(logQuery,
					 toCheck ,
					 function (err, results, fields)
					 {
					 	if(err || results.length <= 0)
				 			defer.reject();
					 	else
					 	{	
						 	var loginQuery = "UPDATE CUIDADORES "
						 					+"SET LOGGED_IN = ? "
						 					+"WHERE EMAIL_ID = ?";
					 		
					 		connection.query(loginQuery, 
					 						[true, results[0].EMAIL_ID]);
					 						
	 						defer.resolve();
				 	 	}	
					}
	);
	
	return defer.promise;
}

/*
*	Esta função é responsavel por 
*	fazer o logout, como parametros
* 	é lhe dado o EMAIL_ID que pode
*	ser o nome do cuidador
*	
*	devolve uma PROMISE que fica num 
*	estado de RESOLVIDA se tudo estiver
*	bem ou é REJEITADA cc
*/ 
exports.cuidadorLogout = function (cuidadorID)
{
	 
	
	var logoutQuery = "UPDATE CUIDADORES "
 					+"SET LOGGED_IN = ? "
 					+"WHERE EMAIL_ID = ? ";
 					
	var defer = makeQuery(logoutQuery, [false, cuidadorID]);
	
	return defer.promise;
}

exports.createDoente = function(firstName, lastName, age, obs, cuidadorID)
{
	var defer = Q.defer();
	
	var insertQuery = "INSERT INTO DOENTES SET ?";
	var toInsert = {PRIMEIRO_NOME: firstName,
					ULTIMO_NOME: lastName,
					IDADE: parseInt(age),
					OBSERVACAO: obs,
					EMAIL_ID: cuidadorID};
	
	return doQueryIfLogged(insertQuery, toInsert, cuidadorID);								  
}

exports.getDoentes = function(cuidadorID)
{
	var getDoentesQuery = "SELECT DOENTE_ID, "
						+ "PRIMEIRO_NOME, "
						+ "ULTIMO_NOME "
						+ "FROM DOENTES "
						+ "WHERE EMAIL_ID = ?";
						
	var defer = makeQuery(getDoentesQuery, cuidadorID);
	return defer.promise;	  
}

exports.getDoente = function(doenteID, cuidadorID)
{
	var getDoenteQuery = "SELECT * "
					   + "FROM DOENTES "
					   + "WHERE DOENTE_ID = ? "
					   + "AND EMAIL_ID = ?";
    
	var defer = makeQuery(getDoenteQuery, [doenteID, cuidadorID]);
		
	return defer.promise;
}

exports.createSessao = function(nomeSessao, doenteID, cuidadorID)
{
	var insertQuery = "INSERT INTO SESSAO SET ?";
	var toInsert = {SESSAO_NOME: nomeSessao,
					DOENTE_ID: doenteID,
					EMAIL_ID: cuidadorID};
					
	return doQueryIfLogged(insertQuery, toInsert, cuidadorID);						
}

exports.getSessoes = function(doenteID)
{
	var getSessoesQuery = "SELECT * "
						+ "FROM SESSAO "
						+ "WHERE DOENTE_ID = ? ";
	
	var defer = makeQuery(getSessoesQuery, doenteID);
	
	return defer.promise;
}

exports.getSessao = function(sessaoID)
{
	var getSessaoQuery = "SELECT * "
						+ "FROM SESSAO "
						+ "WHERE SESSAO_ID = ? ";
						
	var defer = makeQuery(getSessoesQuery, sessaoID);
	
	return defer.promise;
}

/*
*	Tens que ver ou aqui passas o URL do Youtube
*	e aqui vais buscar o URL do Ficheiro ou
*	entao dás logo o URL do ficheiro
*/
exports.createVideo = function(sessaoID, tituloVideo, videoUrlThumbnail, videoUrlFicheiro, cuidadorID)
{
	var insertQuery = "INSERT INTO VIDEOS SET ?";
	
	//Caso se ponha o URL do youtube tem de se tratar do URL_FILE aqui
	// videoUrlFicheiro = fetchUrlFile(youtubeURL);
	
	var toInsert = {SESSAO_ID: sessaoID,
					VIDEO_TITLE: tituloVideo,
					URL_THUMBNAIL: videoUrlThumbnail, 
					URL_FILE: videoUrlFicheiro};
					
	return doQueryIfLogged(insertQuery, toInsert, cuidadorID);
		
}

exports.getVideosDaSessao = function(sessaoID)
{
	var getSessaoQuery = "SELECT * "
					+ "FROM VIDEOS "
					+ "WHERE SESSAO_ID = ? ";
						
	var defer = makeQuery(getSessoesQuery, sessaoID);
	
	return defer.promise;
}

exports.createObservacao = function(observacao, tituloVideo, doenteID, cuidadorID, sessaoID)
{
	
	
	var insertQuery = "INSERT INTO VIDEOS_OBSERVACAO SET ?";
	var toInsert = {VIDEO_TITLE: tituloVideo,
					DOENTE_ID: doenteID,
					EMAIL_ID: cuidadorID,
					SESSAO_ID: sessaoID, 
					OBSERVACAO: observacao};
					
	return doQueryIfLogged(insertQuery, toInsert, cuidadorID);
}

exports.getObservacaoSessaoID = function(sessaoID)
{
	var getSessaoQuery = "SELECT * "
					+ "FROM VIDEOS_OBSERVACAO "
					+ "WHERE SESSAO_ID = ? ";
						
	var defer = makeQuery(getSessoesQuery, sessaoID);
	
	return defer.promise;
}

exports.getObservacaoDoenteID = function(doenteID)
{
	var getSessaoQuery = "SELECT * "
					+ "FROM VIDEOS_OBSERVACAO "
					+ "WHERE DOENTE_ID = ? ";
						
	var defer = makeQuery(getSessoesQuery, sessaoID);
	
	return defer.promise;
}
 
function doQueryIfLogged(query, params, cuidadorID)
{
	var defer = Q.defer();
	var checkLoggedInPromise = checkIfCuidadorIsLogged(cuidadorID);
	
	checkLoggedInPromise.done(function()
								{
									connection.query(query, params);
									defer.resolve();
								},
							  function()
							  	{
							  		console.log("Não Está logged");
					  				defer.reject();
							  	});
	return defer.promise;	
}






