var fs = require('fs');
 var path = require('path')
var express    	= require('express');        
var app        	= express();                 
var bodyParser 	= require('body-parser');
var DB			= require('./ImmersiveMindDB.js');
var http = require('http').Server(app);

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

var port = process.env.PORT || 8080; 

app.use(express.static(path.join(__dirname, '/public')));
var router = express.Router();
app.use('/api', router);

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(req, res){
	res.render('cover');
});

app.get('/frontpage', function(req, res){
    res.render('frontpage');
});
/*	
* 	O pedido POST faz com que
*	se crie novos cuidadores
*	desvolve "Cuidador Criado"
*	caso corra correctamente e
* 	devolve "Erro a Criar Cuidador
*	caso contrário. 
*/
router.route('/cuidadores').post(
		function(req, res)
		{
			
			var email = req.body.cuidadorID;
			var passe = req.body.password;
			var primeiroNome = req.body.primeiroNome;
			var ultimoNome = req.body.ultimoNome;
			var profissao = req.body.profissao;
			
			console.log(email);
			console.log(passe);
			console.log(primeiroNome);
			console.log(ultimoNome);
			console.log(profissao);
			
			var createCuidadorPromise = DB.createCuidador(email, passe, primeiroNome, ultimoNome, profissao);
			promiseResolve(createCuidadorPromise, res, 'Cuidador Criado', 'Erro a Criar Cuidador');
		});

/*
*	O pedido GET tem duas funções
*	caso só seja feito com o cuidadorID 
*	tem como função fazer logout
*	caso seja feito tambem com a password
*	tem como função fazer o login 
*/
router.route('/cuidadores').get(
		function(req, res)
		{
			var pwd = req.headers.password;
			var cuidadorID = req.headers.cuidadorid;
            console.log(pwd);
            console.log(cuidadorID);
			if(pwd)
			{
				var loginPromise = DB.cuidadorLogin(cuidadorID, pwd);
				promiseWithResult(loginPromise, res,  'Logged In: ' + cuidadorID, 'Error in LogIn');
			}
			else
			{
				var logoutPromise = DB.cuidadorLogout(cuidadorID);
				promiseResolve(logoutPromise, res, 'Logged Out' , 'Error in LogOut');
			}
		});

/*
* 	O pedido POST faz com que
*	se crie novos doentes
*	devolve "Doente Criado"
*	caso corra correctamente e
* 	devolve "Erro a Criar Doente"
*	caso contrário. 
*/
router.route('/doentes').post(
		function(req, res)
		{
			
			var primeiroNome = req.body.primeiroNome;
			var ultimoNome = req.body.ultimoNome;
			var idade = req.body.idade;
			var observacao = req.body.observacao;
			var cuidadorID = req.body.cuidadorID;
			
			var createDoentePromise = DB.createDoente(primeiroNome, ultimoNome, idade, observacao, cuidadorID);
			promiseResolve(createDoentePromise, res,'Doente criado' , 'Erro a criar doente');
		});

/*
*	O pedido GET tem duas funções
*	caso só seja feito com o cuidadorID
*	tem como função devolver todos os doentes
*	associados ao cuidador, caso seja feito 
*	tambem com o doenteID tem como função 
* 	devolver a informação do doente 
*/
router.route('/doentes').get(
		function(req, res)
		{
			var cuidadorID = req.headers.cuidadorid;
			var doenteID = req.headers.doenteid;
			
			if(doenteID)
			{
				var getDoenteInfoPromise = DB.getDoente(doenteID, cuidadorID);
				promiseWithResult(getDoenteInfoPromise, res, "Foi devolvido o doente", "Erro a devolver doente");
			}
			else
			{
				
				var getDoentesPromise = DB.getDoentes(cuidadorID);
				promiseWithResult(getDoentesPromise, res, "Foram devolvidos Doentes", 'Erro a devolver doentes');
			}	
		});
		
/*
*	O pedido GET tem duas funções
*	caso só seja feito com o doenteID
*	tem como função devolver todas as sessões
*	associados ao doente, caso seja feito 
*	tambem com o sessaoID tem como função 
* 	devolver a informação da sessão 
*/
router.route('/sessoes').get(
		function(req, res)
		{
			var doenteID = req.headers.doenteid;
			var sessaoID = req.headers.sessaoid;
			
			if(sessaoID)
			{
				var getSessaoPromise = DB.getSessao(sessaoID);
				promiseWithResults(getSessaoPromise, res, 'Foi devolvida uma Sessao', 'Error a devolver Sessao');
			}
			else
			{
				var getSessoesPromise = DB.getSessoes(doenteID)
				promiseWithResults(getSessaoPromise, res, 'Foram devolvidas Sessoes', 'Error a devolver Sessoes');
			}
			
		});

/*
* 	O pedido POST faz com que
*	se crie novas sessões
*	devolve "Sessao Criado"
*	caso corra correctamente e
* 	devolve "Error a criar Sessao"
*	caso contrário. 
*/
router.route('/sessoes').post(
		function(req, res)
		{
			var sessaoNome = req.body.nomesessao;
			var doenteID = req.body.doenteid;
			var cuidadorId = req.body.cuidadorid;
			
			var createSessaoPromise = DB.createSessao(sessaoNome, doenteID, cuidadorID);
			promiseResolve(createSessaoPromise, res, 'Sessao criada', 'Error a criar Sessao');
		});
		
/*
*	O pedido GET devolve os videos 
* 	associados a uma sessão previamente
*	criada.
*/
router.route('/videos').get(
		function(req, res)
		{
			var sessaoID = req.header.sessaoid;
			
			var getVideoSessaoPromise = DB.getVideosDaSessao(sessaoID);
			promiseWithResults(getVideoSessaoPromise, res, 'Foram devolvidos Videos', 'Error a devolver Videos');
		});

/*
* 	O pedido POST faz com que
*	se crie novas videos
*	devolve "Video Criado"
*	caso corra correctamente e
* 	devolve "Error a criar Video"
*	caso contrário. 
*/
router.route('/videos').post(
		function(req, res)
		{
			var sessaoID = req.body.sessaoid;
			var tituloVideo = req.body.titulovideo;
			var videoUrlThumbnail = req.body.thumbnailVideo;
			var videoUrlFicheiro = req.body.urlFicheiro;
			var cuidadorID = req.body.cuidadorId;
			
			var createVideoPromise = DB.createVideo(sessaoID, tituloVideo, videoUrlThumbnail, videoUrlFicheiro, cuidadorID);
			promiseResolve(createVideoPromise, res, 'Video criado', 'Error a criar Video');
		});

/*
*	O pedido GET tem duas funções
*	caso só seja feito com o doenteID
*	tem como função devolver todas as observacoes
*	associados ao doente, caso seja feito 
*	tambem com o sessaoID tem como função 
* 	devolver as observaçoes da sessão 
*/		
router.route('/observacao').get(
		function(req, res)
		{
			var sessaoID = req.header.sessaoid;
			var doenteID = req.header.doenteid;
			
			if(sessaoID)
			{
				var getObservacaoSessaoIDPromise =  getObservacaoSessaoID(sessaoID);
				promiseWithResult(getObservacaoSessaoIDPromise, res, 'Foram devolvidos Videos', 'Error a devolver Videos');
			}
			else
			{
				var getObservacaoDoenteIDPromise =  getObservacaoDoenteID(doenteID);
				promiseWithResult(getObservacaoDoenteIDPromise, res, 'Foram devolvidos Videos', 'Error a devolver Videos');			
			}
		});

/*
* 	O pedido POST faz com que
*	se crie novas observações
*	devolve "Observacao Criado"
*	caso corra correctamente e
* 	devolve "Error a criar Observacao"
*	caso contrário. 
*/
router.route('/observacao').post(
		function(req, res)
		{
			var observacao = req.body.observacao;
			var tituloVideo = req.body.tituloVideo;
			var doenteID = req.body.doenteID;
			var cuidadorID = req.body.cuidadoID;
			var sessaoID = req.body.sessaoID;
			
			var createObservacaoPromise = DB.createObservacao(observacao, tituloVideo, doenteID, cuidadorID, sessaoID);
			promiseResolve(createObservacaoPromise, res, 'Observacao Criada', 'Error a criar Observacao'); 
		});

		



function promiseWithResult(promise, res, consoleMensage, errorMensage)
{
	promise.then(function(result)
				{
					console.log(consoleMensage);
					res.json(result);
				},
			 	 function()
			  	{
			  		res.json({message: errorMensage});
			  	});	
}

function promiseResolve(promise, res, successMensage, errorMensage)
{
	promise.then(function()
				{
					console.log(successMensage);
					res.json({message: successMensage});
				},
			 	 function()
			  	{
			  		res.json({message: errorMensage});
			  	});	
}


app.listen(port);
