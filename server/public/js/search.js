// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#query').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
	key: 'AIzaSyA47rb9auY9AhJM9QCS1pzk4WKJKag4_AM'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<p>' + str + '</p>');
  });
}


function show1() {
   
    document.getElementById("procurar_container").style.visibility = "visible";
    document.getElementById("btn1").classList.add('active');
    document.getElementById("btn2").classList.remove('active');
    document.getElementById("guardados_container").style.visibility = "hidden";
}

function show2() {
    document.getElementById("guardados_container").style.visibility = "visible";
    document.getElementById("btn2").classList.add('active');
    document.getElementById("btn1").classList.remove('active');
    document.getElementById("procurar_container").style.visibility = "hidden";
    
}


/*Botoes activos*/
var header = document.getElementById("botoes");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}